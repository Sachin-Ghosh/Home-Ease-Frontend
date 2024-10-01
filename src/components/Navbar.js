import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">HomeEase</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><a>Home</a></li>
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
