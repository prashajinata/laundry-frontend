import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJugDetergent } from "@fortawesome/free-solid-svg-icons";
import { checkUser } from "../config";

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.reload();
}

function getNav() {
  if (checkUser()) {
    let user = JSON.parse(localStorage.getItem("user"));
    let ls = user.username;
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
                <span className="mx-2">[+] Transaksi Baru</span>
              </Link>
            </li>
          </ul>
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
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 gap-2">
            <div className="navbar-brand">
              <FontAwesomeIcon icon={faJugDetergent} />
              DJi's
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default function Navbar() {
  return getNav();
}
