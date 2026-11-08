import {FormIcon, PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import {useEffect, useState} from "react";
import Modal from "../components/Modal.jsx";
import ButtonChip from "../components/ButtonChip.jsx";

import {supabase} from "../client.js";

export default function Forum(){

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
    console.log(postTitle);
    console.log(postContent);
    console.log(postImageUrl);

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
      setPosts(data)
      console.log(data)
    }
    catch (error){
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

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
          <form onSubmit={createPost} className={"mb-5 flex flex-col"}>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Title</label>
              <Input placeholder={"Post title"} className={""} required={true} onChange={handleTitleChange} name={"title"}/>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Content</label>
              <textarea placeholder={"What do you want your post to be about?"} className={`bg - white / 20 drop-shadow-[0_0_10px_rgba(255,255,255,1)] border border-white/30 shadow-lg hover:bg-white/35 focus:bg-white/50 backdrop-blur-md transition-all hover:scale-101 focus:scale-102 rounded-3xl px-3 py-3
                dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:focus:bg-black/50 `}
                 onChange={handleContentChange} name={"content"}
              />

              <label className={"ml-2"} htmlFor={"PostTitle"}>Image URL</label>
              <Input placeholder={"Image URL"} className={""} required = {false}  onChange={handleImageUrlChange} name={"image_url"}/>


              <ButtonChip className={"flex items-center justify-center mt-5 -mb-3"} primary={true}>
                <button className={"text-center h-full w-full cursor-pointer font-semibold text-lg"} type={"submit"}>Submit</button>
              </ButtonChip>
          </form>
        </Modal>
      )}

      <h1 className={"font-semibold dark:text-white text-4xl flex gap-2.5 my-4 "}><FormIcon className={"size-10.5 "} />Forum</h1>

      <Button icon={PlusIcon} value={"Create Post"} onClick={openCreatePost}/>

      <div className={"mt-5"}>
        <Input placeholder = "Search a Post..." className={"my-3 w-100"}/>

        <div className={"flex flex-wrap gap-4 justify-center items-center"}>
          {posts.map((post) =>(
            <Card title={post.title} className={`w-100 h-fit`}
                 image={post.image_url}>
              <p>{post.content}</p>
              <div className={"flex flex-row gap-3 my-3 justify-center items-center"}>
                <Button icon={PencilIcon} value={"Edit"}/>
                <Button icon={TrashIcon} value={"Delete"}/>
              </div>
            </Card>
            ))
          }

        </div>
      </div>
      <div className={"h-100"}>

      </div>
    </div>
  )
}