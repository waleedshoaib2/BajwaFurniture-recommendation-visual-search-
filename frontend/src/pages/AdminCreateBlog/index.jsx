import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => setContent(value);
  const handleImageChange = (e) => setImageURL(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/blogs/posts",
        { title, content, image: imageURL }
      );
      console.log("New post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter a captivating title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="content">Content:</label>
          <ReactQuill
            theme="snow"
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Write your thoughts here..."
          />
        </div>
        <div className="form-field">
          <label htmlFor="image-url">Image URL:</label>
          <input
            type="text"
            id="image-url"
            placeholder="Add an image to enhance your post"
            value={imageURL}
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="publish-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
