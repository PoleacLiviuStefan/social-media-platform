import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { BsInstagram } from "react-icons/bs";
import { UserContext } from "../../UserContext"; // Adjust this path to your UserContext location
import Link from "next/link";
import axios from "axios";
import {
  FaSearch, FaChevronDown, FaGoogle, FaReddit, FaTwitter, FaRegBookmark, FaBell,
} from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { FaGear, FaHeart } from "react-icons/fa6";
import { MdEmail, MdOutlineRssFeed } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";

const NavbarMobile = ({ disconnectFunction }) => {
  const { user, loading } = useContext(UserContext);
  const [elementList, setElementList] = useState(-1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activMobileAnim, setActivMobileMenu] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (showMobileMenu) {
      setActivMobileMenu(false);
    } else {
      setTimeout(() => {
        setActivMobileMenu(true);
      }, 300);
    }
  
  }, [showMobileMenu]);

  return (
    <>
      <div
        onClick={() => setShowMobileMenu((prev) => !prev)}
        className=" lg:hidden top-[0rem]    flex flex-col items-left justify-center h-[2rem]  w-[1.5rem]"
      >
        <span
          className={`relative ${
            showMobileMenu
              ? " animate-[topLine_.5s_ease-in-out_forwards]"
              : " animate-[topLineReverse_.5s_ease-in-out_forwards]"
          } top-[.3rem] w-[1.3rem] h-[2px] bg-white`}
        />
        <span
          className={`relative ${
            showMobileMenu
              ? " animate-[disappear_.5s_ease-in-out_forwards]"
              : " animate-[appear_.5s_ease-in-out_forwards]"
          }  top-[.6rem] w-[1rem] h-[2px] bg-white`}
        />
        <span
          className={`relative ${
            showMobileMenu
              ? " animate-[bottomLine_.5s_ease-in-out_forwards]"
              : "animate-[bottomLineReverse_.5s_ease-in-out_forwards]"
          } top-[.9rem] w-[1.3rem] h-[2px] bg-white`}
        />
      </div>
      <div
        className={`absolute ${
          showMobileMenu
            ? "animate-[menuAppear_.3s_ease-in-out_forwards]"
            : "animate-[menuAppearReverse_.3s_ease-in-out_forwards]"
        } ${
          activMobileAnim === 1 && "hidden"
        } whitespace-nowrap left-[-1rem] top-[3rem] bg-[#181818] h-screen  text-white text-[13px]`}
      >
        <div className=" mt-[2rem] flex flex-col overflow-hidden">
       
        <Link href={`/${user.name}`} className="text-white hover:text-white">
            <button
              onClick={() => {
                setShowMobileMenu(false);
              }}
              onMouseEnter={() => {
                setElementList(4);
              }}
              onMouseLeave={() => {
                setElementList(-1);
              }}
              className="flex items-center relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden"
            >
                <div className="flex gap-2">
              <RiAccountCircleFill /> Profile{" "}
                </div>
            </button>
            </Link>
            <Link href="/upload" className="text-white hover:text-white">
            <button
              onClick={() => {
                router.push("/upload");
                setShowMobileMenu(false);
              }}
              onMouseEnter={() => {
                setElementList(5);
              }}
              onMouseLeave={() => {
                setElementList(-1);
              }}
              className="flex items-center relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden"
            >
                <div className="flex gap-2">
              <FiUpload/> Upload
                </div>
            </button>
            </Link>

            <Link href="/feed" className="text-white hover:text-white">
              <button         onClick={()=>{
                setShowMobileMenu(false);
            }}  className=" relative tracking-[5px] px-[.5rem]  py-[1.5rem] flex bg-[#181818] whitespace-nowrap overflow-hidden">
                <div className="flex gap-2">
               <MdOutlineRssFeed/> Feed
                </div>

              </button>
          </Link>
          <Link href="/liked-albums" className="text-white hover:text-white">
              <button          onClick={()=>{
            setShowMobileMenu(false);
        }}     className="flex items-center relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden" >
            <div className="flex gap-2">
                <FaHeart /> Liked{" "}
                </div>
              </button>
              </Link>
              <Link href="/saved-albums" className="text-white hover:text-white">
              <button          onClick={()=>{
            setShowMobileMenu(false);
        }}     className="flex items-center relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden">
            <div className="flex gap-2">
                <FaRegBookmark /> Saved{" "}
            </div>
  
              </button>
              </Link>
              <Link href="/notifications" className="text-white hover:text-white">
            <button
              onClick={() =>{ setShowMobileMenu(false);}}

              className="flex items-center relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden"
            >
                <div className="flex gap-2">
              <FaBell /> Notifications
              </div>
              <span
                className={`absolute  ${
                  elementList === 6
                    ? "animate-[underlineAnim_.2s_ease-in-out_forwards]"
                    : "animate-[underlineAnimReverse_.2s_ease-in-out_forwards]"
                } bottom-5 left-0 w-full h-[1px] bg-black`}
              />
            </button>
            </Link>
            <Link href="/edit-profile" className="text-white hover:text-white">
            <button
              onClick={() =>{ setShowMobileMenu(false);}}

              className="flex items-center   relative tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden"
            >
                <div className="flex gap-2">
              <FaGear />Settings
              </div>
              <span
                className={`absolute  ${
                  elementList === 6
                    ? "animate-[underlineAnim_.2s_ease-in-out_forwards]"
                    : "animate-[underlineAnimReverse_.2s_ease-in-out_forwards]"
                } bottom-5 left-0 w-full h-[1px] bg-black`}
              />
            </button>
            </Link>
            
            <button
              onClick={disconnectFunction}

              className="flex items-center relative  text-red-500 tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818] whitespace-nowrap overflow-hidden"
            >
                <div className="flex gap-2">
              <IoExit /> Disconnect

              </div>
              <span
                className={`absolute  ${
                  elementList === 6
                    ? "animate-[underlineAnim_.2s_ease-in-out_forwards]"
                    : "animate-[underlineAnimReverse_.2s_ease-in-out_forwards]"
                } bottom-5 left-0 w-full h-[1px] bg-black`}
              />
            </button>
        
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
