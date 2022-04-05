import React, { Component } from "react";
import { baseUrl, authorization, formatNumber } from "../config";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      jumlahMember: 0,
      jumlahTransaksi: 0,
      jumlahIncome: 0,
      transaksi: [],
    };

    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  getSummary() {
    let endpointMember = `${baseUrl}/member`;
    axios
      .get(endpointMember, authorization)
      .then((response) => {
        this.setState({ jumlahMember: response.data.length });
      })
      .catch((error) => console.log(error));

    let endpointTransaksi = `${baseUrl}/transaksi`;
    axios.get(endpointTransaksi, authorization).then((response) => {
      let dataTransaksi = response.data;
      let income = 0;
      for (let i = 0; i < dataTransaksi.length; i++) {
        let total = 0;
        for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
          let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
          let qty = dataTransaksi[i].detail_transaksi[j].qty;
          total += harga * qty;
          dataTransaksi[i].total = total;
        }
        income += total;
      }
      this.setState({
        transaksi: dataTransaksi,
        jumlahTransaksi: response.data.length,
        jumlahIncome: income,
      });
    });
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

  componentDidMount() {
    this.getSummary();
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <div className="row my-4">
          <div className="col-lg-4">
            <div className="card jmlmember">
              <div className="card-body">
                <h3 className="card-title">Jumlah Member</h3>
                <br />
                <h2>{this.state.jumlahMember}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card jmltrans">
              <div className="card-body">
                <h3 className="card-title">Jumlah Transaksi</h3>
                <br />
                <h2>{this.state.jumlahTransaksi}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card jmlduek">
              <div className="card-body">
                <h3 className="card-title text-white">Untung</h3>
                <br />
                <h2 className="text-white">
                  Rp {formatNumber(this.state.jumlahIncome)}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <h2 className="my-2">Aktivitas</h2>
        <ul className="list-group my-2 aktivitas my-4">
          {this.state.transaksi.reverse().map((trans, index) => (
            <li className="list-group-item" key={index}>
              <div className="row my-2">
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
                  <h6>Total Pembayaran</h6>
                  {formatNumber(trans.total)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
