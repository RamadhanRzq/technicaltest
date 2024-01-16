import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function FormPendidikanAdd() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const handleKembali = () => {
    navigate("/home");
  };

  const schema = yup.object().shape({
    jenjang_terakhir: yup.string().required("required"),
    nama_institusi: yup.string().required("required"),
    jurusan: yup.string().required("required"),
    tahun_lulus: yup.string().required("required"),
    ipk: yup.string().required("required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    const payload = {
      jenjang_pendidikan: data.jenjang_pendidikan,
      nama_institusi: data.nama_institusi,
      jurusan: data.jurusan,
      tahun_lulus: data.tahun_lulus,
      ipk: data.ipk,
      user_id: userId,
    };
    console.log(payload);
    try {
      await axios.post("http://localhost:3000/api/pendidikan", payload);
      navigate("/home");
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col shadow-xl mx-auto w-1/2 mt-4  rounded-md">
      <div className="m-4">
        <button
          className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau "
          onClick={handleKembali}
        >
          {"<"} Kembali
        </button>
      </div>
      <div className="text-2xl items-center justify-center flex w-full">
        FORM PENDIDIKAN TERAKHIR CALON KARYAWAN
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-4 m-16 ">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Jenjang Pendidikan Terakhir</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="jenjang_pendidikan"
              id="jenjang_pendidikan"
              autoComplete="jenjang_pendidikan"
              {...register("jenjang_pendidikan")}
            />
            <p className="error text-sm text-red-600">
              {errors.jenjang_terakhir?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Nama Institusi</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="nama_institusi"
              id="nama_institusi"
              autoComplete="nama_institusi"
              {...register("nama_institusi")}
            />
            <p className="error text-sm text-red-600">
              {errors.nama_institusi?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Jurusan</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="jurusan"
              id="jurusan"
              autoComplete="jurusan"
              {...register("jurusan")}
            />
            <p className="error text-sm text-red-600">
              {errors.jurusan?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Tahun Lulus</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="tahun_lulus"
              id="tahun_lulus"
              autoComplete="tahun_lulus"
              {...register("tahun_lulus")}
            />
            <p className="error text-sm text-red-600">
              {errors.tahun_lulus?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">IPK</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="ipk"
              id="ipk"
              autoComplete="ipk"
              {...register("ipk")}
            />
            <p className="error text-sm text-red-600">{errors.ipk?.message}</p>
          </label>

          <button className="bg-color1_selected hover:bg-color_home hover:text-color1_selected p-3 rounded-md text-color_home mt-2">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
