import anime1 from "../assets/Anime.png"
import anime2 from "../assets/Anime1.png"
import Button from "../components/Button.jsx";
import {ArrowRightIcon} from "lucide-react";

export default function Home(){
  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex justify-center mb-50"}>
      <div className={"flex flex-col font-semibold mt-10 justify-center items-center"}>
        <div>
          <h1 className={"text-7xl"}>Discover <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>anime</span></h1>
          <h1 className={"text-7xl"}>Make some <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>connections</span></h1>
          <p className={"text-xl"}>Ever wanted to watch anime for the first time? You've come to the perfect place!</p>
          <p className={"text-lg"}>At AnimeCorner, we're always providing the best entertainment for you to find your next favorite anime!</p>
        </div>

        <img src={anime1} className={"w-150 mt-10"} />

        <div className={"mt-35"}>
          <h1 className={"text-7xl"}>Gain <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>power levels</span></h1>
          <h1 className={"text-7xl"}>Explore new <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>ninjutsu</span></h1>
          <p className={"text-xl mt-4"}>Check out the top 50 trending animes that people are watching now!</p>
          <div className={"text-md mt-3"}><Button value={"Explore"} rightIcon={ArrowRightIcon} /></div>
        </div>
        <img src={anime2} className={"w-350 mt-10 m-5"} />
      </div>
    </div>
  )
}