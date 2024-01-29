import React, { useState, useRef, useContext, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from "../../UserContext";


const Spinner = () => (
  <div className="w-[10rem] lg:w-[15rem] h-[7rem] lg:h-[10rem] border-white border-[1px]"></div>
);

const Media = ({ navigateTo, thumbnail, userName, userImage, videoTitle, viewsNumber = 0, videosNumber = false, photosNumber = false }) => {
  const router = useRouter();
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { SERVER_URL } = useContext(UserContext);
  const videoFormats = ['.mp4', '.webm', '.avi', '.mov', '.flv']; // Add more formats as needed
  const isVideoFormat = (fileName) => videoFormats.some(ext => fileName.endsWith(ext));
  useEffect(() => {
    let timer;

    if (isPreviewed && thumbnail.length > 0) {
      timer = setInterval(() => {
        setCurrentThumbnail(prev => (prev + 1) % thumbnail.length);
      }, 1000);
    } else {
      setCurrentThumbnail(0);
    }

    return () => clearInterval(timer);
  }, [isPreviewed, thumbnail.length]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className=" w-[10rem] lg:max-w-[15rem] h-[13rem]">
      <Link href={navigateTo}>
      <div
        onMouseOver={() => setIsPreviewed(true)}
        onMouseOut={() => setIsPreviewed(false)}
        onClick={()=>window.scrollTo({top:0,left:0})}
        className="relative flex cursor-pointer justify-center h-[9rem] w-[10rem] lg:w-[15rem] lg:h-[10rem] border-[1px] border-white"
      >
        {isLoading && <Spinner />}
        {isVideoFormat(thumbnail[currentThumbnail]?.name) ? (
     <img
       src={`${SERVER_URL}/uploads/${thumbnail[currentThumbnail]?.videoThumbnail}`}
       className="h-full w-full"
       onLoad={handleImageLoad}
       alt="video"
     />
   ) : (
     <img
       src={`${SERVER_URL}/uploads/${thumbnail[currentThumbnail]?.name}`}
       className="w-full h-full"
       onLoad={handleImageLoad}
       style={{ display: isLoading ? 'none' : 'block' }}
       alt="Thumbnail"
     />
)}
        <span className="absolute bottom-0 w-full h-[3rem] bg-gradient-to-b from-transparent to-black" />
        <div className="flex justify-between absolute bottom-2 w-[90%] text-white">
          <div className="flex items-center gap-2">
            <IoEyeSharp className="text-[18px] lg:text-[24px] dark:text-white" />
            <span className="font-bold">{viewsNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            {photosNumber !== 0 && (
              <>
                <MdOutlineInsertPhoto className="text-[18px] lg:text-[24px]" />
                <span className="font-bold">{photosNumber}</span>
              </>
            )}
            {videosNumber !== 0 && (
              <>
                <BsFillCameraReelsFill className="text-[16px] lg:text-[20px]" />
                <span className="font-bold">{videosNumber}</span>
              </>
            )}
          </div>
        </div>
      </div>
      </Link>
      <div className="flex items-center mt-2 w-[10rem] lg:w-[15rem]">
        {
          userImage ?
          <img onClick={() => router.push(`/${userName}`)} src={userImage.includes("google") ? userImage : `${SERVER_URL}/uploads/${userImage}`} className="rounded-[50%] w-[35px] h-[35px] cursor-pointer" alt={userName} />
          :
          <span onClick={() => router.push(`/${userName}`)} className='flex items-center justify-center rounded-[50%] text-[24px] w-[35px] h-[35px] bg-[#3B3B3B] cursor-pointer text-white'>{userName[0].toUpperCase()}</span>
        }
        <div className="flex ml-2 flex-col">
          <Link href={`/${userName}`} className="whitespace-nowrap lg:text-[18px] font-bold text-gray-200 cursor-pointer hover:text-gray-200">
            {videoTitle}
          </Link>
          <Link href={`/${userName}`} className="text-gray-300 cursor-pointer hover:text-gray-300">
            {userName}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Media;
