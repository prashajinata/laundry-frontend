import axios from "axios";
import React, { Component } from "react";
import { baseUrl } from "../config";

export default class Transaksi extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  getData() {
    let endpoint = "http://localhost:8000/api/transaksi";
    axios
      .get(endpoint)
      .then((response) => {
        this.setState({ transaksi: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getData();
  }

  deleteTransaksi(id) {
    if (window.confirm("Apakah Anda Yakin ingin menghapus transaksi ini?")) {
      let endpoint = `${baseUrl}/transaksi/${id}`;
      axios
        .delete(endpoint)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  convertBayar(status) {
    if (status === 0) {
      return <h6 className="text-danger">Belum Dibayar</h6>;
    } else if (status === 1) {
      return <h6 className="text-success">Sudah Dibayar</h6>;
    }
  }

  convertStatus(status) {
    if (status === 1) {
      return <h6 className="text-info">Transaksi baru</h6>;
    } else if (status === 2) {
      return <h6 className="text-warning">Sedang Di Proses</h6>;
    } else if (status === 3) {
      return <h6 className="text-success">Siap Di Ambil</h6>;
    } else if (status === 4) {
      return <h6 className="text-success">Sudah Diambil</h6>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-light">
            <h4 className="">List Transaksi</h4>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.transaksi.map((trans) => (
                <div>
                  <div className="row">
                    <div className="col-lg-2">
                      <h6>Member</h6>
                      {trans.member.nama}
                    </div>
                    <div className="col-lg-3">
                      <h6>Tanggal Transaksi</h6>
                      {trans.tgl}
                    </div>
                    <div className="col-lg-2">
                      <h6>Pembayaran</h6>
                      {this.convertBayar(trans.dibayar)}
                    </div>
                    <div className="col-lg-2">
                      <h6>Status</h6>
                      {this.convertStatus(trans.status)}
                    </div>
                    <div className="col-lg-3">
                      <div className="btn-group d-flex">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            window.location.href = `/detail/${trans.id_transaksi}`;
                          }}
                        >
                          Detail
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() =>
                            this.deleteTransaksi(trans.id_transaksi)
                          }
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
