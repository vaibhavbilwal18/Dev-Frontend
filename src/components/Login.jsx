import React, { useState , } from 'react';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
const Login = () => {
  const [emailID, setEmailID] = useState("bilwal@gmail.com");
  const [password, setPassword] = useState("Bilwal@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId: emailID,  // changed key
        password: password,
      },{withCredentials: true}  
     );
     dispatch(addUser(res.data));
     return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      
    }
  };

  return (
    <div className="flex justify-center bg-base-100 my-10">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="form-control w-full">
              <label className="label">
                <span className="label-text text-neutral-content">Email ID</span>
              </label>
              <input
                type="email"
                value={emailID}
                className="input input-bordered bg-neutral-focus text-neutral-content w-full"
                placeholder="Enter your email"
                onChange={(e) => setEmailID(e.target.value)}
              />
              
              <label className="label mt-4">
                <span className="label-text text-neutral-content">Password</span>
              </label>
              <input
                type="password"
                value={password}
                className="input input-bordered bg-neutral-focus text-neutral-content w-full"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className=" flex justify-center  text-red-500">{error}</p>
          <div className="card-actions justify-end mt-6">
            <button 
              className="btn btn-primary" 
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;