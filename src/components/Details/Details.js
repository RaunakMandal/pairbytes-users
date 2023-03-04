import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./details.style.css";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    dob: "",
    phone: "",
    email: "",
    new: true,
  });
  const [editing, setEditing] = useState(id ? false : true);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const getUserById = (id) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users?.find((user) => user.id === id);
    user.new = false;
    user && setUser(user);
  };

  const uniqueValue = (type, value) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users?.find((user) => user[type] === value);
    return user ? false : true;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onBlurHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        if (!value) {
          setError({ error: true, message: "Name is required" });
        } else if (value.length > 50) {
          setError({
            error: true,
            message: "Name must be under 50 characters",
          });
        } else {
          setError({ error: false, message: "" });
        }
        break;
      case "dob":
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (!value) {
          setError({ error: true, message: "Date of Birth is required" });
        } else if (age < 18) {
          setError({ error: true, message: "User must be 18 years old" });
        } else {
          setError({ error: false, message: "" });
        }
        break;
      case "phone":
        if (!value) {
          setError({ error: true, message: "Phone is required" });
        } else if (value.length !== 10) {
          setError({
            error: true,
            message: "Phone must be under 10 characters",
          });
        } else if (!uniqueValue("phone", value)) {
          setError({ error: true, message: "Phone must be unique" });
        } else {
          setError({ error: false, message: "" });
        }
        break;
      case "email":
        if (!value) {
          setError({ error: true, message: "Email is required" });
        } else if (!uniqueValue("email", value)) {
          setError({ error: true, message: "Email must be unique" });
        } else {
          setError({ error: false, message: "" });
        }
        break;
      default:
        break;
    }
  };
  const saveToLocalStorageAndRedirect = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
    return navigate("/");
  };

  const saveUser = () => {
    if (error.error) return;

    for (const key in user) {
      if (key !== "id" && user[key] === "") {
        console.log(user[key], key);
        setError({ error: true, message: "All fields are required" });
        return;
      }
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!user.new) {
      const index = users.findIndex((user) => user.id === id);
      users[index] = user;
    } else {
      user.id = Math.random().toString(36).slice(2, 9);
      users.push(user);
    }
    saveToLocalStorageAndRedirect(users);
  };

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 justify-content-center">
          <Link to="/">
            <button className="btn btn-outline-danger">Go Back</button>
          </Link>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name..."
            disabled={!editing}
            value={user.name}
            onChange={(e) => onChangeHandler(e)}
            onBlur={(e) => onBlurHandler(e)}
          />
          <input
            type="date"
            name="dob"
            className="form-control"
            placeholder="Date of Birth..."
            disabled={!editing}
            value={user.dob}
            onChange={(e) => onChangeHandler(e)}
            onBlur={(e) => onBlurHandler(e)}
          />
          <input
            type="number"
            name="phone"
            className="form-control"
            placeholder="Phone..."
            disabled={!editing}
            value={user.phone}
            onChange={(e) => onChangeHandler(e)}
            onBlur={(e) => onBlurHandler(e)}
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email..."
            disabled={!editing}
            value={user.email}
            onChange={(e) => onChangeHandler(e)}
            onBlur={(e) => onBlurHandler(e)}
          />
          {error.error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error.message}
            </div>
          )}
          <div className="d-flex justify-content-center gap-3">
            {!editing && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditing(true)}
              >
                Edit Details
              </button>
            )}
            {editing && (
              <button className="btn btn-outline-success" onClick={saveUser}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
