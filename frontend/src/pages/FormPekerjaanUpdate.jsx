import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormPekerjaanUpdate() {
  const userRoles = useSelector((state) => state.auth.user.roles);
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();

  const isAdmin = userRoles === "admin";

  const schema = yup.object().shape({
    nama_perusahaan: yup.string().required("required"),
    posisi_terakhir: yup.string().required("required"),
    pendapatan_terakhir: yup.string().required("required"),
    tahun: yup.string().required("required"),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/pekerjaan/${userId}`,
        data
      );

      console.log("Server response:", response.data);

      if (response.status === 200) {
        alert("Sukses Update Data");
        navigate("/home");
      } else {
        console.error("Unexpected server response:", response.status);
      }
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pekerjaan/${userId}`,
          {}
        );
        const biodataUser = response.data[0];

        if (biodataUser) {
          setValue("nama_perusahaan", biodataUser.nama_perusahaan);
          setValue("posisi_terakhir", biodataUser.posisi_terakhir);
          setValue("pendapatan_terakhir", biodataUser.pendapatan_terakhir);
          setValue("tahun", biodataUser.tahun);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setValue, userId]);

  return (
    <>
      <div className="flex justify-end">
        <div className="m-4"></div>
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
      <div className="flex flex-col shadow-xl mx-auto w-1/2 mt-4  rounded-md">
        <div className="text-2xl items-center justify-center flex w-full font-bold">
          BIODATA CALON KARYAWAN
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
                <span className="label-text">Nama Institusi</span>
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
                id="pendapatan_terakhir"
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
    </>
  );
}
