import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hook/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { useState } from "react";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="sticky top-0 z-40 flex h-24 flex-col justify-center gap-1 bg-white lg:h-20 lg:shadow-md">
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
            <button
              onClick={handleMobileUser}
              className="text-neutral-600 lg:hidden"
            >
              <FaRegCircleUser size={22} />
            </button>

            {/* desktop */}
            <div className="hidden items-center gap-10 lg:flex">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                    className="flex cursor-pointer select-none items-center gap-2"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <VscTriangleUp size={20} />
                    ) : (
                      <VscTriangleDown size={20} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="min-w-52 rounded bg-white p-4 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  to={"/login"}
                  className="px-2 text-lg"
                >
                  Login
                </button>
              )}

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
