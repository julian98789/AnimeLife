'use client'
import Image from "next/image"
import { RiMenu3Line } from "react-icons/ri";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import MenuAdmin from "../menu/MenuAdmin";
import { Macondo_Swash_Caps } from "next/font/google"


const Macon = Macondo_Swash_Caps({
    subsets: ['latin'],
    weight: '400',
})

const NavBarAdmin = () => {

    return (

        <Sheet>

            <div className="w-full h-[60px] fixed top-0 left-0 bg-neutral-900 flex flex-row justify-between items-center text-neutral-50 px-5 cursor-default">
                <div className="w-[60px] h-[60px]">
                    <Image src='/anime.png' width={60} height={60} alt="" />
                </div>
                <div className={` text-emerald-300 text-4xl font-medium ${Macon.className}`}>
                    <span className="w-2">AnimeLife</span>
                </div>
                <SheetTrigger>
                    <RiMenu3Line className="text-3xl  hover:text-neutral-500  duration-75" />
                </SheetTrigger>
            </div>

            <SheetContent>
                <MenuAdmin />
            </SheetContent>
        </Sheet>


    )
}
export default NavBarAdmin