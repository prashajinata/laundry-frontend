import React, { Component } from "react";
import { Modal } from "bootstrap";
import PaketCard from "../components/PaketCard";
import axios from "axios";
import { authorization, baseUrl } from "../config";

export default class Paket extends Component {
  constructor() {
    super();
    this.state = {
      id_paket: "",
      jenis_paket: "",
      harga: "",
      action: "",

      list_paket: [],
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  getData() {
    let endpoint = "http://localhost:8001/api/paket";
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ list_paket: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  tambahData() {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();
    this.setState({
      id_paket: 0,
      jenis_paket: "",
      harga: "",
      action: "tambah",
    });
  }

  simpanData(event) {
    event.preventDefault();

    if (this.state.action === "tambah") {
      let endpoint = `${baseUrl}/paket`;
      let data = {
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
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
      this.modalPaket.hide();
    } else if (this.state.action === "ubah") {
      let endpoint = `${baseUrl}/paket/` + this.state.id_paket;

      let data = {
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
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
      this.modalPaket.hide();
    }
  }

  ubahData(id) {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();

    let index = this.state.list_paket.findIndex(
      (paket) => paket.id_paket === id
    );

    this.setState({
      id_paket: id,
      jenis_paket: this.state.list_paket[index].jenis_paket,
      harga: this.state.list_paket[index].harga,
      action: "ubah",
    });
  }

  hapusData(id) {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let endpoint = `${baseUrl}/paket/` + id;
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
          <h3 className="text-primary">List Paket</h3>
          <button
            className="btn btn-secondary btn-md my-1"
            onClick={() => this.tambahData()}
          >
            Tambah data Paket
          </button>
          <hr />
          <ul className="list-group">
            {this.state.list_paket.map((paket, index) => (
              <li className="list-group-item" key={index}>
                <PaketCard
                  nama_paket={paket.jenis_paket}
                  harga_paket={paket.harga}
                  edit={() => this.ubahData(paket.id_paket)}
                  hapus={() => this.hapusData(paket.id_paket)}
                ></PaketCard>
              </li>
            ))}
          </ul>
        </div>
        <div className="modal modal-fade fade" id="modal_paket">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="text-white">Form Data Paket</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  Nama Paket
                  <input
                    required
                    type="text"
                    className="form-control mb-2"
                    value={this.state.jenis_paket}
                    onChange={(ev) =>
                      this.setState({ jenis_paket: ev.target.value })
                    }
                  />
                  Harga
                  <input
                    required
                    type="text"
                    className="form-control mb-2"
                    value={this.state.harga}
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                  />
                  <button className="btn btn-primary" type="submit">
                    Simpan
                  </button>
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
