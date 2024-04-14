import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json", // Set to JSON
          },
        };
        const response = await axios.get(
          `http://localhost:4000/user/all-users`,
          config
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ... Your existing implementation to send newsletter to all users
  };

  const handleSendEmail = async (user_email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `http://localhost:4000/api/newsletter/email`,
        { user_email },
        config
      );

      // Handle success message
      console.log("Email sent successfully to user:", user_email);
    } catch (error) {
      // Handle error
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="admin-list">
      {loading && <div className="admin-list__container">Loading...</div>}
      {error && (
        <div className="admin-list__container">Error: {error.message}</div>
      )}

      <table
        className="admin-list__container"
        style={{ marginLeft: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "8px",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: "8px",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "8px",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {user.name}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {user.email}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="admin-add-button"
                        onClick={() => handleSendEmail(user.email)}
                        style={{
                          padding: "8px 16px",
                          fontSize: "14px",
                          borderRadius: "50px",
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Send Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    verticalAlign: "middle",
                  }}
                >
                  No users found
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "8px",
                  verticalAlign: "middle",
                }}
              >
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Newsletter;
