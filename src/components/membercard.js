import React from "react";

export default function MemberCard({ nama, jenis_kelamin, telepon, alamat }) {
  return (
    <div className="row">
      <div className="col-lg-5">
        <small className="text-info">Nama</small>
        <br />
        <h5>{nama}</h5>
      </div>
      <div className="col-lg-3">
        <small className="text-info">Gender</small>
        <br />
        <h5>{jenis_kelamin}</h5>
      </div>
      <div className="col-lg-4">
        <small className="text-info">Telepon</small>
        <br />
        <h5>{telepon}</h5>
      </div>
      <div className="col-lg-10">
        <small className="text-info">Alamat</small>
        <br />
        <h5>{alamat}</h5>
      </div>
      <div className="col-lg-2">
        <div className="d-grid gap-1">
          <button className="btn btn-sm btn-warning">Edit</button>
          <button className="btn btn-sm btn-danger">Hapus</button>
        </div>
      </div>
    </div>
  );
}
