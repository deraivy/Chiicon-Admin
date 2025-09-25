import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    adminProfile: null, // 👈 only this will persist
  }),
  actions: {
    setAdminProfile(profile) {
      this.adminProfile = profile;
      sessionStorage.setItem("adminProfile", JSON.stringify(profile));
    },
    loadFromSession() {
      const stored = sessionStorage.getItem("adminProfile");
      if (stored) {
        this.adminProfile = JSON.parse(stored);
      }
    },
    logout() {
      this.adminProfile = null;
      sessionStorage.removeItem("adminProfile");
    },
  },
});
