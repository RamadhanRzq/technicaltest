import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../store/reducers/authSlice.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(5).max(32).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data) => {
    axios
      .post("http://localhost:3000/login", data)
      .then((res) => {
        const { token } = res.data;
        const { user } = res.data;
        dispatch(setToken(token));
        dispatch(setUser(user));
        reset();
        navigate("/home");
      })
      .catch(() => alert("Email dan Password Salah"));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute bg-white rounded-xl shadow-xl p-10 w-[450px]">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-center text-3xl text-color1_selected">
            Login
          </p>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="flex flex-col gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-md font-semibold">
                    Email
                  </span>
                </div>
                <input
                  name="email"
                  id="email"
                  type="text"
                  className="border-2 border-gray-500 w-full text-xl"
                  autoComplete="email"
                  {...register("email")}
                />
                <p className="error text-sm text-red-600">
                  {errors.email?.message}
                </p>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-md font-semibold">
                    Password
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 border-gray-500 w-full text-xl"
                    autoComplete="current-password"
                    {...register("password")}
                  />
                </div>
                <p className="error text-sm text-red-600">
                  {errors.password?.message}
                </p>
              </label>
              <button
                type="submit"
                className="bg-color1_selected hover:bg-color_home hover:text-color1_selected p-3 rounded-md text-color_home mt-2"
              >
                Login
              </button>
            </div>
          </form>
          <Link to="/signup">
            <p className="mx-auto">
              Belum punya akun?
              <span className="text-blue-500 cursor-pointer"> Daftar</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
