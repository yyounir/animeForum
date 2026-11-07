import {Link} from "react-router";


export default function ButtonGroup({ icons, onClick }) {
    return (
        <div className="flex gap-1 items-center justify-center hover:scale-104 active:bg-white/50 active:scale-109 rounded-4xl
        transition-all
        drop-shadow-[0_0_10px_rgba(255,255,255,1)] bg-white/20 hover:bg-white/35 backdrop-blur-xs border border-white/30 shadow-lg
        dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:active:bg-black/50
        ">
            {icons.map(({ icon: Icon, action, text, to }, index) => (
                <Link to={to ? `/${to}` : null} key={index}>
                    <button
                        type="button"
                        onClick={action}
                        key={index}
                        className="px-3 py-3 cursor-pointer transition-all hover:scale-105 active:scale-110 flex cursor-pointer"
                    >
                        {Icon && <Icon/>}
                        {text && <span className={Icon ? (`ml-2`) : (`ml-0`)}>{text}</span>}
                    </button>
                </Link>
            ))}
        </div>
    )
}