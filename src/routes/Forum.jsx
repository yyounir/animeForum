import {FormIcon, PencilIcon, PlusIcon, TrashIcon} from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import {useState} from "react";
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

  const [post, setPost] = useState({title:"", content:"", imageUrl:""})
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const {name, value} = event.target
    setPost((prev) => {
      return{
        ...prev,
        [name]:value,
      }
    })
  }

  const createPost = async(event) => {
    event.preventDefault()

    const {error} = await supabase.from('Forum').insert({Title: post.title, Content: post.content, ImageUrl: post.imageUrl});

    if(error) {
      setErrorMessage(error.message);
      return
    }
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
          <form onSubmit={createPost} className={"mb-5 flex flex-col"}>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Title</label>
              <Input placeholder={"Post title"} className={""} required={true} value={post.title} onChange={handleChange}/>

              <label className={"ml-2"} htmlFor={"PostTitle"}>Content</label>
              <Input placeholder={"What do you want your post to be about?"} className={`bg - white / 20 drop-shadow-[0_0_10px_rgba(255,255,255,1)] border border-white/30 shadow-lg hover:bg-white/35 focus:bg-white/50 backdrop-blur-md transition-all hover:scale-101 focus:scale-102 rounded-4xl px-3 py-3
                dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:focus:bg-black/50 `}
                 value={post.content} onChange={handleChange}
              />

              <label className={"ml-2"} htmlFor={"PostTitle"}>Image URL</label>
              <Input placeholder={"Image URL"} className={""} required = {false}  value={post.imageUrl} onChange={handleChange}/>


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
          <Card title={"Meow"} className={`w-100 h-fit`} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQ3M7V45Gb1ddYlpJOSoGto1yTBfImfwrgZjIxwOnF4RnDUGAb8WfgpowKDiU3WpdfrSmaNB9d_RpeGKNBUU5rUS71ukdXOMAt19SMA&s=10"} >
            <p>I like cats</p>
            <div className={"flex flex-row gap-3 my-3 justify-center items-center"}>
              <Button icon={PencilIcon} value={"Edit"} />
              <Button icon={TrashIcon} value={"Delete"} />
            </div>
          </Card>

        </div>
      </div>
      <div className={"h-100"}>

      </div>
    </div>
  )
}