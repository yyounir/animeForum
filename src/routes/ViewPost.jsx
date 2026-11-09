import HeaderAlt from "../components/HeaderAlt.jsx";
import {useParams} from "react-router";

export default function ViewPost(){

  const id = useParams()

  return (
    <div>
      <HeaderAlt back={"/forum"} title={"Post"}/>

      <div className={"mt-20 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        <p>I like cats</p>
      </div>
    </div>
  )
}