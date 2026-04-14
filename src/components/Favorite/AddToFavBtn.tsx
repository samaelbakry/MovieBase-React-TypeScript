import { IoMdHeartEmpty } from "react-icons/io";

const AddToFavBtn = () => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl 
      bg-white/10 backdrop-blur-lg border border-white/20
      text-white hover:border-red-500
      transition-all duration-300 group cursor-pointer" 
    >
      <IoMdHeartEmpty 
        className="text-xl group-hover:scale-110 transition-transform duration-300" 
      />
      <span className="text-sm font-medium">
         Favorites
      </span>
    </button>
  );
};

export default AddToFavBtn;