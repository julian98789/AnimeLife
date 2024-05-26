'use client'
import Link from 'next/link';

const NavBarModerator = () => {


    return (
        <div>
            <div>
                <div className="flex items-center justify-end mt-3 gap-6 cursor-pointer duration-75 rounded-lg">
                    <div className="hover:bg-red-700 hover:text-white p-2 rounded-lg">
                        <Link href="/">
                            Animes
                        </Link>
                    </div>
                    <div className="hover:bg-red-700 hover:text-white p-2 rounded-lg">
                        <Link href="/moderator">
                            Moderadores
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBarModerator;
