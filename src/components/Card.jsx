export default function Card({children, title, className, image}){
  return (
    <div className={` drop-shadow-[0_0_10px_rgba(255,255,255,1)] rounded-4xl p-3 py-5 transtion-all animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] select-none flex flex-col items-center hover:scale-101 transition-all border-white/30 bg-white/20 backdrop-blur-xs border shadow-lg text-center hover:bg-white/25 dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/25 ${className}`}>
      <img src={image} className={"rounded-4xl"} />
      <h2 className={"text-2xl"}>{title}</h2>
      {children}
    </div>
  )
}