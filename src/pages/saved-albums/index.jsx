import React,{useEffect,useState} from "react";
import axios from 'axios';
import Media from "../../components/Media/Media"; // Adjust the import path as needed

const SavedAlbums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        window.scrollTo({top:0,left:0})
        const fetchSavedAlbums = async () => {
            try {
                const response = await axios.get('/getSavedAlbums', {
                    withCredentials: true // Necessary for including cookies
                });
                setAlbums(response.data.savedAlbums || []);
            } catch (error) {
                console.error('Error fetching saved albums:', error);
                // Handle error as needed
            }
        };

        fetchSavedAlbums();
    }, []);

    return (
        <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
            <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
                <h1 className="text-[18px] lg:text-[28px] font-bold">SAVED ALBUMS</h1>
                <div className="mt-[1rem] grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
                    {albums.length === 0 ? (
                        <p>No albums saved yet</p>
                    ) : (
                        albums.map((album, index) => {
                            const images = album.content.filter(file => file.name.endsWith('png') || file.name.endsWith('jpeg') || file.name.endsWith('jpg'));
                            const videos = album.content.filter(file => file.name.endsWith('mp4'));

                            const albumUserName = album.originalOwnerName || album.userName;
                            const albumUserImage = album.originalOwnerImage || album.userImage;

                            return (
                                <Media
                                    key={index}
                                    navigateTo={`/${albumUserName}/${album.code}`}
                                    thumbnail={[...images, ...videos]}
                                    userName={albumUserName}
                                    userImage={albumUserImage}
                                    videoTitle={album.title}
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



export default SavedAlbums;
