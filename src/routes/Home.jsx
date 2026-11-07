import anime1 from "../assets/Anime.png"

export default function Home(){
  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex justify-center mb-50"}>
      <div className={"flex flex-col text-7xl font-semibold mt-10 justify-center items-center"}>
        <div>
          <h1>Discover <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>Anime</span></h1>
          <h1>Make some <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>connections</span></h1>
          <p className={"text-xl"}>Ever wanted to watch anime for the first time? You've come to the perfect place!</p>
        </div>

        <img src={anime1} className={"w-150 mt-10"} />

        <div className={"mt-35"}>
          <h1>Gain <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>power levels</span></h1>
          <h1>Explore new <span className={"font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"}>Ninjutsu</span></h1>
          <p className={"text-xl mt-4"}>Check out the top 50 trending animes that people are watching now!</p>
        </div>
      </div>
    </div>
  )
}