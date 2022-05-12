import React, { useState, useEffect } from "react";

let Login = () => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  useEffect(() => {
    // console.log(email);
  });

  useEffect(() => {
    if (email.indexOf("@") > 0) {
      // console.log("Valid Email");
    } else {
      // console.log("Invalid Email");
    }
  }, [email]);

  useEffect(() => {
    document.title = "Login -eCommerce";
  }, []);

  useEffect(() => {
    return () => {
      // console.log("Component Unmount phase");
    };
  }, []);
  return (
    <div className="row">
      <div className="col-lg-5 col-md-7 mx-auto">
        <div className="card border-success shadow-lg my-2">
          <div className="card-header border-bottom border-success">
            <h4
              style={{ fontSize: "40px" }}
              className="text-success text-center"
            >
              Login
            </h4>
          </div>
          <div className="card-body border-bottom border-success">
            {/* Email Starts */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            {/* Email Ends */}

            {/* Password Starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            {/* Password Ends */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
