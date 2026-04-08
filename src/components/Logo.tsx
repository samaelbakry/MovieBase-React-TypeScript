import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={""}>
      <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent">
        Movie Base
      </h1>
    </Link>
  );
};

export default Logo;
