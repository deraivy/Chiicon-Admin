import { session } from "@/utils";
import axios from "axios";

const baseUrl = process.env.VUE_APP_BASEURL;
export const axiosPost = async (point, data) => {
  const sessiondata = session.get("sessionData");
  console.log(sessiondata);
  let options;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("/login")) options = null;

  try {
    const result = await axios.post(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosDelete = async (point) => {
  const sessiondata = session.get("sessionData");

  let options;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("/login")) options = null;

  try {
    const result = await axios.delete(baseUrl + point, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosPatch = async (point, data) => {
  const sessiondata = session.get("sessionData");

  let options;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("/login")) options = null;

  try {
    const result = await axios.patch(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosPut = async (point, data) => {
  const sessiondata = session.get("sessionData");

  let options;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }

  if (point.includes("/login")) options = null;

  try {
    const result = await axios.put(baseUrl + point, data, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

export const axiosGet = async (point) => {
  const sessiondata = session.get("sessionData");
  let options;
  if (sessiondata) {
    options = {
      headers: {
        Authorization: `Bearer ${sessiondata["access_token"]}`,
      },
    };
  }
  try {
    const result = await axios.get(baseUrl + point, options);
    return { status: result.status, error: null, data: result.data };
  } catch (error) {
    if (error.response == undefined) {
      return {
        status: 0,
        error: { message: error.message },
        data: null,
      };
    } else {
      if (error.response.status == 401) session.logout();
      return {
        status: error.response.status,
        error: error.response.data,
        data: null,
      };
    }
  }
};

// export const isAuthenticated = () => {
//   const sessionData = session.get("sessionData");
//   return !!sessionData && !!sessionData["access_token"];
// };
