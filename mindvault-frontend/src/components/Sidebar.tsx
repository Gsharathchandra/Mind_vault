import { TwitterIcon } from "../icons/TwitterIcon";
import { SideBarItem } from "./Sidebaritem";
import { YouTubeIcon } from "../icons/YouTubeIcon";
import { Logo } from "../icons/Logo";

export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 ">
        <div className="flex text-2xl pt-4 items-center">
            <div className="p-4">
                <Logo/>
            </div>
            MindVault
        </div>
        <div className="pt- 8 pl-4"> 
            <SideBarItem text="Twitter" icon={<TwitterIcon/>}></SideBarItem>
            <SideBarItem text="Youtube" icon={<YouTubeIcon/>}></SideBarItem>
        </div>
    </div>
} 