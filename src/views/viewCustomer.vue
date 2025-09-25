<template>
  <div class="bg-gray-100 min-h-screen font-sans antialiased">
    <div class="w-full mx-auto md:container px-5">
      <!-- Header Section -->
      <button
        @click="goBack"
        class="flex items-center mb-2 text-green-600 hover:text-green-800 transition-colors"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Customers
      </button>
      <Header :title="'Users'" :subTitle="'Customer Overview'" class="mb-12" />

      <div class="space-y-12">
        <!-- Loading State -->
        <div v-if="isLoading" class="p-10 text-center bg-white rounded-2xl">
          <PulseAnimation />
        </div>

        <!-- Customer Data -->
        <div v-else-if="customer" class="space-y-12">
          <!-- Personal Information Card -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="col-span-1 bg-white rounded-2xl p-8">
              <div class="">
                <div
                  class="flex flex-col items-center justify-center space-y-3"
                >
                  <div
                    class="rounded-full w-16 h-16 flex items-center justify-center text-white text-lg font-semibold transition-transform transform hover:scale-105"
                    :class="{
                      'bg-green-600': !userDetails?.is_suspended,
                      'bg-red-600': userDetails?.is_suspended,
                    }"
                    aria-label="User avatar"
                  >
                    <p>{{ initials }}</p>
                  </div>
                  <p class="text-center font-semibold text-xl text-gray-900">
                    {{ fullName }}
                  </p>
                  <span
                    class="px-3 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': !userDetails?.is_suspended,
                      'bg-red-100 text-red-800': userDetails?.is_suspended,
                    }"
                  >
                    {{ userDetails?.is_suspended ? "Blocked" : "Active" }}
                  </span>
                </div>
                <!-- User Details -->
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600 font-medium">Phone</p>
                    <p class="text-sm font-semibold text-gray-900">
                      {{ safeField(customer.phone_number, "Not Provided") }}
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600 font-medium">Email</p>
                    <p class="text-sm font-semibold text-gray-900">
                      {{ safeField(customer.email) }}
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600 font-medium">Username</p>
                    <p class="text-sm font-semibold text-gray-900">
                      {{ safeField(customer.username) }}
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600 font-medium">Is Admin</p>
                    <p class="text-sm font-semibold text-gray-900">
                      {{ customer.is_admin ? "Yes" : "No" }}
                    </p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600 font-medium">Date Joined</p>
                    <p class="text-sm font-semibold text-gray-900">
                      {{ formatDate(customer.created_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <!-- Orders Table -->
              <div class="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">
                  Orders Placed
                </h3>
                <div
                  v-if="orders.length"
                  class="overflow-x-auto border border-gray-200 rounded-lg"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          class="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider"
                        >
                          Order Number
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider"
                        >
                          Product
                        </th>

                        <th
                          class="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          class="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr
                        v-for="order in orders"
                        :key="order.order_number"
                        class="hover:bg-gray-50 transition-colors"
                      >
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                          {{ order.order_number }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                          ₦{{
                            order.product?.amount && order.product?.quantity
                              ? (
                                  order.product.amount * order.product.quantity
                                ).toFixed(2)
                              : "N/A"
                          }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-700">
                          {{ safeField(order.product?.product_name) }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                          {{ formatDate(order.created_at) }}
                        </td>
                        <td
                          class="px-6 py-4 text-sm font-medium flex space-x-2"
                        >
                          <router-link
                            :to="{ name: 'order', params: { id: order.id } }"
                            class="text-indigo-600 hover:text-indigo-800 underline transition-colors mr-2"
                          >
                            <AppIcon icon="hugeicons:view" class="w-5 h-5" />
                          </router-link>
                          <!-- <router-link
                            :to="{ name: 'invoice', params: { id: order.id } }"
                          >
                            <AppIcon
                              icon="mingcute:print-line"
                              class="w-5 h-5 text-green-600 hover:text-green-800 transition-colors"
                            />
                          </router-link> -->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="p-10 text-center text-gray-500">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h18M3 3v18M3 3l18 18M21 3v18"
                    ></path>
                  </svg>
                  <p class="mt-2 font-medium">
                    No orders found for this customer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Customer Data -->
        <div v-else class="p-10 text-center bg-white rounded-2xl">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="mt-2 font-medium text-gray-500">No customer data found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSingleCustomer } from "@/services/auth.auth.service";
import Header from "@/components/Header.vue";
import PulseAnimation from "../components/PulseAniation.vue";

export default {
  name: "ViewCustomer",
  components: { Header, PulseAnimation },
  setup() {
    const customer = ref(null);
    const orders = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const route = useRoute();
    const toast = useToast();
    const router = useRouter();

    const fullName = computed(() => {
      if (!customer.value) return "N/A";
      const { first_name, last_name } = customer.value;
      return [first_name, last_name].filter(Boolean).join(" ") || "N/A";
    });

    const initials = computed(() => {
      if (!customer.value) return "";
      const { first_name, last_name } = customer.value;
      if (first_name && last_name) {
        return (
          first_name.charAt(0).toUpperCase() + last_name.charAt(0).toUpperCase()
        );
      }
      if (first_name) return first_name.substring(0, 2).toUpperCase();
      if (last_name) return last_name.substring(0, 2).toUpperCase();
      return "";
    });

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      try {
        return new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return "N/A";
      }
    };

    const safeField = (value, fallback = "N/A") => {
      return value || fallback;
    };

    const goBack = () => {
      router.go(-1);
    };

    const fetchCustomer = async () => {
      const customerId = route.params.id;
      if (!customerId) {
        toast.error("No customer ID provided.");
        return;
      }
      isLoading.value = true;
      try {
        const response = await getSingleCustomer(customerId);
        customer.value = response.data.user;
        orders.value = response.data.orders || [];
        if (!customer.value) {
          toast.error("Customer data not found.");
        }
      } catch (err) {
        console.error(err);
        error.value =
          err.response?.data?.message ||
          err.message ||
          "Failed to load customer.";
        toast.error(error.value);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchCustomer);

    return {
      customer,
      orders,
      isLoading,
      error,
      fullName,
      initials,
      formatDate,
      safeField,
      goBack,
      userDetails: computed(() => ({
        is_suspended: customer.value ? !customer.value.is_active : false,
      })),
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  padding: 1rem 1.5rem;
  text-align: left;
}

thead th {
  background: #f9fafb;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #4b5563;
}

tbody tr:hover {
  background: #f8f9fe;
}

.router-link-active {
  color: #4f46e5;
  font-weight: 600;
}

/* Status badge */
.bg-green-100 {
  background: #d1fae5;
  color: #065f46;
}

.bg-red-100 {
  background: #fee2e2;
  color: #991b1b;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  th,
  td {
    padding: 0.75rem;
    font-size: 0.875rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>
