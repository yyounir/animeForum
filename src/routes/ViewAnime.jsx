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
    <div className="relative h-screen w-full overflow-hidden text-white bg-slate-900">
      <div
        style={{ backgroundImage: `url(${animeContent?.coverImage?.large})` }}
        className="absolute inset-0 bg-cover bg-center blur-md scale-105 pointer-events-none opacity-50 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"
      />

      <HeaderAlt title={animeContent?.title?.english} />


      <div className="relative z-10 flex my-30 mb-10 w-full justify-center items-center gap-8 p-6 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]">

        <img
          className="rounded-3xl shadow-2xl max-h-[70vh] object-cover"
          src={animeContent?.coverImage?.large}
          alt={animeContent?.title?.english || "Anime"}
        />

        <div className="space-y-2 drop-shadow-md">
          <h1 className="text-4xl font-semibold">{animeContent?.title?.english}</h1>
          <p className="text-xl font-semibold text-gray-200">{animeContent?.title?.romaji}</p>
          <p className="text-xl font-bold text-gray-300">{animeContent?.title?.native}</p>
        </div>

      </div>
      <CardAlt>
        I like cats
      </CardAlt>
    </div>
  )
}