import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './NavBar'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  
  const fetchUser = async() => {
    // Skip fetch if user exists or on login page
    if(userData || location.pathname === '/login') return;
    
    try { 
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      // Only redirect to login if not already on login page
      if(error.response?.status === 401 && location.pathname !== '/login') {
        navigate("/login");
      }
      console.error("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]); // Re-run when route changes

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== '/login' && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {location.pathname !== '/login' && <Footer />}
    </div>
  )
}

export default Body;