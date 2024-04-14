import React, { useState, useEffect } from "react";
import axios from "axios";
import Ratings from "../../components/Ratings";

export default function SeeComments({ productInfo }) {
  const [reviews, setReviews] = useState([]);

  console.log("the detail", productInfo._id);

  useEffect(() => {
    console.log("ider");

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/reviews/product/${productInfo._id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        console.log("yaha per hon main akela");
      }
    };

    if (productInfo && productInfo._id) {
      fetchReviews();
    }
  }, []);

  return (
    <div className="product_detail_reviews margin-block-end-36">
      <h1>Reviews</h1>
      {Array.isArray(reviews) &&
        reviews.map((review) => (
          <div className="product_detail_reviews_comment" key={review._id}>
            <div className="product_detail_comment__title">
              <h2>{review.user_id.name}</h2>
              {/* <h2>{new Date(review.createdAt).toISOString().split("T")[0]}</h2> */}
            </div>
            <Ratings rating={review.rating} />
            <h2 className="product_detail_comment_paragraph">
              {review.content}
            </h2>
          </div>
        ))}
    </div>
  );
}
