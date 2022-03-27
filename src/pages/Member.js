import React, { Component } from "react";
import MemberCard from "../components/MemberCard";
import { Modal } from "bootstrap";
import axios from "axios";
import { authorization, baseUrl } from "../config";

export default class Member extends Component {
  constructor() {
    super();
    this.state = {
      id_member: "",
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telpon: "",
      action: "",

      members: [],
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  getData() {
    let endpoint = `${baseUrl}/member`;
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ members: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  tambahData() {
    this.modalMember = new Modal(document.getElementById("modal_member"));
    this.modalMember.show();
    this.setState({
      id_member: Math.random(1, 10000),
      nama: "",
      alamat: "",
      jenis_kelamin: "Pria",
      telpon: "",
      action: "tambah",
    });
  }

  ubahData(id_member) {
    this.modalMember = new Modal(document.getElementById("modal_member"));
    this.modalMember.show();

    let index = this.state.members.findIndex(
      (member) => member.id_member === id_member
    );
    this.setState({
      id_member: id_member,
      nama: this.state.members[index].nama,
      alamat: this.state.members[index].alamat,
      jenis_kelamin: this.state.members[index].jenis_kelamin,
      telpon: this.state.members[index].telpon,
      action: "ubah",
    });
  }

  simpanData(event) {
    event.preventDefault();

    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/member`;
      let data = {
        id_member: this.state.id_member,
        nama: this.state.nama,
        alamat: this.state.alamat,
        jenis_kelamin: this.state.jenis_kelamin,
        telpon: this.state.telpon,
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
      this.modalMember.hide();
    } else if (this.state.action === "ubah") {
      let endpoint = `${baseUrl}/member` + this.state.id_member;

      let data = {
        id_member: this.state.id_member,
        nama: this.state.nama,
        alamat: this.state.alamat,
        jenis_kelamin: this.state.jenis_kelamin,
        telpon: this.state.telpon,
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
      this.modalMember.hide();
    }
  }

  hapusData(id) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let endpoint = `${baseUrl}/member` + id;
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        <div className="container">
          <h3 className="text-primary">List Member</h3>
          <button
            className="btn btn-secondary btn-md my-1"
            onClick={() => this.tambahData()}
          >
            Tambah Data Member
          </button>
          <hr />
          <ul className="list-group">
            {this.state.members.map((member, index) => (
              <li className="list-group-item" key={index}>
                <MemberCard
                  nama={member.nama}
                  jenis_kelamin={member.jenis_kelamin}
                  telepon={member.telpon}
                  alamat={member.alamat}
                  edit={() => this.ubahData(member.id_member)}
                  hapus={() => this.hapusData(member.id_member)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="modal modal-fade fade" id="modal_member">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="text-white">Form Data Member</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Nama
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.nama}
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                  />
                  Alamat
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.alamat}
                    onChange={(ev) =>
                      this.setState({ alamat: ev.target.value })
                    }
                  />
                  Jenis Kelamin
                  <select
                    className="form-control mb-2"
                    value={this.state.jenis_kelamin}
                    onChange={(ev) =>
                      this.setState({ jenis_kelamin: ev.target.value })
                    }
                  >
                    <option value="Wanita">Wanita</option>
                    <option value="Pria">Pria</option>
                  </select>
                  No. telpon
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={this.state.telpon}
                    onChange={(ev) =>
                      this.setState({ telpon: ev.target.value })
                    }
                  />
                  <button className="btn btn-primary" type="submit">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Modal */}
        </div>
      </>
    );
  }
}
