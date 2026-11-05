export default function ButtonGroup({ icons, onClick }) {
    return (
        <div className="flex gap-1 items-center justify-center hover:scale-104 active:bg-white/50 active:scale-109 rounded-4xl
        transition-all cursor-pointer 
        drop-shadow-[0_0_10px_rgba(255,255,255,1)] bg-white/20 hover:bg-white/35 backdrop-blur-xs border border-white/30 shadow-lg
        dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:active:bg-black/50
        ">
            {icons.map(({ icon: Icon, action }, index) => (
                <button
                    type="button"
                    onClick={action}
                    key={index}
                    className="px-3 py-3 cursor-pointer transition-all active:scale-113"
                >
                    <Icon />
                </button>
            ))}
        </div>
    )
}