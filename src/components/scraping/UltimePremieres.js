'use client'
import axios from 'axios';
import cheerio from 'cheerio';
export const Extrac = async () => {

    const input = 'https://www3.animeflv.net/'
    const animes = [];


    try {
        const { data } = await axios.get(input);
        const $ = cheerio.load(data);

        $('.ListAnimes .Anime').each((i, elem) => {
            const title = $(elem).find('.Title').text();
            const image = $(elem).find('.Image img').attr('src');
            const isPremiere = $(elem).find('.Estreno').length > 0;

            animes.push({ title, image, isPremiere });
        });
        fs.writeFileSync('/src/components/scraping/animes.json', JSON.stringify(animes, null, 2));

    } catch (err) {
        console.error(err);
    }
    console.log(animes)
    return animes;
}


