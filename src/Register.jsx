import React, { useState, useEffect } from "react";

let Register = () => {
  let [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetters: "",
  });
  let [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "Pakistan" },
    { id: 3, countryName: "Bangladesh" },
    { id: 4, countryName: "Nepal" },
    { id: 5, countryName: "China" },
    { id: 6, countryName: "Bhutan" },
  ]);

  let [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
    dateOfBirth: [],
    gender: [],
    country: [],
    receiveNewsLetters: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dateOfBirth: false,
    gender: false,
    country: false,
    receiveNewsLetters: false,
  });

  let [message, setMessage] = useState("");

  let validation = () => {
    let errorsData = {};

    // Email Validation Starts
    errorsData.email = [];
    if (!state.email) {
      errorsData.email.push("Email cannot be blank");
    }
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Invalid email address");
      }
    }
    // Email Validation Ends

    // Password Validation Starts
    errorsData.password = [];
    if (!state.password) {
      errorsData.password.push("Password cannot be blank");
    }
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Password should contains 6-15 characters, with 1 uppercase 1 lowercase and 1 digit"
        );
      }
    }
    // Password Validation Ends

    // FullName Validation Starts
    errorsData.fullName = [];
    if (!state.fullName) {
      errorsData.fullName.push("Full Name cannot be blank");
    }
    // FullName Validation Ends

    // Date Of Birth Validation Starts
    errorsData.dateOfBirth = [];
    if (!state.dateOfBirth) {
      errorsData.dateOfBirth.push("Date of birth cannot be blank");
    }
    // Date Of Birth Validation Ends

    // Gender Validation Starts
    errorsData.gender = [];
    if (!state.gender) {
      errorsData.gender.push("Gender cannot be blank");
    }
    // Gender Validation Ends

    // Country Validation Starts
    errorsData.country = [];
    if (!state.country) {
      errorsData.country.push("Country cannot be blank");
    }
    // Country Validation Ends

    setErrors(errorsData);
  };

  useEffect(validation, [state]);

  useEffect(() => {
    document.title = "Register -eCommerce";
  }, []);

  let onRegisterClicked = () => {
    let dirtyData = dirty;
    Object.keys(dirtyData).forEach((control) => {
      dirtyData[control] = true;
    });

    setDirty(dirtyData);
    validation();
  };

  let isValid = () => {
    let valid = true;
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "30px" }}
              className="text-primary text-center"
            >
              Register
            </h4>
            <div className="text-danger">
              {Object.keys(errors).map((control) => {
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </div>
          </div>
          <div className="card-body border-bottom">
            {/* Email Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="email">
                Email
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* Email Ends */}

            {/* Password Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="password">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={state.password}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* Password Ends */}

            {/* FullName Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="fullName">
                Full Name
              </label>
              <div className="col-lg-8">
                <input
                  type="fullName"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={state.fullName}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* FullName Ends */}

            {/* DateOfBirth Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="dateOfBirth">
                Date Of Birth
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={state.dateOfBirth}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* DateOfBirth Ends */}

            {/* gender starts */}
            <div className="form-group form-row">
              <label className="col-lg-4">Gender</label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    className="form-check-input"
                    checked={state.gender === "male" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                  />

                  <label className="form-check-inline" htmlFor="male">
                    Male
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    className="form-check-input"
                    checked={state.gender === "female" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                  />

                  <label className="form-check-inline" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            {/* gender ends */}

            {/* Country Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="country">
                Country
              </label>
              <div className="col-lg-8">
                <select
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={state.country}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                >
                  {countries.map((country) => {
                    return (
                      <option key={country.id} value={country.id}>
                        {country.countryName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* Country Ends */}

            {/* receiveNewsLetter starts */}
            <div className="form-group form-row">
              <label className="col-lg-4"></label>
              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="receiveNewsLetters"
                    value="true"
                    id="receiveNewsLetters"
                    className="form-check-input"
                    checked={state.receiveNewsLetters === true ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.checked,
                      });
                    }}
                  />

                  <label
                    className="form-check-inline"
                    htmlFor="receiveNewsLetters"
                  >
                    Receive News Letter
                  </label>
                </div>
              </div>
            </div>
            {/* receiveNewsLetter ends */}
          </div>

          <div className="card-footer text-center">
            <div className="m-1">{message}</div>
            <div>
              <button
                className="btn btn-primary m-2"
                onClick={onRegisterClicked}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
