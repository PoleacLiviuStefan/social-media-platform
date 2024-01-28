import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/router';

const SearchBar = ({handleCurrentSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    
    const handleSearch = () => {
        handleCurrentSearch(searchQuery);
        if (searchQuery.trim() !== "") {
          router.push(`/search/${encodeURIComponent(searchQuery)}`);
          setSearchQuery("");
        }
    };

    return (
        <div  className='flex justify-center lg:items-center w-full  py-[2rem]'>
            <div className="inline relative hidden lg:items-center lg:flex lg:w-[30rem]">
                <button
                    onClick={handleSearch}
                    className="absolute  top-[-1px] left-0 cursor-pointer bg-transparent border-none hover:border-none"
                >
                    <FaSearch />
                </button>
                <input
                    className="rounded-[10px] w-[15rem] lg:w-[30rem] h-[2rem] px-[3rem] bg-transparent"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
            </div>
       
           
            <input
                className=" lg:hidden rounded-[10px] w-[90%] h-[2rem] px-[3rem] bg-transparent"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
       
        </div>
    );
}

export default SearchBar;
