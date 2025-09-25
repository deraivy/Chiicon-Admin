import { axiosPost, axiosGet } from "./authRequest.service";

// Admin Registeration
export const signup = async (data) => {
  return await axiosPost("/api/v1/auth/login", data);
};

// login Admin
export const login = async (data) => {
  return await axiosPost("/api/v1/auth/login", data);
};

export const getAdmin = async (data) => {
  return await axiosGet("/api/v1/admin/me", data);
};
// Verify Email
export const verifyemail = async (data) => {
  return await axiosGet(
    "/admin/verify_admin/ImFkbWluQGdtYWlsLmNvbSI.Z1Fk0Q.YIodU1PRvnaSMc_dacxXiZgqC2g",
    data
  );
};

// Get Users
export const allCustomers = async ({ page = 1, per_page = 10 } = {}) => {
  return await axiosGet(
    `/api/v1/admin/get_users?page=${page}&per_page=${per_page}`
  );
};

// Get User by ID
export const getSingleCustomer = async (customerId) => {
  return await axiosGet(`/api/v1/admin/get_user/${customerId}`);
};

export const getSingleOrder = async (orderId) => {
  return await axiosGet(`/api/v1/admin/get_order/${orderId}`);
};
