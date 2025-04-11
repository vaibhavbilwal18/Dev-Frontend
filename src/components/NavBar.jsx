import React from 'react';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨🏻‍💻 daisyUI</a>
      </div>
      <div className="flex gap-2 items-center">
        <input 
          type="text" 
          placeholder="Search" 
          className="input input-bordered w-24 md:w-auto bg-neutral-focus text-neutral-content placeholder:text-neutral-content/50" 
        />
        {user && (
          <div className="dropdown dropdown-end">
            <p className="mr-2">Welcome, {user.firstName}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full mr-2">
                <img
                  alt="User Photo"
                  src={user.photoUrl}
                  className="border border-white"
                />
              </div>
            </div>
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral rounded-box z-[100] mt-3 w-52 p-2 shadow text-neutral-content"
            >
              <li>
                <a className="justify-between hover:bg-neutral-focus">
                  Profile
                  <span className="badge badge-neutral">New</span>
                </a>
              </li>
              <li><a className="hover:bg-neutral-focus">Settings</a></li>
              <li><a className="hover:bg-neutral-focus">Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;