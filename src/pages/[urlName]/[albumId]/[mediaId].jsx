import React, { useState, useContext,useRef,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaPlay } from "react-icons/fa";

import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/router";
import { UserContext } from "../../../UserContext"; // Update the import path as needed

const SingleMedia = ({ initialMediaItem, initialIsLiked }) => {
  const router = useRouter();
  const { urlName, albumId, mediaId } = router.query;
  const [mediaItem, setMediaItem] = useState(initialMediaItem);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPlaying, setIsPlaying] = useState(false);
  const { SERVER_URL } = useContext(UserContext);
  const [prevHref,setPrevHref]=useState(mediaItem?.mediaIndex < mediaItem?.contentCodes.length - 1
    ? `/${urlName}/${albumId}/${
        mediaItem?.contentCodes[parseInt(mediaItem?.mediaIndex) + 1]
      }`
    : `/${urlName}/${albumId}`);
  const [nextHref,setNextHref]=useState(mediaItem?.mediaIndex < mediaItem?.contentCodes.length - 1 
    ? `/${urlName}/${albumId}/${mediaItem?.contentCodes[parseInt(mediaItem?.mediaIndex) + 1]}`
    : `/${urlName}/${albumId}/${mediaItem?.contentCodes[0]}`);

  const videoFormats = ["mp4", "mov", "avi", "flv", "wmv", "mkv"];
  const isVideo = (fileName) => {
    return videoFormats.some((extension) =>
      fileName?.toLowerCase().endsWith(`.${extension}`)
    );
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = (e) => {
    e.preventDefault(); // Prevent default link behavior
    const newMediaId = mediaItem?.contentCodes[parseInt(mediaItem?.mediaIndex) - 1];
    if (0 < mediaItem?.mediaIndex) {
      fetchMediaItem(albumId, newMediaId); // Assuming this is an async function
      setPrevHref(`/${urlName}/${albumId}/${newMediaId}`);
      router.replace(`/${urlName}/${albumId}/${newMediaId}`)
    } else {
      setPrevHref(`/${urlName}/${albumId}`);
      router.replace(`/${urlName}/${albumId}`)
    }
  };
  const handleNext = (e)=>{
    e.preventDefault(); // Prevent default link behavior
    const nextIndex = parseInt(mediaItem?.mediaIndex) + 1;
    if (nextIndex < mediaItem?.contentCodes.length) {
      const newMediaId = mediaItem?.contentCodes[nextIndex];
      fetchMediaItem(albumId, newMediaId); // Assuming this is an async function
      setNextHref(`/${urlName}/${albumId}/${newMediaId}`);
      router.replace(`/${urlName}/${albumId}/${newMediaId}`)
    } else {
      // Navigate back to the album page at the end of the media items
      fetchMediaItem(albumId, mediaItem?.contentCodes[0]);
      setNextHref(`/${urlName}/${albumId}/${mediaItem?.contentCodes[0]}`);
      router.replace(`/${urlName}/${albumId}/${mediaItem?.contentCodes[0]}`)
    }
  }


  
  const handleLike = async () => {
    try {
      const response = await axios.post(`/${albumId}/likeMedia/${mediaId}`);
      if (response.status === 200) {
        setMediaItem((prevMediaItem) => {
          const updatedLikes = isLiked
            ? prevMediaItem.mediaItem.likes - 1
            : prevMediaItem.mediaItem.likes + 1;

          return {
            ...prevMediaItem,
            mediaItem: {
              ...prevMediaItem.mediaItem,
              likes: updatedLikes,
            },
          };
        });
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error liking media item:", error);
    }
  };
  const fetchMediaItem = async (albumId, mediaId) => {
    try {
      const response = await axios.get(`${albumId}/${mediaId}`);
      setMediaItem(response.data);
      const likeResponse = await axios.get(`${albumId}/${mediaId}/isLiked`);
      setIsLiked(likeResponse.data.hasLiked);
    } catch (error) {
      console.error("Error fetching new media item:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <div className="flex flex-col items-center w-full h-full bg-[#111314] p-12 gap-4 rounded-[15px]">
          {mediaItem ? (
            <div>
              {isVideo(mediaItem?.mediaItem.name) ? (
                          <div
           
                          className="relative flex items-center justify-center w-full lg:h-[40rem] lg:bg-black"
                        >
                <video
                  ref={videoRef}
                  src={`${SERVER_URL}/uploads/${mediaItem?.mediaItem.name}`}
                  controls
                  muted
                />
                <div onClick={togglePlay} className={`absolute left-0 top-0 h-full w-full flex items-center justify-center ${isPlaying && "hidden"}`}>
                <span className="flex justify-center items-center bg-black bg-opacity-[60%] p-12 rounded-[50%]">
                  <FaPlay className="ml-2  text-[42px] lg:text-[64px] text-white  " />
                </span>
              </div>
              </div>
              ) : (
                <img
                  src={`${SERVER_URL}/uploads/${mediaItem?.mediaItem.name}`}
                  alt={mediaItem?.mediaItem.name}
                />
              )}
            </div>
          ) : (
            <p>Loading media item...</p>
          )}

          {/* Navigation and Like buttons here */}
          <div className="flex mt-[1rem] lg:mt-[3rem] justify-between w-full">
            <Link href={prevHref} className="text-white hover:text-white">
              <button onClick={handlePrevious} className="flex items-center gap-1 px-4 py-2 rounded-[8px] font-bold lg:text-[20px] transition ease-in-out duration-[.3s] bg-red-600 border-0 hover:bg-red-500 hover:border-0">
                {mediaItem?.mediaIndex === 0 ? (
                  "Back To Album"
                ) : (
                  <>
                    <FaArrowAltCircleLeft className="lg:text-[26px]" /> Previous
                  </>
                )}
              </button>
            </Link>
            <Link href={nextHref} className="text-white hover:text-white">
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 rounded-[8px] font-bold lg:text-[20px] transition ease-in-out duration-[.3s] bg-green-500 border-0 hover:bg-green-400 hover:border-0"
              >
                {mediaItem?.mediaIndex ===
                mediaItem?.contentCodes.length - 1 ? (
                  "To the beginning"
                ) : (
                  <>
                    Next <FaArrowAltCircleRight className="lg:text-[26px]" />
                  </>
                )}
              </button>
            </Link>
          </div>
          <span className="bg-white h-[1px] w-full opacity-[50%]" />
          <div
            onClick={handleLike}
            className="flex items-center gap-1 text-[20px] font-bold w-full cursor-pointer"
          >
            <CiHeart
              className={`text-[24px] lg:text-[32px] ${
                isLiked && "text-red-500"
              } `}
            />
            <span className={`${isLiked && "text-red-500"}`}>
              {mediaItem?.mediaItem.likes} Likes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { urlName, albumId, mediaId } = context.params;
  let initialMediaItem = null;
  let initialIsLiked = false;

  try {
    const mediaResponse = await axios.get(`${albumId}/${mediaId}`);
    initialMediaItem = mediaResponse.data;

    const likeResponse = await axios.get(`${albumId}/${mediaId}/isLiked`);
    initialIsLiked = likeResponse.data.hasLiked;
  } catch (error) {
    console.error("Error fetching media item and like status:", error);
    // Handle error as needed
  }

  return {
    props: { initialMediaItem, initialIsLiked },
  };
}

export default SingleMedia;
