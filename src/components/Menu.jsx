import { useState } from "react";

export default function Menu({menuOptions, openMenu, openingPosition, isOpen, onCloseComplete, size = 2 }) {
    const [hasIcon, sethasIcon] = useState(false)

    const originClass = {
        top: 'origin-top',
        'top-right': 'origin-top-right',
        'top-left': 'origin-top-left',
        }[openingPosition] ?? 'origin-center';

    // for(let i = 0; i < menuOptions.length; ++i){
    //     if(menuOptions[i].icon){
    //         sethasIcon(true);
    //         break;
    //     }
    // }

    return (
        <div className="opacity-100 fixed flex justify-end h-full w-full cursor-default z-[10000000] pt-15 pb-[200px] px-5 py-[25px] left-0 top-0" onClick={openMenu}>
            <div
                onAnimationEnd={(event) => {
                    if (!isOpen && event.animationName === 'fadeOut') {
                        onCloseComplete();
                    }
                }}
                className={`flex flex-col w-45 min-w-fit h-fit ${originClass}
            ${isOpen
                ? 'animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]'
                : 'animate-[fadeOut_0.08s_ease-in_forwards]'}
            hover:scale-102 transition-all drop-shadow-[0_0_10px_rgba(255,255,255,1)]
                bg-white/20 hover:bg-white/35 backdrop-blur-xs border
                border-white/30 shadow-lg rounded-3xl p-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain
                dark:border-white/10 dark:hover:bg-black/25 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]`}>

                {
                    menuOptions.map((element, index) => {
                        const Icon = element.icon;                       

                        return (
                        <a key={index} onClick={element.onClick} href={element.link} className={`select-none cursor-pointer flex gap-2.5 px-3 py-2 rounded-2xl transition-all hover:bg-black/10 active:bg-black/25 m-0 dark:hover:bg-white/10 dark:active:bg-white/25`}>
                            {element.icon ? <Icon /> : (<p className="w-0"></p>) }
                            <p key={index} className="text-lg -mt-0.5">{element.option}</p>
                        </a>)
                    })
                }
                
            </div>
        </div>
    )
}