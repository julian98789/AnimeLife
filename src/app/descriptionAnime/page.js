'use client'
import { useState, useEffect } from 'react';
import AnimeInstance from "@/components/custom/animeinstance/AnimeInstance";
import NavBarMenu from "@/components/custom/navbar/NavBarMenu";
import NavBarAdmin from "@/components/custom/navbar/NavBarAdmin";

const DescriptionAnime = () => {
    // Estado para almacenar los datos del usuario
    const [userData, setUserData] = useState(null);

    // useEffect para obtener los datos del usuario en el cliente
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = sessionStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, []);

    // Obtener el rol del usuario
    const role = userData?.rol;

    return (
        <>
            <div className="w-full h-screen">
                <div className="flex items-center rounded-lg">
                    {role === 'admin' ? (
                        <div className="w-full flex flex-col fixed top-0 left-0 right-0 z-50">
                            <NavBarAdmin />
                        </div>
                    ) : (
                        <div>
                            <NavBarMenu />
                        </div>
                    )}
                    <div className="w-full flex justify-center items-center">
                        <div className="pt-16 w-full">
                            <AnimeInstance />
                        </div>
                    </div>
                </div>
                <footer className="w-full py-4 text-center text-neutral-100">
                © <a href="https://github.com/julian98789" className="underline">2024 Julian Gomez </a> , <a href="https://github.com/KeniBeck" className="underline">Deyler Mena</a>
                </footer>
            </div>
        </>
    );
};

export default DescriptionAnime;
