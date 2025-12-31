import { TwitterIcon } from "../icons/TwitterIcon";
import { SideBarItem } from "./Sidebaritem";
import { YouTubeIcon } from "../icons/YouTubeIcon";
import { Logo } from "../icons/Logo";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 flex flex-col justify-between pb-8">
        <div>
            <div className="flex text-2xl pt-4 items-center">
                <div className="p-4">
                    <Logo />
                </div>
                MindVault
            </div>
            <div className="pt-8 pl-4">
                <SideBarItem text="Twitter" icon={<TwitterIcon />}></SideBarItem>
                <SideBarItem text="Youtube" icon={<YouTubeIcon />}></SideBarItem>
            </div>
        </div>
        <div className="pl-4 cursor-pointer" onClick={handleLogout}>
            <SideBarItem text="Logout" icon={<LogoutIcon />} />
        </div>
    </div>
} 