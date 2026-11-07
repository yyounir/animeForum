import {FormIcon, PlusIcon} from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";

export default function Forum(){
  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex flex-col justify-center items-center select-none text-center"}>
      <h1 className={"font-semibold dark:text-white text-4xl flex gap-2.5 my-4 "}><FormIcon className={"size-10.5 "} />Forum</h1>

      <Button icon={PlusIcon} value={"Create Post"}/>

      <div className={"mt-5"}>
        <Input placeholder = "Search a Post..." className={"my-3 w-full"}/>

        <Card title={"Meow"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQ3M7V45Gb1ddYlpJOSoGto1yTBfImfwrgZjIxwOnF4RnDUGAb8WfgpowKDiU3WpdfrSmaNB9d_RpeGKNBUU5rUS71ukdXOMAt19SMA&s=10"} >
          I like cats
        </Card>
        <Card title={"Meow"} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQ3M7V45Gb1ddYlpJOSoGto1yTBfImfwrgZjIxwOnF4RnDUGAb8WfgpowKDiU3WpdfrSmaNB9d_RpeGKNBUU5rUS71ukdXOMAt19SMA&s=10"} >
          I like cats
        </Card>
      </div>
    </div>
  )
}