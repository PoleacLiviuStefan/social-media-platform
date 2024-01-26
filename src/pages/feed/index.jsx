import React, { useState } from "react";
import axios from "axios";
import Media from "../../components/Media/Media"; // Adjust the import path as needed
import { useRouter } from 'next/router';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Feed = ({ initialAlbums }) => {
  const [albums, setAlbums] = useState(initialAlbums);
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;
  const itemsPerPage = 15; // Assuming 15 albums per page
  const numberOfPages = Math.ceil(albums.length / itemsPerPage);

  const IndexPage = () => {
    let pageLinks = [];
    for (let i = 0; i < numberOfPages; i++) {
      pageLinks.push(
        <a
          key={i}
          onClick={() => router.push(`/feed?page=${i + 1}`)}
          className={`${currentPage === i + 1 ? "bg-[#ff0000]" : "bg-black"} text-white cursor-pointer px-4 py-1 hover:bg-[#ff0000]`}
        >
          {i + 1}
        </a>
      );
    }
    return pageLinks;
  };

  return (
    <div className="flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <h1 className="text-[18px] lg:text-[28px] font-bold">FEED</h1>
        <div className="mt-[1rem] grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
          {albums.map((album, index) => {
            const images = album.content.filter(file => file.name.endsWith('png') || file.name.endsWith('jpeg') || file.name.endsWith('jpg'));
            const videos = album.content.filter(file => file.name.endsWith('mp4'));
            return (
              <Media
                key={index}
                navigateTo={`/${album.userName}/${album.code}`}
                thumbnail={[...images, ...videos]}
                userName={album.userName}
                userImage={album.userImage}
                videoTitle={album.title}
                viewsNumber={album.views}
                videosNumber={videos.length}
                photosNumber={images.length}
              />
            );
          })}
        </div>
        {
          albums.length!==0 ?    <div className={`flex items-center w-full justify-center mt-[2rem]  text-[26px] text-white `}>
          <a
            onClick={() => {
              if (!(currentPage === 0 || currentPage === 1)) {
                router.replace(`/explore?page=${currentPage - 1}`);
                setPage(currentPage - 1);
              }
            }}
            className={`cursor-pointer ${
              currentPage === 0 || currentPage === 1
                ? "text-gray-400 hover:text-gray-400"
                : "text-white hover:text-white hover:bg-[#ff0000]"
            } bg-black px-2 py-2 `}
          >
            <FaAngleLeft />
          </a>
          {IndexPage()}
          <a
            onClick={() => {
              if (currentPage < numberOfPages) {
                router.replace(`/explore?page=${currentPage + 1}`);
                setPage(currentPage + 1);
              }
            }}
            className={`cursor-pointer ${
              currentPage === numberOfPages
                ? "text-gray-400 hover:text-gray-400"
                : "text-white hover:text-white hover:bg-[#ff0000]"
            } bg-black px-2 py-2 `}
          >
            <FaAngleRight />
          </a>
        </div>
        :
        <p className="text-gray-300">Here you can see the videos of the people you follow</p>
        }
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let initialAlbums = [];
  try {
      // Extract cookies from the incoming request
      const cookies = context.req.headers.cookie;

      const response = await axios.get(`/getMediaFromFollowing`, {
          // Include the cookies in the header of your Axios request
          headers: {
              Cookie: cookies || "", // Forward the cookies, or send an empty string if there are none
          },
      });

      initialAlbums = response.data.albums || [];
      console.log("eqwdsa",response.data)
  } catch (error) {
      console.error('Error fetching albums:', error);
  }

  return {
      props: { initialAlbums },
  };
}


export default Feed;
