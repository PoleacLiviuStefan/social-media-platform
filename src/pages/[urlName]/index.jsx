// Import necessary libraries and components
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Media from '../../components/Media/Media';
import { useRouter } from 'next/router';
import { UserContext } from '../../UserContext';

const Profile = ({ initialAlbums, userInitial, username }) => {
    const router = useRouter();
    const [albums, setAlbums] = useState(initialAlbums);
    const { user, SERVER_URL } = useContext(UserContext);
    const [userStats,setUserStats] = useState(userInitial);
    // Calculate total views
    const totalViews = albums.reduce((acc, album) => acc + (album.views || 0), 0);

    // Client-side navigation and interaction methods here (if any)

    return (
        <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
        <div className="flex flex-col items-center w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
            {userStats.image ?
                <img src={userStats.image.includes("google") ? userStats.image : `${SERVER_URL}/uploads/${userStats.image}`} className="rounded-[50%] w-[10rem] h-[10rem]" alt={userStats.name} />
                : userStats.name ?
                    <span className='flex items-center justify-center w-[120px] lg:w-[200px] h-[120px] lg:h-[200px] text-[110px] lg:text-[180px] rounded-[50%] bg-[#3B3B3B]'>
                        {userStats.name[0].toUpperCase()}
                    </span>
                    : <span className='flex items-center font-mono justify-center w-[120px] lg:w-[200px] h-[120px] lg:h-[200px] text-[110px] lg:text-[180px] rounded-[50%] bg-[#3B3B3B]'>{user?.name[0].toUpperCase()}</span>
            }
            <h1 className="mt-2 text-[28px] text-white">{userStats.name}</h1>
            <div className="flex gap-4">
                {user && user.name === username && (
                    <>
                        <a onClick={() => router.push("/edit-profile")} className="flex justify-center mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Edit Profile</a>
                        <a onClick={() => router.push("/upload")} className="flex justify-center mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">Create Album</a>
                    </>
                )}
            </div>
            <div className="mt-[1rem] flex justify-between text-gray-300 font-bold text-[14px] w-[20rem]">
                <span><i>{albums.length}</i> ALBUMS</span>
                <span><i>{totalViews}</i> VIEWS</span>
                <a onClick={() => router.push(`/${userStats.name}/following`)} className='font-bold cursor-pointer text-gray-300 hover:text-white'><i>{userStats.followingCount}</i> Following</a>
                <span><i>{userStats.followersCount}</i> Followers</span>
            </div>
            <p className='mt-4 w-[80%] lg:w-[20rem] text-gray-300 text-center'>{user?.bio}</p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 items-center gap-4 lg:gap-6 xl:gap-10 justify-center flex-wrap w-full">
                {albums.map((album, index) => {
                    const images = album.content.filter(file => file.name.endsWith('png') || file.name.endsWith('jpeg') || file.name.endsWith('jpg'));
                    const videos = album.content.filter(file => file.name.endsWith('mp4'));
                    const albumUserName = album.originalOwnerName || album.userName || username;
                    const albumUserImage = album.originalOwnerImage || userStats.image;

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
                })}
            </div>
        </div>
    </div>
    );
};

// Server-side data fetching
export async function getServerSideProps(context) {
    const { urlName = null } = context.params;
    let initialAlbums = [];
    let userInitial = {};

    if (!urlName) {
        return {
            redirect: {
                destination: '/explore',
                permanent: false,
            },
        };
    }

    // Extract cookies from the incoming request
    const cookies = context.req.headers.cookie;

    try {
        const endpoint = `/userAlbums/${urlName}`; // Replace with your actual API URL
        const res = await axios.get(endpoint, {
            headers: {
                Cookie: cookies || "", // Forward the cookies
            },
        });
        initialAlbums = res.data.albums || [];

        const statsResponse = await axios.post(`/user/${urlName}`, { // Replace with your actual API URL
            headers: {
                Cookie: cookies || "", // Forward the cookies
            },
        });
        userInitial = statsResponse.data;
    } catch (err) {
        console.error(err);
    }

    return {
        props: {
            initialAlbums,
            userInitial,
            username: urlName // Pass urlName as username
        },
    };
}



export default Profile;
