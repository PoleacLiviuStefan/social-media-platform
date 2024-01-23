import React from 'react';
import { useRouter } from 'next/router';

const TopUsers = ({ topUsers }) => {
    const router = useRouter();

    // Check if topUsers is defined and is an array
    if (!Array.isArray(topUsers)) {
        return <div>Loading...</div>; // or some other placeholder content
    }   

    return (
        <div className='mt-4 cursor-pointer flex flex-wrap justify-between w-full h-[5rem] lg:h-[8rem]'>
            {topUsers.map(user => (
                <div key={user.id} onClick={() => router.push(`/${user.name}`)} className="flex flex-col items-center">
                    {
                        user.userImage ? 
                        <img src={user.userImage.includes("google") ? user.userImage : `${user.userImage}`} className='w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] rounded-[50%]' alt={user.name} />
                        :
                        <span className='flex items-center justify-center w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] text-[45px] lg:text-[60px] rounded-[50%] bg-[#3B3B3B]'>{user?.name[0].toUpperCase()}</span>
                    }
                    <a className='mt-2 text-gray-300 font-bold hover:text-gray-300'>{user.name}</a>
                    <p>Total Views {user.totalViews}</p>
                </div>
            ))}
        </div>
    );
};

export default TopUsers;
