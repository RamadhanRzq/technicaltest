import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    roles: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/signup", formData);
      alert("Success Sign Up");
      navigate("/login");
    } catch (error) {
      alert("Email is already registered");
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute bg-white rounded-xl shadow-xl p-10 w-[450px]">
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-center text-3xl text-color1_selected">
            Sign Up
          </p>
          <form onSubmit={handleSubmit}>
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
                  value={formData.email}
                  onChange={handleChange}
                />
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </label>
              <button
                type="submit"
                className="bg-color1_selected hover:bg-color_home hover:text-color1_selected p-3 rounded-md text-color_home mt-2"
              >
                Sign Up
              </button>
            </div>
          </form>
          <Link to="/login">
            <p className="mx-auto">
              Sudah punya akun?
              <span className="text-blue-500 cursor-pointer"> Login</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
