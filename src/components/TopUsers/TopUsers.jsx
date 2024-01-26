import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from "../../UserContext"; // Adjust the import path as needed

const TopUsers = ({ topUsers }) => {
    const router = useRouter();
    const { SERVER_URL } = useContext(UserContext);

    if (!Array.isArray(topUsers)) {
        return <div>Loading...</div>; // or some other placeholder content
    }

    return (
        <div className='mt-4 cursor-pointer grid grid-cols-3 lg:grid-cols-6 w-full h-[5rem] lg:h-[8rem]'>
            {topUsers.map(user => (
                <div key={user.id} onClick={() => router.push(`/${user.name}`)} className="my-2 flex flex-col items-center">
                    {   
                        user.userImage ? 
                        <img
                            src={user.userImage.includes("google") ? user.userImage : `${SERVER_URL}/uploads/${user.userImage}`} 
                            alt={user.name}
                            className='rounded-[50%] w-[50px] lg:w-[70px] h-[50px] lg:h-[70px]'
                        />
                        :
                        <span className='flex items-center justify-center w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] text-[40px] lg:text-[50px] rounded-[50%] bg-[#3B3B3B]'>{user?.name[0].toUpperCase()}</span>
                    }
                    <a className='mt-2 text-gray-300 font-bold hover:text-gray-300 whitespace-nowrap'>{user.name}</a>
                    <p>Total Views {user.totalViews}</p>
                </div>
            ))}
        </div>
    );
};

export default TopUsers;
