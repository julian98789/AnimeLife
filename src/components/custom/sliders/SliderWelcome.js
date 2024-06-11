import { useState, useEffect } from "react";
import { FaPlay } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Carousel = () => {
    const [animes, setAnimes] = useState([]);
    useEffect(() => {
        fetchAnimes();
    }, []);
    const fetchAnimes = () => {
        fetch('/api/select')
            .then(response => response.json())
            .then(data => {
                setAnimes(data);
                console.log('Data extracted successfully:', data);
            })
            .catch(err => {
                console.error('Failed to extract data:', err.message);
            });
    };

    const handleClick = (anime) => {
        Cookies.set('selectedAnime', JSON.stringify(anime)); // Save the anime data in a cookie
        window.location.href = '/descriptionAnime'; // Redirect to the other page
    };

    return (

        <div className="w-full flex flex-wrap justify-center overflow-x-auto cursor-default ">
            {animes.map((anime, index) => (
                <div key={index} className="m-2 w-[177px] sm:w-[177px] lg:w-[182px] group" onClick={() => handleClick(anime)}>
                    <div className="block h-72 bg-white border border-gray-200 rounded-lg cursor-pointer shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 relative transition-transform duration-500 ease-in-out hover:scale-105">
                        <img src={anime.image} alt={anime.title} className="h-full w-full object-cover rounded-t-lg " />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                            <FaPlay className="text-4xl text-white" />
                        </div>
                    </div>
                    <h5 className="mt-2 text-xl font-bold tracking-tight text-gray-200 dark:text-white overflow-ellipsis overflow-hidden">{anime.title}</h5>
                    <p className="font-normal text-green-500 dark:text-gray-400">{anime.isPremiere ? 'Estreno' : ''}</p>
                </div>
            ))}
        </div>

    );
}

export default Carousel;