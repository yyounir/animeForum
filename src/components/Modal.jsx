export default function Modal({title, message, actions, options, input, isOpen = true, onCloseComplete}){
    return (
        <div 
            onAnimationEnd={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isOpen &&
                    event.animationName === 'fadeOut'
                ) {
                    onCloseComplete?.();
                }
            }}
            className={`fixed inset-0 z-10002 flex items-center justify-center backdrop-blur-md p-4
                ${isOpen
                    ? 'animate-[fadeIn_0.1s_ease-out_forwards]'
                    : 'animate-[fadeOut_0.1s_ease-in_forwards]'}`}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`flex flex-col w-45 min-w-60 h-fit
                ${isOpen
                    ? 'animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]'
                    : 'animate-[fadeOut_0.1s_ease-in_forwards]'}
                hover:scale-101 transition-all drop-shadow-[0_0_10px_rgba(255,255,255,1)] backdrop-blur-xs border
                     shadow-lg rounded-3xl p-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain p-5 
                    hover:bg-white/25 bg-white/20 border-white/30
                    dark:border-white/10 dark:hover:bg-black/25 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]`}>
                {title && <h1 className="text-2xl mb-2.5">
                    {title || "Title"}
                </h1>}
                
                <div className="mb-5">
                    {message.map((text, index) => (
                        <p key={index} className="max-w-[500px] mb-1">
                            {text || "Sample message goes here! Sample message goes here! Sample message goes here! Sample message goes here!"}
                        </p>
                    ))}
                </div>
                

                {input && <div className="mb-5">
                    <input type="text" placeholder="Enter text" className="bg-white/20 w-full p-3 rounded-2xl text-lg" />
                </div>}

                {options && options.map((option, index) => (
                (<div className="mb-5">
                    <a key={index} onClick={option.onClick} className={`select-none cursor-pointer flex w-full gap-2.5 px-3 py-3 rounded-2xl transition-all hover:bg-black/10 active:bg-black/25 dark:hover:bg-white/10 dark:active:bg-white/25 m-0 justify-center font-semibold`}>
                        <p className="text-lg -mt-0.5">option.text</p>
                    </a>
                </div>)))
                }

                {actions && actions.map((action, index) => (
                    <div className="flex flex-row justify-evenly gap-2" key={index}>
                        {action.secondary && 
                            <a 
                                onClick={action.secondaryOnClick}
                                className={`bg-black/5 select-none cursor-pointer flex w-full gap-2.5 px-3 py-3 rounded-2xl transition-all hover:bg-black/10 active:bg-black/25 m-0 justify-center font-semibold dark:bg-white/5 dark:hover:bg-white/10 dark:active:bg-white/25`}
                            >
                                <p className="text-lg -mt-0.5">{action.secondary}</p>
                            </a>
                        }
                        {
                            action.primary && 
                            
                            <a 
                                onClick={action.primaryOnClick}
                                className={`bg-black/5 select-none cursor-pointer flex w-full gap-2.5 px-3 py-3 rounded-2xl transition-all hover:bg-black/10 active:bg-black/25 m-0 justify-center font-semibold dark:bg-white/5 dark:hover:bg-white/10 dark:active:bg-white/25`}
                            >
                                <p className="text-lg -mt-0.5">{action.primary}</p>
                            </a>
                        }
                    </div>
                    ))
                }
            </div>
        </div>
    )
}