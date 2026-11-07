import anime1 from "../assets/Anime.png"

export default function Home(){
  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex justify-center"}>
      <div className={"flex flex-col text-7xl font-semibold mt-10 justify-center items-center"}>
        <div>
          <h1>Discover <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>Anime</span></h1>
          <h1>Make some <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>connections</span></h1>
          <p className={"text-xl"}>Ever wanted to watch anime for the first time? You've come to the perfect place!</p>
        </div>

        <img src={anime1} className={"w-150 mt-10"} />

        <div className={"mt-25"}>
          <h1>Discover <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>Anime</span></h1>
          <h1>Make some <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>connections</span></h1>
          <p className={"text-xl"}>Ever wanted to watch anime for the first time? You've come to the perfect place!</p>
        </div>
      </div>
    </div>
  )
}