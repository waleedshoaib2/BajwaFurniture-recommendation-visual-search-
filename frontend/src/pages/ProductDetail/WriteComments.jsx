import React, { useState } from "react";
import axios from "axios";
import { logout } from "../../redux/action/apiUserAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getProductDetail from "../../redux/action/apiProductDetail";

export default function WriteComments({ params }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  function commentHandler(e) {
    e.preventDefault();
    if (rating === "") {
      return window.alert("Please select a rating");
    }
    if (comment === "") {
      return window.alert("Please add a comment");
    }

    if (!userInfo) {
      dispatch(logout());
      navigate("/login");
    }

    const body = {
      product_id: params.id,
      content: comment,
      rating: parseInt(rating), // Ensure rating is a number
    };

    axios
      .post(`http://localhost:4000/reviews`, body, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(function (res) {
        window.alert("Successfully commented");
        getProductDetail(params.id, dispatch);
      })
      .catch(function (error) {
        console.error("Error posting comment:", error);
        if (error.response && error.response.status === 401) {
          dispatch(logout());
          navigate("/login");
        }
      });
  }

  return (
    <div className="product_detail_reviews">
      <h1>Write a Customer Review</h1>
      <div className="product_detail_reviews_details">
        <label htmlFor="reviews-rating">Rating</label>
        <select
          name="star-rating"
          id="reviews-rating"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select..</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div className="product_detail_reviews_details">
        <label htmlFor="reviews-comment">Comment</label>
        <textarea
          id="reviews-comment"
          name="reviews-comment"
          rows="5"
          cols="33"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="black-rounded-button" onClick={commentHandler}>
        Submit
      </div>
    </div>
  );
}
