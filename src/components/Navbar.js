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

  // Ref to the sidebar element
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
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
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
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <Link
          href={token ? (authUser.role === "customer" ? "/home" : "/") : "/"}
          className="flex items-center justify-center"
        >
          <h1 className="text-xl font-bold hidden md:block text-nowrap">
            HomeEase
          </h1>
        </Link>
      </div>

      {/* Navbar center links */}
      {token && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <li>
              <a href="/home">Home</a>
            </li>
            {/* Conditional links based on the user's role */}
            {authUser?.role === "customer" && (
              <>
                <li>
                  <a href="/bookedhistory">Booking History</a>
                </li>
              </>
            )}
            {authUser?.role === "vendor" && (
              <>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="/schedule">Schedule</a>
                </li>
              </>
            )}
          </ul>

          <div className="flex items-center space-x-2 bg-white border rounded-full py-2 px-4 shadow-sm">
            <FaMapMarkerAlt className="text-blue-500" />
            <span className="text-gray-700">{locationName}</span>
          </div>
        </div>
      )}

      {/* Navbar end links */}
      <div className="navbar-end">
        {/* If not logged in, show Sign Up and Login buttons */}
        {!token && (
          <>
            <li style={{ listStyleType: "none" }}>
              <Link href="/create-account" className="text-white font-semibold bg-red-600">
                Sign Up
              </Link>
            </li>
            <div className="flex-none">
              <Link href="/login" className="flex items-center btn btn-ghost normal-case text-xl text-primary">
                <PiUser size={24} className="mr-2" />
                Login
              </Link>
            </div>
          </>
        )}

        {/* If logged in, show profile dropdown */}
        {token && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <PiUser size={28} />
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              {/* Conditional profile link based on user's role */}
              <li>
                <Link href={authUser?.role === "customer" ? "/profile" : "/vendor-profile"}>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
