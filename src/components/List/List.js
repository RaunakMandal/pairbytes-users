import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./list.style.css";
import { Player } from "@lottiefiles/react-lottie-player";

const List = () => {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(users);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="list-group">
            {users.length === 0 && (
              <div className="d-flex flex-column justify-content-center align-items-center column-gap-2 mt-2">
                <Player
                  autoplay
                  loop
                  src="https://assets3.lottiefiles.com/packages/lf20_WpDG3calyJ.json"
                  style={{ height: "300px", width: "300px" }}
                ></Player>
                <p>No Users Found</p>
              </div>
            )}
            {users?.map((user) => (
              <div
                className="d-flex justify-content-between align-items-center column-gap-2 mt-2"
                key={user.id}
              >
                <Link className="d-flex flex-fill" to={`/details/${user.id}`}>
                  <button
                    type="button"
                    className="list-group-item list-group-item-action"
                  >
                    {user.name}
                  </button>
                </Link>
                <span
                  className="badge bg-danger rounded-pill"
                  onClick={(e) => handleDelete(e, user.id)}
                >
                  Delete
                </span>
              </div>
            ))}
            <Link to="/details" className="d-flex justify-content-center">
              <button className="btn btn-outline-success mt-2">Add User</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
