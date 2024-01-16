import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./Layout";
import SignUp from "./pages/SignUp";
import HomeAdmin from "./pages/HomeAdmin";
import AdminRoutes from "./routes/AdminRoutes";
import FormBiodataAdd from "./pages/FormBiodataAdd";
import FormBiodataUpdate from "./pages/FormBiodataUpdate";

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

        <Route element={<AdminRoutes />}>
          <Route
            path="/admin/home"
            element={<PrivateRoute element={<HomeAdmin />} />}
          />
        </Route>
      </Routes>
    </Layout>
  );
}
