import anime1 from "../assets/Anime.png";
import anime2 from "../assets/Anime1.png";
import anime3 from "../assets/Anime2.png";
import Button from "../components/Button.jsx";
import {ArrowRightIcon} from "lucide-react";
import {Link} from "react-router";

export default function Home(){
  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex justify-center mb-50"}>
      <div className={"flex flex-col font-semibold mt-10 justify-center items-center"}>
        <div>
          <h1 className={"text-7xl dark:text-white"}>Discover <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 dark:to-yellow-500"}>anime</span></h1>
          <h1 className={"text-7xl dark:text-white"}>Make some <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 dark:to-yellow-500"}>connections</span></h1>
          <p className={"text-xl dark:text-white"}>Ever wanted to watch anime for the first time? You've come to the perfect place!</p>
          <p className={"text-lg dark:text-white"}>At AnimeCorner, we're always providing the best entertainment for you to find your next favorite anime!</p>
        </div>

        <img src={anime1} className={"w-150 mt-10"} />

        <div className={"mt-35"}>
          <h1 className={"text-7xl dark:text-white"}>Gain <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 dark:to-yellow-500"}>power levels</span></h1>
          <h1 className={"text-7xl dark:text-white"}>Explore new <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 dark:to-yellow-500"}>ninjutsu</span></h1>
          <p className={"text-xl mt-4 dark:text-white"}>Check out the top 50 trending animes that people are watching now!</p>
          <Link to={"/explore"}><div className={"text-md mt-3"}><Button value={"Explore"} primary={true} className={"drop-shadow-none dark:drop-shadow-none"} rightIcon={ArrowRightIcon} /></div></Link>
        </div>
        <img src={anime2} className={"w-350 mt-10 m-5"} />

        <div className={"mt-35"}>
          <h1 className={"text-7xl dark:text-white"}>Join the <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 dark:to-yellow-500"}>crew</span></h1>
          <h1 className={"text-7xl dark:text-white"}>In finding <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 dark:to-yellow-500"}>the greatest treasure!</span></h1>
          <p className={"text-xl mt-4 dark:text-white"}>Check out the forum to see what other people think about the anime they watched!</p>
          <Link to={"/forum"}><div className={"text-md mt-3"}><Button value={"Head to the Forum"} primary={true} className={"drop-shadow-none dark:drop-shadow-none"} rightIcon={ArrowRightIcon} /></div></Link>
        </div>
        <img src={anime3} className={"w-350 mt-10 m-5"} />
      </div>
    </div>
  )
}