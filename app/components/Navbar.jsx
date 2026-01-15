"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-base-100 shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <div className="navbar min-h-16">
          {/* LEFT / MOBILE */}
          <div className="navbar-start">
            <div className="dropdown">
              <button
                tabIndex={0}
                className="btn btn-ghost md:hidden"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Mobile menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-base-100 p-2 shadow-lg"
              >
                <li>
                  <Link href="/">Store</Link>
                </li>
                <li>
                  <Link href="/shopping">Shopping List</Link>
                </li>
                <li>
                  <Link href="/kitchen">Kitchen</Link>
                </li>
              </ul>
            </div>

            {/* Brand */}
            <span className="hidden md:block font-semibold text-lg">
              Grocery Tracker
            </span>
          </div>

          {/* CENTER / DESKTOP */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-8 font-medium">
              <li>
                <Link className="hover:text-base-100 transition" href="/">
                  Store
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-base-100 transition"
                  href="/shopping"
                >
                  Shopping List
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-base-100 transition"
                  href="/kitchen"
                >
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end">
            {/* Placeholder for auth / profile later */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
