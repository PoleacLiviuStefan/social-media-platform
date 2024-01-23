import React, { useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";

const FollowingPage = ({ initialFollowing, initialFollowStatus }) => {
  const [following, setFollowing] = useState(initialFollowing);
  const [currentFollow, setCurrentFollow] = useState(initialFollowStatus);
  const router = useRouter();
  const { userId } = router.query;

  const handleFollow = async (username) => {
    try {
      const response = await axios.post("/followUser", { usernameToFollow: username });
      console.log(response.data.message);
      setCurrentFollow(prev => ({ ...prev, [username]: !prev[username] }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
    <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
      {following.map((user, index) => (
        <div className="flex flex-col gap-4 lg:gap-0 lg:grid lg:grid-cols-7  items-center justify-items-center w-full" key={index}>
          <img onClick={()=>router.push(`/${user.name}`)} src={user.image} className="cursor-pointer w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] rounded-[50%]" />
          <p> onClick={()=>router.push(`/${user.name}`)}{user.name}</p>
          <button
            onClick={() => handleFollow(user.name)}
            className={` ${
              currentFollow[user.name]
                ? "bg-[#eb9898] hover:bg-[#faa0a0]"
                : "border-[#eb9898] text-gray-300 hover:border-[#eb9898]"
            } font-bold text-[14px] lg:text-[16px]  px-4 py-2 rounded-[8px] `}
          >
            {!currentFollow[user.name] ? (
              <div className="flex items-center gap-2">
                <FaCheck /> FOLLOWING
              </div>
            ) : (
              "FOLLOW"
            )}
          </button>
          <p>{user.albumsCount} Albums</p>
          <p>{user.views} Views</p>
          <p>{user.followersCount} Followers</p>
          <p>{user.followingCount} Following</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export async function getServerSideProps(context) {
  const userId = context.params.urlName; // Using urlName as the userId
  let initialFollowing = [];
  let initialFollowStatus = {};

  // Extract cookies from the incoming request
  const cookies = context.req.headers.cookie;

  try {
    const response = await axios.post(`/user/${userId}/following`, {}, {
      headers: {
        Cookie: cookies || "", // Forward the cookies
      },
    });
    initialFollowing = response.data;

    initialFollowStatus = initialFollowing.reduce((acc, user) => {
      // Ensure that every user.isFollowed value is serializable
      acc[user.name] = user.isFollowed != null ? user.isFollowed : false; // Use false (or any other default value) if undefined
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching following data:", error);
    // Handle error appropriately
  }

  return {
    props: {
      initialFollowing,
      initialFollowStatus
    }
  };
}


export default FollowingPage;
