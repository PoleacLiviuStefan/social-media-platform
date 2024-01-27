import React, { useState } from "react";
import axios from "axios";
import Media from "../../components/Media/Media"; // Adjust the import path as needed
import { useRouter } from 'next/router';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Feed = () => {
  const [albums, setAlbums] = useState();
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;
  const itemsPerPage = 15; // Assuming 15 albums per page
  const numberOfPages = Math.ceil(albums.length / itemsPerPage);
  const imageFormats = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'tiff', 'svg'];
  const videoFormats = ['mp4', 'mov', 'wmv', 'flv', 'avi', 'mkv', 'webm'];

  // Helper function to check file format
  const isFileOfType = (fileName, formats) => {
    return formats.some(format => fileName.toLowerCase().endsWith(`.${format}`));
  };
  const IndexPage = () => {
    let pageLinks = [];
    for (let i = 0; i < numberOfPages; i++) {
      pageLinks.push(
        <a
          key={i}
          onClick={() => router.push(`/feed?page=${i + 1}`)}
          className={`${currentPage === i + 1 ? "bg-[#ff0000]" : "bg-black"} text-white font-bold cursor-pointer  px-2 lg:px-4 py-1 text-[15px] hover:bg-[#ff0000]`}
        >
          {i + 1}
        </a>
      );
    }
    return pageLinks;
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/getMediaFromFollowing`);
        setAlbums(response.data.albums || []);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
      setLoading(false);
    };

    fetchAlbums();
  }, []); // Dependency array is empty, so this runs once on mount
  return (
    <div className="flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <h1 className="text-[18px] lg:text-[28px] font-bold">FEED</h1>
        <div className="mt-[1rem] grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
        {albums.map((album, index) => {
            // Filter images and videos based on defined formats
            const images = album.content.filter(file => isFileOfType(file.name, imageFormats));
            const videos = album.content.filter(file => isFileOfType(file.name, videoFormats));

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
            } bg-black px-2 py-1 `}
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
            } bg-black px-2 py-1 `}
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




export default Feed;
