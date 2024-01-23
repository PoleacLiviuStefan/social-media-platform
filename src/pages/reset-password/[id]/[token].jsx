import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { id, token } = router.query;

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Handle password mismatch error
      console.log("Passwords do not match");
      return;
    }

    try {
      await axios.post(`/reset-password/${id}/${token}`, { password });
      // Redirect to login page after successful password reset
      router.push("/login");
    } catch (err) {
      // Handle error response
      console.log(err);
    }
  };

  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col items-center w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px] p-[2rem] h-full w-[90%] lg:w-[80%]">
          <h1 className="text-[24px]">Reset Password</h1>
          <form onSubmit={handleReset} className="flex flex-col gap-4 w-full text-gray-300">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
              <label className="whitespace-nowrap">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]"
                type="password"
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
              <label className="whitespace-nowrap">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]"
                type="password"
                required
              />
            </div>
            <button type="submit" className="border-[1px] font-bold text-[18px] border-white ease-in-out duration-[.3s] hover:bg-[#0d0d0d] hover:border-[#faa0a0]">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
