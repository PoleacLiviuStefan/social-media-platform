import React, { useState } from "react";
import axios from 'axios'

const Recover = () => {
  const [email, setEmail] = useState("");
  const [sent,setSent] = useState(false);

  const handleRecover= (e)=> {
      e.preventDefault();
      if(!sent)
      axios.post('/recover', {email})
      .then(res => {
          setSent(true);
      }).catch(err => console.log(err))
  }


  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
      <div className="flex flex-col items-center w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px]  p-[2rem] h-full w-[90%] lg:w-[80%]">
        <h1 className="text-[24px]">Recover Account</h1>
          <form onSubmit={(e)=>handleRecover(e)} className="flex flex-col gap-4 w-full text-gray-300">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full ">
              <label className="whitespace-nowrap"> Your Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]"
                type="text"
                required
              />
            </div>
            <button type="submit" disabled={sent} className="border-[1px] font-bold text-[18px] border-[1px] border-white ease-in-out duration-[.3s] hover:bg-[#0d0d0d]  hover:border-[#faa0a0]">{!sent ? "Send Reset Email" : "Email sent"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recover;
