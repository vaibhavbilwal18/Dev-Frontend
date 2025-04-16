import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Current requests in component:", requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Review request failed:", err);
      setError("Failed to process request");
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("API response data:", res.data);
      
      // Extract the data array from the response
      const requestsData = res.data.data || [];
      console.log("Extracted requests data:", requestsData);
      
      // Dispatch the actual array of requests
      dispatch(addRequests(requestsData));
    } catch (err) {
      console.error("Fetch requests failed:", err);
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }

  if (error) {
    return <h1 className="flex justify-center my-10 text-red-500">{error}</h1>;
  }

  if (!requests || requests.length === 0) {
    return <h1 className="flex justify-center my-10">No Requests Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl mb-8">Connection Requests</h1>

      <div className="max-w-2xl mx-auto">
        {requests.map((request) => {
          console.log("Rendering request:", request);
          
          if (!request.fromUserId) {
            console.error("Missing fromUserId in request:", request);
            return null;
          }

          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex m-4 p-4 rounded-lg bg-base-300 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center flex-1">
                <div className="flex-shrink-0">
                  <img
                    alt={`${firstName}'s photo`}
                    className="w-20 h-20 rounded-full object-cover border-2 "
                    src={photoUrl}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div className="ml-6 flex-1">
                  <h2 className="font-bold text-xl text-primary-content">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-base-content opacity-90">
                      {age + " years, " + gender}
                    </p>
                  )}
                  {about && (
                    <p className="text-base-content opacity-75 mt-2 line-clamp-2">
                      {about}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <button
                  className="btn btn-error btn-sm hover:btn-error/80"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success btn-sm hover:btn-success/80"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;