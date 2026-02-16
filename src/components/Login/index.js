import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = (props) => {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [showPass, setShow] = useState(false);
  const [feed, setFeed] = useState(false);
  const [InvPass , setInv] =useState("")
  const navigate = useNavigate();
  const onSign = () => {
    navigate("/signup");
  };
  const onText = (e) => {
    setUser(e.target.value);
  };
  const onPass = (e) => {
    setPass(e.target.value);
  };
  const onCheck = (e) => {
    setShow((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0) {
      setFeed(false);
    } else {
      setFeed(true);
    }
    const userDetails = { username, password };
    const url = "http://localhost:5000/log";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("jwt_token", data.jwt_token, { expires: 30 });
        navigate("/", { replace: true });
        console.log(data.jwt_token)
      }else{
        setInv(data.message)
      }
    } catch (error) {
      console.log("Something went wrong. Try again.");
    }
  };
  return (
    <div className="container-fluid vh-100 d-flex  justify-content-center align-items-center">
      <div className="card col-lg-3 ">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className=" d-flex flex-column">
              <h3 className="text-center mb-4">Login</h3>
              <div>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  id="username"
                  onChange={onText}
                />
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="invalid-feedback">Please Enter username</div>
              </div>
              <div>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  className="form-control"
                  id="password "
                  onChange={onPass}
                />
                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="check"
                  className="form-check-input"
                  onChange={onCheck}
                />
                <label className="form-check-label" htmlFor="check">
                  Show Password
                </label>
              </div>

              <div className="d-flex mt-4">
                <button type="submit" className="btn btn-success w-100">
                  Submit
                </button>
              </div>
              {feed && (
                <p className="mt-1 text-danger text-center">Enter UserName</p>
              )}
              {InvPass && <p className="mt-1 text-danger text-center">{InvPass}</p>}
            </div>
          </form>
          <div className="mt-2">
     
            <button className="btn btn-primary mt-2 w-100" onClick={onSign}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;