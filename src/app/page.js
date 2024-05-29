'use client'
import SliderWelcome from "@/components/custom/sliders/SliderWelcome";
import NavBarMenu from "@/components/custom/navbar/NavBarMenu";
import Carousel from "@/components/custom/sliders/SliderWelcome";
import useStore from "@/hook/useSession.js";
import NavBarAdmin from "@/components/custom/navbar/NavBarAdmin";
export default function Home() {

  const {getUserData} = useStore()
  
  const role = getUserData();



  return (
    <div className="w-full">
      <div className="flex items-center justify-end mt-4 gap-6 duration-75 rounded-lg">
      {role === 'admin' ? <div className="w-full flex flex-col fixed top-0 left-0 right-0 z-50"><NavBarAdmin /> </div> :<div > <NavBarMenu/> </div> }
        <div className="flex justify-center items-center">
          <div className="flex-row pt-20 px-8">
            <div className="text-center text-2xl pb-4">Ultimos animes agregados</div>
            <Carousel className="cursor-pointer" />
          </div>

        </div>
      </div>
    </div>
  )
}


