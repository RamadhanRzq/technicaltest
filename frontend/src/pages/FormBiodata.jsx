import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

export default function FormBiodata() {
  const navigate = useNavigate();

  const handleKembali = () => {
    navigate("/home");
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
      <form>
        <div className="flex flex-col gap-4 m-16 ">
          <Input title="Posisi Yang Dilamar " input="posisi" type="text" />
          <Input title="Nama " input="nama" type="text" />
          <Input title="No KTP " input="no_ktp" type="number" />
          <Input
            title="Tempat, Tanggal Lahir"
            input="tempat_tgl_lahir"
            type="text"
          />
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
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="laki-laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <Input title="Agama" input="agama" type="text" />
          <Input title="Golongan Darah " input="golongan_darah" type="text" />
          <Input title="Status " input="status" type="text" />
          <Input title="Alamat KTP " input="alamat_ktp" type="text" />
          <Input title="Alamat Tinggal " input="alamat_tinggal" type="text" />
          <Input title="Email " input="email" type="text" />
          <Input title="No Telepon " input="no_telp" type="number" />
          <Input
            title="Orang Terdekat Yang Dapat Dihubungi"
            input="orang_terdekat"
            type="text"
          />
          <Input title="Skill" input="skill" type="text" />
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
              >
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
          </div>
          <Input
            title="Penghasilan Yang Diharapkan Per Bulan"
            input="skill"
            type="number"
          />
          <button className="bg-color1_selected hover:bg-color_home hover:text-color1_selected p-3 rounded-md text-color_home mt-2">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
