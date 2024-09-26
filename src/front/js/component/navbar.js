import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0 h1 mx-2">Contact List</span>
      </Link>
      <div className="ml-auto">
        <Link to="/login">
          <button className="btn btn-primary mx-2">Login</button>
        </Link>
        <Link to="/form">
          <button className="btn btn-primary mx-2">Create contact</button>
        </Link>
      </div>
    </nav>
  );
};
