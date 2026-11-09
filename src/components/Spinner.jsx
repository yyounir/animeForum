export default function Spinner({size, text}){
  if(size == "xxxs"){
    return (
      <div className={"flex justify-center items-center drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]"}>
        <div className="dot-spinner size-[26px]" aria-label="Loading..." role="status">
          <div className="dot dot-1 bg-black dark:bg-white size-[6px] top-0 left-[10px]"></div>
          <div className="dot dot-2 bg-black dark:bg-white size-[6px] top-[10px] right-0"></div>
          <div className="dot dot-3 bg-black dark:bg-white size-[6px] bottom-0 left-[10px]"></div>
          <div className="dot dot-4 bg-black dark:bg-white size-[6px] top-[10px] left-0]"></div>
        </div>
        <p className={"ml-2.5 text-md dark:text-white"}>{text}</p>
      </div>
    )
  }
  else if(size == "xxs"){
    return (
      <div className={"flex justify-center items-center drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]"}>
        <div className="dot-spinner size-[31px]" aria-label="Loading..." role="status">
          <div className="dot dot-1 bg-black dark:bg-white size-[7px] top-0 left-[12px]"></div>
          <div className="dot dot-2 bg-black dark:bg-white size-[7px] top-[12px] right-0"></div>
          <div className="dot dot-3 bg-black dark:bg-white size-[7px] bottom-0 left-[12px]"></div>
          <div className="dot dot-4 bg-black dark:bg-white size-[7px] top-[12px] left-0]"></div>
        </div>
        <p className={"ml-3 text-lg dark:text-white"}>{text}</p>
      </div>
    )
  }
  else if(size == "xs"){
    return (
      <div className={"flex justify-center items-center drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]"}>
        <div className="dot-spinner size-[34px]" aria-label="Loading..." role="status">
          <div className="dot dot-1 bg-black dark:bg-white size-[8px] top-0 left-[13px]"></div>
          <div className="dot dot-2 bg-black dark:bg-white size-[8px] top-[13px] right-0"></div>
          <div className="dot dot-3 bg-black dark:bg-white size-[8px] bottom-0 left-[13px]"></div>
          <div className="dot dot-4 bg-black dark:bg-white size-[8px] top-[13px] left-0]"></div>
        </div>
        <p className={"ml-3 text-xl dark:text-white"}>{text}</p>
      </div>
    )
  }
  else if(size == "sm"){
    return (
      <div className={"flex justify-center items-center drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]"}>
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
      <div className={"flex justify-center items-center drop-shadow-[0_0_10px_rgba(255,255,255,1)] dark:drop-shadow-[0_0_10px_rgba(0,0,0,1)]"}>
        <div className="dot-spinner size-[60px]" aria-label="Loading..." role="status">
          <div className="dot dot-1 bg-black dark:bg-white size-[14px] top-0 left-[23px]"></div>
          <div className="dot dot-2 bg-black dark:bg-white size-[14px] top-[23px] right-0"></div>
          <div className="dot dot-3 bg-black dark:bg-white size-[14px] bottom-0 left-[23px]"></div>
          <div className="dot dot-4 bg-black dark:bg-white size-[14px] top-[23px] left-0]"></div>
        </div>
        <p className={"ml-4 text-3xl dark:text-white "}>{text}</p>
      </div>
    )
  }
}