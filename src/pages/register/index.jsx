import React, { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Notification from "../../components/Notification/Notification"; // Adjust path as necessary
import { useRouter } from 'next/router'; 

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const router = useRouter(); 

  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasDigit && hasSpecialChar;
  };



  useEffect(() => {
    // Start the timer when an error occurs
    if (error !== "" && timeLeft === 15) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [error]);

  useEffect(() => {
    // Reset error and stop the timer when time is up
    if (timeLeft === 0) {
      setError("");
      setTimeLeft(15); // Reset the timer for the next error
    }
  }, [timeLeft]);


  // Error timer logic remains unchanged

  const isValidUsername = (username) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Form validation and registration logic remains unchanged
    if (!isValidUsername(userName)) {
        setError("Username must contain only letters, digits, and underscores");
        setPassword("");
        setConfirmPassword("");
        return;
    } else if (!isValidPassword(password)) {
        setError("Password must contain at least a digit, an uppercase letter, and a special character");
        setPassword("");
        setConfirmPassword("");
        return;
    } else if (password.length < 7) {
        setError("Password is too short");
        setPassword("");
        setConfirmPassword("");
    } else if (password !== confirmPassword) {
        setError("Passwords don't match");
        setPassword("");
        setConfirmPassword("");
        return;
    }

    try {
        await axios.post("/register", {
            name: userName,
            email: email,
            password: password,
        });
        router.replace("/login"); 
    } catch (e) {
        setPassword("");
        setConfirmPassword("");

        // Improved error handling
        if (e.response && e.response.data && e.response.data.error) {
            setError(e.response.data.error);
        } else {
            // Fallback error message
            setError("Registration failed, please try again later");
        }
    }
};


  return (
    <div className="relative flex flex-col justify-center lg:justify-start items-center w-full min-w-screen h-full min-h-screen font-montSerrat bg-[#1b1e20]">
      {/* Page content */}
      <div className="flex flex-col items-center w-[90%] lg:w-[65rem] xl:w-[76rem] py-[4rem] lg:py-[8rem]">
        <div className="relative flex flex-col items-start gap-4 bg-[#0f1112] rounded-[15px]  p-[2rem] h-full w-[90%] lg:w-[80%]">
          <h1 className="text-[24px]">Register</h1>
          <form
            onSubmit={(e) => handleRegister(e)}
            className="flex flex-col gap-10 w-full text-gray-300"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full ">
              <label className="whitespace-nowrap"> Your Username</label>

              <input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className={`${
                  error ===
                    "Username must contain only letters, digits, and underscores" &&
                  "border-[1px] border-red-500"
                } px-[1rem] py-1 w-full lg:w-[80%] rounded-[8px]`}
                type="text"
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
              <label className="whitespace-nowrap"> Your Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]"
                type="email"
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
              <label className="whitespace-nowrap"> Password </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={`${
                  error !== "" &&
                  error !==
                    "Username must contain only letters, digits, and underscores" &&
                  "border-[1px] border-red-500"
                }  px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]`}
                type="password"
                required
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-2 w-full">
              <label className="whitespace-nowrap"> Comfirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className={`${
                  error !== "" &&
                  error !==
                    "Username must contain only letters, digits, and underscores" &&
                  "border-[1px] border-red-500"
                }  px-[1rem] py-1  w-full lg:w-[80%] rounded-[8px]`}
                type="password"
                required
              />
            </div>
            {error === "Password is too short" ? (
              <p className="text-red-500 font-bold">
                The password is too short, it should contain at least 7
                characters including a digit, a capital letter, and a symbol
              </p>
            ) : error ===
              "Password must contain at least a digit, an uppercase letter, and a special character" ? (
              <p className="text-red-500 font-bold">
                Password must contain at least a digit, an uppercase letter, and
                a special character
              </p>
            ) : error === "Passwords don't match" ? (
              <p className="text-red-500 font-bold">Passwords don&apos;t match</p>
            ) : (
              error ===
                "Username must contain only letters, digits, and underscores" && (
                <p className="text-red-500 font-bold">
                  Username must contain only letters, digits, and underscores
                </p>
              )
            )}

            <button
              type="submit"
              className="border-[1px] font-bold text-[18px] py-2 rounded-[8px] border-[1px] border-white ease-in-out duration-[.3s] hover:bg-[#0d0d0d]  hover:border-[#faa0a0]"
            >
              Create Account
            </button>
            <Link href="/login" className="cursor-pointer text-gray-300 hover:text-gray-300">
                You already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

// Since no server-side data fetching is required for this page,
// getServerSideProps is not implemented.
