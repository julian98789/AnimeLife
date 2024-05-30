import { useState, useEffect } from "react";
import { FaPlay } from 'react-icons/fa';

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


    return (
        <div className="flex flex-wrap justify-center overflow-x-auto scrollbar-hide cursor-pointer">
            {animes.map((anime, index) => (
                <div key={index} className="m-2 w-52 group">
                    <div className="block h-72 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 relative">
                        <img src={anime.image} alt={anime.title} className="h-full w-full object-cover rounded-t-lg" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                            <FaPlay className="text-4xl text-white" />
                        </div>
                    </div>
                    <h5 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-ellipsis overflow-hidden">{anime.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{anime.isPremiere ? 'Estreno' : ''}</p>
                </div>
            ))}
        </div>
    );
}

export default Carousel;