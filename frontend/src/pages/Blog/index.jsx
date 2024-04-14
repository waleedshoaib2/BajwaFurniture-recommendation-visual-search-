import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { PostAddSharp } from "@mui/icons-material";
import "./Blog.css"; // Import your custom CSS file

const Blog = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blogs/posts/${id}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch post");
        }
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        // Consider adding error handling for the user (e.g., display an error message)
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="blog-loading">Loading...</div>;
  }

  return (
    <div className="blog-post-container">
      <h1 className="blog-post-title">{post.title}</h1>
      {post.image && (
        <img src={post.image} alt={post.title} className="blog-post-image" />
      )}
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default Blog;
