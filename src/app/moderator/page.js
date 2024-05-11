'use client'
import RouteProtected from "@/middleware/RouteProtected";
import useSession from "@/hook/useSession";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";


const moderator = () => {
    const { logout } = useSession();
    const [cerrarSession, setCerrarSession] = useState(false);

    const session = () => {
        setCerrarSession(true);
    };

    if (cerrarSession) {
        logout();
        // window.location.href = '/login';

    }


    return (
        <RouteProtected>
            <>
                <div>
                    <div>
                        <div>
                            <h1>Moderator Page</h1>
                        </div>
                        <div className="flex flex-row justify-start items-end mt-[360px] p-2 cursor-pointer hover:bg-red-700 hover:text-white  duration-75 rounded-lg ">
                            <div >
                                <AiOutlineCloseCircle className="text-3xl" />
                            </div>
                            <div className="px-5">
                                <button onClick={session}>Cerrar sesion</button>
                            </div>
                            {cerrarSession}
                        </div>
                    </div>
                </div>
            </>
        </RouteProtected>
    )
}

export default moderator;