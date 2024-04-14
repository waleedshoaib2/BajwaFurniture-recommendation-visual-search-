import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AdminChat.css";
const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      try {
        const response = await axios.get(
          "http://localhost:4000/chat/chats",
          config
        );
        setChats(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchChats();
  }, [navigate, userInfo.token]);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(
        "http://localhost:4000/chat/chats",
        {},
        config
      );
      console.log("Chat created:", response.data);
    } catch (err) {
      setError(err);
      console.error("Chat creation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ul className="chat-list">
        {chats.map((chat) => (
          <li key={chat._id} className="chat-item">
            <Link to={`/chats/${chat._id}`} className="chat-link">
              <div>
                <span className="chat-user">Chat with: {chat.user.name}</span>{" "}
                <br />
                <span className="last-message">
                  Last Message: {chat.lastMessageSnippet}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="admin-chat-container">
        <ul className="chat-list">
          {chats.map((chat) => (
            <li key={chat._id} className="chat-item">
              <Link to={`/chats/${chat._id}`} className="chat-link">
                <div>
                  <span className="chat-user">Chat with: {chat.userName}</span>{" "}
                  <br />
                  <span className="last-message">
                    Last Message: {chat.lastMessageSnippet}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={handleClick} className="create-chat-btn">
          Create Chat
        </button>
      </div>
    </>
  );
};

export default AdminChat;
