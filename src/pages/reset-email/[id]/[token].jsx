import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

const ChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { id, token } = router.query;

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/reset-email/${id}/${token}`, { email });
      router.push("/explore");
    } catch (err) {
      setError(err.response?.data.error || "An error occurred");
    }
  };

  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col items-center w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px] p-[2rem] h-full w-[90%] lg:w-[80%]">
          <h1 className="text-[24px]">Change Email</h1>
          <form onSubmit={handleReset} className="flex flex-col gap-4 w-full text-gray-300">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
              <label className="whitespace-nowrap">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]"
                type="email"
                required
              />
            </div>
            {error !== "" && <p className="text-red-500">{error}</p>}
            <button type="submit" className="border-[1px] font-bold text-[18px] border-white ease-in-out duration-[.3s] hover:bg-[#0d0d0d] hover:border-[#faa0a0]">
              Change Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
