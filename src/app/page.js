'use client'
import NavBarMenu from "@/components/custom/navbar/NavBarMenu";
import Carousel from "@/components/custom/sliders/SliderWelcome";
import NavBarAdmin from "@/components/custom/navbar/NavBarAdmin";
import { Macondo_Swash_Caps } from "next/font/google"

const Macon = Macondo_Swash_Caps({
  subsets: ['latin'],
  weight: '400',
})
export default function Home() {
  // Get user data from sessionStorage
  let userData;
  let role;
  if (typeof window !== 'undefined') {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    role = userData?.rol;
  }


  return (
    <>
      <div className="w-full">
        <div className="flex items-center  rounded-lg">
          {role === 'admin' ? <div 
          ><NavBarAdmin /> </div> : <div > <NavBarMenu /> </div>}
          <div className="flex justify-center items-center ">
            <div className=" flex justify-center items-start flex-col pt-20 ">
            <div className={`text-neutral-50 md:text-3xl text-2xl ml-5 md:ml-20  font-bold pb-4 ${Macon.className}`}>Los mejores animes de temporada</div>
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}