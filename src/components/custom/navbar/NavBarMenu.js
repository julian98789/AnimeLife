'use client'
import Image from "next/image"
import { RiMenu3Line } from "react-icons/ri";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Menu from "../menu/Menu";
import { Macondo_Swash_Caps } from "next/font/google"
const Macon = Macondo_Swash_Caps({
    subsets: ['latin'],
    weight: '400',
})
const NavBarMenu = () => {

    return (

        <Sheet>

            <div className="w-full h-[60px] fixed top-0 left-0 bg-black flex flex-row justify-between items-center text-neutral-50 px-5 z-10">
                <div className="w-[60px] h-[60px]">
                    <a href="/">
                        <Image src='/demonio.png' width={60} height={60} alt="" />
                    </a>
                </div>
                <div className={` text-red-600 text-4xl font-medium ${Macon.className}`}>
                    <span className="w-2">AnimeLife</span>
                </div>

                <SheetTrigger>
                    <RiMenu3Line className="text-3xl cursor-pointer hover:text-neutral-500 " />
                </SheetTrigger>
            </div>

            <SheetContent>
                <Menu />
            </SheetContent>
        </Sheet>


    )
}
export default NavBarMenu