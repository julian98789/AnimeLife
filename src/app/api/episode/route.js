import axios from 'axios';
import cheerio from 'cheerio';
import pool from '@/db/MysqlConection';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export const POST = async () => {
    const baseUrl = 'https://jkanime.net/';

    try {
        // Get the titles and URLs from the ultimePremieres table
        const [rows] = await pool.query('SELECT title, url FROM ultimepremieres');

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
                console.log(`Inserting episode: ${episodeUrl}, ${Number}`);
                // Include the title in the database insertion
                await pool.query('INSERT INTO episodes (title, url, animeTitle ) VALUES (?, ?, ?)', [title, episodeUrl, episodeNumber])
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
    const baseUrl = 'https://www3.animeflv.net/';

    try {
        // Get the titles and URLs from the episodes table
        const [rows] = await pool.query('SELECT title, url FROM episodes');

        const browser = await puppeteer.launch({
            args: ['--disable-features=PreloadSafeBrowsingService']
        });
        const page = await browser.newPage();


        for (const row of rows) {
            const url = row.url;

            // Skip URLs that end with '#'
            if (url.endsWith('#')) {
                console.log(`Skipping URL: ${url}`);
                continue;
            }

            const page = await browser.newPage();

            console.log(`Scraping URL: ${url}`);
            await page.goto(url, { timeout: 60000 });

            // Wait for the server options to load
            await page.waitForSelector('ul.CapiTnv li[data-id="1"] a');
            console.log(await page.content());

            // Then click on the server option and wait for navigation
            await Promise.all([
                page.waitForNavigation(),
                page.click('ul.CapiTnv li[data-id="1"] a'),
            ]);

            // Wait for the new iframe to load
            await page.waitForSelector('#video_box iframe');

            // Get the iframe src
            const videoUrl = await page.$eval('#video_box iframe', iframe => iframe.src);

            if (videoUrl) {
                console.log(`Video URL: ${videoUrl}`);

                console.log(`Inserting episode detail: ${row.title}, ${videoUrl}`);
                await pool.query('INSERT INTO detailsepisode (title, url) VALUES (?, ?)', [row.title, videoUrl])
                    .catch(err => console.error(`Error inserting into detailsepisode: ${err}`));
            } else {
                console.error('Failed to extract video URL from iframe');
            }

            await page.close();
        }

        return NextResponse.json({ status: 200, message: 'Episode details inserted successfully' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500, message: 'Failed to insert episode details' });
    }
};