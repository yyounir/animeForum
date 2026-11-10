export default function Card({children, title, className, image, onClick, classNameImg}){
  return (
    <div className={`drop-shadow-[0_0_10px_rgba(255,255,255,1)] rounded-4xl p-3 transtion-all animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] select-none flex flex-col items-center hover:scale-101 transition-all border-white/30 bg-white/20 backdrop-blur-xs border shadow-lg text-center hover:bg-white/35 dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 ${className} ${onClick ? "cursor-pointer active:scale-103 active:bg-white/50 dark:active:bg-black/50" : ""} `}>
      {image &&
        <img src={image}
            className={`rounded-3xl w-[400px] h-[300px] object-cover object-center ${classNameImg}`}/>}
      {title && <h2 className={"text-2xl pt-5"}>{title}</h2>}
      {children}
    </div>
  )
}