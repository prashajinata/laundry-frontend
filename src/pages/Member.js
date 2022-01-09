import React, { Component } from "react";
import MemberCard from "../components/membercard";

export default class Member extends Component {
  constructor() {
    super();
    this.state = {
      members: [
        {
          id_member: "1",
          nama: "Paijo",
          alamat: "Sekarpuro",
          jenis_kelamin: "pria",
          telepon: "0813131313131",
        },
        {
          id_member: "2",
          nama: "Vero",
          alamat: "Suhat",
          jenis_kelamin: "pria",
          telepon: "0909090909090",
        },
        {
          id_member: "3",
          nama: "Siti",
          alamat: "Sudimoro",
          jenis_kelamin: "wanita",
          telepon: "03030303030",
        },
      ],
    };
  }
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header bg-success">
            <h3 className="text-white">List of Member</h3>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.members.map((member) => (
                <li className="list-group-item">
                  <MemberCard
                    nama={member.nama}
                    jenis_kelamin={member.jenis_kelamin}
                    telepon={member.telepon}
                    alamat={member.alamat}
                  />
                </li>
              ))}
            </ul>
            <button className="btn btn-success btn-sm my-1">
              Tambah Data Member
            </button>
          </div>
        </div>
      </div>
    );
  }
}
