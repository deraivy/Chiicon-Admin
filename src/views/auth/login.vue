<template>
  <div
    class="bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <!-- Login Card -->
      <div class="backdrop-blur-lg rounded-2xl p-8 space-y-8">
        <div class="text-center">
          <h2
            class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Chiicon
          </h2>
          <p class="text-gray-500 mt-2">Please sign in to continue</p>
        </div>

        <form @submit.prevent="registerAdmin" class="space-y-6">
          <!-- Email Input -->
          <div class="relative">
            <label
              class="block text-gray-700 text-sm font-medium mb-2"
              for="email"
            >
              Email Address
            </label>
            <div class="relative">
              <input
                v-model="formData.email"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="relative">
            <label
              class="block text-gray-700 text-sm font-medium mb-2"
              for="password"
            >
              Password
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="formData.password"
                class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label class="ml-2 text-gray-600 text-sm" for="remember">
                Remember me
              </label>
            </div>
            <a
              href="#"
              class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >Forgot password?</a
            >
          </div>

          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full flex justify-center py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring focus:ring-offset"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="flex items-center">
              <svg
                class="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </span>
          </button>

          <!-- Divider -->
        </form>

        <!-- Sign Up Link -->
        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >Sign up</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { session } from "@/utils";
import { useToast } from "vue-toastification";
import { login } from "../../services/auth.auth.service";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const formData = reactive({
      email: "",
      password: "",
    });

    const errors = reactive({
      email: "",
      password: "",
    });

    const showPassword = ref(false);
    const isLoading = ref(false);
    const toast = useToast();
    const router = useRouter();

    // Validation rules
    const validateField = (field) => {
      switch (field) {
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          errors.email = formData.email.trim()
            ? emailRegex.test(formData.email)
              ? ""
              : "Invalid email format"
            : "Email is required";
          break;
        }
        case "password":
          errors.password = formData.password
            ? formData.password.length >= 6
              ? ""
              : "Password must be at least 6 characters"
            : "Password is required";
          break;
      }
    };

    const validateForm = () => {
      Object.keys(formData).forEach((field) => validateField(field));
      return Object.values(errors).every((error) => error === "");
    };

    const isFormValid = computed(() => {
      return (
        Object.values(errors).every((error) => error === "") &&
        Object.values(formData).every((value) => value.trim() !== "")
      );
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const registerAdmin = async () => {
      console.log("Login attempt started"); // Debug log
      isLoading.value = true;

      const isValid = validateForm();
      const anyFieldEmpty = Object.values(formData).some(
        (value) => !value.trim()
      );

      if (!isValid) {
        if (anyFieldEmpty) {
          toast.error("Please fill all fields");
        } else {
          toast.error("Please fix the errors in the form before submitting");
        }
        isLoading.value = false;
        return;
      }

      try {
        console.log("Sending login request with:", formData); // Debug log
        const response = await login(formData);
        console.log("Login response:", response); // Debug log

        if (response && !response.error) {
          toast.success(response.data.message || "Login Successful");
          session.set("sessionData", response.data);
          router.push("/dashboard").then(() => {
            window.location.reload();
          });
        } else {
          toast.error(response.error?.message || "Error: Try again.");
        }
      } catch (error) {
        console.error("Login error:", error); // Debug log
        toast.error("An error occurred during login: " + error.message);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      formData,
      errors,
      showPassword,
      isLoading,
      togglePassword,
      registerAdmin,
      validateField,
      isFormValid,
    };
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
