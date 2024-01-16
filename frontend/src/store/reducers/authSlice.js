import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: "",
  user: {
    id: "",
    email: "",
    password: "",
    roles: "",
  },
};

function getStoredAuthState() {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    return {
      token,
      user: JSON.parse(userString),
    };
  }

  return { ...initialState };
}

const authSlice = createSlice({
  name: "auth",
  initialState: getStoredAuthState(),
  reducers: {
    setToken(state, action) {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
    },
    setUser(state, action) {
      const { id, email, password, roles } = action.payload;
      state.user.id = id;
      state.user.email = email;
      state.user.password = password;
      state.user.roles = roles;
      localStorage.setItem(
        "user",
        JSON.stringify({ id, email, password, roles })
      );
    },
    resetAuthData() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      return { ...initialState };
    },
  },
});

export const { setToken, setUser, resetAuthData } = authSlice.actions;

export default authSlice.reducer;
