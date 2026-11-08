import {Ellipsis, FormIcon, LayoutGridCircles, TelescopeIcon} from "lucide-react";
import Card from "../components/Card.jsx";
import {useState, useEffect} from "react";
import {Link} from "react-router";

export default function Explore(){

  const [animeList, setAnimeList] = useState([])

  const query = `
  query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        currentPage
      }
      media(type: ANIME, sort: $sort) {
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
  }
`;

  async function fetchExploreAnime(page = 1, sort = ['TRENDING_DESC']) {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { page, perPage: 50, sort }
      })
    });

    const { data } = await response.json();
    setAnimeList(data.Page.media);
    // console.log(data.Page.media)
  }

  useEffect(() => {
    fetchExploreAnime().catch((error) => (console.error(error)));
  }, []);


  return(
      <div className={"flex flex-col items-center select-none animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        <h1 className={"font-semibold dark:text-white text-4xl flex gap-2.5 my-4 "}><TelescopeIcon className={"size-10.5 "} />Explore</h1>

        <div className={"gap-5 flex justify-center items-center flex-wrap bg-red"}>
          {animeList.map((anime, index) => (
            <Link to={`/explore/${anime.id}`} key={index}>
              <Card className={`w-90`} image={anime.coverImage.large} title={anime.title.english} onClick={"o"}>
                <p className={"pb-5"}>{anime.startDate.year}</p>
              </Card>
            </Link>
          ))}
        </div>

      </div>
  )
}