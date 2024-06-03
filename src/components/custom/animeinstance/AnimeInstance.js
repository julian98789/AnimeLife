'use client'
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const AnimeInstance = () => {
    const [animeData, setAnimeData] = useState(null);

    useEffect(() => {
        let anime;
        try {
            const animeCookie = Cookies.get('selectedAnime');
            anime = animeCookie ? JSON.parse(decodeURIComponent(animeCookie)) : null;
        } catch (err) {
            console.error('Failed to parse cookie:', err);
        }

        if (anime && anime.id) {
            fetch(`/api/description`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: anime.id }),
            })
                .then(response => response.json())
                .then(data => setAnimeData(data))
                .catch(err => console.error('Failed to fetch anime:', err));
        }
    }, []);

    const episodes = animeData?.episodes;
    const details = animeData?.details;
    const animeImage = details?.animeImage;

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <a href="#" class="flex flex-col items-center bg-slate-300 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <img class="flex-direction object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-s-lg" src={animeImage} alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{details && details[0] ? details[0].nameAnime : 'Loading...'}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{episodes && episodes[0] ? episodes[0].sinopsis : ''}</p>
                    </div>
                </a>
            </div>
            <div className="flex flex-wrap justify-center w-full">
                {episodes && details && Object.values(details).length && episodes.map((episode, index) => {
                    const detailArray = Object.values(details);
                    const detail = detailArray.find(detail => detail.title === episode.animeTitle);
                    return (
                        <a href={detail ? detail.url : '#'} key={index} class="flex flex-col items-center bg-slate-300 border border-gray-200 rounded-lg shadow m-2 xs:flex-col xs:max-w-full md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img class="flex-direction object-cover w-full rounded-t-lg h-96 xs:h-48 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={episode.image} alt="" />
                            <div class="flex flex-col justify-between p-4 leading-normal">
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{episode.animeTitle}</p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
export default AnimeInstance;