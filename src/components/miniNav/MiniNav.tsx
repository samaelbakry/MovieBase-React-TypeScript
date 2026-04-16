import { MdCollectionsBookmark, MdFavorite } from "react-icons/md";
import { FaRegHandPointUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MiniNav = () => {
    const [show, setShow] = useState(false)
    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 50){
            setShow(true)
        }else{
            setShow(false)
        }
      }
      window.addEventListener("scroll" , handleScroll)
    
      return ()=> window.removeEventListener("scroll" , handleScroll)
    }, [])
    
  return (
    <div className={`fixed bottom-6 right-6 z-50 transition duration-1000 ${show ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/20 backdrop-blur-xl shadow-2xl border border-white/10">
        <Link to={"/favoriteListPage"} className="cursor-pointer flex flex-col items-center text-gray-300 hover:text-red-500 transition-all duration-200 group">
          <MdFavorite className="text-2xl group-hover:scale-110 transition" />
          <span className="text-xs mt-1 opacity-80">Fav</span>
        </Link>
        <button className="cursor-pointer flex flex-col items-center text-gray-300 hover:text-blue-400 transition-all duration-200 group">
          <MdCollectionsBookmark className="text-2xl group-hover:scale-110 transition" />
          <span className="text-xs mt-1 opacity-80">List</span>
        </button>
        <button onClick={()=>{window.scrollTo({top:0 , behavior:"smooth"})}} className="cursor-pointer flex flex-col items-center text-gray-300 hover:text-green-400 transition-all duration-200 group">
          <FaRegHandPointUp className="text-2xl group-hover:scale-110 transition" />
          <span className="text-xs mt-1 opacity-80">Top</span>
        </button>
      </div>
    </div>
  );
};

export default MiniNav;