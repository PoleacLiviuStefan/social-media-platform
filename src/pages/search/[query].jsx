import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Media from '../../components/Media/Media'; // Update the import path as needed
import { useRouter } from 'next/router';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SearchResults = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(parseInt(router.query.page, 10) || 0);
    const [albums, setAlbums] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [query, setQuery] = useState(router.query.query || '');

    useEffect(() => {
        window.scrollTo({top:0,left:0})
        const fetchAlbums = async () => {
            setQuery(router.query.query);
            try {
                const response = await axios.get(`/search?query=${router.query.query}&page=${currentPage}`);
                setAlbums(response.data.albums || []);
                setNumberOfPages(Math.ceil(response.data.albums.length / 15));
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        // Only fetch albums if currentPage or query changes
        if (currentPage !== parseInt(router.query.page, 10) || query !== router.query.query) {
            fetchAlbums();
        }
    }, [currentPage, router.query.query, router.query.page]);


    const IndexPage = () => {
        let pageRefs = [];
        for (let i = 0; i < numberOfPages; i++) {
            pageRefs.push(
                <a
                    key={i}
                    onClick={() => {
                        router.push(`/search/${query}?page=${i + 1}`);
                        setCurrentPage(i + 1);
                    }}
                    className={`${currentPage === i + 1 ? "bg-[#ff0000]" : "bg-black"} text-white lg:text-[22px] cursor-pointer ease-in-out duration-[.3s] text-[15px] px-2 py-1 hover:bg-[#ff0000] hover:text-white`}
                >
                    {i + 1}
                </a>
            );
        }
        return pageRefs;
    };

    return (
        <div className={`flex flex-col items-center relative font-montSerrat bg-[#1b1e20] min-w-screen w-full min-h-screen h-full`}>
            <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
                <h1 className="text-[18px] lg:text-[28px] font-bold">Search Results for &quot;{query}&quot;</h1>
                <div  className="mt-4 grid justify-items-center grid-cols-2 md:grid-cols-4  xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
                    {albums.map((album, index) => {
                        const images = album.content.filter(file => file.name.endsWith('png') || file.name.endsWith('jpeg') || file.name.endsWith('jpg'));
                        const videos = album.content.filter(file => file.name.endsWith('mp4'));
                        return (
                            <Media
                                key={index}
                                navigateTo={`/${album.originalOwnerName}/${album.code}`}
                                thumbnail={[...images, ...videos]}
                                userName={album.originalOwnerName}
                                userImage={album.originalOwnerImage}
                                videoTitle={album.title}
                                viewsNumber={album.views}
                                videosNumber={videos.length}
                                photosNumber={images.length}
                            />
                        );
                    })}
                </div>
                <div className="mt-[2rem] flex items-center w-full justify-center text-[30px] text-white ">
                    <FaAngleLeft
                        onClick={() => {
                            if (currentPage > 1) {
                                router.push(`/search/${query}?page=${currentPage - 1}`);
                                setCurrentPage(currentPage - 1);
                            }
                        }}
                        className={`cursor-pointer ${(currentPage <= 1) ? "text-gray-400 hover:text-gray-400" : "text-white hover:text-white hover:bg-[#ff0000]"} bg-black px-2 py-2 `}
                    />
                    {IndexPage()}
                    <FaAngleRight
                        onClick={() => {
                            if (currentPage < numberOfPages) {
                                router.push(`/search/${query}?page=${currentPage + 1}`);
                                setCurrentPage(currentPage + 1);
                            }
                        }}
                        className={`cursor-pointer ${currentPage === numberOfPages ? "text-gray-400 hover:text-gray-400" : "text-white hover:text-white hover:bg-[#ff0000]"} bg-black px-2 py-2 `}
                    />
                </div>
            </div>
        </div>
    );
};




export default SearchResults;
