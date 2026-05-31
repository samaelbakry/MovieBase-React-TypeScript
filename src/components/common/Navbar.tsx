import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "../searchBar/SearchInput";
import { useEffect, useState } from "react";
import MiniNav from "../miniNav/MiniNav";
import { IoIosMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center my-6 px-4 lg:p-3 rounded-2xl gap-3 lg:justify-between transition-all duration-300
       ${isScrolled ? "backdrop-blur-xl bg-black/30" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between w-full">
          <Logo />
          <button
            className="lg:hidden text-white text-3xl"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <IoMdClose /> : <IoIosMenu />}
          </button>
        </div>
        <div
          className={`${open ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-start lg:items-center rounded-2xl py-4 px-5 gap-2 lg:gap-5 w-full lg:w-auto`}
        >
          <NavLink
            to="/movies"
            className="lg:text-xl text-base font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover"
          >
            Movies
          </NavLink>

          <NavLink
            to="/series"
            className="lg:text-xl text-base font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover"
          >
            Series
          </NavLink>

          <NavLink
            to="/trending"
            className="lg:text-xl text-base font-semibold hover:underline-offset-2 hover:decoration-amber-600 active_hover"
          >
            Trending
          </NavLink>
        </div>
        {open ? "" : <SearchInput />}
      </nav>
      <MiniNav />
    </>
  );
};

export default Navbar;
