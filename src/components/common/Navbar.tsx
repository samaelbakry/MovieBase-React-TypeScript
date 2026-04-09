import { Link } from "react-router-dom";
import Logo from "../Logo";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";

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
          <NavigationMenu>
            <NavigationMenuList className="gap-10 capitalize">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Action</NavigationMenuLink>
                  <NavigationMenuLink>Drama</NavigationMenuLink>
                  <NavigationMenuLink>Romance</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Series</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Action</NavigationMenuLink>
                  <NavigationMenuLink>Drama</NavigationMenuLink>
                  <NavigationMenuLink>Romance</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Trending</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Action</NavigationMenuLink>
                  <NavigationMenuLink>Drama</NavigationMenuLink>
                  <NavigationMenuLink>Romance</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      {isOpen && (
        <ul className="md:hidden p-2 bg-transparent flex items-center justify-center gap-4 capitalize font-semibold text-md text-gray-700">
          <li>
            <Link to="/movies">movies</Link>
          </li>
          <li>
            <Link to="/series">series</Link>
          </li>
          <li>
            <Link to="/trending">trending</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;

