import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaSearch, FaChevronDown, FaGoogle, FaReddit, FaTwitter, FaBell,
} from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdEmail, MdOutlineRssFeed } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { UserContext } from "../../UserContext"; // Adjust the import path as necessary
import { FiUpload } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import axios from "axios";
import NavbarMobile from "./NavbarMobile"; // Adjust the import path as necessary
import SearchBar from "./SearchBar"; // Adjust the import path as necessary

const Navbar = () => {
  const router = useRouter();
  const { user, loading, SERVER_URL } = useContext(UserContext);
  const [showSignInOptions, setShowSignInOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleDisconnect = async () => {
    try {
      await axios.get("/disconnect");
      router.replace("/explore");
      // Or reload the page if necessary
      window.location.reload();
    } catch (e) {
      alert(e);
    }
  };

  const handleSignInGoogle = () => {
    window.open(`${SERVER_URL}/api/google`, "_self");
  };

  const handleSignInReddit = () => {
    window.open(`${SERVER_URL}/api/reddit`, "_self");
  };

  const handleSignInTwitter = () => {
    window.open(`${SERVER_URL}/api/twitter`, "_self");
  };

  return (
    <div className="z-50 flex justify-center text-gray-300 font-montSerrat fixed bg-[#181818] top-0 left-0 w-full h-[3rem] lg:h-[4rem]">
      <div className="hidden lg:flex justify-between items-center w-full lg:w-[55rem] h-full">
        <Link
          href="/explore" 
          className="text-gray-300 text-[16px] lg:text-[22px] cursor-pointer ease-in-out duration-[.3s]"
        >
          LOGO
        </Link>
        <SearchBar />
        <div className="flex items-center h-full gap-8 text-[14px] lg:text-[18px] w-[20%] lg:w-[10%]">
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="relative h-full flex items-center">
                <Link href="/feed"  className=""><MdOutlineRssFeed className="mr-4 cursor-pointer text-[22px] text-white hover:text-gray-300" /></Link>
                <Link href="/liked-albums" className=""><FaHeart className="mr-4 cursor-pointer text-[18px] text-white hover:text-gray-300" /></Link>
                <Link href="/notifications" >
                <FaBell
                  className="mr-4 cursor-pointer text-white hover:text-gray-300"
                />
                </Link>
      
   
              <Link href="/saved-albums" className=""><FaRegBookmark className="mr-4 cursor-pointer text-[18px] text-white hover:text-gray-300" /></Link>
              <div
                className="relative flex flex-col p-6"
                onMouseOver={() => setShowProfileOptions(true)}
                onMouseOut={() => setShowProfileOptions(false)}
              >
                <button className="flex items-center gap-1 cursor-pointer text-white whitespace-nowrap hover:text-white">
                  <RiAccountCircleFill className="text-[16px] lg:text-[24px]" />{" "}
                  {user.name}
                </button>
                <ul
                  className={`${
                    !showProfileOptions && "hidden"
                  } mt-2 flex flex-col items-left gap-2 px-2 absolute top-[2.5rem] lg:top-[3.5rem] bg-[#181818]`}
                >
                  <li
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Link href={`/${user.name}`} className="flex items-center gap-2  text-white hover:text-gray-200">
                    <RiAccountCircleFill />Profile
                    </Link>
                  </li>
                  <li
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Link href="/upload" className="flex items-center gap-2  text-white hover:text-gray-200">
                    <FiUpload /> Upload
                    </Link>
                  </li>
                  <li

                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Link href="/edit-profile" className="flex items-center gap-2  text-white hover:text-gray-200">
                   <IoSettingsOutline /> Settings
                   </Link>
                  </li>
                  <li
                    onClick={handleDisconnect}
                    className="flex items-center gap-2 text-red-500 cursor-pointer"
                  >
                   <IoExit /> Disconnect
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div
              className="relative h-full"
              onClick={() => setShowSignInOptions(!showSignInOptions)}
            >
              <a className="flex items-center whitespace-nowrap h-full gap-2 text-gray-300 cursor-pointer ease-in-out duration-[.3s] hover:text-gray-400">
                SIGN IN <FaChevronDown />
              </a>
              <div
                className={`flex flex-col justify-between h-[18rem] bg-[#181818] ${
                  !showSignInOptions && "hidden"
                } text-white`}
              >
                <ul className="flex flex-col justify-between h-full py-2">
                  <li onClick={handleSignInGoogle} className="flex items-center gap-2 cursor-pointer p-4">
                    <FaGoogle />
                    Google
                  </li>
                  <li onClick={handleSignInReddit} className="flex items-center gap-2 cursor-pointer p-4">
                    <FaReddit /> Reddit
                  </li>
                  <li onClick={handleSignInTwitter} className="flex items-center gap-2 cursor-pointer p-4">
                    <FaTwitter />
                    Twitter
                  </li>
                  <li
                    className="flex items-center gap-2 cursor-pointer p-4"
                  >
                    <Link href="/login" className="flex items-center gap-2  text-white hover:text-gray-200">
                    <MdEmail />
                    Email
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>
      <div className="lg:hidden w-full px-4 h-full flex justify-between items-center">
     

      {loading ? (
            <div>Loading...</div>
          ) : user ? <div className="relative w-[2rem] h-full"><NavbarMobile disconnectFunction={handleDisconnect}   /></div>
          : (
            <div
              className="lg:hidden relative h-full"
              onClick={() => setShowSignInOptions(!showSignInOptions)}
            >
              <button className="flex items-center whitespace-nowrap w-[8rem] h-full gap-2 text-gray-300 cursor-pointer ease-in-out duration-[.3s] hover:text-gray-400 ">
                SIGN IN <FaChevronDown />
              </button>
              <div
                className={`flex flex-col justify-between  h-[18rem] bg-[#181818] ${
                  !showSignInOptions && "hidden"
                } text-white`}
              >
                <ul className="flex flex-col justify-between w-[8rem] h-full py-4">
                  <li onClick={handleSignInGoogle} className="flex items-center gap-2 cursor-pointer p-4">
                    <FaGoogle />
                    Google
                  </li>
                  <li onClick={handleSignInReddit} className="flex items-center gap-2 cursor-pointer p-4">
                    <FaReddit /> Reddit
                  </li>
                  <li onClick={handleSignInTwitter} className="flex items-center gap-2 cursor-pointer p-4">
                    <FaTwitter />
                    Twitter
                  </li>
                  <li
                    className="flex items-center gap-2 cursor-pointer p-4"
                  >
                    <Link href="/login" className="flex items-center gap-2  text-white hover:text-gray-200">
                    <MdEmail />
                    Email
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )
      }
    
            <SearchBar />
          <Link href="/explore" className="" >LOGO</Link>
      </div>
    </div>
  );
};

export default Navbar;
