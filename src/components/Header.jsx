import {Ellipsis, FormIcon, LayoutGridCircles, TelescopeIcon} from "lucide-react";

import ButtonGroup from "./ButtonGroup";
import Button from "./Button.jsx";
import {Link} from "react-router";
// import { useState } from "react";

export default function Header({openMenu, title, openAboutProject}){

    // const [menuOptions, setMenuOptions] = useState([
    //     {
    //         id: 1,
    //         icon: Info,
    //         option: "About Me",
    //     },
    // ])

    return (
        <header className="py-3 flex flex-row
         items-center justify-start
        fixed top-0 left-0 z-10000 w-full select-none">



            <div className="flex flex-row ml-5 w-[50%] gap-2 items-center ">



              <Link to={"/"}>
                <img
                    src="/logo.png"
                    alt="Logo"
                    width="300"
                    className="hover:scale-101 active:scale-103 transition-all textglow font-semibold text-2xl textglow ml-1 dark:text-white drop-shadow-2xl animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"/>
              </Link>
                {/*<p className="font-semibold text-2xl textglow ml-1 dark:text-white">{title}</p>*/}
            </div>
            <div className="flex flex-row justify-end w-[50%] gap-2 mr-5  animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <ButtonGroup
                     onClick={openMenu}
                     icons={[{icon: TelescopeIcon, text:"Explore", to:"/explore"}, {icon: FormIcon, text:"Forum", to:"/forum"}]}
                 />
                {/*<Button onClick={openMenu} icon={Ellipsis} />*/}
                 <ButtonGroup
                     onClick={openMenu}
                     icons={[{icon: Ellipsis, action: openMenu}]}
                 />
            </div>
        </header>
    )
}