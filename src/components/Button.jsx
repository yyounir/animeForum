

export default function Button({icon : Icon, rightIcon : RightIcon, value, onClick, type = "button", className, primary=false}) {
    return (
        <button type={type} onClick={onClick} className={`flex gap-2 items-center justify-center hover:scale-104 active:scale-109 transition-all
          
          cursor-pointer  rounded-4xl px-3 py-3 backdrop-blur-xs border shadow-lg drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]
          ${primary ? 
          "border-white/10 bg-black/80 text-white hover:bg-black/50 active:bg-black/35 dark:border-white/10 dark:bg-white/80 dark:text-black dark:hover:bg-white/50 dark:active:bg-white/35 " : 
          "drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] border-white/30 bg-white/20 hover:bg-white/35 active:bg-white/50 dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-black/35 dark:active:bg-black/50"}
          
          ${className}`}
        >
            {/* <span>{props.value}</span> */}
            {Icon && <Icon />}
            {value && <p className="font-semibold">{value}</p>}
            {RightIcon && <RightIcon />}
        </button>
    )
}

// border-white/10 bg-black/20 text-white drop-shadow-[0_0_10px_rgba(0,0,0,1)] hover:bg-black/35 active:bg-black/50