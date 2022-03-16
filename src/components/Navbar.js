import React from "react";
import { Link } from "react-router-dom";

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload();
}

function checkUser() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    let ls = user.username;
    return (
      <div className="d-flex gap-3 justify-content-end">
        <small>
          Logged in as <h6>{ls}</h6>
        </small>

        <button type="button" class="btn btn-danger" onClick={() => logout()}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <a href="/auth" className="text-decoration-none">
        <h6>Login</h6>
      </a>
    );
  }
}

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <h2 className="navbar-brand">Laundry Melintir</h2>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/member" className="nav-link">
              Member
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/paket" className="nav-link">
              Paket
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/transaksi" className="nav-link">
              Transaksi
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/form_transaksi" className="nav-link">
              Form Transaksi
            </Link>
          </li>
        </ul>
        {checkUser()}
      </div>
    </nav>
  );
}
