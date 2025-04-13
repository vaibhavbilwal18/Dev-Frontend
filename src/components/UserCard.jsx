import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about} = user;
    
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
                        <button className="btn btn-primary rounded-full ">Ignore</button>
                        <button className="btn btn-secondary rounded-full">Intrested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard