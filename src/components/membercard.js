import React from "react";

export default function MemberCard({
  nama,
  jenis_kelamin,
  telepon,
  alamat,
  edit,
  hapus,
}) {
  return (
    <div className="row">
      <div className="col-lg-5">
        <h6 className="text-info">Nama</h6>
        <h5>{nama}</h5>
      </div>
      <div className="col-lg-3">
        <h6 className="text-info">Gender</h6>
        <h5>{jenis_kelamin}</h5>
      </div>
      <div className="col-lg-4">
        <h6 className="text-info">Telepon</h6>
        <h5>{telepon}</h5>
      </div>
      <div className="col-lg-10">
        <h6 className="text-info">Alamat</h6>
        <h5>{alamat}</h5>
      </div>
      <div className="col-lg-2">
        <div className="btn-group d-flex">
          <button className="btn btn-md btn-primary" onClick={edit}>
            Edit
          </button>
          <button className="btn btn-md btn-danger" onClick={hapus}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
