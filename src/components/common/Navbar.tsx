import {  NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "../searchBar/SearchInput";

const Navbar = () => {
  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 wrapper my-5 bg-transparent py-5 justify-between">
        <Logo />
        <div className="wrapper hidden lg:block">
          <ul className="wrapper gap-10">
            <NavLink to={"/movies"} className="text-xl font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover">
            <li>Movies</li>
            </NavLink>
            <NavLink to={"/series"} className="text-xl font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover">
            <li>Series</li>
            </NavLink>
            <NavLink to={"/trending"} className="text-xl font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover">
            <li>Trending</li>
            </NavLink>
          </ul>
        </div>
        <SearchInput/>
      </nav>
    </>
  );
};

export default Navbar;

