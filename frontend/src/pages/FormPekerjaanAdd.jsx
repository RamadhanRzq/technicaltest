import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function FormPekerjaanAdd() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const handleKembali = () => {
    navigate("/home");
  };

  const schema = yup.object().shape({
    nama_perusahaan: yup.string().required("required"),
    posisi_terakhir: yup.string().required("required"),
    pendapatan_terakhir: yup.string().required("required"),
    tahun: yup.string().required("required"),
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
      nama_perusahaan: data.nama_perusahaan,
      posisi_terakhir: data.posisi_terakhir,
      pendapatan_terakhir: data.pendapatan_terakhir,
      tahun: data.tahun,
      user_id: userId,
    };
    console.log(payload);
    try {
      await axios.post("http://localhost:3000/api/pekerjaan", payload);
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
        FORM PELATIHAN CALON KARYAWAN
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-4 m-16 ">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Nama Perusahaan</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="nama_perusahaan"
              id="nama_perusahaan"
              autoComplete="nama_perusahaan"
              {...register("nama_perusahaan")}
            />
            <p className="error text-sm text-red-600">
              {errors.nama_perusahaan?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Posisi Terakhir</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="posisi_terakhir"
              id="posisi_terakhir"
              autoComplete="posisi_terakhir"
              {...register("posisi_terakhir")}
            />
            <p className="error text-sm text-red-600">
              {errors.posisi_terakhir?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Pendapatan Terakhir</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="pendapatan_terakhir"
              id="pendapatan_terakhir Terakhir"
              autoComplete="pendapatan_terakhir"
              {...register("pendapatan_terakhir")}
            />
            <p className="error text-sm text-red-600">
              {errors.pendapatan_terakhir?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Tahun</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="tahun"
              id="tahun"
              autoComplete="tahun"
              {...register("tahun")}
            />
            <p className="error text-sm text-red-600">
              {errors.tahun?.message}
            </p>
          </label>
          <button className="bg-color1_selected hover:bg-color_home hover:text-color1_selected p-3 rounded-md text-color_home mt-2">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
