// components/CheckAge.js
import React from 'react';

const CheckAge = ({ checkAgeToParent }) => {
  return (
    <div className='absolute z-30 flex justify-center items-center min-w-screen w-full min-h-screen h-full backdrop-blur-md'>
      <div className='flex flex-col items-center shadow-[0px_1px_40px_-2px_rgba(255,255,255,0.50)]
 py-[4rem] bg-gray-800  rounded-[12px] h-[35rem] w-[25rem]'>
        <p className='font-bold text-[24px]'>AGE VERIFICATION</p>
        <p className='mt-3 w-[90%] text-gray-300 text-center'>This website contains age-restricted materials including nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from and you consent to viewing sexually explicit content.</p>
        <button onClick={() => checkAgeToParent(true)} className='mt-4 font-bold bg-[#FF0000] text-[18px]  ease-in-out duration-[.3s] hover:bg-[#e6001a] hover:outline-none hover:border-0'>I AM 18 OR OLDER - ENTER</button>
      </div>
    </div>
  );
}

export default CheckAge;
