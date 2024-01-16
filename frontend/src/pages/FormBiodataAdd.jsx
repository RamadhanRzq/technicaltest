import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function FormBiodataAdd() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const handleKembali = () => {
    navigate("/home");
  };

  const schema = yup.object().shape({
    posisi: yup.string().required("required"),
    nama: yup.string().required("required"),
    no_ktp: yup.string().required("required"),
    tempat_tgl_lahir: yup.string().required("required"),
    jenis_kelamin: yup.string().required("required"),
    agama: yup.string().required("required"),
    golongan_darah: yup.string().required("required"),
    status: yup.string().required("required"),
    alamat_ktp: yup.string().required("required"),
    alamat_tinggal: yup.string().required("is required"),
    email: yup.string().required("required"),
    no_telp: yup.string().required("required"),
    orang_terdekat: yup.string().required("required"),
    skill: yup.string().required("required"),
    penempatan_bebas: yup.string().required("required"),
    penghasilan_diharapkan: yup.string().required("required"),
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
      posisi: data.posisi,
      nama: data.nama,
      no_ktp: data.no_ktp,
      tempat_tgl_lahir: data.tempat_tgl_lahir,
      jenis_kelamin: data.jenis_kelamin,
      agama: data.agama,
      golongan_darah: data.golongan_darah,
      status: data.status,
      alamat_ktp: data.alamat_ktp,
      alamat_tinggal: data.alamat_tinggal,
      email: data.email,
      no_telp: data.no_telp,
      orang_terdekat: data.orang_terdekat,
      skill: data.skill,
      penempatan_bebas: data.penempatan_bebas,
      penghasilan_diharapkan: data.penghasilan_diharapkan,
      user_id: userId,
    };
    console.log(payload);
    try {
      await axios.post("http://localhost:3000/api/biodata", payload);
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
        FORM BIODATA CALON KARYAWAN
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-4 m-16 ">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Posisi Yang Dilamar</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="posisi"
              id="posisi"
              autoComplete="posisi"
              {...register("posisi")}
            />
            <p className="error text-sm text-red-600">
              {errors.posisi?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Nama</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="nama"
              id="nama"
              autoComplete="nama"
              {...register("nama")}
            />
            <p className="error text-sm text-red-600">{errors.nama?.message}</p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">No. KTP</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="no_ktp"
              id="no_ktp"
              autoComplete="no_ktp"
              {...register("no_ktp")}
            />
            <p className="error text-sm text-red-600">
              {errors.no_ktp?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Tempat, Tanggal Lahir</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="tempat_tgl_lahir"
              id="tempat_tgl_lahir"
              autoComplete="tempat_tgl_lahir"
              {...register("tempat_tgl_lahir")}
            />
            <p className="error text-sm text-red-600">
              {errors.tempat_tgl_lahir?.message}
            </p>
          </label>
          <div className="col-span-1">
            <div className="label">
              <span className="label-text">Jenis Kelamin</span>
            </div>
            <div className="mt-1">
              <select
                id="jenis_kelamin"
                name="jenis_kelamin"
                autoComplete="jenis_kelamin"
                className="w-full rounded-lg border-2 py-2 border-gray-300"
                {...register("jenis_kelamin")}
              >
                <option value="laki-laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Agama</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="agama"
              id="agama"
              autoComplete="agama"
              {...register("agama")}
            />
            <p className="error text-sm text-red-600">
              {errors.agama?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Golongan Darah</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="golongan_darah"
              id="golongan_darah"
              autoComplete="golongan_darah"
              {...register("golongan_darah")}
            />
            <p className="error text-sm text-red-600">
              {errors.golongan_darah?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Status</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="status"
              id="status"
              autoComplete="status"
              {...register("status")}
            />
            <p className="error text-sm text-red-600">
              {errors.status?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Alamat KTP</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="alamat_ktp"
              id="alamat_ktp"
              autoComplete="alamat_ktp"
              {...register("alamat_ktp")}
            />
            <p className="error text-sm text-red-600">
              {errors.alamat_ktp?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Alamat Tinggal </span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="alamat_tinggal"
              id="alamat_tinggal"
              autoComplete="alamat_tinggal"
              {...register("alamat_tinggal")}
            />
            <p className="error text-sm text-red-600">
              {errors.alamat_tinggal?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="email"
              id="email"
              autoComplete="email"
              {...register("email")}
            />
            <p className="error text-sm text-red-600">
              {errors.email?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Nomor Telepon</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="no_telp"
              id="no_telp"
              autoComplete="no_telp"
              {...register("no_telp")}
            />
            <p className="error text-sm text-red-600">
              {errors.no_telp?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">
                Orang Terdekat Yang Dapat Dihubungi
              </span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="orang_terdekat"
              id="orang_terdekat"
              autoComplete="orang_terdekat"
              {...register("orang_terdekat")}
            />
            <p className="error text-sm text-red-600">
              {errors.orang_terdekat?.message}
            </p>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Skill</span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="skill"
              id="skill"
              autoComplete="skill"
              {...register("skill")}
            />
            <p className="error text-sm text-red-600">
              {errors.skill?.message}
            </p>
          </label>
          <div className="col-span-1">
            <div className="label">
              <span className="label-text">
                Bersedia Ditempatkan Di Seluruh Kantor Perusahaan
              </span>
            </div>
            <div className="mt-1">
              <select
                id="penempatan_bebas"
                name="penempatan_bebas"
                autoComplete="penempatan_bebas"
                className="w-full rounded-lg border-2 py-2 border-gray-300"
                {...register("penempatan_bebas")}
              >
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">
                Penghasilan Yang Diharapkan Per Bulan
              </span>
            </div>
            <input
              type="text"
              className="input input-bordered"
              name="penghasilan_diharapkan"
              id="penghasilan_diharapkan"
              autoComplete="penghasilan_diharapkan"
              {...register("penghasilan_diharapkan")}
            />
            <p className="error text-sm text-red-600">
              {errors.penghasilan_diharapkan?.message}
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
