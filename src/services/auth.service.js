import {
  axiosPost,
  axiosPut,
  axiosDelete,
  axiosGet,
} from "./authRequest.service";

// all categories
export const allCategory = async (data) => {
  return await axiosGet("/api/v1/admin/all_categories", data);
};

// add category
export const addCategory = async (data) => {
  return await axiosPost("/api/v1/admin/add_category", data);
};

// update category
export const updateCategory = async (categoryId, data) => {
  return await axiosPut(`/api/v1/admin/update_category/${categoryId}`, data);
};

// delete category
export const delCategory = async (categoryId) => {
  return await axiosDelete(`/api/v1/admin/delete_category/${categoryId}`);
};

// all products
export const allProducts = async ({ page = 1, per_page = 30 } = {}) => {
  return await axiosGet(
    `/api/v1/admin/all_products?page=${page}&per_page=${per_page}`
  );
};

export const search = async (query) => {
  return await axiosGet(
    `/api/v1/products/search?query=${encodeURIComponent(query)}`
  );
};

// add product
export const addProduct = async (data) => {
  return await axiosPost("/api/v1/admin/add_product", data);
};

// update product
export const updateProduct = async (productId, data) => {
  return await axiosPut(`/api/v1/admin/update_product/${productId}`, data);
};

// delete product
export const delProduct = async (productId) => {
  return await axiosDelete(`/api/v1/admin/delete_product/${productId}`);
};

export const getSingleProduct = async (productId) => {
  return await axiosGet(`/api/v1/admin/single_product/${productId}`);
};

// dashboard
export const dashboard = async (data) => {
  return await axiosGet("/api/v1/admin/dashboard", data);
};

export const uploadImage = async (data) => {
  return await axiosPost("/api/v1/cloudinary/manage-image", data);
};

// all orders
export const allOrders = async ({ page = 1, per_page = 30 } = {}) => {
  return await axiosGet(
    `/api/v1/admin/all_orders?page=${page}&per_page=${per_page}`
  );
};
