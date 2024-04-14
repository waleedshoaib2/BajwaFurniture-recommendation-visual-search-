import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/action/apiUserAction";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import DisplayPending from "../../components/DisplayPending";
import Alert from "@mui/material/Alert";
import CustomDivider from "../../components/CustomDivider";
import GoogleLogin from "react-google-login";

export default function LoginPage() {
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { pending, error, errorMessage, userInfo } = userLogin;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // get query param
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  function handleLogin(e) {
    e.preventDefault();
    dispatch(login(email, password));
  }
  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success: ", response);

    // 1. Get the ID token from the response
    const idToken = response.tokenId;

    // 2. Make a POST request to your backend to verify the token
    //    and complete the login process
    fetch("/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Assuming your backend responds with user data,
        // handle the data and redirect as needed
        console.log("Backend Response:", data);
      });
  };
  const handleGoogleFailure = (error) => {
    console.error("Google Login Failure: ", error);
  };

  return (
    <div className="auth">
      <Meta title="Login" />
      <DisplayPending pending={pending} />
      <form className="auth__container" onSubmit={handleLogin}>
        {error ? <Alert severity="error">{errorMessage}</Alert> : null}
        <div className="auth__title">Welcome back!</div>
        <div className="auth__input__container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth__input__container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="auth-button " type="submit">
          Log In
        </button>
        <CustomDivider text={"OR"} />
        <GoogleLogin
          clientId="981784294356-lnotmt4ivm82d1f4pg3hov9t0hluht6t.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        />
        <h1 className="auth__navigation">
          Need an account?{" "}
          <span onClick={(e) => navigate(`/register?redirect=${redirect}`)}>
            Register
          </span>
        </h1>
        <h1 className="auth__legal">
          By Logging into QuickChat you agree to our{" "}
          <span
            className="color-blue-600 cursor-pointer"
            onClick={() => navigate("/legal")}
          >
            Terms of Services
          </span>{" "}
          and{" "}
          <span
            className="color-blue-600 cursor-pointer"
            onClick={() => navigate("/privacy")}
          >
            Privacy Policy.
          </span>
        </h1>
      </form>
    </div>
  );
}
