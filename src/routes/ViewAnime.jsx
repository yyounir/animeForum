import {useParams} from "react-router";
import {useEffect} from "react";

export default function ViewAnime(){
  const id = useParams();

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
        variables: { page, perPage: 20, sort }
      })
    });

    const { data } = await response.json();
    setAnimeList(data.Page.media);
    console.log(data.Page.media)
  }

  useEffect(() => {
    fetchExploreAnime().catch((error) => (console.error(error)));
  }, []);

  return (
  <div>
    I like cats
  </div>
  )
}