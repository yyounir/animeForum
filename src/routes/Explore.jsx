import {Ellipsis, FormIcon, LayoutGridCircles, TelescopeIcon} from "lucide-react";

export default function Explore(){
  return(
      <div className={"flex flex-col items-center select-none animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        <h1 className={"font-semibold dark:text-white text-4xl flex gap-2.5"}><TelescopeIcon className={"size-10.5"} />Explore</h1>



      </div>
  )
}