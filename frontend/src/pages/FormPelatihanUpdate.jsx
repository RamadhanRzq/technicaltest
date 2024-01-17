import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormPelatihanUpdate() {
  const userRoles = useSelector((state) => state.auth.user.roles);
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();

  const isAdmin = userRoles === "admin";

  const handleKembali = () => {
    navigate("/home");
  };

  const schema = yup.object().shape({
    nama_pelatihan: yup.string().required("required"),
    sertifikat: yup.string().required("required"),
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
        `http://localhost:3000/api/pelatihan/${userId}`,
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
          `http://localhost:3000/api/pelatihan/${userId}`,
          {}
        );
        const data = response.data[0];

        if (data) {
          setValue("nama_pelatihan", data.nama_pelatihan);
          setValue("sertifikat", data.sertifikat);
          setValue("tahun", data.tahun);
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
                <span className="label-text">Nama Pelatihan</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                name="nama_pelatihan"
                id="nama_pelatihan"
                autoComplete="nama_pelatihan"
                {...register("nama_pelatihan")}
              />
              <p className="error text-sm text-red-600">
                {errors.nama_pelatihan?.message}
              </p>
            </label>
            <div className="col-span-1">
              <div className="label">
                <span className="label-text">Sertifikat</span>
              </div>
              <div className="mt-1">
                <select
                  id="sertifikat"
                  name="sertifikat"
                  autoComplete="sertifikat"
                  className="w-full rounded-lg border-2 py-2 border-gray-300"
                  {...register("sertifikat")}
                >
                  <option value="Ada">Ada</option>
                  <option value="Tidak">Tidak</option>
                </select>
              </div>
            </div>
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
