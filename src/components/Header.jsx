import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hook/useMobile";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname === "/search";

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 flex h-24 flex-col justify-center gap-1 bg-white lg:h-20 lg:shadow-md">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex h-full items-center justify-between px-2">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="flex h-full items-center justify-center">
              <img
                src={Logo}
                alt="logo"
                width={170}
                height={60}
                className="hidden lg:block"
              />
              <img
                src={Logo}
                alt="logo"
                width={120}
                height={60}
                className="block lg:hidden"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* Login and cart */}
          <div className="">
            {/* User icon display in only mobile version */}
            <button className="text-neutral-600 lg:hidden">
              <FaRegCircleUser size={22} />
            </button>

            {/* desktop */}
            <div className="hidden items-center gap-10 lg:flex">
              <button
                onClick={redirectToLoginPage}
                to={"/login"}
                className="px-2 text-lg"
              >
                Login
              </button>
              <button className="flex items-center gap-2 rounded bg-green-800 px-4 py-3 text-white hover:bg-green-700">
                {/* add to card icon */}
                <div className="animate-bounce">
                  <TiShoppingCart size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};
export default Header;
