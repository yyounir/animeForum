export default function Input(props){
    return(
        <input
            type="text"
            className="bg-white/20 drop-shadow-[0_0_10px_rgba(255,255,255,1)] border border-white/30 shadow-lg hover:bg-white/35 focus:bg-white/50 backdrop-blur-md transition-all hover:scale-104 focus:scale-106 rounded-4xl px-3 py-3 mr-5
            dark:border-white/10 dark:bg-black/20 dark:text-white dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)] dark:hover:bg-black/35 dark:focus:bg-black/50"
            placeholder="Enter name"
        />
    )
}