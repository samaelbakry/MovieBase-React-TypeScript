import {  NavLink } from "react-router-dom";
import { useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function ToggleMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 wrapper my-5 bg-transparent py-5 justify-between">
        <Logo />
        <div
          className="md:hidden cursor-pointer transition-all duration-200"
          onClick={ToggleMenu}
        >
          {isOpen ? (
            <IoIosClose className="size-8" />
          ) : (
            <HiMiniBars3 className="size-8" />
          )}
        </div>

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
        <div>
          <IoIosSearch  className="text-2xl"/>
        </div>
      </nav>
      {isOpen && (
        <ul className="md:hidden p-2 bg-transparent flex items-center justify-center gap-4 capitalize font-semibold text-md text-gray-700">
          <li>
            <NavLink to="/movies" className={"active_hover"}>movies</NavLink>
          </li>
          <li>
            <NavLink to="/series" className={"active_hover"}>series</NavLink>
          </li>
          <li>
            <NavLink to="/trending" className={"active_hover"}>trending</NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;

