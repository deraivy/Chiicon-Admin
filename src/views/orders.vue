<template>
  <div class="w-full md:container mx-auto px-5">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
          <p class="text-gray-600 mt-1">Manage and track customer orders</p>
        </div>
        <div class="mt-4 sm:mt-0 flex space-x-3">
          <button
            @click="exportOrders"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <AppIcon icon="material-symbols:download" class="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            @click="showFilters = !showFilters"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <AppIcon icon="material-symbols:filter-list" class="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <AppIcon
              icon="material-symbols:shopping-cart"
              class="w-6 h-6 text-blue-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <AppIcon
              icon="material-symbols:pending"
              class="w-6 h-6 text-yellow-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.pending }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <AppIcon
              icon="material-symbols:check-circle"
              class="w-6 h-6 text-green-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.completed }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <AppIcon
              icon="material-symbols:cancel"
              class="w-6 h-6 text-red-600"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Cancelled</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats.cancelled }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div
      v-if="showFilters"
      class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="filters.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Date Range</label
          >
          <select
            v-model="filters.dateRange"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Customer</label
          >
          <input
            v-model="filters.customer"
            type="text"
            placeholder="Search customer..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div class="flex items-end">
          <button
            @click="applyFilters"
            class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <!-- Loading State -->
      <div v-if="isLoading" class="p-8">
        <div class="animate-pulse space-y-4">
          <div v-for="n in 5" :key="n" class="flex space-x-4">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/6"></div>
            <div class="h-4 bg-gray-200 rounded w-1/6"></div>
            <div class="h-4 bg-gray-200 rounded w-1/6"></div>
            <div class="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div
        v-else-if="filteredOrders && filteredOrders.length > 0"
        class="overflow-x-auto"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="hover:bg-gray-50 transition-colors cursor-pointer"
              @click="viewOrder(order)"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  #{{ order.order_number }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ order.user || "Unknown" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(order.created_at) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  ₦{{ order.product?.amount }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusBadgeClass(order.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div class="flex justify-end space-x-2">
                  <router-link
                    :to="{ name: 'single-order', params: { id: order.id } }"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                    title="View Details"
                  >
                    <AppIcon
                      icon="material-symbols:visibility"
                      class="w-4 h-4"
                    />
                  </router-link>
                  <button
                    @click.stop="editOrder(order)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                    title="Edit Order"
                  >
                    <AppIcon icon="material-symbols:edit" class="w-4 h-4" />
                  </button>
                  <button
                    @click.stop="openDeleteModal(order)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete Order"
                  >
                    <AppIcon icon="material-symbols:delete" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else-if="!isLoading" class="text-center py-12">
        <div class="max-w-md mx-auto">
          <div
            class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <AppIcon
              icon="material-symbols:shopping-cart-outline"
              class="w-12 h-12 text-gray-400"
            />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p class="text-gray-500 mb-6">
            {{
              hasActiveFilters
                ? "Try adjusting your filters to see more results."
                : "Get started by creating your first order."
            }}
          </p>
          <button
            v-if="!hasActiveFilters"
            @click="createOrder"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <AppIcon icon="material-symbols:add" class="w-4 h-4 mr-2" />
            Create First Order
          </button>
          <button
            v-else
            @click="clearFilters"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="!isLoading && filteredOrders && filteredOrders.length > 0"
        class="px-6 py-4 border-t border-gray-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="text-sm text-gray-700 mb-4 sm:mb-0">
            Showing
            <span class="font-medium">{{
              (currentPage - 1) * itemsPerPage + 1
            }}</span>
            to
            <span class="font-medium">{{
              Math.min(currentPage * itemsPerPage, filteredOrders.length)
            }}</span>
            of
            <span class="font-medium">{{ filteredOrders.length }}</span>
            results
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage * itemsPerPage >= filteredOrders.length"
              class="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allOrders } from "@/services/auth.service";
import { ref, computed } from "vue";

export default {
  name: "OrdersPage",
  setup() {
    const isLoading = ref(false);
    const showFilters = ref(false);
    const selectedOrder = ref(null);
    const orderToDelete = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const orders = ref([]);
    const filters = ref({
      status: "",
      dateRange: "",
      customer: "",
    });

    const fetchOrders = async () => {
      isLoading.value = true;
      const response = await allOrders({
        page: currentPage.value,
        per_page: itemsPerPage,
      });
      orders.value = response.data.orders;
      isLoading.value = false;
    };

    const stats = computed(() => {
      if (!orders.value)
        return { total: 0, pending: 0, completed: 0, cancelled: 0 };

      return {
        total: orders.value.length,
        pending: orders.value.filter((order) => order.status === "pending")
          .length,
        completed: orders.value.filter((order) => order.status === "completed")
          .length,
        cancelled: orders.value.filter((order) => order.status === "cancelled")
          .length,
      };
    });

    const filteredOrders = computed(() => {
      if (!orders.value) return [];

      let filtered = [...orders.value];

      if (filters.value.status) {
        filtered = filtered.filter(
          (order) => order.status === filters.value.status
        );
      }

      if (filters.value.customer) {
        const searchTerm = filters.value.customer.toLowerCase();
        filtered = filtered.filter(
          (order) =>
            order.customer?.name?.toLowerCase().includes(searchTerm) ||
            order.customer?.email?.toLowerCase().includes(searchTerm)
        );
      }

      return filtered;
    });

    const hasActiveFilters = computed(() => {
      return (
        filters.value.status ||
        filters.value.dateRange ||
        filters.value.customer
      );
    });

    const getStatusBadgeClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        completed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusText = (status) => {
      const texts = {
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        completed: "Completed",
        cancelled: "Cancelled",
      };
      return texts[status] || status;
    };

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const applyFilters = () => {
      currentPage.value = 1;
    };

    const clearFilters = () => {
      filters.value = {
        status: "",
        dateRange: "",
        customer: "",
      };
      applyFilters();
    };

    const viewOrder = (order) => {
      selectedOrder.value = order;
    };

    const editOrder = (order) => {
      console.log("Edit order:", order);
    };

    const createOrder = () => {
      console.log("Create new order");
    };

    const openDeleteModal = (order) => {
      orderToDelete.value = order;
    };

    const deleteOrder = async (order) => {
      try {
        orders.value = orders.value.filter((o) => o.id !== order.id);
        orderToDelete.value = null;
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    };

    const updateOrderStatus = (orderId, newStatus) => {
      const order = orders.value.find((o) => o.id === orderId);
      if (order) {
        order.status = newStatus;
      }
    };

    const exportOrders = () => {
      console.log("Export orders");
    };

    const previousPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value * itemsPerPage < filteredOrders.value.length)
        currentPage.value++;
    };

    fetchOrders();
    return {
      isLoading,
      showFilters,
      selectedOrder,
      orderToDelete,
      currentPage,
      itemsPerPage,
      filters,
      filteredOrders,
      stats,
      hasActiveFilters,
      getStatusBadgeClass,
      getStatusText,
      formatDate,
      applyFilters,
      clearFilters,
      viewOrder,
      editOrder,
      createOrder,
      openDeleteModal,
      deleteOrder,
      updateOrderStatus,
      exportOrders,
      previousPage,
      nextPage,
    };
  },
};
</script>
