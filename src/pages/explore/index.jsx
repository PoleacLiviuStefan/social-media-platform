import React, { useContext } from "react";
import axios from "axios";
import Media from "../../components/Media/Media";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaAngleLeft, FaAngleRight, FaUser } from "react-icons/fa";
import TopUsers from "../../components/TopUsers/TopUsers";
import { UserContext } from "../../UserContext";

const Explore = ({ albums, currentPage, topUsers }) => {
  const itemsPerPage = 15;
  const numberOfPages = Math.ceil(albums?.length / itemsPerPage);
  const router = useRouter();
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
  const IndexPage = () => {
    let allRefs = [];
    for (let i = 0; i < numberOfPages; i++) {
      allRefs.push(
        <a
          key={i}
          onClick={() => {
            router.push(`/explore?page=${i + 1}`);
            window.scrollTo({ top: 0, left: 0 });
          }}
          className={`${
            currentPage === i + 1 ? "bg-[#ff0000]" : "bg-black"
          } text-white font-bold cursor-pointer px-2 lg:px-4 py-1 hover:bg-[#ff0000] hover:text-white text-[15px]`}
        >
          {i + 1}
        </a>
      );
    }
    return allRefs;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAlbums = albums?.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center relative font-montSerrat bg-[#1b1e20] min-w-screen w-full min-h-screen h-full">
      <div className="flex flex-col  w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <h1 className="text-[18px] lg:text-[28px] font-bold text-white">EXPLORE</h1>
        <ul className="flex my-4 gap-4 lg:text-[20px] font-extrabold text-white">
          <li className="flex flex-col">
            <Link
              href="/explore"
              className="text-white cursor-pointer hover:text-white px-4 bg-[#ff0000] rounded-[5px]"
            >
              TRENDING
            </Link>
          </li>
          <li className="flex flex-col">
            <Link
              href="/explore/new"
              className="text-white cursor-pointer hover:text-white px-4 rounded-[5px]"
            >
              NEW
            </Link>
          </li>
        </ul>
        <div className="grid justify-items-center grid-cols-2 md:grid-cols-4  xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
          {currentAlbums?.map((album, index) => {
            // Filter images and videos
            const images = album.content.filter((file) =>
              isImageFormat(file.name)
            );
            const videos = album.content.filter((file) =>
              isVideoFormat(file.name)
            );
            console.log(images);

            return (
              <Media
                key={index}
                navigateTo={`/${album.userName}/${album.code}`} // Use the unique album code for navigation
                thumbnail={[...images, ...videos]}
                userName={album.userName} // Using userName from the album
                userImage={album.userImage}
                videoTitle={album.title}
                viewsNumber={album.views}
                videosNumber={videos?.length}
                photosNumber={images?.length}
              />
            );
          })}
        </div>
        <div className="flex items-center mt-[2rem] w-full justify-center text-[26px] text-white">
          <a
            onClick={() => {
              if (currentPage > 1) {
                router.push(`#/explore?page=${currentPage - 1}`);
                setPage(currentPage - 1);
                window.scrollTo({ top: 0, left: 0 });
              }
            }}
            className={`cursor-pointer ${
              currentPage === 1
                ? "text-gray-400 hover:text-gray-400"
                : "text-white hover:text-white hover:bg-[#ff0000]"
            } bg-black px-2 py-1`}
          >
            <FaAngleLeft />
          </a>
          {IndexPage()}
          <a
            onClick={() => {
              if (currentPage < numberOfPages) {
                router.push(`#/explore?page=${currentPage + 1}`);
                setPage(currentPage + 1);
                window.scrollTo({ top: 0, left: 0 });
              }
            }}
            className={`cursor-pointer ${
              currentPage === numberOfPages
                ? "text-gray-400 hover:text-gray-400"
                : "text-white hover:text-white hover:bg-[#ff0000]"
            } bg-black px-2 py-1`}
          >
            <FaAngleRight />
          </a>
        </div>
        <div className="flex items-center text-white">
          <FaUser className="mt-7 lg:mt-4 text-[22px] lg:text-[38px]" />
          <h2 className="ml-2 mt-[2rem] text-[22px] lg:text-[32px] font-bold ">
            Top Users
          </h2>
        </div>
        <TopUsers topUsers={topUsers} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  let albums = [];
  let topUsers = [];
  let mediaData = [];

  try {
    // Fetch albums
    const albumsResponse = await axios.get(`/getRandomAlbum`);
    albums = albumsResponse.data.albums || [];

    // Fetch top users
    const topUsersResponse = await axios.get(`/getTopUsers`);
    console.log("topUsers", topUsersResponse);
    topUsers = topUsersResponse.data || [];

    // Fetch additional media data (adjust the endpoint as needed)
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      albums,
      currentPage: parseInt(page, 10),
      topUsers,
    },
  };
}

export default Explore;
