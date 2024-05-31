'use client'
import RouteProtected from "@/middleware/RouteProtected";
import NavBarModerator from "@/components/custom/navbar/NavBarModerator";


const moderator = () => {

    return (
        <RouteProtected>
            <>
                <div>
                    <div>
                        <div className="flex items-center justify-end mt-4 gap-6 cursor-pointer duration-75 rounded-lg">
                            <NavBarModerator />
                        </div>

                    </div>
                </div>
            </>
        </RouteProtected>
    )
}

export default moderator;