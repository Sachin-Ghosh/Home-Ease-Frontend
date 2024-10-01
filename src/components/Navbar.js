import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';


export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start ">
      <Link href="/" className="text-2xl font-bold text-blue-600 ml-5">
            Home Ease
       </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><a href='/homePage'>Home</a></li>
          <li><a>Services</a></li>
          <li><a>About Us</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-primary">Get Started</button>
      </div>
    </nav>
  );
}
