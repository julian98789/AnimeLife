'use client'
import RouteProtected from "@/middleware/RouteProtected";
import useSession from "@/hook/useSession";
import { useState } from "react";
import NavBarAdmin from "@/components/navbar/NavBarAdmin";
const admin = () => {
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
                        <div className="flex items-center justify-end mt-4 gap-6 cursor-pointer duration-75 rounded-lg">
                        <NavBarAdmin />
                            <div className="pr-5">
                                <button
                                    onClick={session}
                                    className="hover:bg-red-700 hover:text-white p-2 mt-3 rounded-lg"
                                >
                                    Cerrar sesión
                                </button>
                                {cerrarSession}
                            </div>
                            
                        </div>

                    </div>
                </div>
            </>
        </RouteProtected>
    )
}
export default admin;