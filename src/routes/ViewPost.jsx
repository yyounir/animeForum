import HeaderAlt from "../components/HeaderAlt.jsx";
import {useParams} from "react-router";

import {supabase} from "../client.js";
import {useState, useEffect} from "react";

export default function ViewPost(){
  const [posts, setPosts] = useState([]);
  const id = useParams();

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const {data} = await supabase.from("Forum").select().eq("id", id);
        setPosts(data)
        console.log(data)
      }
      catch(error){
        console.log("Failed to fetch at", error);
      }

      fetchPosts();
    }

  }, []);

  return (
    <div>
      <HeaderAlt back={"/forum"} title={"Post"}/>

      <div className={"mt-20 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        <p>I like cats</p>
      </div>
    </div>
  )
}