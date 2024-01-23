import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/router';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFullSearch, setShowFullSearch] = useState(false);
    const router = useRouter();
    
    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
          router.push(`/search/${encodeURIComponent(searchQuery)}`);
          setSearchQuery("");
        }
    };

    return (
        <div className='flex justify-center w-full'>
            <div className="inline relative hidden lg:flex lg:w-[30rem]">
                <button
                    onClick={handleSearch}
                    className="absolute  top-[.5rem] left-[1rem] cursor-pointer bg-transparent"
                >
                    <FaSearch />
                </button>
                <input
                    className="rounded-[10px] w-[10rem] lg:w-[30rem] h-[2rem] px-[3rem]"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
            </div>
            <input
                className="lg:hidden rounded-[10px] w-[70%] h-[2rem] px-[3rem]"
                placeholder="Search"
                value={searchQuery}
                onClick={() => setShowFullSearch(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
        </div>
    );
}

export default Navbar;
