import axios from 'axios';
import cheerio from 'cheerio';
import pool from '@/db/MysqlConection';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const POST = async () => {
    const baseUrl = 'https://jkanime.net/';

    try {
        // Get the titles and URLs from the ultimePremieres table
        const [rows] = await pool.query('SELECT id, title, url FROM ultimepremieres');

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        for (const row of rows) {
            const url = row.url;
            const title = row.title; // Get the title from the row
            console.log(`Scraping URL: ${url}`);
            await page.goto(url);

            const episodes = await page.$$eval('#episodes-content .epcontent .anime__item', episodes => episodes.map(episode => {
                const url = episode.querySelector('div a').href;
                const episodeNumber = episode.querySelector('ul li span').textContent;
                return { url, episodeNumber };
            }));

            console.log(`Found ${episodes.length} episodes`);

            for (const { url: episodeUrl, episodeNumber: episodeNumber } of episodes) {
                console.log(`Inserting episode:${row.id}, ${episodeUrl}, ${Number}`);
                // Include the title in the database insertion
                await pool.query('INSERT INTO episodes (title, url, animeTitle, ultimepremieres_id) VALUES (?, ?, ?, ?)', [title, episodeUrl, episodeNumber, row.id])
                    .catch(err => console.error(`Error inserting into episodes: ${err}`));
            }

        }

        await browser.close();

        return NextResponse.json({ status: 200, message: 'Episodes scraped successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500, message: 'Failed to scrape episodes' });
    }
};

export const PUT = async () => {
    const baseUrl = 'https://jkanime.net/';

    try {
        // Get the titles and URLs from the episodes table
        const [rows] = await pool.query('SELECT id ,title, animeTitle, url FROM episodes');

        const browser = await puppeteer.launch({
            args: ['--disable-features=PreloadSafeBrowsingService'],
            headless: false
        });
        const page = await browser.newPage();

        for (const row of rows) {
            const url = row.url;

            // Skip URLs that end with '#'
            if (url.endsWith('#')) {
                console.log(`Skipping URL: ${url}`);
                continue;
            }

            console.log(`Scraping URL: ${url}`);
            await page.goto(url, { timeout: 60000 });

            // Wait for the iframe to load
            await page.waitForSelector('#video_box iframe');

            // Get the iframe src
            const videoUrl = await page.$eval('#video_box iframe', iframe => iframe.src);

            if (videoUrl) {
                console.log(`Video URL: ${videoUrl}`);

                console.log(`Inserting episode detail:${row.id},${row.title}, ${row.animeTitle}, ${videoUrl}`);
                await pool.query('INSERT INTO detailepisode (title, url, episodes_id, nameAnime) VALUES (?, ?, ?, ?)', [row.animeTitle, videoUrl, row.id, row.title])
                    .catch(err => console.error(`Error inserting into detailsepisode: ${err}`));
            } else {
                console.error('Failed to extract video URL from iframe');
            }
        }

        // Close the page after all URLs have been processed
        await page.close();

        return NextResponse.json({ status: 200, message: 'Episode details inserted successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500, message: 'Failed to insert episode details' });
    }
};