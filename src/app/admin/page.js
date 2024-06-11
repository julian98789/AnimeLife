'use client'
import RouteProtected from "@/middleware/RouteProtected";
import NavBarAdmin from "@/components/custom/navbar/NavBarAdmin";
const admin = () => {

    return (
        <RouteProtected>
            <>
                <div>
                    <div>
                        <div >
                            <NavBarAdmin />
                        </div>

                    </div>
                </div>
            </>
        </RouteProtected>
    )
}
export default admin;