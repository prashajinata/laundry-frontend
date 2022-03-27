import React from "react";
import { getRole } from "../config";

function buttons(edit, hapus) {
  let role = getRole();

  if (role === "admin") {
    return (
      <div className="col-lg-2">
        <div className="btn-group d-flex">
          <button className="btn btn-lg btn-primary" onClick={edit}>
            Edit
          </button>
          <button className="btn btn-lg btn-danger" onClick={hapus}>
            Hapus
          </button>
        </div>
      </div>
    );
  } else {
    return;
  }
}

export default function PaketCard({ nama_paket, harga_paket, edit, hapus }) {
  return (
    <div className="row">
      <div className="col-lg-5">
        <h6 className="text-info">Nama Paket</h6>
        <h5>{nama_paket}</h5>
      </div>
      <div className="col-lg-5">
        <h6 className="text-info">Harga</h6>
        <h5>{harga_paket}</h5>
      </div>
      {buttons(edit, hapus)}
    </div>
  );
}
