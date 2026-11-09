import HeaderAlt from "../components/HeaderAlt.jsx";
import {useParams} from "react-router";

import {supabase} from "../client.js";
import {useState, useEffect} from "react";
import Spinner from "../components/Spinner.jsx";

export default function ViewPost(){
  const [posts, setPosts] = useState([]);
  const {id} = useParams();

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const {data} = await supabase.from("Forum").select().eq("id", id);
        await sleep(1500);
        if(data){
          console.log(data);
          setPosts(data);
          console.log(data[0].title)
          setIsLoading(false);
        }
      }
      catch(error){
        console.log("Failed to fetch at", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <HeaderAlt back={"/forum"} title={"Post"}/>

      <div className={"flex flex-col justify-center items-center mt-20 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        {/*<p>I like cats</p>*/}
        {isLoading ?
          <Spinner size={"sm"} text={"Fetching Post..."}/> :

          <div className={"min-h-[90vh]"}>
            <div className={"flex flex-col justify-start items-center text-center  w-fit h-fit drop-shadow-[0_0_10px_rgba(255,255,255,1)] rounded-4xl p-10 transtion-all animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] select-none hover:scale-101 transition-all border-white/30 bg-white/20 backdrop-blur-xs border shadow-lg hover:bg-white/35 dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35"}>
              <img src={posts[0].image_url} className={"h-90 w-auto rounded-3xl mb-5"} />
              <h2 className={"text-3xl font-bold"}>{posts[0].title}</h2>
              <p className={"text-lg"}>{posts[0].content}</p>
            </div>
          </div>
        }

      </div>
    </div>
  )
}