export default function Spinner({size, text}){
  if(size == "xs"){
    return (
      <div className="dot-spinner size-[60px]" aria-label="Loading..." role="status">
        <div className="dot dot-1 bg-black dark:bg-white size-[14px]"></div>
        <div className="dot dot-2 bg-black dark:bg-white size-[14px]"></div>
        <div className="dot dot-3 bg-black dark:bg-white size-[14px]"></div>
        <div className="dot dot-4 bg-black dark:bg-white size-[14px]"></div>
      </div>
    )
  }
  else if(size == "sm"){
    return (
      <div className={"flex justify-center items-center"}>
        <div className="dot-spinner size-[44px]" aria-label="Loading..." role="status">
          <div className="dot dot-1 bg-black dark:bg-white size-[10px] top-0 left-[17px]"></div>
          <div className="dot dot-2 bg-black dark:bg-white size-[10px] top-[17px] right-0"></div>
          <div className="dot dot-3 bg-black dark:bg-white size-[10px] bottom-0 left-[17px]"></div>
          <div className="dot dot-4 bg-black dark:bg-white size-[10px] top-[17px] left-0]"></div>
        </div>
        <p className={"ml-4 text-2xl dark:text-white"}>{text}</p>
      </div>
    )
  }
  else if(size == "md"){
    return (
      <div className={"flex justify-center items-center"}>
        <div className="dot-spinner size-[60px]" aria-label="Loading..." role="status">
          <div className="dot dot-1 bg-black dark:bg-white size-[14px] top-0 left-[23px]"></div>
          <div className="dot dot-2 bg-black dark:bg-white size-[14px] top-[23px] right-0"></div>
          <div className="dot dot-3 bg-black dark:bg-white size-[14px] bottom-0 left-[23px]"></div>
          <div className="dot dot-4 bg-black dark:bg-white size-[14px] top-[23px] left-0]"></div>
        </div>
        <p className={"ml-4 text-3xl dark:text-white"}>{text}</p>
      </div>
    )
  }
}