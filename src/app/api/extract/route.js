// src/routes/api/extract.js

import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import pool from '@/db/MysqlConection';

export const POST = async (req, res) => {
    const data = await req.json();
    const id = data.id;
    const baseUrl = 'https://jkanime.net/ranking/';

    try {
        const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();  // Get the initial page

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Wait for the dynamic content to load
        await page.waitForSelector('.page_mirando .anime__item', { timeout: 5000 });

        const animes = await page.evaluate(() => {
            const animeItems = Array.from(document.querySelectorAll('.page_mirando .anime__item'));
            return animeItems.map(elem => {
                const titleElement = elem.querySelector('h5 a');
                const title = titleElement.innerText;
                const image = elem.querySelector('.anime__item__pic').style.backgroundImage.slice(5, -2);
                const isPremiere = title.includes('En emision');
                let url = titleElement.href;

                // Prepend 'https://jkanime.net' to the URL if it's not already there
                if (!url.startsWith('https://jkanime.net')) {
                    url = `https://jkanime.net${url}`;
                }

                return { title, image, isPremiere, url };
            });
        });

        for (const anime of animes) {
            // Check if the anime already exists in the database
            const [existing] = await pool.query('SELECT * FROM ultimepremieres WHERE title = ? AND url = ?', [anime.title, anime.url]);

            // If the anime does not exist, insert it
            if (existing.length === 0) {
                await pool.query('INSERT INTO ultimepremieres (title, image, isPremiere, url, id_user) VALUES (?, ?, ?, ?, ?)', [anime.title, anime.image, anime.isPremiere, anime.url, id]);
            }
        }

        const [rows] = await pool.query('SELECT * FROM ultimepremieres');

        await browser.close();

        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
    }
};