import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAuthData } from "../store/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const user = useSelector((state) => state.auth.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(resetAuthData());
  };

  return (
    <div className="flex bg-color1_selected h-20 justify-between items-center text-white p-4">
      <Link to="/home">
        <div className="flex">APLIKASI BIODATA CALON KARYAWAN</div>
      </Link>
      <div className="flex">
        {isAuthenticated ? (
          <div className="flex gap-10">
            <p>{user}</p>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
