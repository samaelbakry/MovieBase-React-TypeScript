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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm lg:text-base font-medium transition-all duration-200 py-1.5 px-3 rounded-lg ${
      isActive
        ? "text-amber-400 bg-amber-400/10 font-semibold"
        : "text-zinc-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
        <nav
          className={`max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:px-6 rounded-2xl border transition-all duration-300 ${
            isScrolled || open
              ? "bg-zinc-950/80 border-zinc-800/80 backdrop-blur-xl shadow-2xl shadow-black/50"
              : "bg-zinc-900/40 border-white/10 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Logo />
            <button
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <IoMdClose className="text-2xl" /> : <IoIosMenu className="text-2xl" />}
            </button>
          </div>

          <div
            className={`${
              open ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-1 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-none border-zinc-800/80 w-full lg:w-auto`}
          >
            <NavLink to="/movies" className={navLinkClass} onClick={() => setOpen(false)}>
              Movies
            </NavLink>

            <NavLink to="/series" className={navLinkClass} onClick={() => setOpen(false)}>
              Series
            </NavLink>

            <NavLink to="/trending" className={navLinkClass} onClick={() => setOpen(false)}>
              Trending
            </NavLink>

            <div className="mt-3 lg:hidden pt-3 border-t border-zinc-800/80">
              <SearchInput />
            </div>
          </div>

          <div className="hidden lg:block">
            <SearchInput />
          </div>
        </nav>
      </header>
      <MiniNav />
    </>
  );
};

export default Navbar;