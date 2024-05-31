// src/routes/api/extract.js

import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import pool from '@/db/MysqlConection';

export const POST = async (req, res) => {
    const data = await req.json();
    const id = data.id;
    const baseUrl = 'https://jkanime.net/';


    try {
        const browser = await puppeteer.launch({ headless: false });
        const [page] = await browser.pages();  // Get the initial page

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        const animes = await page.evaluate(() => {
            const animeItems = Array.from(document.querySelectorAll('.trending__anime .anime__item'));
            return animeItems.map(elem => {
                const title = elem.querySelector('h5 a').innerText;
                const image = elem.querySelector('.anime__item__pic').style.backgroundImage.slice(5, -2);
                const info = Array.from(elem.querySelectorAll('.anime__item__text ul li')).map(li => li.innerText);
                const isPremiere = info.includes('En emision');
                const url = elem.querySelector('h5 a').href;

                return { title, image, info, isPremiere, url };
            });
        });// Log the extracted data

        for (const anime of animes) {
            await pool.query('INSERT INTO ultimepremieres (title, image, isPremiere, url, id_user) VALUES (?, ?, ?, ?, ?)', [anime.title, anime.image, anime.isPremiere, anime.url, id]);
        }

        const [rows] = await pool.query('SELECT * FROM ultimepremieres');

        await browser.close();

        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
    }
};