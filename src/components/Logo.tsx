import { Link } from "react-router-dom";
import { MdOutlineMovie } from "react-icons/md";

const Logo = () => {
  return (
    <Link to={""} className="flex items-center gap-1">
      <MdOutlineMovie className="text-red-500 text-5xl" />
      <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
        Movie Base
      </h1>
    </Link>
  );
};

export default Logo;
