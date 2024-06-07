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
            <div className="flex flex-col md:flex-row justify-center">
                <div className="flex flex-col md:flex-row items-start md:max-w-5xl  ">
                    <img className="flex-direction object-cover w-full mt-4 md:mt-0 rounded-xl h-96 md:h-auto md:w-72 " src={animeImage} alt="" />
                    <div className="flex flex-col p-4 leading-normal mt-4 md:mt-0">
                        <h5 className="mb-2 text-2xl font-bold  text-gray-100 dark:text-white">{details && details[0] ? details[0].nameAnime : 'Loading...'}</h5>
                        <p className="mb-3 font-normal text-gray-200 dark:text-gray-400">{episodes && episodes[0] ? episodes[0].sinopsis : ''}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-center ">
                {episodes && details && Object.values(details).length && episodes.map((episode, index) => {
                    const detailArray = Object.values(details);
                    const detail = detailArray.find(detail => detail.title === episode.animeTitle);
                    return (
                        <a href={detail ? detail.url : '#'} key={index} class="flex flex-col items-center  bg-slate-300 border border-gray-200 rounded-lg shadow m-2  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img class="rounded-t-lg  h-20 w-44 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={episode.image} alt="" />
                            <div class="flex flex-col justify-between p-1 leading-normal">
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