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

export default function UserCard({ nama, username, role, edit, hapus }) {
  return (
    <div className="row">
      <div className="col-lg-4">
        <h6 className="text-info">Nama</h6>
        <h5>{nama}</h5>
      </div>
      <div className="col-lg-3">
        <h6 className="text-info">Username</h6>
        <h5>{username}</h5>
      </div>
      <div className="col-lg-3">
        <h6 className="text-info">Role</h6>
        <h5>{role}</h5>
      </div>
      {buttons(edit, hapus)}
    </div>
  );
}
