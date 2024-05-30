// src/routes/api/extract.js

import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';
import pool from '@/db/MysqlConection';

export const GET = async (req) => {
    const baseUrl = 'https://www3.animeflv.net/';


    try {
        const { data } = await axios.get(baseUrl);
        const $ = cheerio.load(data);

        $('.ListAnimes .Anime').each(async (i, elem) => {
            let title = $(elem).find('> a > .Title').text();
            let image = $(elem).find('.Image img').attr('src');
            const isPremiere = $(elem).find('.Estreno').length > 0;
            let url = $(elem).find('> a').attr('href');



            // Add the base URL if the image URL is relative
            if (image && !image.startsWith('http')) {
                image = baseUrl + image;
            }
            if (url && !url.startsWith('http')) {
                url = baseUrl + url;
            }

            await pool.query('INSERT INTO ultimepremieres (title, image, isPremiere,url) VALUES (?, ?, ?, ?)', [title, image, isPremiere, url]);
        });
        const [rows] = await pool.query('SELECT * FROM ultimepremieres');

        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
    }
};