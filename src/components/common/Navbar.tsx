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
      <nav  className={`fixed top-0 left-0 right-0 z-20 max-w-6xl mx-auto flex flex-col items-start  lg:flex-row lg:items-center mt-3  rounded-2xl p-5  gap-3 lg:justify-between  transition-all duration-300 
      ${isScrolled ? "backdrop-blur-xl bg-black/30 transition duration-500" : "bg-transparent"}`}>
        <div className="wrapper">
          <ul className="wrapper lg:gap-10 gap-2">
            <Logo />
            <NavLink to={"/movies"} className="lg:text-xl text-base  font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover">
            <li>Movies</li>
            </NavLink>
            <NavLink to={"/series"} className="lg:text-xl text-base font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover">
            <li>Series</li>
            </NavLink>
            <NavLink to={"/trending"} className="lg:text-xl text-base font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover">
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

