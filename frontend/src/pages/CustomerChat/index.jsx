import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchChats = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      try {
        console.log("boxcustomer in");
        const response = await axios.get(
          "http://localhost:4000/chat/chats/me",
          config
        );

        setChats(response.data);

        console.log(response.data);

        // console.log(response.data._id);
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
  }, [navigate]);
  const handleClick = async () => {
    setIsLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      const response = await axios.post(
        "http://localhost:4000/chat/chats",
        {}, // Send any necessary data for new chat creation
        config
      );

      // Handle successful redirect to new chat view
      console.log("Chat created:", response.data);
    } catch (err) {
      setError(err);
      console.error("Chat creation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ul>
        <li key={chats._id}>
          <Link to={`/chats/${chats._id}`}>
            chat id : {chats._id}
            Chat with: {chats.otherParticipant} <br />
            Last Message: {chats.lastMessageSnippet}
          </Link>
        </li>
      </ul>

      <button onClick={handleClick}>create chat</button>
    </div>
  );
};

export default ChatList;
