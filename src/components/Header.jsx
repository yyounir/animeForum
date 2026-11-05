import { Ellipsis, LayoutGridCircles } from "lucide-react";

// import ButtonGroup from "./ButtonGroup";
import Button from "./Button.jsx";
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
        fixed top-0 left-0 z-10000 w-full">
            <div className="flex flex-row ml-5 w-[50%] gap-2 items-center ">
                {/* <img 
                    src="/logo.png" 
                    alt="Logo" 
                    width="300"               className="textglow font-semibold text-2xl textglow ml-1 dark:text-white"
                /> */}
                <p className="font-semibold text-2xl textglow ml-1 dark:text-white">{title}</p>
            </div>
            <div className="flex flex-row justify-end w-[50%] gap-2 mr-5">

                <Button onClick={openMenu} icon={Ellipsis} />
                {/* <ButtonGroup*/}
                {/*     onClick={openMenu}*/}
                {/*     icons={[{icon: LayoutGridCircles}, {icon: Ellipsis, action: openMenu}]}*/}
                {/* />*/}
            </div>
        </header>
    )
}