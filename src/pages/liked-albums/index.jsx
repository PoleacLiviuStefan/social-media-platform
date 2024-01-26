import React, { useState, useContext } from "react";
import axios from "axios";
import Media from "../../components/Media/Media";
import { useRouter } from "next/router";
import { UserContext } from "../../UserContext"; // Adjust the import path as needed

const LikedAlbums = ({ initialAlbums }) => {
  const [albums, setAlbums] = useState(initialAlbums);
  const router = useRouter();
  const { user, setUser, SERVER_URL } = useContext(UserContext);
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
    imageFormats.some((ext) => fileName?.toLowerCase().endsWith(ext));
  const isVideoFormat = (fileName) =>
    videoFormats.some((ext) => fileName?.toLowerCase().endsWith(ext));

  return (
    <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <h1 className="text-[18px] lg:text-[28px] font-bold">LIKED VIDEOS</h1>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4  xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
          {albums.length === 0 ? (
            <p>No videos liked yet</p>
          ) : (
            albums.map((album, index) => {
              const images =
                album.thumbnail?.filter((file) => isImageFormat(file.name)) ||
                [];
              const videos =
                album.thumbnail?.filter((file) => isVideoFormat(file.name)) ||
                [];

              return (
                <Media
                  key={index}
                  navigateTo={`/${album.userName}/${album.code}`}
                  thumbnail={[...images, ...videos]}
                  userName={album.userName}
                  userImage={album.userImage}
                  videoTitle={album.videoTitle}
                  viewsNumber={album.views}
                  videosNumber={videos.length}
                  photosNumber={images.length}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let initialAlbums = [];

  // Extract protocol and host from the incoming request to construct the full URL

  try {
    // Extract cookies from the incoming request
    const cookies = context.req.headers.cookie;

    const response = await axios.get("/getLikedAlbums", {
      // Include the cookies in the header of your Axios request
      headers: {
        Cookie: cookies || "", // Forward the cookies, or send an empty string if there are none
      },
    });
    console.log(response.data);
    initialAlbums = response.data || [];
  } catch (error) {
    console.error("Error fetching albums:", error);
  }

  return {
    props: { initialAlbums },
  };
}

export default LikedAlbums;
