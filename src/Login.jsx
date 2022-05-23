import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

let Login = (props) => {
  const navigate = useNavigate();
  var [email, setEmail] = useState("admin@gmail.com");
  var [password, setPassword] = useState("Admin@2020");
  let userContext = useContext(UserContext);
  let myEmailRef = useRef();

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  let [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {});

  useEffect(() => {
    if (email.indexOf("@") > 0) {
    } else {
    }
  }, [email]);
  useEffect(() => {
    document.title = "Login - eBazar";
    myEmailRef.current.focus();
  }, []);

  useEffect(() => {
    return () => {
      console.log("Component Unmount");
    };
  }, []);

  let validate = () => {
    let errorsData = {};

    errorsData.email = [];

    if (!email) {
      errorsData.email.push("Email can't be blank");
    }

    let validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Proper email address is expected");
      }
    }

    errorsData.password = [];

    if (!password) {
      errorsData.password.push("Password can't be blank");
    }

    let validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit"
        );
      }
    }

    setErrors(errorsData);
  };

  useEffect(validate, [email, password]);

  let onLoginClick = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let responseBody = await response.json();

        if (responseBody.length > 0) {
          userContext.dispatch({
            type: "login",
            payload: {
              currentUserName: responseBody[0].fullName,
              currentUserId: responseBody[0].id,
              currentUserRole: responseBody[0].role,
            },
          });

          //redirect to /dashboard
          if (responseBody[0].role === "user") {
            navigate("/dashboard");
          } else {
            navigate("/products");
          }
        } else {
          setLoginMessage(
            <span className="text-danger">Invalid Login, please try again</span>
          );
        }
      } else {
        setLoginMessage(
          <span className="text-danger">Unable to connect to server</span>
        );
      }
    }
  };

  let isValid = () => {
    let valid = true;

    //reading all controls from errors
    for (let control in errors) {
      if (errors[control].length > 0) valid = false;
    }

    return valid;
  };
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
            {/* email starts */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, email: true });
                  validate();
                }}
                placeholder="Email"
                ref={myEmailRef}
              />

              <div className="text-danger">
                {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
              </div>
            </div>
            {/* email ends  */}

            {/* password starts */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={() => {
                  setDirty({ ...dirty, password: true });
                  validate();
                }}
              />

              <div className="text-danger">
                {dirty["password"] && errors["password"][0]
                  ? errors["password"]
                  : ""}
              </div>
            </div>
            {/* password ends  */}
          </div>

          <div className="card-footer text-center">
            <div className="m-1">{loginMessage}</div>
            <button className="btn btn-success m-2" onClick={onLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
