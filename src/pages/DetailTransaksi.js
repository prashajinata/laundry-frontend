import React, { Component } from "react";
import axios from "axios";
import domToPdf from "dom-to-pdf";

export default class DetailTransaksi extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: {},
      isLoading: true,
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/auth";
    }
  }

  changeBayar(id) {
    if (
      window.confirm("Apakah anda yakin ingin mengganti status pembayaran ini?")
    ) {
      let endpoint = `http://localhost:8000/api/transaksi/bayar/${id}`;
      console.log(endpoint);
      axios
        .get(endpoint)
        .then((response) => {
          window.alert(`Pembayaran Transaksi Telah Diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  changeStatus(id, status) {
    if (
      window.confirm("Apakah anda yakin ingin mengganti status transaksi ini?")
    ) {
      let endpoint = `http://localhost:8000/api/transaksi/status/${id}`;

      let data = {
        status: status,
      };

      axios
        .post(endpoint, data)
        .then((response) => {
          window.alert(`Status Transaksi Telah Diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  convertToPdf() {
    let element = document.getElementById(`target`);
    let options = {
      orientation: "landscape",
      unit: "in",
      format: [4, 2],
      filename: `laporan_${this.getParams()}.pdf`,
    };

    domToPdf(element, options, () => {
      window.alert("Dokumen akan dicetak");
    });
  }

  convertStatus(id_transaksi, status) {
    if (status === 1) {
      return (
        <div className="d-flex justify-content-between">
          <h6 className="text-info">Transaksi baru</h6>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => this.changeStatus(id_transaksi, 2)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="d-flex justify-content-between">
          <h6 className="text-warning">Sedang Di Proses</h6>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => this.changeStatus(id_transaksi, 3)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 3) {
      return (
        <div className="d-flex justify-content-between">
          <h6 className="text-success">Siap Di Ambil</h6>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => this.changeStatus(id_transaksi, 4)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 4) {
      return <h6 className="text-success">Sudah Diambil</h6>;
    }
  }

  convertBayar(id_transaksi, status) {
    if (status === 0) {
      return (
        <div className="d-flex justify-content-between">
          <h6 className="text-danger">Belum Dibayar</h6>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.changeBayar(id_transaksi)}
          >
            Update Status
          </button>
        </div>
      );
    } else if (status === 1) {
      return <h6 className="text-success">Sudah Dibayar</h6>;
    }
  }

  getData() {
    let endpoint = `http://localhost:8000/api/transaksi/${this.getParams()}`;
    axios
      .get(endpoint)
      .then((response) => {
        let dataTransaksi = response.data;
        let total = 0;
        for (let j = 0; j < dataTransaksi.detail_transaksi.length; j++) {
          let harga = dataTransaksi.detail_transaksi[j].paket.harga;
          let qty = dataTransaksi.detail_transaksi[j].qty;
          total += harga * qty;
        }
        dataTransaksi.total = total;
        this.setState({ transaksi: dataTransaksi });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  getParams() {
    let baseUrl = window.location.href;
    var id = baseUrl.substring(baseUrl.lastIndexOf("/") + 1);
    return id;
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { transaksi, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
      console.log(this.state.transaksi);
      const target = React.createRef();
      return (
        <div className="container">
          <br />
          <div className="card" ref={target} id="target">
            <div className="card-body">
              <div className=" d-flex justify-content-between">
                <h1 className="card-title">Transaksi</h1>
                <div className="">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.convertToPdf();
                    }}
                  >
                    Cetak
                  </button>
                </div>
              </div>
              <br />
              <div className="row d-flex  justify-content-between">
                <div className="col-lg-4">
                  <h6>Nama Member</h6>
                  {transaksi.member.nama}
                  <br /> <br />
                  <h6>Tanggal Transaksi</h6>
                  {transaksi.tgl}
                  <br /> <br />
                  <h6>Batas Waktu</h6>
                  {transaksi.batas_waktu}
                  <br /> <br />
                  <h6>Tanggal Bayar</h6>
                  {transaksi.tgl_bayar}
                  <br /> <br />
                  <h6>Status Pembayaran</h6>
                  {this.convertBayar(transaksi.id_transaksi, transaksi.dibayar)}
                  <br />
                  <h6>Status Proses</h6>
                  {this.convertStatus(transaksi.id_transaksi, transaksi.status)}
                  <br />
                  <h6>Petugas</h6>
                  {transaksi.user.username}
                  <br /> <br />
                  <h6>Total</h6>
                  <h4>{transaksi.total}</h4>
                </div>
                <div className="col-lg-8">
                  <h2>Detail Transaksi</h2>
                  <br />
                  <div className="row">
                    <div className="col-lg-3">
                      <h6>Nama Paket</h6>
                    </div>
                    <div className="col-lg-3">
                      <h6>Harga Paket</h6>
                    </div>
                    <div className="col-lg-3">
                      <h6>Qty</h6>
                    </div>
                    <div className="col-lg-3">
                      <h6>Total</h6>
                    </div>
                  </div>
                  <hr />
                  {transaksi.detail_transaksi.map((detail) => (
                    <div className="row">
                      <div className="col-lg-3">{detail.paket.jenis_paket}</div>
                      <div className="col-lg-3">{detail.paket.harga}</div>
                      <div className="col-lg-3">{detail.qty}</div>
                      <div className="col-lg-3">
                        {detail.paket.harga * detail.qty}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
