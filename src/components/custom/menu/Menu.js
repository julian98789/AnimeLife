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
        <div className="w-full h-screen mt-5 text-neutral-800">
            <div className="flex justify-center">
                <div className="flex-col">
                    <img className="w-[120px] h-[120px]" src="/demonio.png" alt="AnimeLife" />
                    <div className={` text-red-600 text-center text-3xl font-bold ${Macon.className}`}>
                        <span className="w-2">AnimeLife</span>
                    </div>
                </div>
            </div>
            <div>
                <a href="/">
                    <div className="flex flex-row justify-start items-end p-2 mt-4 cursor-pointer hover:bg-neutral-300  duration-75 rounded-lg ">
                        <div  >
                            <FaHome className="text-3xl " />
                        </div>
                        <div className="px-5">
                            Inicio
                        </div>
                    </div>
                </a>

                <div className="flex flex-row justify-start items-end mt-64 p-2 cursor-pointer hover:bg-green-600 hover:text-white  duration-75 rounded-lg ">
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