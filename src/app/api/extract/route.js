// src/routes/api/extract.js

import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    const baseUrl = 'https://www3.animeflv.net/';
    const animes = [];
    const filePath = './src/components/scraping/ultimePremieres/animes.json';

    try {
        const { data } = await axios.get(baseUrl);
        const $ = cheerio.load(data);

        $('.ListAnimes .Anime').each((i, elem) => {
            let title = $(elem).find('> a > .Title').text();
            let image = $(elem).find('.Image img').attr('src');
            const isPremiere = $(elem).find('.Estreno').length > 0;



            // Add the base URL if the image URL is relative
            if (image && !image.startsWith('http')) {
                image = baseUrl + image;
            }

            animes.push({ title, image, isPremiere });
        });

        fs.writeFileSync(filePath, JSON.stringify(animes, null, 2));

        // Read the file and send its content as response
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return NextResponse.json(JSON.parse(fileContent));
    } catch (err) {
        console.error(err);
    }
};