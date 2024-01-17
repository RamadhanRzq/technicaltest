import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./Layout";
import SignUp from "./pages/SignUp";
import HomeAdmin from "./pages/HomeAdmin";
import AdminRoutes from "./routes/AdminRoutes";
import FormBiodataAdd from "./pages/FormBiodataAdd";
import FormPendidikanAdd from "./pages/FormPendidikanAdd";
import FormPelatihanAdd from "./pages/FormPelatihanAdd";
import FormPekerjaanAdd from "./pages/FormPekerjaanAdd";
import FormBiodataUpdate from "./pages/FormBiodataUpdate";
import FormPendidikanUpdate from "./pages/FormPendidikanUpdate";
import FormPelatihanUpdate from "./pages/FormPelatihanUpdate";
import FormPekerjaanUpdate from "./pages/FormPekerjaanUpdate";
import DetailBiodataAdmin from "./pages/DetailBiodataAdmin";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: rest.location }} />
  );
};

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/formbiodata/add"
          element={<PrivateRoute element={<FormBiodataAdd />} />}
        />
        <Route
          path="/formbiodata/update"
          element={<PrivateRoute element={<FormBiodataUpdate />} />}
        />
        <Route
          path="/formpendidikan/add"
          element={<PrivateRoute element={<FormPendidikanAdd />} />}
        />
        <Route
          path="/formpendidikan/update"
          element={<PrivateRoute element={<FormPendidikanUpdate />} />}
        />
        <Route
          path="/formpelatihan/add"
          element={<PrivateRoute element={<FormPelatihanAdd />} />}
        />
        <Route
          path="/formpelatihan/update"
          element={<PrivateRoute element={<FormPelatihanUpdate />} />}
        />
        <Route
          path="/formpekerjaan/add"
          element={<PrivateRoute element={<FormPekerjaanAdd />} />}
        />
        <Route
          path="/formpekerjaan/update"
          element={<PrivateRoute element={<FormPekerjaanUpdate />} />}
        />

        <Route element={<AdminRoutes />}>
          <Route
            path="/admin/home"
            element={<PrivateRoute element={<HomeAdmin />} />}
          />
          <Route
            path="/admin/biodata/detail/:user_id"
            element={<PrivateRoute element={<DetailBiodataAdmin />} />}
          />
        </Route>
      </Routes>
    </Layout>
  );
}
