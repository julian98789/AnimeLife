import AnimeInstance from "@/components/custom/animeinstance/AnimeInstance";
import NavBarMenu from "@/components/custom/navbar/NavBarMenu";
import NavBarAdmin from "@/components/custom/navbar/NavBarAdmin";

const descriptionAnime = () => {
    let userData;
    let role;
    if (typeof window !== 'undefined') {
        userData = JSON.parse(sessionStorage.getItem('userData'));
        role = userData?.rol;
    }

    return (
        <>
            <div className="w-full h-screen ">
                <div className="flex items-center duration-75 rounded-lg">
                    {role === 'admin' ? <div className="w-full flex flex-col fixed top-0 left-0 right-0 z-50"><NavBarAdmin /> </div> : <div > <NavBarMenu /> </div>}
                    <div className="w-full flex justify-center items-center">
                        <div className=" pt-16 w-full">
                            <AnimeInstance className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default descriptionAnime;