import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hook/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSeachPage = () => {
    navigate("/search");
  };

  return (
    <div className="group flex h-11 w-full min-w-[320px] items-center overflow-hidden rounded-lg border bg-slate-50 text-neutral-400 focus-within:border-primary-200 lg:h-12 lg:min-w-[420px]">
      {isMobile && isSearchPage ? (
        <button className="m-1 flex h-full items-center justify-center rounded-full bg-white p-3 text-neutral-600 shadow-md group-focus-within:text-primary-200">
          <FaArrowLeft size={20} />
        </button>
      ) : (
        <button className="flex h-full items-center justify-center p-3 text-neutral-600 group-focus-within:text-primary-200">
          <IoSearch size={22} />
        </button>
      )}

      <div className="h-full w-full">
        {!isSearchPage ? (
          //Not search page
          <div
            onClick={redirectToSeachPage}
            className="flex h-full w-full items-center"
          >
            <TypeAnimation
              sequence={[
                `Search "milk"`,
                1000,
                `Search "bread"`,
                1000,
                `Search "sugar"`,
                1000,
                `Search "panner"`,
                1000,
                `Search "chocolate"`,
                1000,
                `Search "rice"`,
                1000,
                `Search "eggs"`,
                1000,
                `Search "chips"`,
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "16px", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        ) : (
          //Search page
          <div className="h-full w-full">
            <input
              type="text"
              placeholder="Search for more."
              className="h-full w-full bg-transparent outline-none"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
