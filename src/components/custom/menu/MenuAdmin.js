'use client'
import useSession from "@/hook/useSession";
import { useState } from "react";
import { MdTableRestaurant } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import Link from 'next/link'
import { Macondo_Swash_Caps } from "next/font/google"
const Macon = Macondo_Swash_Caps({
    subsets: ['latin'],
    weight: '400',
})

const MenuAdmin = () => {
    const { logout } = useSession()
    const [cerrarSession, setCerrarSession] = useState(false);



    const session = () => {
        setCerrarSession(true);
    };

    if (cerrarSession) {
        logout()
        window.location.href = "/login"
    }

    return (
        <div className="w-full mt-5 text-neutral-800">
            <div className="flex justify-center">
                <div className="flex-col">
                    <img className="w-[120px] h-[120px]" src="/anime.png" alt="AnimeLife" />
                    <div className={` text-emerald-500 text-center text-2xl font-medium ${Macon.className}`}>
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
                        <MdTableRestaurant className="text-3xl" />
                    </div>
                    <div className="px-5">
                        <Link href="/">Eliminar Anime</Link>
                    </div>
                </div>

                <div className="flex flex-row justify-start items-end p-2 cursor-pointer hover:bg-neutral-300  duration-75 rounded-lg ">
                    <div >
                        <FaUser className="text-3xl" />
                    </div>
                    <div className="px-5">
                        <a href="/employe">Agregar Modelador</a>
                    </div>
                </div>


                <div className="flex flex-row justify-start items-end mt-56 p-2 cursor-pointer hover:bg-red-700 hover:text-white  duration-75 rounded-lg ">
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