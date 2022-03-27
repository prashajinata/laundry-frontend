import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  loginProcess(event) {
    event.preventDefault();
    let endpoint = "http://localhost:8001/api/auth";

    let request = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post(endpoint, request)
      .then((result) => {
        if (result.data.logged) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          window.alert("dino apik");
          window.location.href = "/";
        } else {
          window.alert("dino ajur");
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="container login d-flex flex-column align-middle">
        <h4 className="text-primary align-self-center">Login</h4>
        <form onSubmit={(ev) => this.loginProcess(ev)}>
          Username
          <input
            placeholder="Aji ganteng"
            type="text"
            className="form-control mb-2"
            required
            value={this.state.username}
            onChange={(ev) => this.setState({ username: ev.target.value })}
          />
          Password
          <input
            placeholder="**********"
            type="password"
            className="form-control mb-2"
            required
            value={this.state.password}
            onChange={(ev) => this.setState({ password: ev.target.value })}
          />
          <button className="btn btn-primary align-self-center" type="submit">
            Log in
          </button>
        </form>
      </div>
    );
  }
}
