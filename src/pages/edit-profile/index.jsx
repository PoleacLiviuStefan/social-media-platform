import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { UserContext } from "../../UserContext"; // Adjust the import path as needed
import { useRouter } from "next/router";

const EditProfilePage = ({ initialData }) => {
  const { user, setUser, SERVER_URL } = useContext(UserContext);
  const [userName, setUserName] = useState(initialData.name || "");
  const [bio, setBio] = useState(initialData.bio || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState(initialData.email || "");
  const [profileImage, setProfileImage] = useState(initialData.image || "");
  const [sent, setSent] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(false);
  const [showImageEdits, setShowImageEdits] = useState(false);
  const [isCommentsDisabled, setIsCommentsDisabled] = useState(initialData.isCommentDisabled);
  const [isAccountPrivate, setIsAccountPrivate] = useState(initialData.isAccountPrivate || false);
  const [isDownloadDisabled,setIsDownloadDisabled]=useState(false);
  const [error, setError] = useState("");
  const [deleteWindow,setDeleteWindow] = useState(false);
  const fileInputRef = useRef(null);
  const router=useRouter();
  // ... rest of your component logic ...
  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasDigit && hasSpecialChar;
  };
  const isValidUsername = (username) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
  };
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    console.log(userName);
    if(isValidUsername(userName))
    {
    try {
      const response = await axios.put("/updateDetails", {
        newUsername: userName,
        newBio: bio,
      });
      console.log(response.data.message);
      fetchUserInfo();
      // Update user context or state as needed
      setUser((prevUser) => ({
        ...prevUser,
        name: userName,
        bio: bio,
        image: profileImage,
      }));

      // Handle additional success operations like notifications
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., showing error message to the user)
    }
  }
  else
  setError("Username must contain only letters, digits, and underscores");
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/mainInfo"); // Endpoint to get user info
      console.log(response.data);
      setUserName(response.data.name);
      setBio(response.data.bio);
      setUserEmail(response.data.email);
      setProfileImage(response.data.image);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error (e.g., redirect to login, show error message)
    }
  };

  const hideAllComments = async () => {
    setIsCommentsDisabled((prev) => !prev);
    try {
      const response = await axios.get("/hideAllComents"); // Endpoint to get user info
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error (e.g., redirect to login, show error message)
    }
  };

  const handlePrivateAccount = async () =>{
    setIsAccountPrivate(prev=>!prev);
    try {
      const response = await axios.post("/togglePrivacy"); // Endpoint to get user info
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error (e.g., redirect to login, show error message)
    }
  }
  const handleDownloadAlbums = async () =>{
    setIsDownloadDisabled(prev=>!prev);

    try {
      const response = await axios.post("/disableAlbumDownloads"); // Endpoint to get user info
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error (e.g., redirect to login, show error message)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setError(
        "Password must contain at least a digit, an uppercase letter, and a special character"
      );
      setPassword("");
      setConfirmPassword("");
      return;
    } else if (password.length < 7) {
      setError("Password is too short");
      setPassword("");
      setConfirmPassword("");
    }
    else if(password!==confirmPassword)
    {
      setError("Passwords don't match");
      setPassword("");
      setConfirmPassword("");
    }
    else
    try {
      const response = await axios.put(
        "/updatePassword",
        {
          newPassword: password,
          confirmPassword: confirmPassword,
        },
        {
          withCredentials: true, // Include this if your server requires cookies
        }
      );

      // Handle success
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const handleChangeEmail = () => {
    console.log("da");

    axios
      .post("/change-email", { email: userEmail })
      .then((res) => {
        setSent(true);
      })
      .catch((err) => console.log(err));
  };

  const checkOptions = async () => {
    try {
      const response = await axios.get("/checkOptions");
      console.log(response.data);

      setIsCommentsDisabled(response.data.hidden);
      setIsAccountPrivate(response.data.isPrivate)
    } catch (error) {
      console.error("Error checking comments visibility:", error);
      // Handle error (e.g., showing error message to the user)
    }
  };

  const handleUpdateProfilePicture = async (file) => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("image", file); // 'file' should be the image file to upload
    console.log(formData);
    try {
      // Send a POST request to the backend
      const response = await axios.post("/uploadProfileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include this if your server requires cookies (for the token)
      });

      // Handle the response
      console.log(response.data.message);
      setProfileImage(response.data.filename
      );

      // Update user context or state as needed
      setUser((prevUser) => ({
        ...prevUser,
        image: `${SERVER_URL}/uploads/${response.data.filename}`,
      }));
    } catch (error) {
      console.error("Error updating profile picture:", error);
      // Handle errors (e.g., showing an error message to the user)
    }
  };

  const removeProfileImage = async () => {
    try {
      // Making a request to the backend to remove the profile image
      const response = await axios.post(
        "/removeProfileImage",
        {},
        {
          withCredentials: true, // Include this if your server requires cookies
        }
      );

      if (response.data.message) {
        console.log(response.data.message);
        // Update the local state to reflect the change
        setProfileImage(null);

        // Update user context or state as needed
        setUser((prevUser) => ({
          ...prevUser,
          image: null,
        }));
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setProfileImage(null);
      // Handle errors (e.g., showing error message to the user)
    }
  };

  const handleDeleteAccount= async () =>{
    try {
      // Making a request to the backend to remove the profile image
      const response = await axios.post(
        "/deleteAccount",
        {},
        {
          withCredentials: true, // Include this if your server requires cookies
        }
      );

      if (response.data.message) {
        console.log(response.data.message);
        // Update user context or state as needed
    }
   } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  }

  return (
 <div className="relative flex flex-col items-center min-w-screen w-full min-h-screen h-full font-montSerrat bg-[#1b1e20]">
      {showImageEdits && (
        <div className="fixed flex justify-center z-50 bg-black bg-opacity-[70%] w-full h-screen">
          <div className="absolute top-[10rem] gap-6 lg:gap-10 flex flex-col justify-center items-center bg-[#1B1E20] h-[15rem] w-[90%] lg:w-[35rem] rounded-[15px]">
            <span
              onClick={() => setShowImageEdits(false)}
              className="cursor-pointer absolute top-1 right-1 bg-[#171717] hover:bg-[#0a0a0a] px-4 py-2 font-bold rounded-[5px]"
            >
              Cancel
            </span>
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-[80%] bg-[#eb9898] hover:bg-[#faa0a0] font-bold text-[14px] lg:text-[15px]"
            >
              Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleUpdateProfilePicture(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button
              onClick={removeProfileImage}
              className="w-[80%] bg-[#eb9898] hover:bg-[#faa0a0] font-bold text-[14px] lg:text-[15px] "
            >
              Remove Image
            </button>
          </div>
        </div>
      )}

      {
        deleteWindow && 
        <div className="fixed flex justify-center z-50 bg-black bg-opacity-[70%] w-full h-screen">
  <div className="absolute top-[10rem] gap-6 lg:gap-10 flex flex-col justify-center items-center bg-[#1B1E20] h-[15rem] w-[90%] lg:w-[35rem] rounded-[15px]">
  <p className="font-bold text-center">ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?</p>
    <button onClick={()=>{handleDeleteAccount(); router.replace("explore")}} className="font-bold bg-green-500 w-[10rem] transition ease-in-out duration-[.3s]  hover:bg-green-600">CONFIRM</button>
    <button onClick={()=>setDeleteWindow(false)} className="font-bold bg-red-500 w-[10rem] hover:bg-red-600">CANCEL</button>
    </div>
        </div>
      }
      <div className="flex gap-8 flex-col items-center w-full lg:w-[65rem] py-[4rem] lg:py-[8rem]">
        <div className="relative">
          <span
            onClick={() => setShowImageEdits(true)}
            onMouseEnter={() => setHoverEdit(true)}
            onMouseLeave={() => setHoverEdit(false)}
            className="cursor-pointer absolute flex items-center justify-center  bottom-0 right-2 bg-[#EB9898] rounded-[50%] w-[35px] lg:w-[50px] h-[35px] lg:h-[50px]"
          >
            <BsFillPencilFill
              className={`text-[16px] lg:text-[24px] ease-in-out duration-[.3s] ${
                hoverEdit ? "text-white" : "text-black "
              }`}
            />
          </span>
          {profileImage ? (
            <img
            src={ profileImage.includes("google") ? profileImage: `
            ${SERVER_URL}/uploads/${profileImage}` }
              className="rounded-[50%] w-[10rem] h-[10rem]"
              alt="Profile"
            />
          ) : (
            <span className="flex items-center justify-center w-[120px] lg:w-[200px] h-[120px] lg:h-[200px] text-[110px] lg:text-[180px] rounded-[50%] bg-[#3B3B3B]">
              {user?.name[0].toUpperCase()}
            </span>
          )}
        </div>
        <h1 className=" text-[28px]">{userName}</h1>
        <div className="flex flex-col w-full h-full bg-[#111314] p-12 gap-4 rounded-[15px] ">
          <form
            onSubmit={(e) => handleUpdateDetails(e)}
            className="flex flex-col gap-4"
          >
            <h4 className="text-gray-300 lg:text-[22px] font-bold">Username</h4>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={16}
              className="py-2 px-4"
            />
            <p className="text-red-500 font-bold"> {error==="Username must contain only letters, digits, and underscores" && "Username must contain only letters, digits, and underscores"} </p>
            <h4 className="text-gray-300 lg:text-[22px] font-bold">Bio</h4>
            <textarea
              maxLength={60}
              type="text"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="py-2 px-4"
            />

            <button className="flex justify-center w-full mt-2 cursor-pointer text-white text-[14px] lg:text-[15px]  font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]">
              Update
            </button>
          </form>
          <form
            onSubmit={(e) => handlePasswordUpdate(e)}
            className="mt-8 flex flex-col gap-4"
          >
            <h4 className="text-gray-300 lg:text-[22px] font-bold">Password</h4>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4"
            />
            <h4 className="text-gray-300 lg:text-[22px] font-bold">
              Confirm Password
            </h4>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="py-2 px-4"
            />

            <button
              type="submit"
              className="flex justify-center w-full mt-2 cursor-pointer text-white text-[14px] lg:text-[15px] font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] hover:text-white hover:bg-[#faa0a0]"
            >
              Update Password
            </button>
            {
              error==="Password must contain at least a digit, an uppercase letter, and a special character"
              ?
              <p className="text-red-500 font-bold">Password must contain at least a digit, an uppercase letter, and a special character</p>
              : error==="Password is too short" ?
              <p className="text-red-500 font-bold"> The password is too short, it should contain at least 7 characters including a digit, a capital letter, and a symbol</p>
              :
              error==="Passwords don't match"
              && 
              <p className="text-red-500 font-bold">Passwords don&apos;t match</p>
            }
          </form>
          <div className="flex flex-col gap-4">
            <h4 className="text-gray-300 lg:text-[22px] font-bold">Email</h4>
            <div className="flex items-center gap-4">
              <p>{userEmail}</p>
              <a
                onClick={handleChangeEmail}
                className="cursor-pointer font-bold text-[#EB9898] text-[14px] lg:text-[15px] hover:text-[#faa0a0]"
              >
                Change Email
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-gray-300 lg:text-[22px] font-bold">Options</h4>
            <label className="gap-2">
              <input
                type="checkbox"
                onChange={hideAllComments}
                checked={!isCommentsDisabled}
              />
              Disable comments on my albums
            </label>
            <label className="gap-2">
              <input type="checkbox" onChange={handleDownloadAlbums} /> Disable download on my albums{" "}
            </label>
            <label className="gap-2">
              <input  type="checkbox" onChange={handlePrivateAccount} checked={!isAccountPrivate} /> Make my account Private{" "}
            </label>
          </div>

          <h4 className="text-gray-300 lg:text-[22px] font-bold">
            Delete my account
          </h4>
          <div  className="flex items-center gap-4">
            <p>Permanently delete account</p>{" "}
            <button onClick={()=>setDeleteWindow(true)} className="flex justify-center  mt-2 cursor-pointer text-white font-bold bg-[#eb9898] w-[8rem] py-2 rounded-[8px] whitespace-nowrap hover:text-white hover:bg-[#faa0a0]">
              click here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let initialData = {};

  try {
    // Extract cookies from the incoming request
    const cookies = context.req.headers.cookie;

    const response = await axios.get(`/mainInfo`, {
      headers: {
        Cookie: cookies || "", // Forward the cookies, or send an empty string if none are present
      },
    });

    initialData = response.data;
    console.log(initialData);
    console.log("Initial data:", response.data);
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }

  return {
    props: { initialData }, // Pass data to the page as props
  };
}


export default EditProfilePage;
