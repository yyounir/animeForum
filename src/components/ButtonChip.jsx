export default function ButtonChip({children, className, primary}){
    return(
        <div
            className={`select-none cursor-pointer font-normal flex w-full gap-2.5 px-3 py-3 rounded-2xl transition-all hover:bg-black/10 active:bg-black/25 m-0 dark:hover:bg-white/10 dark:active:bg-white/25 ${primary ? "bg-black/5 dark:bg-white/5" : ""} ${className}`}
        >
            {children}
        </div>
    )
}