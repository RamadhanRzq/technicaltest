import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAuthData } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(resetAuthData());
  };

  return (
    <div className="flex bg-color1_selected h-20 justify-between items-center text-white p-4">
      <div className="flex"> </div>
      <div className="flex">APLIKASI BIODATA CALON KARYAWAN</div>
      <div className="flex">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
