import {ArrowLeft, Ellipsis} from "lucide-react";
import Button from "./Button";
import {Link} from "react-router";
import ButtonGroup from "./ButtonGroup.jsx";


export default function HeaderAlt({openMenu, title, back}){

    return (
        <header className="py-3 flex flex-row
         items-center justify-start  backdrop-blur-3xl translate-z-0 will-change-[transform,backdrop-filter]
        fixed top-0 left-0 z-10000 w-full">

            <div className="flex flex-row ml-5 w-[50%] gap-2 items-center animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                {/* <img
                    src="/logo.png"
                    alt="Logo"
                    width="300"
                /> */}

                {/*<Link to={"/"}><Button icon={ArrowLeft} /></Link>*/}
                <ButtonGroup
                   onClick={openMenu}
                   icons={[{icon: ArrowLeft, to: back}]}
                />
                <p className="font-semibold text-2xl textglow ml-1  text-black dark:text-white mb-1 ">{title}</p>
            </div>
            <div className="flex flex-row justify-end w-[50%] gap-2 mr-5">
                {/* <input
                    type="text"
                    className="bg-white/20 focus:bg-white/50 backdrop-blur-md border border-white/30 shadow-lg rounded-4xl px-3 py-3 mr-5"
                    placeholder="Search a City in NY"
                    onChange={props.handleChange}
                /> */}
                {/*<Button onClick={openMenu} icon={Ellipsis} openingPosition="top-right" />*/}
                {/* <ButtonGroup icons={[LayoutGridCircles, Ellipsis]} /> */}
            </div>
        </header>
    )
}