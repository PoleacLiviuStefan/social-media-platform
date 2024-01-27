import React, { useState, useContext } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserContext } from '../../UserContext'; // Adjust the import path as needed
import Notification from '../../components/Notification/Notification'; // Adjust path as necessary
import Link from "next/link";

const Login = () => {
    const { setUser, SERVER_URL } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${SERVER_URL}/api/login`, {
                email,
                password
            });

            setUser(data);
            window.location.assign('/explore');
        } catch (e) {
            console.log(e.response?.data.error);
            setPassword("");
            setError(e.response?.data.error);
        }
    };

    return (
        <div className="relative flex flex-col justify-center lg:justify-start items-center w-screen h-screen font-montSerrat bg-[#1b1e20]">
            <div className="flex flex-col items-center w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
                {error && <Notification messageStatusFrom="Login" />}
                <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px]  p-[2rem] h-full w-[90%] lg:w-[80%]">
      <h1 className="text-[24px] text-white">Login</h1>
        <form onSubmit={(e)=>handleLogin(e)} className="flex flex-col gap-4 lg:gap-10 w-full text-gray-300">
        <div className="relative flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label className={`whitespace-nowrap ${error && "text-red-500"}`}> Your Email</label>
          
          <input onChange={(e)=>setEmail(e.target.value)} value={email}  className={`${error && "border-[1px] border-red-500"}  px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px] bg-transparent`} type="email"  required />
        {error && <p className="absolute top-[70px] lg:top-10 text-red-500">The credentials don&apos;t match our records</p>}
          </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
                <label className="whitespace-nowrap"> Password </label>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}  className="px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px] bg-transparent" type="password"  required />
          </div>
        <button type="submit" className="mt-4 border-[1px] font-bold lg:text-[18px] py-2 rounded-[8px] ease-in-out duration-[.3s] hover:bg-[#0d0d0d] border-[1px] border-white hover:border-[#faa0a0]">Login</button>

        </form>

        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 w-full">
        <Link href="/register" className="cursor-pointer text-gray-300 hover:text-gray-300">Don&apos;t have an account? Register</Link>
        <Link href="/recover" className="cursor-pointer text-gray-300 hover:text-gray-300">Don&apos;t remember the password? Recover</Link>
        </div>
        </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    // Perform server-side actions here if necessary. 
    // For the login page, this will likely just return default props.
    return {
        props: {}, // you can pass some default props if needed
    };
}

export default Login;
