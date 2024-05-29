'use client'
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import Link from 'next/link'
import { Macondo_Swash_Caps } from "next/font/google"


const Macon = Macondo_Swash_Caps({
    subsets: ['latin'],
    weight: '400',
})

const Menu = () => {


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
                        <Link href="/">Inicio</Link>
                    </div>
                </div>

                <div className="flex flex-row justify-start items-end mt-72 p-2 cursor-pointer hover:bg-blue-700 hover:text-white  duration-75 rounded-lg ">
                    <div >
                        <HiMiniArrowRightStartOnRectangle className="text-3xl" />
                    </div>
                    <div className="px-5">
                        <Link href="/login">Iniciar Sesion</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu