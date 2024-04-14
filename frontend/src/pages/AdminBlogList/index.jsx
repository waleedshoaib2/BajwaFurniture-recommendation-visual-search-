import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../redux/action/apiUserAction";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";

export default function AdminGetBlogList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState();
  const { userInfo } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/blogs/posts");
      setBlogs(response.data);
      setPending(false);
    } catch (error) {
      setPending(false);
      if (error.response.status === 401) {
        dispatch(logout());
      } else {
        setError(error.response.data.message);
      }
    }
  };

  const deleteBlog = async (blogID) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/blogs/posts/${blogID}`
      );
      console.log(response.data);
      // Assuming you want to refresh the blog list after deletion
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (blogID) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(blogID);
    }
  };

  const handleView = (blogID) => {
    // navigate(`/blog/${blogID}`);
    navigate(`/blog/${blogID}`);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="admin-list">
      <DisplayPending pending={pending} />
      <div className="admin-list__container">
        {error && <Alert severity="error">{error}</Alert>}
        <div
          className="admin-add-button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/createpost");
          }}
        >
          Add New Blog
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Edit/Delete</th>
              <th scope="col">View</th>{" "}
              {/* Add a new column for the View button */}
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <img
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/edit.png"
                    alt="edit_icon"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/editblog/${blog._id}`);
                    }}
                  />
                  <img
                    onClick={() => handleDelete(blog._id)}
                    src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/delete.png"
                    alt="delete_icon"
                  />
                </td>
                <td>
                  {" "}
                  {/* Add a new column containing the View button */}
                  <button onClick={() => handleView(blog._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
