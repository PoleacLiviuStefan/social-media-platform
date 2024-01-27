import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  FaPlay,
  FaShare,
  FaCheck,
  FaRegBookmark,
  FaRetweet,
} from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { MdOutlineInsertPhoto, MdGridView } from "react-icons/md";
import { CiHeart, CiChat2, CiBookmark } from "react-icons/ci";
import Media from "../../../components/Media/Media"; // Update path as needed
import { UserContext } from "../../../UserContext"; // Update path as needed
import Link from "next/link";

const MediaPage = ({ initialAlbumData }) => {
  const router = useRouter();
  const { urlName, albumId } = router.query;
  const { user, SERVER_URL } = useContext(UserContext);

  const [album, setAlbum] = useState(initialAlbumData.album);
  const [userName, setUserName] = useState(initialAlbumData.userName);
  const [userImage, setUserImage] = useState(initialAlbumData.userImage);
  const videoRefs = useRef([]);
  const [playing, setPlaying] = useState([]);
  const [commentInput, setCommentInput] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [followedUser, setFollowedUser] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfReposts, setNumberOfReposts] = useState(0);
  const [viewsNumber, setViewsNumber] = useState(0);
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [sugestedPosts, setSugestedPosts] = useState([]);
  const [isAlbumSaved, setIsAlbumSaved] = useState(false);
  const [isAlbumReposted, setIsAlbumReposted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  // ... other state and ref definitions ...
  const imageFormats = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
  ]; // Add more as needed
  const videoFormats = [".mp4", ".webm", ".avi", ".mov", ".flv", ".mkv"]; // Add more as needed

  const isImageFormat = (fileName) =>
    imageFormats.some((ext) => fileName.toLowerCase().endsWith(ext));
  const isVideoFormat = (fileName) =>
    videoFormats.some((ext) => fileName.toLowerCase().endsWith(ext));

  // ... component logic for playVideo, handleLike, handleFollow, etc. ...

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (!router.isReady) return;

    // Now you can safely use router.query
    const { urlName, albumId } = router.query;

    const fetchData = async () => {
      try {
        const albumResponse = await axios.get(`/albums/${albumId}`);
        console.log(albumResponse.data.album);
        setAlbum(albumResponse.data.album);
        setUserName(albumResponse.data.userName);
        setUserImage(albumResponse.data.userImage);
        const videoMaterial =
          albumResponse.data.album.content.filter((file) =>
            file.name.endsWith(".mp4")
          ) || [];
        setPlaying(Array(videoMaterial?.length).fill(false));
        videoRefs.current = videoMaterial?.map(() => React.createRef());
        setNumberOfLikes(albumResponse.data.album.likes);
        setViewsNumber(albumResponse.data.album.views);
        setNumberOfReposts(albumResponse.data.album.reposts);
        const savedResponse = await axios.get(`/isAlbumSaved/${albumId}`);
        setIsAlbumSaved(savedResponse.data.isSaved);

        const repostResponse = await axios.get(`/repostedByUser/${albumId}`);
        setIsAlbumReposted(repostResponse.data.isReposted);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    fetchData();
    const fetchMoreAlbums = async () => {
      try {
        const response = await axios.get(`/getMoreAlbums/${albumId}`);
        console.log("More Albums:", response.data.albums);
        setSugestedPosts(response.data.albums);
        // Process and store these albums as needed
      } catch (error) {
        console.error("Error fetching more albums:", error);
      }
    };
    fetchMoreAlbums();
    axios
      .get(`/album/view/${albumId}`)
      .catch((error) => console.error("Error incrementing views:", error));

    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(`/albums/${albumId}/follow-check`, {
          withCredentials: true, // if you are using cookies for tokens
        });
        setFollowedUser(response.data.isFollowing);
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();

    const checkIfUserLikedAlbum = async () => {
      try {
        const response = await axios.get(`/checkIfAlbumLiked/${albumId}`, {
          withCredentials: true,
        });
        setCurrentUserLiked(response.data.isLiked);
        console.log("checkIfAlbumLiked", response.data);
      } catch (error) {
        console.error("Error checking if user liked the album:", error);
      }
    };

    checkIfUserLikedAlbum();
  }, [albumId]);

  const fetchComments = async () => {
    try {
      console.log(albumId);
      const response = await axios.get(`/getComments/${albumId}`);
      console.log(response.data);
      setCurrentComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleDeleteAlbum = async () => {
    try {
      await axios.delete(`/album/${albumId}`, {
        withCredentials: true,
      });
      router.push(userName); // Redirect to home page or another appropriate page after deletion
    } catch (error) {
      console.error("Error deleting album:", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  useEffect(() => {
    fetchComments();
  }, [albumId]);

  const playVideo = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video?.play();
      const updatedPlaying = playing.slice(); // Copy the playing array
      updatedPlaying[index] = true; // Update the playing status for the clicked video
      setPlaying(updatedPlaying); // Set the new playing status
    }
  };

  const handleLike = async () => {
    setCurrentUserLiked((prev) => !prev);

    try {
      console.log(albumId);
      const response = await axios.post(`/addLikeToAlbum/${albumId}`);
      if (response.data.message === "Like added to album")
        setNumberOfLikes((prev) => prev + 1);
      else setNumberOfLikes((prev) => prev - 1);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post("/followUser", {
        usernameToFollow: userName,
      });
      console.log(response.data.message);
      setFollowedUser((prev) => !prev);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      console.log(albumId);
      // Assume we're sending the commentContent to the server
      const response = await axios.post(`/addComment/${albumId}`, {
        comment: commentContent,
      });

      // Create a new comment object to add to the current comments
      const newComment = {
        username: user.name, // Assuming user.name is the username of the current user
        text: commentContent,
        // Add any other necessary fields that your comment might have
      };

      // Update the state with the new comment
      setCurrentComments((prevComments) => {
        const updatedComments = [...prevComments, newComment];
        console.log("Updated comments:", updatedComments); // Debugging log
        return updatedComments;
      });

      // Clear the comment input field
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleSaveAlbum = async () => {
    setIsAlbumSaved((prev) => !prev);
    try {
      const response = await axios.post(`/addSaveToAlbum/${albumId}`);
      if (response.data.message) {
        console.log("album saved");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRepostAlbum = async () => {
    setIsAlbumReposted((prev) => !prev);
    try {
      const response = await axios.post(`/repostAlbum/${albumId}`);
      if (response.data.message) {
        console.log("album posted");
        setNumberOfReposts((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShareClick = (albumId) => {
    if (isSharing) return; // Prevents initiating a new share if one is already in progress

    setIsSharing(true); // Set sharing status to true
    const urlToShare = `${SERVER_URL}/albums/${albumId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this album",
          url: urlToShare,
        })
        .then(() => {
          console.log("Album shared successfully");
          setIsSharing(false); // Reset sharing status
        })
        .catch((error) => {
          console.log("Error sharing", error);
          setIsSharing(false); // Reset sharing status even if there's an error
        });
    } else {
      console.log("Web Share not supported. URL to share:", urlToShare);
      setIsSharing(false); // Reset sharing status
    }
  };

  if (!album) {
    return <div>Loading...</div>; // Loading state
  }

  const { title: videoTitle, content } = album;
  const imageMaterial = content.filter(
    (file) =>
      file.name.endsWith(".png") ||
      file.name.endsWith(".jpg") ||
      file.name.endsWith(".jpeg")
  );

  // ... JSX for rendering the media page ...

  return (
    <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <div className="flex flex-col lg:items-start items-center w-full">
          <h1 className="font-extrabold text-[22px] lg:[28px] xl:text-[48px] text-white">
            {videoTitle}
          </h1>
          <div className="flex flex-col lg:flex-row items-center my-[1rem] lg:my-[2rem] w-full justify-between items-center ">
            <div className="flex items-center gap-2 lg:gap-4">
              <a
                onClick={() => router.push(`/${userName}`)}
                className="flex items-center gap-2 text-[16px] lg:text-[22px] font-bold text-white cursor-pointer hover:text-white whitespace-nowrap"
              >
                {userImage ? (
                  <img
                    src={
                      userImage.includes("google")
                        ? userImage
                        : `${SERVER_URL}/uploads/${userImage}`
                    }
                    className="cursor-pointer rounded-[50%] w-[70px] h-[70px]"
                  />
                ) : (
                  <span className="flex items-center justify-center cursor-pointer rounded-[50%] w-[70px] h-[70px] text-[42px] bg-[#3B3B3B] text-white">
                    {userName[0].toUpperCase()}
                  </span>
                )}
                {userName.toUpperCase()}
              </a>
              <button
                onClick={handleFollow}
                className={` ${
                  (user == null || userName == user?.name) && "hidden"
                }  ${
                  !followedUser
                    ? "bg-[#eb9898] hover:bg-[#faa0a0]"
                    : "border-[#eb9898] text-gray-300 hover:border-[#eb9898]"
                } font-bold text-[14px] lg:text-[18px] px-4 py-2 rounded-[8px]`}
              >
                {followedUser ? (
                  <div className="flex items-center gap-2 ">
                    <FaCheck className="text-white" /> FOLLOWING
                  </div>
                ) : (
                  "FOLLOW"
                )}
              </button>
              {userName == user?.name && (
                <button
                  onClick={handleDeleteAlbum}
                  className="bg-red-500 text-white font-bold transition ease-in-out duration-[.3s] px-4 py-2 text-[14px] lg:text-[15px] border-none hover:bg-red-400 hover:border-none"
                >
                  DELETE POST
                </button>
              )}
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col  items-center gap-1 lg:gap-4">
              <div className="flex gap-4 items-center">
                <span className="flex items-center gap-1 text-white">
                  <IoEyeSharp className="text-[18px] lg:text-[24px] text-white" />{" "}
                  {viewsNumber}
                </span>
                <span className="flex items-center gap-1">
                  <MdOutlineInsertPhoto className="text-[18px] lg:text-[24px] text-white" />
                  {imageMaterial.length}
                </span>
                <span className="flex items-center gap-1">
                  <BsFillCameraReelsFill className=" text-[16px] lg:text-[20px] text-white" />
                  {content.length - imageMaterial.length}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className={`flex  items-center border-[1px]  h-[2.5rem] hover:border-[#FDAAAA] hover:text-[#FDAAAA] bg-transparent ${
                    currentUserLiked
                      ? "text-pink-400 border-pink-400"
                      : "border-white text-white "
                  } px-2 rounded-[8px]`}
                  disabled={user == null}
                >
                  {/*Likes Number*/}
                  <CiHeart className="text-[18px] lg:text-[24px] text-white " />
                  {numberOfLikes}
                  <span className="hidden lg:inline ml-1">LIKES</span>
                </button>

                <button
                  onClick={handleRepostAlbum}
                  className={`flex  items-center border-[1px]   h-[2.5rem] bg-transparent hover:border-[#FDAAAA] hover:text-[#FDAAAA] px-2 ${
                    isAlbumReposted
                      ? " text-pink-400 border-pink-400"
                      : "border-white text-white"
                  } rounded-[8px]`}
                  disabled={user == null}
                >
                  {/*Likes Number*/}

                  <FaRetweet className="text-[18px] lg:text-[24px] h-[2.5rem] text-white" />
                  {numberOfReposts}
                  <span className="hidden lg:inline ml-1 ">
                    {isAlbumReposted ? "REPOSTED" : "REPOST"}
                  </span>
                </button>
                <button
                  onClick={() => handleShareClick(album.code)}
                  disabled={isSharing} // Disable the button when sharing is in progress
                  className="flex items-center gap-1 border-[1px] border-white bg-transparent hover:border-[#FDAAAA] hover:text-[#FDAAAA] h-[2.5rem] px-2 rounded-[8px]"
                >
                  <FaShare className="text-[18px] lg:text-[26px] text-white" />
                  <span className="hidden lg:inline text-white">SHARE</span>
                </button>
                <button
                  onClick={handleSaveAlbum}
                  className={`flex ${
                    user == null && "hidden"
                  } items-center gap-1 border-[1px] h-[2.5rem] border-white hover:border-[#FDAAAA] hover:text-[#FDAAAA] ${
                    isAlbumSaved ? "bg-red-500" : ""
                  } rounded-[8px] px-2`}
                >
                  {isAlbumSaved ? (
                    <>
                      <FaCheck className="text-[16px] lg:text-[22px] text-white" />
                      <span className="hidden lg:inline text-white">SAVED</span>
                    </>
                  ) : (
                    <>
                      <FaRegBookmark className="text-[16px] lg:text-[22px] text-white" />
                      <span className="hidden lg:inline">SAVE</span>
                    </>
                  )}
                </button>
              </div>
              {user === null && (
                <a
                  onClick={() => router.push("/login")}
                  className="cursor-pointer font-bold text-white hover:text-white"
                >
                  Login to interact with the post
                </a>
              )}
            </div>
          </div>
        </div>
        {imageMaterial.map((img, index) => (
          <>
            <div
              key={index}
              className="flex   items-center justify-center w-full h-[40rem] bg-black"
            >
              <Link href={`/${userName}/${album.code}/${img.code}`}>
                <img
                  src={`${SERVER_URL}/uploads/${img.name}`}
                  className="cursor-pointer object-contain max-w-full max-h-full"
                  alt={`Image ${index}`}
                />
              </Link>
            </div>
          </>
        ))}
        {content
          .filter((file) => file.name.match(/\.(mp4|mov|avi|flv|wmv)$/i)) // Filters for multiple video formats
          .map((vid, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full lg:h-[40rem] lg:bg-black"
            >
              <Link href={`/${userName}/${album.code}/${vid.code}`}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={`${SERVER_URL}/uploads/${vid.name}`}
                  className="cursor-pointer object-contain max-w-full max-h-[40rem]"
                  controls
                  muted
                />
              </Link>
              {!playing[index] && (
                <button
                  className="absolute z-30 text-[120px] center hidden text-white"
                  onClick={() => playVideo(index)}
                >
                  <FaPlay />
                </button>
              )}
            </div>
          ))}

        <div className="flex flex-col">
          <h2 className="mb-4 flex items-center gap-2 text-[18px] lg:text-[28px] text-gray-300">
            <CiChat2 className="text-[48px] " />
            Comments
          </h2>
          {currentComments && currentComments.length > 0 ? (
            currentComments.map((comment, index) => (
              <div key={index} className="flex gap-4">
                <a
                  onClick={() => router.push(`/${comment.username}`)}
                  className="text-[#faa0a0]"
                >
                  {" "}
                  {comment.username}:
                </a>{" "}
                <p key={index}>{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No comments yet</p>
          )}
          {!commentInput ? (
            user == null ? (
              <a
                onClick={() => router.push("/login")}
                className="cursor-pointer font-bold text-white hover:text-white"
              >
                Login to add a comment
              </a>
            ) : (
              <button
                onClick={() => setCommentInput(true)}
                className="mt-8 bg-[#1B1E20] w-[15rem] border-[1px]  border-white text-white"
              >
                Add a comment
              </button>
            )
          ) : (
            <div className="mt-8 flex flex-col items-center lg:items-start p-2">
              <div className="flex flex-col items-center">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="p-2 w-full lg:w-[25rem]"
                  maxLength={160}
                />
                <button
                  onClick={() => {
                    handleAddComment();
                    fetchComments();
                  }}
                  className="mt-4 border-white border-[1px] w-full lg:w-[10rem] text-white"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-8 flex items-center gap-2 text-[18px] lg:text-[28px] text-gray-300">
          <MdGridView className="text-[48px] " />
          See More Posts
        </p>
        <div className="mt-[1rem] grid grid-cols-2 md:grid-cols-4  xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
          {sugestedPosts.map((album, index) => {
            const images = album.content.filter((file) =>
              isImageFormat(file.name)
            );
            const videos = album.content.filter((file) =>
              isVideoFormat(file.name)
            );
            console.log(album.code);

            return (
              <Media
                key={index}
                navigateTo={`/${album.originalOwnerName}/${album.code}`} // Use the unique album code for navigation
                thumbnail={[...images, ...videos]}
                userImage={album.originalOwnerImage}
                userName={album.originalOwnerName} // Using userName from the album
                videoTitle={album.title}
                viewsNumber={album.views}
                videosNumber={videos.length}
                photosNumber={images.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { urlName, albumId } = context.params;
  let initialAlbumData = {};

  try {
    const response = await axios.get(`/albums/${albumId}`);
    initialAlbumData = response.data;
  } catch (error) {
    console.error("Error fetching album data:", error);
    // Handle error as needed
  }

  return {
    props: { initialAlbumData },
  };
}

export default MediaPage;
