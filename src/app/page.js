'use client'
import NavBarMenu from "@/components/custom/navbar/NavBarMenu";

export default function Home() {

  return (
    <>
      <div>
        <div>
          <div className="flex items-center justify-end mt-4 gap-6 cursor-pointer duration-75 rounded-lg">
            <NavBarMenu />
          </div>

        </div>
      </div>
    </>
  )
}
