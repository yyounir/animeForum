import {FormIcon, PencilIcon, PlusIcon, ThumbsUpIcon, TrashIcon} from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import {useEffect, useState} from "react";
import Modal from "../components/Modal.jsx";
import ButtonChip from "../components/ButtonChip.jsx";

import {supabase} from "../client.js";
import {Link} from "react-router";
import Spinner from "../components/Spinner.jsx";

export default function Forum(){

  // Loading
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const [isLoading, setIsLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalMounted, setIsModalMounted] = useState(false)
  const [modalTitle, setModalTile] = useState("")
  const [modalText, setModalText] = useState("")
  const [modalActions, setModalActions] = useState([{
    primary: "OK",
    primaryOnClick: () => setIsModalOpen(false),
    secondary: "Cancel",
    secondaryOnClick: () => setIsModalOpen(false),
  }])

  const openCreatePost = () => {
    setPostTitle("");
    setPostContent("");
    setPostImageUrl("");
    setErrorMessage("");
    setModalTile("Create Post")
    setModalText([" "])
    setIsModalMounted(true)
    setIsModalOpen(true)
    setModalActions([{
      primary: null,
      secondary: "Cancel",
      primaryOnClick: () => setIsModalOpen(false),
      secondaryOnClick: () => setIsModalOpen(false),
    }])
  }

  // Create Posts

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  }

  const handleImageUrlChange = (event) => {
    setPostImageUrl(event.target.value);
  }

  const createPost = async(event) => {
    event.preventDefault()
    // console.log(postTitle);
    // console.log(postContent);
    // console.log(postImageUrl);

    const {error} = await supabase.from('Forum').insert({title: postTitle, content: postContent, image_url: postImageUrl});

    if(error) {
      setErrorMessage(error.message);
      return
    }
    fetchPosts();
    setIsModalMounted(false)
    setIsModalOpen(false)
  }

  // Read Posts
  const [posts, setPosts] = useState([]);

  const fetchPosts = async() => {
    try {
      const {data} = await supabase.from("Forum").select();
      await sleep(1500);
      if(data){
        setPosts(data);
        setIsLoading(false);
      }
    }
    catch (error){
      console.error(error);
    }


  }
  useEffect(() => {
    fetchPosts();
  }, []);

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
    setModalActions([{
      primary: null,
      secondary: "Cancel",
      primaryOnClick: () => setIsModalOpen(false),
      secondaryOnClick: () => setIsModalOpen(false),
    }])
  }

  const [isEditingPost, setIsEditingPost] = useState(false);

  const editPost = async(event) => {
    event.preventDefault();
    setIsEditingPost(true)

    const {error} = await supabase
      .from("Forum")
      .update({title: postTitle, content: postContent, image_url: postImageUrl})
      .eq("id", idToEdit);

    if(error) {
      setErrorMessage(error.message);
      return;
    }

    await fetchPosts();
    setIsModalMounted(false);
    setIsModalOpen(false);
    setIsEditingPost(false)
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
    fetchPosts();

    sleep(2000)
    setIsModalMounted(false);
    setIsModalOpen(false);
    setIsEditingPost(false)
  }

  return (
    <div className={"animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] flex flex-col justify-center items-center select-none text-center"}>

      {isModalMounted && (
        <Modal
          title={modalTitle}
          message={modalText}
          isOpen={isModalOpen}
          onCloseComplete={() => setIsModalMounted(false)}
          actions={modalActions}
          className={"w-100"}
        >
          {modalTitle == "Create Post" &&
            <form onSubmit={createPost} className={"mb-5 flex flex-col"}>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Title</label>
              <Input placeholder={"Post title"} className={""} required={true} onChange={handleTitleChange}
                     name={"title"}/>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Content</label>
              <textarea placeholder={"What do you want your post to be about?"} className={`bg - white / 20 drop-shadow-[0_0_10px_rgba(255,255,255,1)] border border-white/30 shadow-lg hover:bg-white/35 focus:bg-white/50 backdrop-blur-md transition-all hover:scale-101 focus:scale-102 rounded-3xl px-3 py-3
                  dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:focus:bg-black/50 `}
                        onChange={handleContentChange} name={"content"}
              />

              <label className={"ml-2"} htmlFor={"PostTitle"}>Image URL</label>
              <Input placeholder={"Image URL"} className={""} required={false} onChange={handleImageUrlChange}
                     name={"image_url"}/>


              <ButtonChip className={"flex items-center justify-center mt-5 -mb-3"} primary={true}>
                <button className={"text-center h-full w-full cursor-pointer font-semibold text-lg"}
                        type={"submit"}>Post
                </button>
              </ButtonChip>
            </form>
          }
          {modalTitle == "Edit Post" &&
            <form onSubmit={editPost} className={"mb-5 flex flex-col"}>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Title</label>
              <Input placeholder={"Enter a new title"} value={postTitle} className={""} required={true} onChange={handleTitleChange}
                     name={"title"}/>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Content</label>
              <textarea placeholder={"Edit the post's content"} className={`bg - white / 20 drop-shadow-[0_0_10px_rgba(255,255,255,1)] border border-white/30 shadow-lg hover:bg-white/35 focus:bg-white/50 backdrop-blur-md transition-all hover:scale-101 focus:scale-102 rounded-3xl px-3 py-3
                  dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:focus:bg-black/50 `}
                        onChange={handleContentChange} name={"content"} value={postContent}
              />

              <label className={"ml-2"} htmlFor={"PostTitle"}>Image URL</label>
              <Input placeholder={"Edit Image URL"} value={postImageUrl} className={""} required={false} onChange={handleImageUrlChange}
                     name={"image_url"}/>


              <ButtonChip className={"flex items-center justify-center mt-5 -mb-3"} primary={true}>
                <button className={"text-center h-full w-full cursor-pointer font-semibold text-lg"} type={"submit"}>
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



      <h1 className={"font-semibold dark:text-white text-4xl flex gap-2.5 my-4 "}><FormIcon className={"size-10.5 "} />Forum</h1>

      <Button icon={PlusIcon} value={"Create Post"} className={"mt-5 drop-shadow-none dark:drop-shadow-none"} primary={true} onClick={openCreatePost}/>

      <div className={"mt-2"}>
        <Input placeholder = "Search a Post..." className={"my-5 w-100"}/>

        {isLoading ? <div className={"mt-3"}><Spinner size={"sm"} text={"Fetching Posts..."}/></div>: ""}

        <div className={"flex flex-wrap gap-4 justify-center items-center"}>
          {posts?.map((post, index) =>(

            <div key={index}>
              <Card classNameImg={"max-h-50"} className={"p-0"} onClick={" "}>
                <Link to={`/forum/${post.id}`}>
                  {post.image_url && <img src={post.image_url} className={`rounded-3xl w-[400px] h-[200px] object-cover object-center `}/>}
                  <h2 className={"text-2xl pt-5"}>{post.title}</h2>
                  <p>{post.content}</p>
                </Link>
                <div className={"flex flex-row gap-3 my-3 justify-center items-center"}>
                  <Button icon={ThumbsUpIcon} value={"Like"}/>
                  <Button  onClick={() => openEditPost(post)} icon={PencilIcon}/>
                  <Button onClick={() => openDeletePost(post)} icon={TrashIcon}/>
                </div>
              </Card>
            </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}