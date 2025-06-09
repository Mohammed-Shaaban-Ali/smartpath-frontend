import { SMARTPATHTOKEN, SMARTPATHUSER } from "@/constants";
import { IAuthState } from "./../../../types/auth/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

const initialState: IAuthState = {
  user: getCookie(SMARTPATHUSER)
    ? JSON.parse(getCookie(SMARTPATHUSER) as string)
    : null,
  token:
    (getCookie(SMARTPATHTOKEN) as string) ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODQwM2NlNTcxZDY4NDI0NmI4MTI1ODEiLCJlbWFpbCI6Im1zNzUwMDc0NkBnbWFpbC5jb20iLCJpYXQiOjE3NDk0OTYyODksImV4cCI6MTc4MTA1Mzg4OX0.o8UM9OImXEWN9yDyjEypvDfAA0ZAugdStrGUWMpAIsQ",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      setCookie(SMARTPATHTOKEN, action.payload.token, {
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie(SMARTPATHUSER, JSON.stringify(action.payload.user), {
        maxAge: 60 * 60 * 24 * 7,
      });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      deleteCookie(SMARTPATHTOKEN);
      deleteCookie(SMARTPATHUSER);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
