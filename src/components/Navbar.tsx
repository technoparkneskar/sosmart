import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Navbar() {
    return (<>
        <div className="h-[4rem]"></div>
        <nav className="fixed text-[#A9CA89] bottom-0 z-10 w-full bg-[#2B2D32] rounded-t-[2.5rem] py-2 px-8">
            <div className="flex justify-center items-center w-[75%] m-auto">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col justify-center items-center text-center">
                        <FontAwesomeIcon size="2x" icon={faHouse}/>
                        <p className="text-sm">Beranda</p>
                    </div>
                    <div className="rounded-2xl text-[#AB5200] bg-[#F1C17A] px-4 py-3">
                        <FontAwesomeIcon size="2x" icon={faPlus}/>
                    </div>
                    <div className="flex flex-col text-[#807E7E] justify-center items-center text-center">
                        <FontAwesomeIcon size="2x" icon={faUser}/>
                        <p className="text-sm">Profile</p>
                    </div>
                </div>
            </div>
        </nav>
    </>)
}
