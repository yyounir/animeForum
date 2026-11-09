import {useParams} from "react-router";
import {useEffect, useState} from "react";
import HeaderAlt from "../components/HeaderAlt.jsx";
import CardAlt from "../components/CardAlt.jsx";

export default function ViewAnime(){
  const {id} = useParams();
  const animeId = Number(id);
  const [animeContent, setAnimeContent] = useState([]);

  useEffect(() => {
    const query = `
      query ($id: Int!) {
        Media(id: $id, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            color
          }
          bannerImage
          description(asHtml: false)
          format
          status
          episodes
          duration
          genres
          averageScore
          popularity
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
          startDate {
            year
            month
            day
          }
        }
      }
    `;

    async function fetchAnime() {
      if (!Number.isSafeInteger(animeId) || animeId <= 0) {
        console.error(`Invalid anime ID: ${id}`);
        return;
      }

      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { id: animeId }
        })
      });

      const { data, errors } = await response.json();

      if (!response.ok || errors) {
        throw new Error(
          `AniList request failed with status ${response.status}: ${JSON.stringify(errors)}`
        );
      }

      console.log(data.Media);
      setAnimeContent(data.Media);
    }

    fetchAnime().catch((error) => console.error(error));
  }, [animeId, id]);


  return (
    <div className={`relative h-screen w-full overflow-hidden text-white bg-[${animeContent?.coverImage?.color}]}`}>
      <div
        style={{ backgroundImage: `url(${animeContent?.bannerImage})` }}
        className="absolute inset-0 bg-cover bg-center blur-md scale-105 pointer-events-none opacity-50 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"
      />

      <HeaderAlt back={"/explore"} title={animeContent?.title?.english} />

      <div className="absolute inset-0 z-10 overflow-y-auto overscroll-contain">
        <div className="flex my-30 mb-10 w-full justify-center items-center gap-8 p-6 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]">

          <img
            className="rounded-3xl shadow-2xl max-h-[70vh] object-cover"
            src={animeContent?.coverImage?.large}
            alt={animeContent?.title?.english || "Anime"}
          />

          <div className="space-y-2 drop-shadow-md">
            <h1 className="drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-4xl font-semibold text-black dark:text-white">{animeContent?.title?.english}</h1>
            <p className="drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-xl font-semibold text-black dark:text-white">{animeContent?.title?.romaji}</p>
            <p className="drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] text-xl font-bold text-black dark:text-white">{animeContent?.title?.native}</p>
            {/*<p className={"w-250 drop-shadow-[0_0_10px_rgba(0,0,0,1)]"}>{animeContent.description}</p>*/}

            <div className={"flex gap-1.5"}>
            {animeContent?.genres?.map((element, index) => (
              <p key={index} className={`drop-shadow-[0_0_10px_rgba(255,255,255,1)] transtion-all animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] select-none  items-center hover:scale-101 transition-all border-white/30 bg-white/20 backdrop-blur-xs border shadow-lg text-center hover:bg-white/35
               px-2.5 py-0.5 rounded-3xl text-black dark:text-white
               dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35`}>
                {element}
              </p>
            ))}
            </div>

          </div>
        </div>

        <div className={"flex justify-center items-center flex-wrap gap-5 pb-10"}>
          {animeContent.duration ?
            <CardAlt className={"w-50 p-5 text-black dark:text-white"}>
              <p className={"font-bold"}>Duration</p>
              <p>{animeContent.duration} minutes</p>
            </CardAlt> : ""
          }
          {animeContent.averageScore ?
            <CardAlt className={"w-50 p-5 text-black dark:text-white"}>
              <p className={"font-bold"}>Average Score</p>
              <p>{animeContent.averageScore}%</p>
            </CardAlt> : ""
          }
          {animeContent.episodes ?
            <CardAlt className={"w-50 p-5 text-black dark:text-white"}>
              <p className={"font-bold"}>Episodes</p>
              <p>{animeContent.episodes} episodes</p>
            </CardAlt> : ""
          }
          {animeContent.popularity ?
            <CardAlt className={"w-50 p-5 text-black dark:text-white"}>
              <p className={"font-bold"}>Popularity</p>
              <p>{animeContent.popularity} people</p>
            </CardAlt> : ""
          }
          {animeContent.startDate ?
            <CardAlt className={"w-50 p-5 text-black dark:text-white"}>
              <p className={"font-bold"}>Start Date</p>
              <p>{animeContent.startDate?.month}/{animeContent.startDate?.day}/{animeContent.startDate?.year}</p>
            </CardAlt> : ""
          }
          {animeContent.status ?
            <CardAlt className={"w-50 p-5 text-black dark:text-white"}>
              <p className={"font-bold"}>Status</p>
              <p>{animeContent.status}</p>
            </CardAlt> : ""
          }
        </div>
      </div>
    </div>
  )
}