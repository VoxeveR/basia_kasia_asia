import axios from "axios";
import api from "./api";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      "email": email,
      "password": password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error for further handling
  }
}

export async function register(email: string, password: string, username: string, date_of_birth: Date | undefined, gender: string) {
  const response = await axios.post("http://localhost:8000/api/auth/register", {
    "username": username,
    "email": email,
    "password": password,
    "date_of_birth": date_of_birth,
    "gender": gender,
    "role_id": 1,
  });
  return response.data;
}

export async function logout() {
  const token = sessionStorage.getItem("refreshToken");
  console.log("Logging out with token:", token);
  const response = await api.post(
    "/auth/logout", 
    {
      "token": JSON.parse(token || "null"),
    }
  );
  return response.data;
}