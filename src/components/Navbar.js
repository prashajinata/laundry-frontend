import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJugDetergent } from "@fortawesome/free-solid-svg-icons";

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

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => logout()}
        >
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
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 gap-2">
          <div className="navbar-brand">
            <FontAwesomeIcon icon={faJugDetergent} />
            DJi's
          </div>
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
            <Link to="/form_transaksi" className="nav-link active text-white">
              [+] Transaksi Baru
            </Link>
            <div className="woe"></div>
          </li>
        </ul>
        {checkUser()}
      </div>
    </nav>
  );
}
