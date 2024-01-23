import React,{useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Notifications = ({ initialNotifications }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <h1 className="text-[18px] lg:text-[28px] font-bold">NOTIFICATIONS</h1>
        <div className="mt-[1rem]">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Link href={`/${notification.albumCode}`} key={index}>
                <a className="cursor-pointer lg:text-[24px]">
                  <p>{notification.message}</p>
                  {/* Additional details can be displayed here */}
                </a>
              </Link>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};



export async function getServerSideProps(context) {
  let initialNotifications = [];

  // Extract cookies from the context
  const cookies = context.req.headers.cookie;
  
  try {
    // Pass the cookies to the Axios request
    const response = await axios.get('/notifications', {
      headers: {
        Cookie: cookies || '', // Pass the cookies, if available
      },
      withCredentials: true, // Enable credentials
    });

    initialNotifications = response.data.notifications || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }

  return {
    props: { initialNotifications },
  };
}


export default Notifications;
