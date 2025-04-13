import React, { useEffect } from 'react'
import { Outlet , useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './NavBar'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  
  const fetchUser = async() => {
    if(userData) return;
    try { 
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if(error.response.status === 401) {
        navigate("/login");
      }
      // navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body;