import { MdCollectionsBookmark } from "react-icons/md"

const WatchListBtn = () => {
  return <>
   <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl 
      bg-white/10 backdrop-blur-lg border border-white/20
      text-white  hover:border-blue-500
      transition-all duration-300 group cursor-pointer" 
    >
      <MdCollectionsBookmark 
        className="text-xl group-hover:scale-110 transition-transform duration-300" 
      />
      <span className="text-sm font-medium">
         WatchList
      </span>
    </button>
  </>
}

export default WatchListBtn
