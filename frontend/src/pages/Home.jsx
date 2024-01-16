import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const userRoles = useSelector((state) => state.auth.user.roles);

  const isAdmin = userRoles === "admin";

  const handleTambahBiodata = () => {
    navigate("/formbiodata/add");
  };

  return (
    <div className="flex justify-end">
      <div className="m-4">
        <button
          className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau "
          onClick={handleTambahBiodata}
        >
          Tambah Biodata
          <FaPlusCircle className="ml-2" />
        </button>
      </div>
      <div className="m-4">
        <button className="flex items-center p-2 rounded-lg border-none bg-color1_selected text-white hover:bg-hijau ">
          Edit Biodata
          <LuPencilLine className="ml-2" />
        </button>
      </div>
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
  );
}
