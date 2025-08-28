export const getStorageData = () => {
  const storageData = sessionStorage.getItem("sessionData");
  const data = JSON.parse(storageData) || {};
  return data;
};

export const session = {
  get: (key) => {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
  },

  set: (key, data) => {
    const sesData = sessionStorage.setItem(key, JSON.stringify(data));
    return sesData;
  },

  clear: () => {
    return sessionStorage.clear();
  },
  logout: () => {
    sessionStorage.clear();
    window.location.reload();
  },
  exists: (key) => {
    const data = sessionStorage.getItem(key);
    if (data) {
      return true;
    } else {
      return false;
    }
  },
};
