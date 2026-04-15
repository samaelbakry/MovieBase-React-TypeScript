import {  NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "../searchBar/SearchInput";
import { useEffect, useState } from "react";
import MiniNav from "../miniNav/MiniNav";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll =()=>{
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll" , handleScroll)
    return ()=> window.removeEventListener("scroll" , handleScroll)
  }, [])
  
  return (
    <>
      <nav  className={`fixed top-0 left-0 right-0 z-50 wrapper mt-3 mb-20 rounded-2xl p-5 justify-between transition-all duration-300 
      ${isScrolled ? "backdrop-blur-xl bg-black/30 transition duration-500" : "bg-transparent"}`}>
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
      <MiniNav/>
    </>
  );
};

export default Navbar;

