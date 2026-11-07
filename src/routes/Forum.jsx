import {FormIcon, PlusIcon} from "lucide-react";
import Button from "../components/Button.jsx";

export default function Forum(){
  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex flex-col justify-center items-center select-none text-center"}>
      <h1 className={"font-semibold dark:text-white text-4xl flex gap-2.5 my-4 "}><FormIcon className={"size-10.5 "} />Forum</h1>

      <Button icon={PlusIcon} value={"Create Post"}/>

      <div>

      </div>
    </div>
  )
}