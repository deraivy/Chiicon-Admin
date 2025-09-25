<template>
  <div class="bg-gray-100 min-h-screen font-sans text-gray-800">
    <div class="w-full md:container mx-auto px-5">
      <!-- Header Section -->
      <div>
        <button
          @click="goBack"
          class="flex items-center mb-4 text-green-600 hover:text-green-800 transition-colors"
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
          Orders
        </button>
        <h2 class="text-2xl font-semibold mb-4">Order Details</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="col-span-3">
          <h2 class="text-lg text-green-700 mb-4">Status</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white flex items-center gap-4 rounded-lg p-6">
              <div class="border border-green-700 p-2 rounded-full">
                <AppIcon icon="proicons:tag" class="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p>Order Id</p>
                <p class="max-w-2xl">{{ order.id }}</p>
              </div>
            </div>

            <div class="bg-white flex items-center gap-4 rounded-lg p-6">
              <div class="border border-green-700 p-2 rounded-full">
                <AppIcon icon="mdi:account" class="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p>Order Status</p>
                <p>{{ order.status }}</p>
              </div>
            </div>
          </div>
          <!-- {{ formatDate(order.created_at) || "Not Provided" }} -->
          <!-- Cart -->
          <h2 class="text-lg text-green-700 mt-6 mb-4">Ordered items</h2>
          <div class="bg-white rounded-lg p-6 mb-4">
            <div v-if="order.products.length" class="space-y-4">
              <div
                v-for="product in order.products"
                :key="product.id"
                class="flex items-center justify-between"
              >
                <div class="flex items-center">
                  <img
                    :src="product.product_image || '/placeholder.png'"
                    alt="Product Image"
                    class="w-32 h-24 rounded-lg mr-4"
                  />
                  <div>
                    <p class="font-semibold text-gray-800">
                      {{ product.product_name || "Not Available" }}
                    </p>
                    <p class="text-gray-600">
                      Quantity: {{ product.quantity || 0 }}
                    </p>
                  </div>
                </div>
                <p class="font-semibold text-gray-800">
                  ₦{{ product.amount ? product.amount.toFixed(2) : "0.00" }}
                </p>
              </div>
              <div class="flex justify-end mt-4">
                <p class="font-semibold text-gray-800">
                  Total: ₦{{
                    order.total_amount ? order.total_amount.toFixed(2) : "0.00"
                  }}
                </p>
              </div>
            </div>
            <div v-else class="text-gray-500 text-center py-4">
              No products in this order.
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <h2 class="text-lg text-green-700 mb-4">Address</h2>
          <div class="bg-white rounded-lg p-6">
            <div class="space-y-4">
              <!-- Shipping Details -->
              <div>
                <p class="text-xs uppercase text-green-700 mb-4">Customer</p>
                <div class="flex items-center space-x-2 mb-2">
                  <AppIcon icon="bx:user" class="w-5 h-5 text-green-700" />
                  <p>{{ order.user || "Not Provided" }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <AppIcon
                    icon="fluent:mail-24-regular"
                    class="w-5 h-5 text-green-700"
                  />
                  <p>{{ order.email || "Not Provided" }}</p>
                </div>
              </div>
              <!-- Order Info -->
              <div>
                <h3 class="text-sm uppercase font-medium text-gray-700 mb-4">
                  Shipping Address
                </h3>
                <div class="flex items-center space-x-2 mb-2">
                  <AppIcon icon="bx:user" class="w-5 h-5 text-green-700" />
                  <p>{{ order.user || "Not Provided" }}</p>
                </div>
                <div class="flex space-x-2 mb-2">
                  <div class="w-10 h-10">
                    <AppIcon
                      icon="octicon:location-24"
                      class="text-green-700"
                    />
                  </div>
                  <p class="text-sm normal-case">
                    {{ order.address || "Not Provided" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSingleOrder } from "../services/auth.auth.service";
import { useToast } from "vue-toastification";

export default {
  name: "SingleOrder",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const isLoading = ref(false);
    const order = ref({ products: [] });

    const fetchOrder = async () => {
      isLoading.value = true;
      const orderId = route.params.id;
      if (!orderId) {
        toast.error("Order ID is missing!");
        return;
      }
      try {
        const response = await getSingleOrder(orderId);
        order.value = response.data;
      } catch (err) {
        toast.error("Failed to fetch order details.");
      } finally {
        isLoading.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return "Not Provided";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const goBack = () => {
      router.go(-1); // Navigate to the previous page in history
    };

    fetchOrder();

    return {
      isLoading,
      order,
      formatDate,
      goBack,
    };
  },
};
</script>

<style scoped>
.table-auto th,
.table-auto td {
  padding: 0.75rem 0;
}

.transition-colors {
  transition: background-color 0.2s ease-in-out;
}

.rounded-full {
  border-radius: 9999px;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
