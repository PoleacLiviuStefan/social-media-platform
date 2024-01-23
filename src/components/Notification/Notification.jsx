import React from 'react';

const Notification = ({ messageStatusFrom, messageError }) => {
  return (
    <div className="fixed z-50 top-[-5rem] animate-[showNotification_15s_ease-in-out] flex flex-col justify-center items-center w-[200px] h-[50px] font-montSerrat bg-[#eb9898] rounded-[8px]">
      <p className='text-center font-bold'>
        {messageError === "Passwords don't match" ? "Passwords don't match" : messageStatusFrom === "Login" && "The email or password are incorrect"}
      </p>
    </div>
  );
};

export default Notification;
