import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function HomeAdmin() {
  const [dataBiodata, setDataBiodata] = useState([]);

  // const handleDelete = (id) => {
  //   axios.delete(`http://localhost:3000/api/biodata/${id}`).catch((error) => {
  //     console.log("Error deleting data:", error);
  //   });
  // };

  const fetchData = async (url) => {
    const data = await axios.get(url).then((res) => res.data);
    return data;
  };

  const { data } = useSWR("http://localhost:3000/api/biodata", () =>
    fetchData("http://localhost:3000/api/biodata")
  );

  useEffect(() => {
    setDataBiodata(data);
  }, [data]);

  console.log(dataBiodata);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Tempat, Tanggal Lahir</th>
              <th className="px-4 py-2">Posisi</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataBiodata &&
              dataBiodata.map((data) => (
                <tr
                  key={data.user_id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 text-center">{data.nama}</td>
                  <td className="py-2 text-center">{data.tempat_tgl_lahir}</td>
                  <td className="py-2 text-center">{data.posisi}</td>
                  <td className="py-14 flex items-center justify-center">
                    <Link
                      to={`/admin/biodata/detail/${data.user_id}`}
                      className="rounded-lg border border-white p-2 text-blue-600 mr-3 hover:bg-gray-300"
                    >
                      Detail
                    </Link>
                    <button className="rounded-lg border border-white p-2 text-red-700 hover:bg-gray-300">
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
