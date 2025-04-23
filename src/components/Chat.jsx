import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const location = useLocation();

  const targetUserName = location.state?.fullName || "User";
  const targetUserPhotoUrl =
    location.state?.photoUrl ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    // Format messages with timestamp (createdAt field)
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg; // Use createdAt as the timestamp
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        timestamp: createdAt, // Add timestamp (createdAt) here
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, timestamp: createdAt }, // Include createdAt as timestamp
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    const timestamp = new Date().toISOString(); // Add timestamp here
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
      timestamp, // Include timestamp
    });
    setNewMessage("");
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`; // Format to HH:MM
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <div className="p-5 border-b border-gray-600 flex items-center gap-4">
        <img
          src={targetUserPhotoUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-lg font-semibold">{targetUserName}</h1>
      </div>

      <div className="flex-1 overflow-scroll p-2">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header flex items-center">
                {/* <div>{`${msg.firstName} ${msg.lastName}`}</div> */}
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-xs opacity-50 mr-2">
                    {/* {formatTimestamp(msg.timestamp)} Display formatted timestamp */}
                  </span>
                </div>
              </div>
              <div className="chat-bubble flex items-center ml-0">
                <span>{msg.text}</span>
                <span className="text-xs opacity-50 ml-2">
                    {formatTimestamp(msg.timestamp)} {/* Display formatted timestamp */}
                  </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
