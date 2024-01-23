// pages/dmca-contact/index.jsx
import React from "react";

const DmcaContact = () => {
  return (
    <div className="flex flex-col items-center relative font-montSerrat bg-[#1b1e20] min-w-screen w-full min-h-screen h-full">
      <div className="flex flex-col w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <p className="text-[20px] lg:text-[32px] font-bold">Email:</p>
      
      </div>
    </div>
  );
};

export default DmcaContact;

// Optional: SSR Function
export async function getServerSideProps(context) {
  // Perform server-side data fetching here if necessary
  return {
    props: {}, // will be passed to the page component as props
  };
}
