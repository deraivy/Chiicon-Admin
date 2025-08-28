<template>
  <!-- Main Container with Glass Effect -->

  <div
    v-if="formData"
    class="max-w-lg mx-auto bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-16"
  >
    <h1 class="text-xl font-bold text-center text-gray-700 mb-8">Register</h1>
    <form @submit.prevent="registerUser" class="w-full flex flex-col gap-4">
      <div class="flex items-start flex-col justify-start">
        <label for="firstName" class="text-sm text-gray-700 mr-2"
          >First Name:</label
        >
        <input
          v-model="formData.first_name"
          type="text"
          id="firstName"
          name="firstName"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.first_name }"
          @blur="validateField('first_name')"
        />
        <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">
          {{ errors.first_name }}
        </p>
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="lastName" class="text-sm text-gray-700 mr-2"
          >Last Name:</label
        >
        <input
          v-model="formData.last_name"
          type="text"
          id="lastName"
          name="lastName"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.last_name }"
          @blur="validateField('last_name')"
        />
        <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">
          {{ errors.last_name }}
        </p>
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="username" class="text-sm text-gray-700 mr-2"
          >Username:</label
        >
        <input
          v-model="formData.username"
          type="text"
          id="username"
          name="username"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.username }"
          @blur="validateField('username')"
        />
        <p v-if="errors.username" class="text-red-500 text-xs mt-1">
          {{ errors.username }}
        </p>
      </div>

      <div class="flex items-start flex-col justify-start">
        <label class="text-sm text-gray-700 mr-2">Phone Number</label>
        <input
          v-model="formData.phone_number"
          type="text"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.phone_number }"
          @blur="validateField('phone_number')"
        />
        <p v-if="errors.phone_number" class="text-red-500 text-xs mt-1">
          {{ errors.phone_number }}
        </p>
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="email" class="text-sm text-gray-700 mr-2">Email:</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.email }"
          @blur="validateField('email')"
        />
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="password" class="text-sm text-gray-700 mr-2"
          >Password:</label
        >
        <input
          v-model="formData.password"
          type="password"
          id="password"
          name="password"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.password }"
          @blur="validateField('password')"
        />
      </div>

      <div class="flex items-start flex-col justify-start">
        <label for="confirmPassword" class="text-sm text-gray-700 mr-2"
          >Confirm Password:</label
        >
        <input
          v-model="formData.confirm_password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.confirm_password }"
          @blur="validateField('confirm_password')"
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
      >
        Register
      </button>
    </form>

    <div class="mt-4 text-center">
      <span class="text-sm text-gray-500 dark:text-gray-300"
        >Already have an account?
      </span>
      <a href="#" class="text-blue-500 hover:text-blue-600">Login</a>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
// import { signup } from "../../services/auth.auth.service";
import { signup } from "@/services/auth.auth.service";
import { useToast } from "vue-toastification";
// import { useRouter } from "vue-router";

export default {
  name: "RegisterView",
  setup() {
    const formData = reactive({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    });
    const isLoading = ref(false);
    const toast = useToast();
    // const router = useRouter();
    const errors = reactive({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    });

    // Validation rules
    const validateField = (field) => {
      switch (field) {
        case "first_name":
          errors.first_name = formData.first_name.trim()
            ? ""
            : "First name is required";
          break;
        case "last_name":
          errors.last_name = formData.last_name.trim()
            ? ""
            : "Last name is required";
          break;
        case "username":
          errors.username = formData.username.trim()
            ? ""
            : "Username is required";
          break;
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          errors.email = formData.email.trim()
            ? emailRegex.test(formData.email)
              ? ""
              : "Invalid email format"
            : "Email is required";
          break;
        }
        case "phone_number": {
          const phoneRegex = /^\d{11}$/;
          errors.phone_number = formData.phone_number.trim()
            ? phoneRegex.test(formData.phone_number)
              ? ""
              : "Invalid phone number (11 digits required)"
            : "Phone number is required";
          break;
        }
        case "password":
          errors.password = formData.password
            ? formData.password.length >= 6
              ? ""
              : "Password must be at least 6 characters"
            : "Password is required";
          break;
        case "confirm_password":
          errors.confirm_password = formData.confirm_password
            ? formData.confirm_password === formData.password
              ? ""
              : "Passwords do not match"
            : "Confirm password is required";
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

    const registerUser = async () => {
      // Start loading
      isLoading.value = true;

      // Validate form
      const isValid = validateForm();

      // Check if any fields are empty
      const anyFieldEmpty = Object.values(formData).some(
        (value) => !value.trim()
      );

      if (!isValid) {
        if (anyFieldEmpty) {
          toast.error("Fill all fields");
        } else {
          toast.error("Please fix the errors in the form before submitting");
        }
        isLoading.value = false;
        return;
      }

      try {
        const response = await signup(formData);
        if (!response.error) {
          toast.success(response.data.message || "Registered Successfully");
          // router.push({
          //   name: "verifyemail",
          //   query: { email: formData.email },
          // });
        } else {
          toast.error(response.error.message || "Error: Try again");
        }
      } catch (error) {
        toast.error("An error occurred during registration");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      registerUser,
      formData,
      errors,
      validateField,
      isFormValid,
    };
  },
};
</script>
