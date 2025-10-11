<template>
  <div class="">
    <div class="w-full mx-auto md:container px-5">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              @click="$router.back()"
              class="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <AppIcon
                icon="material-symbols:arrow-back"
                class="w-5 h-5 mr-2"
              />
              Back
            </button>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Order Details</h1>
              <p class="text-gray-600">Order #{{ order.order_number }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="printOrder"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AppIcon icon="material-symbols:print" class="w-4 h-4 mr-2" />
              Print
            </button>
            <button
              v-if="canEditOrder(order.status)"
              @click="editOrder"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <AppIcon icon="material-symbols:edit" class="w-4 h-4 mr-2" />
              Edit Order
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-xl shadow-sm p-8">
        <div class="animate-pulse space-y-6">
          <div class="h-8 bg-gray-200 rounded w-1/3"></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="space-y-4">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Details -->
      <div v-else class="space-y-6">
        <!-- Order Status & Actions -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="flex items-center space-x-4 mb-4 md:mb-0">
              <span
                :class="getStatusBadgeClass(order.status)"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ getStatusText(order.status) }}
              </span>
              <span class="text-sm text-gray-500">
                Created {{ formatDate(order.created_at) }}
              </span>
            </div>
            <div class="flex space-x-3">
              <select
                v-if="canUpdateStatus(order.status)"
                v-model="newStatus"
                @change="updateOrderStatus"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Update Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancel Order</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Order Items -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="p-6 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div
                    v-for="product in orderItems"
                    :key="product.id"
                    class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div class="flex items-center space-x-4 flex-1">
                      <div
                        class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                      >
                        <img
                          v-if="product.product_image"
                          :src="product.product_image"
                          class="w-10 h-10 object-cover rounded"
                          alt="Product image"
                        />
                        <AppIcon
                          v-else
                          icon="material-symbols:image"
                          class="w-8 h-8 text-gray-400"
                        />
                      </div>
                      <div class="flex-1">
                        <h3 class="font-medium text-gray-900">
                          {{ product.product_name }}
                        </h3>
                        <p class="text-sm text-gray-500">
                          SKU: {{ product.product_id || "N/A" }}
                        </p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-semibold text-gray-900">
                        {{ formatCurrency(product.amount) }}
                      </p>
                      <p class="text-sm text-gray-600">
                        Qty: {{ product.quantity }}
                      </p>
                      <p class="text-lg font-bold text-green-600">
                        {{ formatCurrency(product.amount * product.quantity) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Order Summary -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="space-y-3">
                    <div
                      class="flex justify-between text-lg font-bold pt-3 border-t border-gray-200"
                    >
                      <span class="text-gray-900">Total</span>
                      <span class="text-green-600">{{
                        formatCurrency(order.total_amount)
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <!-- Customer Information -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Shipping Information
              </h3>
              <div class="space-y-2 text-sm">
                <p>{{ order.user || "N/A" }}</p>
                <p class="font-medium text-gray-900">
                  {{ order.address || "N/A" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { getSingleOrder } from "../services/auth.auth.service"; // Existing service
// Assume an API service for updating order status
import { updateOrderStatusAPI } from "../services/auth.auth.service";

export default {
  name: "OrderDetailView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const isLoading = ref(false);
    const errorMessage = ref("");
    const order = ref({});
    const newStatus = ref("");
    const orderItems = ref([]);

    const formatCurrency = (value) => {
      if (!value) return "₦0.00";
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(value);
    };

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const getStatusBadgeClass = (status) => {
      const classes = {
        success: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusText = (status) => {
      const texts = {
        success: "Success",
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      };
      return texts[status] || status;
    };

    const canEditOrder = (status) => {
      const editableStatuses = ["pending", "processing"];
      return editableStatuses.includes(status);
    };

    const canUpdateStatus = (status) => {
      const updatableStatuses = ["pending", "processing", "shipped"];
      return updatableStatuses.includes(status);
    };

    const fetchOrder = async () => {
      isLoading.value = true;
      errorMessage.value = "";
      const orderId = route.params.id;
      if (!orderId) {
        errorMessage.value = "Order ID is missing!";
        toast.error(errorMessage.value);
        isLoading.value = false;
        return;
      }
      try {
        const response = await getSingleOrder(orderId);
        order.value = response.data || {};
        orderItems.value = response.data.products || [];
      } catch (err) {
        errorMessage.value = "Failed to fetch order details. Please try again.";
        toast.error(errorMessage.value);
        console.error("Fetch order error:", err);
      } finally {
        isLoading.value = false;
      }
    };

    const updateOrderStatus = async () => {
      if (!newStatus.value) return;
      isLoading.value = true;
      errorMessage.value = "";
      try {
        await updateOrderStatusAPI(order.value.id, newStatus.value);
        order.value.status = newStatus.value;
        toast.success(
          `Order status updated to ${getStatusText(newStatus.value)}`
        );
        newStatus.value = ""; // Reset the select input
      } catch (err) {
        errorMessage.value = "Failed to update order status. Please try again.";
        toast.error(errorMessage.value);
        console.error("Update status error:", err);
      } finally {
        isLoading.value = false;
      }
    };

    const editOrder = () => {
      router.push(`/orders/${order.value.id}/edit`);
    };

    const printOrder = () => {
      window.print();
    };

    onMounted(() => {
      fetchOrder();
    });

    return {
      isLoading,
      errorMessage,
      order,
      newStatus,
      orderItems,
      formatCurrency,
      formatDate,
      getStatusBadgeClass,
      getStatusText,
      canEditOrder,
      canUpdateStatus,
      editOrder,
      printOrder,
      updateOrderStatus,
    };
  },
};
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }

  body {
    background: white !important;
  }

  .bg-gray-50 {
    background: white !important;
  }

  .shadow-sm {
    box-shadow: none !important;
  }

  .border {
    border: 1px solid #e5e7eb !important;
  }
}
</style>
