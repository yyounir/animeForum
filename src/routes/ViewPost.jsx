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
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
  const [commentsText, setcommentsText] = useState("");
  const [commentsError, setcommentsError] = useState("");
  const [isSubmittingcomments, setIsSubmittingcomments] = useState(false);

  const submitcomments = async(event) => {
    event.preventDefault();
    const newcomments = commentsText.trim();
    const post = posts[0];
    if(!newcomments || !post || isSubmittingcomments) return;

    setIsSubmittingcomments(true);
    setcommentsError("");
    try {
      const commentss = Array.isArray(post.comments) ? post.comments : [];
      const {data, error} = await supabase
        .from("Forum")
        .update({comments: [...commentss, newcomments]})
        .eq("id", post.id)
        .select("comments")
        .single();

      if(error) {
        setcommentsError(error.message);
        return;
      }

      setPosts(currentPosts => currentPosts.map(currentPost =>
        currentPost.id === post.id ? {...currentPost, comments: data.comments ?? []} : currentPost
      ));
      setcommentsText("");
    } catch(error) {
      console.error("Failed to submit comments:", error);
      setcommentsError(error.message || "Failed to submit comments. Please try again.");
    } finally {
      setIsSubmittingcomments(false);
    }
  }

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

  const incrementPost = async(post) => {
    const {data, error} = await supabase.from("Forum")
      .update({likes: (post.likes ?? 0) + 1})
      .eq("id", post.id)
      .select("likes")
      .single();

    if(error){
      console.error("Failed to update post likes: ", error);
    }

    setPosts(currentPosts => currentPosts.map(currentPost => currentPost.id === post.id ? {...currentPost, likes: data.likes} : currentPost));
  }

  // Delete Post
  const openDeletePost = (post) => {
    setIdToEdit(post.id);
    setErrorMessage("");
    setModalTile("Delete Post");
    setModalText(["Are you sure you want to delete this post?"])
    setIsModalMounted(true)
    setIsModalOpen(true)
    setModalActions([{
      primary: null,
      secondary: "Cancel",
      primaryOnClick: () => setIsModalOpen(false),
      secondaryOnClick: () => setIsModalOpen(false),
    }])
  }


  const deletePost = async(event) => {
    event.preventDefault();
    setIsEditingPost(true)
    await supabase.from("Forum").delete().eq("id", idToEdit)


    sleep(2000)
    setIsModalMounted(false);
    setIsModalOpen(false);
    setIsEditingPost(false)
    window.location = "/forum"
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
            {modalTitle == "Delete Post" &&
              <form onSubmit={deletePost} className={"mb-5 flex flex-col"}>


                <ButtonChip className={"flex items-center justify-center mt-5 -mb-3"} primary={true}>
                  <button className={"text-center h-full w-full cursor-pointer font-semibold text-lg text-red-500"} type={"submit"}>
                    {isEditingPost ? <Spinner size={"xxxs"} /> : "Delete"}
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
            <div className={`p-8 rounded-4xl flex flex-col justify-center items-center

              drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]
relative overflow-hidden backdrop-blur-[26px] backdrop-saturate-[185%] border border-white/25 
shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.75),inset_0_10px_24px_-8px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.38)]
bg-gradient-to-br from-white/20 via-white/[0.08] to-white/[0.11] dark:from-black/20 dark:via-black/[0.08] dark:to-black/[0.11] dark:text-white`}>
              {posts[0].image_url ? <img src={posts[0].image_url} alt={posts[0].title} className={"rounded-3xl max-h-70 mb-5"}/> : ""}
              <h2 className={"text-3xl font-bold"}>{posts[0].title}</h2>
              <p className={"text-lg"}>{posts[0].content}</p>

              <div className={"flex flex-row gap-3 my-3 justify-center items-center"}>
                <Button icon={ThumbsUpIcon} value={posts[0].likes ?? 0} onClick={() => incrementPost(posts[0])}/>
                <Button icon={PencilIcon} onClick={() => openEditPost(posts[0])}/>
                <Button icon={TrashIcon} onClick={() => openDeletePost(posts[0])} />
              </div>

              <Card title={"Comments"} className={"w-full gap-2 "} >
                <form onSubmit={submitcomments} className={"w-full"}>
                  <div className={"flex w-full gap-2 mb-3"}>
                    <Input
                      placeholder={"Comment..."}
                      className={"w-full"}
                      value={commentsText}
                      required={true}
                      onChange={(event) => setcommentsText(event.target.value)}
                    />
                    <Button
                      icon={SendHorizonalIcon}
                      primary={true}
                      type={"submit"}
                      disabled={isSubmittingcomments || !commentsText.trim()}
                    />
                  </div>
                </form>
                {commentsError && <p role={"alert"} className={"text-red-600 dark:text-red-400"}>{commentsError}</p>}
                {Array.isArray(posts[0].comments) && posts[0].comments.length > 0
                  ? posts[0].comments.map((comments, index) => (
                    <Card key={`${index}-${comments}`} className={"w-full justify-center items-start shadow-none"}>
                      <p className={"text-md"}>{comments}</p>
                    </Card>
                  ))
                  : <p>Be the first to comment!</p>}

              </Card>
            </div>
            }
          </div>
        }

      </div>
    </div>
  )
}