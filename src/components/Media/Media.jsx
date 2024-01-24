import React, { useState, useRef, useContext, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from "../../UserContext";
import Image from 'next/image';

const Spinner = () => (
  <div className="w-[9.5rem] lg:w-[15rem] h-[7rem] lg:h-[10rem] border-white border-[1px]"></div>
);

const VideoThumbnail = ({ src, onLoad }) => {
  const videoRef = useRef();

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
        // Play the video
        videoElement.play().then(() => {
            // Video is playing
        }).catch(error => {
            // Autoplay was prevented or failed
            // You can show a play button or handle this scenario appropriately
        });

        // Optional: Pause after a certain duration
        const pauseTimeout = setTimeout(() => {
            videoElement.pause();
        }, 1000);

        return () => clearTimeout(pauseTimeout);
    }
}, [src]);


  return (
    <video
      ref={videoRef}
      src={src}
      onLoadStart={onLoad}
      className="w-full h-full"
      muted
      loop
    />
  );
};

const Media = ({ navigateTo, thumbnail, userName, userImage, videoTitle, viewsNumber = 0, videosNumber = false, photosNumber = false }) => {
  const router = useRouter();
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { SERVER_URL } = useContext(UserContext);

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
    <div className=" w-[9.5rem] lg:w-[15rem] h-[13rem]">
      <div
        onMouseOver={() => setIsPreviewed(true)}
        onMouseOut={() => setIsPreviewed(false)}
        onClick={() => router.push(navigateTo)}
        className="relative flex cursor-pointer justify-center h-[9rem] w-[9.5rem] lg:w-[15rem] lg:h-[10rem] border-[1px] border-white"
      >
        {isLoading && <Spinner />}
        {thumbnail[currentThumbnail]?.name.endsWith('.mp4') || thumbnail[currentThumbnail]?.name.endsWith('.webm') ? (
          <VideoThumbnail
            src={`${SERVER_URL}/uploads/${thumbnail[currentThumbnail]?.name}`}
            onLoad={handleImageLoad}
          />
        ) : (
          <Image
            src={`${SERVER_URL}/uploads/${thumbnail[currentThumbnail]?.name}`}
            className="w-full h-full"
            onLoad={handleImageLoad}
            style={{ display: isLoading ? 'none' : 'block' }}
            alt="Thumbnail"
          />
        )}
        <span className="absolute bottom-0 w-full h-[3rem] bg-gradient-to-b from-transparent to-black" />
        <div className="flex justify-between absolute bottom-2 w-[90%] text-white">
          <div className="flex gap-2">
            <IoEyeSharp className="text-[18px] lg:text-[24px] dark:text-white" />
            <span className="font-bold">{viewsNumber}</span>
          </div>
          <div className="flex gap-2">
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
      <div className="flex items-center mt-2 w-[9.5rem] lg:w-[15rem]">
        {
          userImage ?
          <Image onClick={() => router.push(`/${userName}`)} src={userImage.includes("google") ? userImage : `${SERVER_URL}/uploads/${userImage}`} className="rounded-[50%] w-[35px] h-[35px] cursor-pointer" alt={userName} />
          :
          <span onClick={() => router.push(`/${userName}`)} className='flex items-center justify-center rounded-[50%] text-[24px] w-[35px] h-[35px] bg-[#3B3B3B] cursor-pointer'>{userName[0].toUpperCase()}</span>
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
