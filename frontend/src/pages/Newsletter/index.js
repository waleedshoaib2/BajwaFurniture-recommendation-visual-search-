import React from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const Newsletter = () => {
  let { userInfo } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");

  const sendTokenToBackend = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4000/user/newsletter",
        {
          token: userInfo.token,
          email: email,
        },
        {
          // Config object for headers
          headers: {
            Authorization: `Bearer ${userInfo.token}`, // Correct header format
          },
        }
      );
      console.log("Token and email sent successfully:", response);
      toast.success("response.data", {
        position: "top-right", // String value for position
      });
    } catch (error) {
      console.error("Error sending token and email:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "16px 4px",
        color: "black",
        border: "1px solid black",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src="https://w0.peakpx.com/wallpaper/461/480/HD-wallpaper-chairs-furniture-interior.jpg"
          alt="Your Product"
          style={{
            width: "550px",
            height: "600px",
            marginRight: "20px",
          }}
        />
        <div>
          <h1
            style={{
              // fontSize: "6xl",
              fontWeight: "bold",
              fontSize: "20px",
              // paddingBottom: "2px",
            }}
          >
            Want to keep up with our latest products?
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              style={{
                padding: "3px",
                marginTop: "20px",
                flex: 1,
                color: "black",
                fontstyle: "italics",
              }}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                fontWeight: "light",
                width: "180px",
                marginLeft: "90px",
                marginTop: "10px",
                padding: "6px 3px",
              }}
              onClick={sendTokenToBackend}
            >
              Notify Me
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
