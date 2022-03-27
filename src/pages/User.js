import React, { Component } from "react";
import { Modal } from "bootstrap";
import UserCard from "../components/UserCard";
import axios from "axios";
import { authorization, baseUrl } from "../config";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      id_user: "",
      nama: "",
      username: "",
      password: "",
      role: "",
      action: "",

      users: [],
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  gantiPasswordButton() {
    if (this.state.action === "ubah") {
      return (
        <button
          type="button"
          className="btn btn-primary mx-2"
          onClick={() => {
            // console.log(this.state.tambahPassword);
            let tambah = this.state.tambahPassword ? false : true;
            // console.log(tambah);
            this.setState({ tambahPassword: tambah });
          }}
        >
          {this.state.tambahPassword
            ? "Tidak Ganti Password"
            : "Ganti Password"}
        </button>
      );
    } else {
      return;
    }
  }

  passwordBox() {
    if (this.state.tambahPassword) {
      return (
        <>
          Password
          <input
            required
            type="password"
            className="form-control mb-2"
            value={this.state.password}
            onChange={(ev) => this.setState({ password: ev.target.value })}
          />
        </>
      );
    } else {
      return;
    }
  }

  getData() {
    let endpoint = `${baseUrl}/users`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  simpanData(event) {
    event.preventDefault();
    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/users`;
      let data = {
        nama: this.state.nama,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      };
      // let temp = this.state.members;
      // temp.push(data);
      // this.setState({ members: temp });

      axios
        .post(endpoint, data, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
      this.modalUser.hide();
    } else if (this.state.action === "ubah") {
      let endpoint = `${baseUrl}/users/` + this.state.id_user;

      let data = this.state.tambahPassword
        ? {
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role,
          }
        : {
            nama: this.state.nama,
            username: this.state.username,
            role: this.state.role,
          };
      axios
        .put(endpoint, data, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      // let temp = this.state.members;
      // let index = temp.findIndex(
      //   (member) => member.id_member === this.state.id_member
      // );
      // temp[index].nama = this.state.nama;
      // temp[index].alamat = this.state.alamat;
      // temp[index].jenis_kelamin = this.state.jenis_kelamin;
      // temp[index].telpon = this.state.telpon;

      // this.setState({ members: temp });
      this.modalUser.hide();
    }
  }

  tambahData() {
    this.modalUser = new Modal(document.getElementById("modal_user"));
    this.modalUser.show();

    this.setState({
      nama: "",
      username: "",
      password: "",
      role: "",
      tambahPassword: false,
      action: "tambah",
    });
  }

  ubahData(id) {
    this.modalUser = new Modal(document.getElementById("modal_user"));
    this.modalUser.show();

    let index = this.state.users.findIndex((user) => user.id_user === id);

    this.setState({
      id_user: id,
      nama: this.state.users[index].nama,
      username: this.state.users[index].username,
      password: this.state.password,
      role: this.state.users[index].role,
      action: "ubah",
    });
  }

  hapusData(id) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let endpoint = `${baseUrl}/users/` + id;
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <h3 className="text-primary">List User</h3>
          <button
            className="btn btn-secondary btn-md my-1"
            onClick={() => this.tambahData()}
          >
            Tambah data User
          </button>
          <hr />
          <ul className="list-group">
            {this.state.users.map((user, index) => (
              <li className="list-group-item" key={index}>
                <UserCard
                  nama={user.nama}
                  username={user.username}
                  role={user.role}
                  edit={() => this.ubahData(user.id_user)}
                  hapus={() => this.hapusData(user.id_user)}
                ></UserCard>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal modal-fade fade" id="modal_user">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="text-white">Form Data User</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Nama
                  <input
                    required
                    type="text"
                    className="form-control mb-2"
                    value={this.state.nama}
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                  />
                  Username
                  <input
                    required
                    type="text"
                    className="form-control mb-2"
                    value={this.state.username}
                    onChange={(ev) =>
                      this.setState({ username: ev.target.value })
                    }
                  />
                  Role
                  <select
                    required
                    className="form-control mb-2"
                    value={this.state.role}
                    onChange={(ev) => this.setState({ role: ev.target.value })}
                  >
                    <option defaultValue={""} hidden>
                      Pilih Role
                    </option>
                    <option value="kasir">Kasir</option>
                    <option value="admin">Admin</option>
                  </select>
                  {this.passwordBox()}
                  <button className="btn btn-primary" type="submit">
                    Simpan
                  </button>
                  {this.gantiPasswordButton()}
                </form>
              </div>
            </div>
            {/* Modal */}
          </div>
        </div>
      </>
    );
  }
}
