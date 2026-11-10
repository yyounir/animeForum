import HeaderAlt from "../components/HeaderAlt.jsx";
import {useParams} from "react-router";

import {supabase} from "../client.js";
import {useState, useEffect} from "react";
import Spinner from "../components/Spinner.jsx";
import Button from "../components/Button.jsx";
import {PencilIcon, SendHorizonalIcon, ThumbsUpIcon, TrashIcon} from "lucide-react";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import ButtonChip from "../components/ButtonChip.jsx";
import Modal from "../components/Modal.jsx";

export default function ViewPost(){
  const [posts, setPosts] = useState([]);
  const {id} = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const {data, error} = await supabase.from("Forum").select().eq("id", id);
        if(error) {
          console.error("Failed to fetch post:", error);
          return;
        }
        setPosts(data ?? []);
      }
      catch(error){
        console.error("Failed to fetch at", error);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchPosts();
  }, [id]);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalMounted, setIsModalMounted] = useState(false)
  const [modalTitle, setModalTile] = useState("")
  const [modalText, setModalText] = useState([" "])
  const [modalActions, setModalActions] = useState([])

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // Update Posts
  const [idToEdit, setIdToEdit] = useState(-1);

  const openEditPost = (post) => {
    setIdToEdit(post.id);
    setPostTitle(post.title ?? "");
    setPostContent(post.content ?? "");
    setPostImageUrl(post.image_url ?? "");
    setErrorMessage("");
    setModalTile("Edit Post");
    setModalText([" "])
    setIsModalMounted(true)
    setIsModalOpen(true)
    setIsEditingPost(false);
    setModalActions([{
      primary: null,
      secondary: "Cancel",
      primaryOnClick: () => setIsModalOpen(false),
      secondaryOnClick: () => setIsModalOpen(false),
    }])
  }



  const [isEditingPost, setIsEditingPost] = useState(false);

  const handleTitleChange = (event) => setPostTitle(event.target.value);
  const handleContentChange = (event) => setPostContent(event.target.value);
  const handleImageUrlChange = (event) => setPostImageUrl(event.target.value);

  const editPost = async(event) => {
    event.preventDefault();
    if(isEditingPost) return;
    setIsEditingPost(true);
    setErrorMessage("");

    try {
      const {data, error} = await supabase
        .from("Forum")
        .update({title: postTitle, content: postContent, image_url: postImageUrl})
        .eq("id", idToEdit)
        .select()
        .single();

      if(error) {
        setErrorMessage(error.message);
        return;
      }
      setPosts([data]);
      setIsModalOpen(false);
    } catch(error) {
      console.error("Failed to update post:", error);
      setErrorMessage(error.message || "Failed to update post. Please try again.");
    } finally {
      setIsEditingPost(false);
    }
  }


  return (
    <div>
      <HeaderAlt back={"/forum"} title={"Post"}/>

      <div className={"flex flex-col justify-center items-center mt-20 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)_forwards]"}>
        {/*<p>I like cats</p>*/}
        {isModalMounted && (
          <Modal
            title={modalTitle}
            message={modalText}
            isOpen={isModalOpen}
            onCloseComplete={() => setIsModalMounted(false)}
            actions={modalActions}
            className={"w-100"}
          >
            {modalTitle === "Edit Post" &&
              <form onSubmit={editPost} className={"mb-5 flex flex-col"}>

                <label className={"ml-2"} htmlFor={"PostTitle"}>Title</label>
                <Input id={"PostTitle"} placeholder={"Enter a new title"} value={postTitle} className={""} required={true} onChange={handleTitleChange}
                       name={"title"}/>

                <label className={"ml-2"} htmlFor={"PostContent"}>Content</label>
                <textarea placeholder={"Edit the post's content"} className={`bg - white / 20 drop-shadow-[0_0_10px_rgba(255,255,255,1)] border border-white/30 shadow-lg hover:bg-white/35 focus:bg-white/50 backdrop-blur-md transition-all hover:scale-101 focus:scale-102 rounded-3xl px-3 py-3
                    dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:focus:bg-black/50 `}
                          id={"PostContent"} onChange={handleContentChange} name={"content"} value={postContent}
                />

                <label className={"ml-2"} htmlFor={"PostImageUrl"}>Image URL</label>
                <Input id={"PostImageUrl"} placeholder={"Edit Image URL"} value={postImageUrl} className={""} required={false} onChange={handleImageUrlChange}
                       name={"image_url"}/>

                {errorMessage && <p role={"alert"} className={"mt-3 text-red-600 dark:text-red-400"}>{errorMessage}</p>}

                <ButtonChip className={"flex items-center justify-center mt-5 -mb-3"} primary={true}>
                  <button disabled={isEditingPost} className={"text-center h-full w-full font-semibold text-lg cursor-pointer"} type={"submit"}>
                    {isEditingPost ? <Spinner size={"xxxs"} /> : "Save Changes"}
                  </button>
                </ButtonChip>
              </form>
            }
          </Modal>
        )}
        {isLoading ?
          <Spinner size={"sm"} text={"Fetching Post..."}/> :

          <div className={"min-h-[90vh]"}>
            {posts.length === 0 ? <p>Post not found.</p> :
            <div className={"flex flex-col justify-start items-center text-center  w-fit h-fit drop-shadow-[0_0_10px_rgba(255,255,255,1)] rounded-4xl p-10 transtion-all animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] select-none hover:scale-101 transition-all border-white/30 bg-white/20 backdrop-blur-xs border shadow-lg hover:bg-white/35 dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35"}>
              {posts[0].image_url ? <img src={posts[0].image_url} alt={posts[0].title} className={"rounded-3xl max-h-70 mb-5"}/> : ""}
              <h2 className={"text-3xl font-bold"}>{posts[0].title}</h2>
              <p className={"text-lg"}>{posts[0].content}</p>

              <div className={"flex flex-row gap-3 my-3 justify-center items-center"}>
                <Button icon={ThumbsUpIcon} value={"Like"}/>
                <Button icon={PencilIcon} onClick={() => openEditPost(posts[0])}/>
                <Button icon={TrashIcon}/>
              </div>

              <Card title={"Comments"} className={"w-full gap-2 "} >
                <div className={"flex w-full gap-2  mb-3"}>
                  <Input placeholder={"Comment..."} className={"w-full"} />
                  {/*<ButtonChip className={"max-w-fit justify-center items-center px-0"}><button className={"cursor-pointer"}>Comment</button></ButtonChip>*/}
                  <Button icon={SendHorizonalIcon} primary={true}/>
                </div>
                {/*<p>Be the first to comment</p>*/}
                <Card className={"w-full justify-center items-start shadow-none"}>
                  <p className={"text-md"}>Agreed!</p>
                  <p className={"text-xs"}>Some Hobo</p>
                </Card>
                <Card className={"w-full justify-center items-start shadow-none"}>
                  <p className={"text-md"}>NEZUKO CHAAAAAAAAAAAAAAAAAAAAAAAAAAAN!</p>
                  <p className={"text-xs"}>Zenitsu</p>
                </Card>


              </Card>
            </div>
            }
          </div>
        }

      </div>
    </div>
  )
}