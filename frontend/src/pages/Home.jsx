/* eslint-disable no-unused-vars */
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({});
  const [dataPendidikan, setDataPendidikan] = useState({});
  const [dataPelatihan, setDataPelatihan] = useState({});
  const [dataPekerjaan, setDataPekerjaan] = useState({});
  const userRoles = useSelector((state) => state.auth.user.roles);
  const userId = useSelector((state) => state.auth.user.id);

  const isAdmin = userRoles === "admin";

  const handleTambahBiodata = () => {
    navigate("/formbiodata/add");
  };

  const handleTambahPendidikan = () => {
    navigate("/formpendidikan/add");
  };

  const handleTambahPelatihan = () => {
    navigate("/formpelatihan/add");
  };

  const handleTambahPekerjaan = () => {
    navigate("/formpekerjaan/add");
  };

  const handleEditBiodata = () => {
    navigate("/formbiodata/update");
  };

  const handleEditPendidikan = () => {
    navigate("/formpendidikan/update");
  };

  const handleEditPelatihan = () => {
    navigate("/formpelatihan/update");
  };

  const handleEditPekerjaan = () => {
    navigate("/formpekerjaan/update");
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/biodata/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataUser(data[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pendidikan/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataPendidikan(data[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pelatihan/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataPelatihan(data[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pekerjaan/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDataPekerjaan(data[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  const dataFieldsUser = [
    { label: "Posisi", value: dataUser.posisi },
    { label: "Nama", value: dataUser.nama },
    { label: "No. KTP", value: dataUser.no_ktp },
    { label: "Tempat Tanggal Lahir", value: dataUser.tempat_tgl_lahir },
    { label: "Jenis Kelamin", value: dataUser.jenis_kelamin },
    { label: "Agama", value: dataUser.agama },
    { label: "Golongan Darah", value: dataUser.golongan_darah },
    { label: "Status", value: dataUser.status },
    { label: "Alamat KTP", value: dataUser.alamat_ktp },
    { label: "Alamat Tinggal", value: dataUser.alamat_tinggal },
    { label: "Email", value: dataUser.email },
    { label: "No. Telepon", value: dataUser.no_telp },
    { label: "Orang Terdekat", value: dataUser.orang_terdekat },
    { label: "Skill", value: dataUser.skill },
    { label: "Penempatan Bebas", value: dataUser.penempatan_bebas },
    { label: "Penghasilan Diharapkan", value: dataUser.penghasilan_diharapkan },
  ];

  const dataFieldsPendidikan = [
    { label: "Jenjang Pendidikan", value: dataPendidikan.jenjang_pendidikan },
    { label: "Nama Institusi", value: dataPendidikan.nama_institusi },
    { label: "Jurusan", value: dataPendidikan.jurusan },
    { label: "Tahun Lulus", value: dataPendidikan.tahun_lulus },
    { label: "Ipk", value: dataPendidikan.ipk },
  ];

  const dataFieldsPelatihan = [
    { label: "Nama Pelatihan", value: dataPelatihan.nama_pelatihan },
    { label: "Sertifikat", value: dataPelatihan.sertifikat },
    { label: "Tahun", value: dataPelatihan.tahun },
  ];

  const dataFieldsPekerjaan = [
    { label: "Nama Perusahaan", value: dataPekerjaan.nama_perusahaan },
    { label: "Posisi Terakhir", value: dataPekerjaan.posisi_terakhir },
    { label: "Pendapatan Terakhir", value: dataPekerjaan.pendapatan_terakhir },
    { label: "Tahun", value: dataPekerjaan.tahun },
  ];

  console.log(dataUser);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-end">
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleEditBiodata}
            >
              Edit Data Biodata
              <LuPencilLine className="ml-2" />
            </button>
          </div>
        </>
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleTambahBiodata}
            >
              Tambah Biodata
              <FaPlusCircle className="ml-2" />
            </button>
          </div>
        </>
        {isAdmin && (
          <div className="m-4">
            <Link to="/admin/home">
              <button className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau ">
                Halaman Admin
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col shadow-md mx-auto w-1/2 mt-4  rounded-md">
        <div className="text-2xl items-center justify-center flex w-full font-bold mt-2">
          BIODATA CALON KARYAWAN
        </div>
        <div className="flex flex-col m-14 gap-4">
          {dataFieldsUser.map((field, index) => (
            <div key={index} className="flex">
              <div className="flex-initial w-72 font-bold">{field.label}</div>
              <div className="flex-initial w-48">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleEditPendidikan}
            >
              Edit Data Pendidikan
              <LuPencilLine className="ml-2" />
            </button>
          </div>
        </>
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleTambahPendidikan}
            >
              Tambah Data Pendidikan
              <FaPlusCircle className="ml-2" />
            </button>
          </div>
        </>
      </div>
      <div className="flex flex-col shadow-md mx-auto w-1/2 mt-4  rounded-md">
        <div className="text-2xl items-center justify-center flex w-full font-bold mt-2">
          DATA PENDIDIKAN TERAKHIR
        </div>
        <div className="flex flex-col m-14 gap-4">
          {dataFieldsPendidikan.map((field, index) => (
            <div key={index} className="flex">
              <div className="flex-initial w-72 font-bold">{field.label}</div>
              <div className="flex-initial w-48">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleEditPelatihan}
            >
              Edit Data Pelatihan
              <LuPencilLine className="ml-2" />
            </button>
          </div>
        </>
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleTambahPelatihan}
            >
              Tambah Data Pelatihan
              <FaPlusCircle className="ml-2" />
            </button>
          </div>
        </>
      </div>
      <div className="flex flex-col shadow-md mx-auto w-1/2 mt-4  rounded-md">
        <div className="text-2xl items-center justify-center flex w-full font-bold mt-2">
          DATA RIWAYAT PELATIHAN
        </div>
        <div className="flex flex-col m-14 gap-4">
          {dataFieldsPelatihan.map((field, index) => (
            <div key={index} className="flex">
              <div className="flex-initial w-72 font-bold">{field.label}</div>
              <div className="flex-initial w-48">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleTambahPekerjaan}
            >
              Edit Data Pekerjaan
              <LuPencilLine className="ml-2" />
            </button>
          </div>
        </>
        <>
          <div className="m-4">
            <button
              className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau"
              onClick={handleEditPekerjaan}
            >
              Tambah Data Pekerjaan
              <FaPlusCircle className="ml-2" />
            </button>
          </div>
        </>
      </div>
      <div className="flex flex-col shadow-md mx-auto w-1/2 mt-4  rounded-md">
        <div className="text-2xl items-center justify-center flex w-full font-bold mt-2">
          DATA RIWAYAT PEKERJAAN
        </div>
        <div className="flex flex-col m-14 gap-4">
          {dataFieldsPekerjaan.map((field, index) => (
            <div key={index} className="flex">
              <div className="flex-initial w-72 font-bold">{field.label}</div>
              <div className="flex-initial w-48">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
