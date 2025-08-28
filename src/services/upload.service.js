import axios from "axios";
// import { session } from "@/utils";

const baseUrl = process.env.VUE_APP_CLOUDINARY_URL;

export const uploadImageToCloudinary = async (data) => {
  try {
    const result = await axios.post(`${baseUrl}upload`, data);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.msg },
        data: null,
      };
    } else {
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const deleteImageInCloudinary = async (data) => {
  try {
    const result = await axios.post(`${baseUrl}destroy`, data);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.msg },
        data: null,
      };
    } else {
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};
