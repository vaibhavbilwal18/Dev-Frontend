import axios from 'axios';
import React from 'react';
import { useSelector , useDispatch  } from 'react-redux';
import { Link ,  useNavigate} from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogout = async () => {
    try {
        await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return Navigate("/login");
  }catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-sm">
      <div className="flex-1">
        <p className="btn btn-ghost text-xl">🔗 Dev-Cord</p>
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
                <Link  to= "/profile" className="justify-between hover:bg-neutral-focus">
                  Profile
                  <span className="badge badge-neutral">New</span>
                </Link>
              </li>
              <li><Link to = "/" className="hover:bg-neutral-focus">Feed's</Link></li>
              <li><Link to = "/connection" className="hover:bg-neutral-focus">Connection's</Link></li>
              <li><Link to = "/request" className="hover:bg-neutral-focus">Request Users</Link></li>
              <li><Link to = "/premium" className="hover:bg-neutral-focus">Premium</Link></li>
              <li><a onClick={handleLogout} className="hover:bg-neutral-focus">Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;