import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import { useEffect } from 'react';

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about , _id} = user;
     const dispatch = useDispatch();
    const handleSendRequest = async (status , userId) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status  + "/" + userId, {},
             {withCredentials: true});

            dispatch(removeFeed(userId));
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <div className="card bg-base-300 w-96 shadow-sm ">
                <figure className="px-4 pt-4">
                    <img
                        src={photoUrl}
                        alt="Photo"
                        className="rounded-xl max-h-64 w-auto object-contain"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                        }}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>Age: {age + " , Gender: " + gender}</p>}
                    {about && <p>About: {about}</p>}
                    <div className="card-actions flex justify-center mt-4">
                        <button className="btn btn-primary rounded-full " onClick={ ()=> handleSendRequest("ignored" , _id)}>Ignore</button>
                        <button className="btn btn-secondary rounded-full" onClick={ ()=> handleSendRequest("interested" , _id)}>Intrested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard