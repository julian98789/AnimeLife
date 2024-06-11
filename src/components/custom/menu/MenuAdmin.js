'use client'
import useSession from "@/hook/useSession";
import { useState } from "react";
import { MdTableRestaurant } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import Link from 'next/link'
import { Macondo_Swash_Caps } from "next/font/google"
import { Loading } from "../alerts/Alerts";
import Swal from "sweetalert2";
const Macon = Macondo_Swash_Caps({
    subsets: ['latin'],
    weight: '400',
})

const MenuAdmin = () => {
    const { logout } = useSession()
    const [cerrarSession, setCerrarSession] = useState(false);
    const [animes, setAnimes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let userData;
    let id;
    if (typeof window !== 'undefined') {
        userData = JSON.parse(sessionStorage.getItem('userData'));
        id = userData?.id;
    }
    console.log(id)






    const session = () => {
        setCerrarSession(true);
    };

    if (cerrarSession) {
        logout()
        window.location.href = "/"
    }
    const fetchAnimes = () => {
        if (isLoading) {
            return;
        }

        const stopLoading = Loading(); 
        setIsLoading(true);
        fetch(`/api/extract`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }), 
        })
            .then(response => response.json())
            .then(data => {
                setAnimes(data);
                console.log('Data extracted successfully:', data);
                stopLoading(); 
                Swal.fire('Exitoso', `Se han cargado ${data.length} animes`, 'success'); // Show success alert
                return fetch('/api/episode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), 
                });
            })
            .then(response => response.json())
            .then(data => {

                return fetch('/api/episode', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // Send the data from the POST request in the body of the PUT request
                });
            })
            .then(response => response.json())
            .then(data => {
                // Here you can handle the response from the PUT request if needed
                console.log('Data updated successfully:', data);
            })
            .catch(err => {
                console.error('Failed to extract data:', err.message);
                stopLoading(); // Stop the loading alert
                Swal.fire('Error', 'Failed to fetch data', 'error'); // Show error alert
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="w-full mt-5 text-neutral-800">
            <div className="flex justify-center">
                <div className="flex-col">
                    <img className="w-[120px] h-[120px]" src="/demonio.png" alt="AnimeLife" />
                    <div className={` text-red-600 text-center text-3xl font-bold ${Macon.className}`}>
                        <span className="w-2">AnimeLife</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row justify-start items-end p-2 cursor-pointer hover:bg-neutral-300  duration-75 rounded-lg ">
                    <div  >
                        <FaHome className="text-3xl " />
                    </div>
                    <div className="px-5">
                        <a href="/">Inicio</a>
                    </div>
                </div>

                <div className="flex flex-row justify-start items-end p-2 cursor-pointer hover:bg-neutral-300  duration-75 rounded-lg ">
                    <div>
                        <MdAdminPanelSettings className="text-3xl" />
                    </div>
                    <div className="px-5">
                        <Link href="/admin">Admin</Link>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-end p-2 cursor-pointer hover:bg-neutral-300  duration-75 rounded-lg ">
                    <div >
                        <FaUser className="text-3xl" />
                    </div>
                    <div className="px-5">
                        <button onClick={fetchAnimes} disabled={isLoading}>Actualizar Animes</button>
                    </div>
                </div>



                <div className="flex flex-row justify-start items-end mt-48 p-2 cursor-pointer hover:bg-red-700 hover:text-white  duration-75 rounded-lg ">
                    <div >
                        <AiOutlineCloseCircle className="text-3xl" />
                    </div>
                    <div className="px-5">
                        <a onClick={session} >Cerrar sesion</a>
                    </div>
                    {cerrarSession}
                </div>





            </div>

        </div>
    )
}
export default MenuAdmin