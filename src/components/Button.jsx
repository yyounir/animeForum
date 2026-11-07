

export default function Button({icon : Icon, rightIcon : RightIcon, value, onClick, type = "button", className}) {
    return (
        <button type={type} onClick={onClick} className={`flex gap-2 items-center justify-center hover:scale-104 active:scale-109 transition-all
          drop-shadow-[0_0_10px_rgba(255,255,255,1)]
          cursor-pointer  rounded-4xl px-3 py-3
          border-white/30 bg-white/20 backdrop-blur-xs border shadow-lg hover:bg-white/35 active:bg-white/50
          dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:active:bg-black/50
          ${className}`}
        >
            {/* <span>{props.value}</span> */}
            {Icon && <Icon />}
            {value && <p className="font-semibold">{value}</p>}
            {RightIcon && <RightIcon />}
        </button>
    )
}