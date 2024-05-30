'use client'
import RouteProtected from "@/middleware/RouteProtected";
import NavBarAdmin from "@/components/custom/navbar/NavBarAdmin";
const admin = () => {

    return (
        <RouteProtected>
            <>
                <div>
                    <div>
                        <div className="flex items-center justify-end mt-4 gap-6  duration-75 rounded-lg">
                            <NavBarAdmin />
                        </div>

                    </div>
                </div>
            </>
        </RouteProtected>
    )
}
export default admin;