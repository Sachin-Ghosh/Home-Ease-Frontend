import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { PiUser } from "react-icons/pi";
import { FaMapMarkerAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout, authUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [locationName, setLocationName] = useState("Loading...");

  // Ref to the sidebar elements
  const sidebarRef = useRef(null);
  
  // Close sidebar when user clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  // Add event listener to handle clicks outside the sidebar
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocode to get the location name
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=19.357059&longitude=72.906892&localityLanguage=en`);
          const data = await response.json();
          setLocationName(data.locality || "Location not found");
        },
        (error) => {
          console.error(`Error retrieving location: ${error.message}`);
          setLocationName("Location not available");
        }
      );
    } else {
      setLocationName("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (token) {
      getLocation(); // Fetch location when the user is logged in
    }
  }, [token]);

  return (
    <nav className="navbar bg-white shadow-lg">
      <div className="navbar-start">
        <Link
          href={token ? (authUser.role === "customer" ? "/home" : "/") : "/"}
          className="flex items-center justify-center"
        >
          <h1 className="text-xl font-bold hidden md:block text-blue-600">
            HomeEase
          </h1>
        </Link>
      </div>

      {/* Navbar center links */}
      {token && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0 text-blue-600">
            <li>
              <a href="/home" className="hover:text-gray-300">Home</a>
            </li>
            {/* Conditional links based on the user's role */}
            {authUser?.role === "customer" && (
              <>
                <li>
                  <a href="/bookedhistory" className="hover:text-gray-300">Booking History</a>
                </li>
              </>
            )}
            {authUser?.role === "vendor" && (
              <>
                <li>
                  <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
                </li>
                <li>
                  <a href="/schedule" className="hover:text-gray-300">Schedule</a>
                </li>
              </>
            )}
          </ul>

          <div className="pr-10">
            <Link href='/about'>
              <h1 className="text-blue-600 hover:text-gray-300">About Us</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-2 bg-blue-600 border-blue-600 border rounded-full py-2 px-4 shadow-sm">
            <FaMapMarkerAlt className="text-white" />
            <span className="text-white">{locationName}</span>
          </div>
        </div>
      )}

      {/* Navbar end links */}
      <div className="navbar-end">
        {/* If not logged in, show Sign Up and Login buttons */}
        {!token && (
          <>
            <div className="flex-none">
              <Link href="/login" className="flex items-center btn btn-ghost normal-case text-blue-600">
                <PiUser size={24} className="mr-2" />
                Login
              </Link>
            </div>
          </>
        )}

        {/* If logged in, show profile dropdown */}
        {token && (
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <PiUser size={28} className="text-blue-600" />
            </div>
            <ul className="mt-3  p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 z-10">
              {/* Conditional profile link based on user's role */}
              <li>
                <Link href={authUser?.role === "customer" ? "/profile" : "/vendor-profile"} className="text-blue-600 hover:text-gray-300">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-blue-600 hover:text-gray-300">Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
