import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormPendidikanUpdate() {
  const userRoles = useSelector((state) => state.auth.user.roles);
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();

  const isAdmin = userRoles === "admin";

  const schema = yup.object().shape({
    jenjang_pendidikan: yup.string().required("required"),
    nama_institusi: yup.string().required("required"),
    jurusan: yup.string().required("required"),
    tahun_lulus: yup.string().required("required"),
    ipk: yup.string().required("required"),
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
        `http://localhost:3000/api/pendidikan/${userId}`,
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
          `http://localhost:3000/api/pendidikan/${userId}`,
          {}
        );
        const biodataUser = response.data[0];

        if (biodataUser) {
          setValue("jenjang_pendidikan", biodataUser.jenjang_pendidikan);
          setValue("nama_institusi", biodataUser.nama_institusi);
          setValue("jurusan", biodataUser.jurusan);
          setValue("tahun_lulus", biodataUser.tahun_lulus);
          setValue("ipk", biodataUser.ipk);
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
                <span className="label-text">Jenjang Pendidikan</span>
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
                {errors.posjenjang_pendidikanisi?.message}
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
              <p className="error text-sm text-red-600">
                {errors.ipk?.message}
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
