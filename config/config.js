import dotenv from "dotenv";
import { userObject } from "../DTOs/users";
dotenv.config();

export const config = {
  PORT: 3000,
  SECRET: process.env.SESSION_SECRET,
};

export const RouteNames = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
};

export const ViewNames = {
  INDEX: "index",
  LOGIN: "login",
  REGISTER: "register",
};

export const users = [userObject()];
