import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { BsInstagram } from "react-icons/bs";
import { UserContext } from "../../UserContext"; // Adjust this path to your UserContext location
import {
  AiOutlineMail, AiOutlineDown, AiOutlineWhatsApp
} from "react-icons/ai";
import { Fade } from "react-reveal";
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
          <Fade>

            <button
              onClick={() => {
                router.push(`/${user.name}`);
                setShowMobileMenu(false);
              }}
              onMouseEnter={() => {
                setElementList(4);
              }}
              onMouseLeave={() => {
                setElementList(-1);
              }}
              className="flex  gap-2 relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818]"
            >
              <RiAccountCircleFill /> Profile{" "}

            </button>

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
              className="flex gap-2 relative tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818]"
            >
              <FiUpload/> Upload

            </button>

     
              <button         onClick={()=>{
                router.push("/feed")
                setShowMobileMenu(false);
            }}  className="flex gap-2 relative tracking-[5px] px-[.5rem]  py-[1.5rem] flex bg-[#181818]">
               <MdOutlineRssFeed/> Feed


              </button>
          

              <button          onClick={()=>{
            router.push("/liked-albums")
            setShowMobileMenu(false);
        }} className="relative  flex gap-2 tracking-[4px] px-[.5rem]   py-[1.5rem] bg-[#181818]">
                <FaHeart /> Liked{" "}

  
              </button>

              <button          onClick={()=>{
            router.push("/saved-albums")
            setShowMobileMenu(false);
        }} className="relative  flex gap-2 tracking-[4px] px-[.5rem]   py-[1.5rem] bg-[#181818]">
                <FaRegBookmark /> Saved{" "}

  
              </button>

            <button
              onClick={() =>{router.push("/notifications"); setShowMobileMenu(false);}}

              className="flex items-center gap-2 relative  tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818]"
            >
              <FaBell /> Notifications
              <span
                className={`absolute  ${
                  elementList === 6
                    ? "animate-[underlineAnim_.2s_ease-in-out_forwards]"
                    : "animate-[underlineAnimReverse_.2s_ease-in-out_forwards]"
                } bottom-5 left-0 w-full h-[1px] bg-black`}
              />
            </button>

            <button
              onClick={() =>{router.push("/edit-profile"); setShowMobileMenu(false);}}

              className="flex items-center gap-2  relative tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818]"
            >
              <FaGear />Settings
              <span
                className={`absolute  ${
                  elementList === 6
                    ? "animate-[underlineAnim_.2s_ease-in-out_forwards]"
                    : "animate-[underlineAnimReverse_.2s_ease-in-out_forwards]"
                } bottom-5 left-0 w-full h-[1px] bg-black`}
              />
            </button>
            <button
              onClick={disconnectFunction}

              className="flex gap-2 items-center relative  text-red-500 tracking-[4px] px-[.5rem]  py-[1.5rem] bg-[#181818]"
            >
              <IoExit /> Disconnect
              <span
                className={`absolute  ${
                  elementList === 6
                    ? "animate-[underlineAnim_.2s_ease-in-out_forwards]"
                    : "animate-[underlineAnimReverse_.2s_ease-in-out_forwards]"
                } bottom-5 left-0 w-full h-[1px] bg-black`}
              />
            </button>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
