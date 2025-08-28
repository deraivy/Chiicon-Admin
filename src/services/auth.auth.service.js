import { axiosPost, axiosGet } from "./authRequest.service";

// Admin Registeration
export const signup = async (data) => {
  return await axiosPost("/admin/register_admin", data);
};

// login Admin
export const login = async (data) => {
  return await axiosPost("/api/v1/auth/login", data);
};

export const verifyemail = async (data) => {
  return await axiosGet(
    "/admin/verify_admin/ImFkbWluQGdtYWlsLmNvbSI.Z1Fk0Q.YIodU1PRvnaSMc_dacxXiZgqC2g",
    data
  );
};
