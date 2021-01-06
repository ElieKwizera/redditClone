import Link from 'next/link';
import React from 'react'

const Navbar = () =>
{
    return (
        <div className="fixed inset-x-0 top-0 z-10 items-center bg-white flex px-3 py-3 ">
        <div className="flex items-center">
          <p className="text-3xl">
            <Link href="/" >Reddit</Link>
          </p>
        </div>

        <div className="flex bg-gray-100 mx-auto border rounded">
          <i className="fas fa-search text-gray-500 py-3 px-2"/>
          <input type="text" className="py-2 pr-4 bg-gray-100" placeholder="Search..."/>
        </div>
        <div className="flex right-0 px-3">
          <Link href="/login">
          <a className = "rounded border border-blue-500 py-1 font-medium px-5 text-blue-500 mx-2"> Login </a>
          </Link>
          <Link href="/register">
          <a className = "rounded border border-blue-500 bg-blue-500 py-1 font-medium px-5 text-white mx-2"> Register </a>
          </Link>
        </div>
      </div>
    );
}

export default Navbar;

