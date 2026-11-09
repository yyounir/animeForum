import HeaderAlt from "../components/HeaderAlt.jsx";

export default function ViewPost(){
  return (
    <div>
      <HeaderAlt back={"/forum"} title={"Post"}/>

      <div className={"animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        <p>I like cats</p>
      </div>
    </div>
  )
}