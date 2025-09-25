<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Today's Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Total Sales -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-700">Total Sales</h3>
          <div
            class="flex items-center justify-center rounded-full bg-green-100 p-3"
          >
            <AppIcon icon="mdi:naira" class="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">
          {{ formatCurrency(data.total_sales) }}
        </p>
        <p class="text-sm text-gray-500 mt-1">This month</p>
      </div>

      <!-- Orders -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-700">Orders</h3>
          <div
            class="flex items-center justify-center rounded-full bg-green-100 text-green-600 p-3 shadow-sm"
          >
            <AppIcon icon="mdi:cart-outline" class="w-6 h-6" />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ data.total_orders }}</p>
        <p class="text-sm text-gray-500 mt-1">This week</p>
      </div>

      <!-- Users -->
      <div
        class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-700">Users</h3>
          <div
            class="flex items-center justify-center rounded-full bg-blue-100 text-blue-600 p-3 shadow-sm"
          >
            <AppIcon icon="mdi:account" class="w-6 h-6" />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ data.total_users }}</p>
        <p class="text-sm text-gray-500 mt-1">Active users</p>
      </div>
    </div>

    <!-- Recent Orders and Today's Performance Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Recent Orders -->
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-700">Recent Orders</h3>
          <div class="text-sm text-gray-500">
            {{ data.recent_orders.length }} orders
          </div>
        </div>
        <div class="space-y-3 max-h-80 overflow-y-auto">
          <div
            v-for="order in data.recent_orders"
            :key="order.id"
            class="flex flex-col p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">
                  #{{ order.order_number }}
                </h4>
                <p class="text-sm text-gray-600">{{ order.user }}</p>
              </div>
              <!-- <span
                class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
              >
                Pending
              </span> -->
            </div>
            <div
              v-if="order.product && order.product.product_name"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-gray-600 truncate flex-1">
                {{ order.product.product_name }}
              </span>
              <span class="text-gray-900 font-medium ml-2">
                {{ formatCurrency(order.product.amount) }}
              </span>
            </div>
            <div v-else class="text-sm text-gray-500 italic">
              Product information not available
            </div>
            <div class="text-xs text-gray-400 mt-1">
              {{ formatDate(order.created_at) }}
            </div>
          </div>
          <div
            v-if="!data.recent_orders.length"
            class="text-center py-8 text-gray-500"
          >
            <AppIcon
              icon="mdi:cart-outline"
              class="w-12 h-12 mx-auto mb-2 text-gray-300"
            />
            <p class="text-sm">No recent orders</p>
          </div>
        </div>
      </div>

      <!-- Today's Performance -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Today's &gt; Performance
        </h3>
        <div class="h-64">
          <canvas id="performanceChart"></canvas>
        </div>
        <div class="flex justify-between mt-4 text-sm text-gray-500">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
        </div>
        <div class="flex justify-between mt-2 text-xs">
          <span class="flex items-center">
            <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Breads
          </span>
          <span class="flex items-center">
            <span class="w-3 h-3 bg-green-300 rounded-full mr-2"></span>
            Patty
          </span>
        </div>
      </div>
    </div>

    <!-- Top Selling Items and Top Search Terms -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Top Selling Items
        </h3>
        <div
          v-if="data.top_selling_items && data.top_selling_items.length"
          class="space-y-3"
        >
          <div
            v-for="item in data.top_selling_items.slice(0, 5)"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center">
              <div
                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"
              >
                <span class="text-blue-600 font-medium">{{
                  item.name?.charAt(0) || "?"
                }}</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">
                  {{ item.name || "Unknown Item" }}
                </p>
                <p class="text-xs text-gray-500">{{ item.category || "" }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">
                {{ item.quantity || 0 }} sold
              </p>
              <p class="text-sm text-gray-500">
                {{ formatCurrency(item.total_sales || 0) }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <AppIcon
            icon="mdi:trending-up"
            class="w-12 h-12 mx-auto mb-2 text-gray-300"
          />
          <p class="text-sm">No sales data available</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Top Search Terms
        </h3>
        <div
          v-if="data.top_search_terms && data.top_search_terms.length"
          class="space-y-2"
        >
          <div
            v-for="term in data.top_search_terms.slice(0, 8)"
            :key="term.term"
            class="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <span class="text-sm text-gray-700 flex-1 truncate">
              {{ term.term }}
            </span>
            <span class="text-sm font-medium text-gray-900 ml-2">
              {{ term.count }} searches
            </span>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <AppIcon
            icon="mdi:magnify"
            class="w-12 h-12 mx-auto mb-2 text-gray-300"
          />
          <p class="text-sm">No search data available</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { dashboard } from "@/services/auth.service";
import { useToast } from "vue-toastification";

export default {
  name: "HomeView",
  setup() {
    const toast = useToast();

    // Safe defaults to avoid null runtime errors
    const data = ref({
      total_orders: 0,
      total_sales: 0,
      total_users: 0,
      recent_orders: [],
      top_selling_items: [],
      top_search_terms: [],
    });

    const formatCurrency = (value) => {
      if (!value) return "0.00";
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(value);
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const fetchDashboard = async () => {
      try {
        const response = await dashboard();

        // Handle the actual API response structure
        if (response?.data?.status === "success") {
          const apiData = response.data.data;

          data.value = {
            total_orders: apiData.total_orders ?? 0,
            total_sales: apiData.total_sales ?? 0,
            total_users: apiData.total_users ?? 0,
            recent_orders: apiData.recent_orders ?? [],
            top_selling_items: apiData.top_selling_items ?? [],
            top_search_terms: apiData.top_search_terms ?? [],
          };
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to fetch dashboard data.");
      }
    };

    onMounted(() => {
      fetchDashboard();
    });

    return {
      data,
      formatCurrency,
      formatDate,
    };
  },
};
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
