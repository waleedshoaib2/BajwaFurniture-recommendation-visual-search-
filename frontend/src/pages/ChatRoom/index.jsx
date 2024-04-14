import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatRoom.css";
const ENDPOINT = "http://localhost:4000";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const { chatId } = useParams();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      try {
        const response = await axios.get(
          `http://localhost:4000/chat/chats/${chatId}/messages`,
          config
        );

        setMessages(response.data.messages);
      } catch (error) {
        // handle error
      }
    };
    fetchMessages();
  }, [chatId, userInfo.token]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("joinChat", chatId);
      });
      socket.on("newMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, chatId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const response = await axios.post(
          `http://localhost:4000/chat/chats/${chatId}/messages`,
          { content: newMessage },
          config
        );

        console.log("Message sent:", response.data);
        socket.emit("sendMessage", chatId, { content: newMessage });

        setNewMessage("");
      } catch (error) {
        console.error("Message sending error:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Chat Room</h2>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.sender === userInfo.id ? "my-message" : "other-message"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
