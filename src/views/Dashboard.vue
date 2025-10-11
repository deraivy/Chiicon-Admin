<template>
  <div class="w-full mx-auto md:container px-5">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p class="text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 flex items-center space-x-3">
          <div class="relative">
            <AppIcon
              icon="material-symbols:calendar-month"
              class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <select
              class="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid - Improved -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total Sales Card -->
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p class="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div
            class="flex items-center justify-center rounded-xl bg-green-100 p-3"
          >
            <AppIcon
              icon="material-symbols:trending-up"
              class="w-6 h-6 text-green-600"
            />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900 mb-2">
          {{ formatCurrency(data.total_sales) }}
        </p>
        <div class="flex items-center text-sm text-green-600">
          <AppIcon icon="material-symbols:trending-up" class="w-4 h-4 mr-1" />
          <span>+12.5% from last month</span>
        </div>
      </div>

      <!-- Orders Card -->
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Orders</h3>
            <p class="text-sm text-gray-500 mt-1">This week</p>
          </div>
          <div
            class="flex items-center justify-center rounded-xl bg-blue-100 p-3"
          >
            <AppIcon
              icon="material-symbols:shopping-cart"
              class="w-6 h-6 text-blue-600"
            />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900 mb-2">
          {{ data.total_orders }}
        </p>
        <div class="flex items-center text-sm text-green-600">
          <AppIcon icon="material-symbols:trending-up" class="w-4 h-4 mr-1" />
          <span>+8.2% from last week</span>
        </div>
      </div>

      <!-- Users Card -->
      <div
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Users</h3>
            <p class="text-sm text-gray-500 mt-1">Active users</p>
          </div>
          <div
            class="flex items-center justify-center rounded-xl bg-purple-100 p-3"
          >
            <AppIcon
              icon="material-symbols:group"
              class="w-6 h-6 text-purple-600"
            />
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900 mb-2">
          {{ data.total_users }}
        </p>
        <div class="flex items-center text-sm text-green-600">
          <AppIcon icon="material-symbols:trending-up" class="w-4 h-4 mr-1" />
          <span>+5.7% from last month</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Recent Orders - Enhanced -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <div class="flex items-center space-x-2">
              <span
                class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg"
              >
                {{ data.recent_orders.length }} orders
              </span>
              <router-link
                to="/orders"
                class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
              >
                View All
                <AppIcon
                  icon="material-symbols:arrow-forward"
                  class="w-4 h-4 ml-1"
                />
              </router-link>
            </div>
          </div>
        </div>
        <div class="p-4 max-h-96 overflow-y-auto">
          <div class="space-y-3">
            <div
              v-for="order in data.recent_orders"
              :key="order.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-l-4 border-blue-500"
            >
              <div class="flex items-center space-x-4 flex-1">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <AppIcon
                    icon="material-symbols:receipt"
                    class="w-5 h-5 text-blue-600"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 truncate">
                    #{{ order.order_number }}
                  </h4>
                  <p class="text-sm text-gray-600 truncate">{{ order.user }}</p>
                  <p class="text-xs text-gray-400 mt-1">
                    {{ formatDate(order.created_at) }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <div
                  v-if="order.product && order.product.product_name"
                  class="space-y-1"
                >
                  <p
                    class="text-sm font-medium text-gray-900 truncate max-w-xs"
                  >
                    {{ order.product.product_name }}
                  </p>
                  <p class="text-lg font-bold text-gray-900">
                    {{ formatCurrency(order.product.amount) }}
                  </p>
                </div>
                <div v-else class="text-sm text-gray-500 italic">
                  No product info
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-if="!data.recent_orders.length"
              class="text-center py-12 text-gray-500"
            >
              <AppIcon
                icon="material-symbols:shopping-cart-outline"
                class="w-16 h-16 mx-auto mb-4 text-gray-300"
              />
              <p class="text-lg font-medium text-gray-900 mb-2">
                No recent orders
              </p>
              <p class="text-sm">Orders will appear here once they're placed</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Chart - Enhanced -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              Sales Performance
            </h3>
            <select
              class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-end justify-between space-x-2">
            <!-- Simple Bar Chart -->
            <div
              v-for="(item, index) in performanceData"
              :key="index"
              class="flex flex-col items-center flex-1"
            >
              <div
                class="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                :style="{ height: item.value + '%', maxHeight: '200px' }"
              ></div>
              <span class="text-xs text-gray-500 mt-2">{{ item.month }}</span>
              <span class="text-xs font-medium text-gray-900 mt-1">{{
                formatCurrency(item.amount)
              }}</span>
            </div>
          </div>

          <!-- Legend -->
          <div
            class="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100"
          >
            <div class="flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span class="text-sm text-gray-600">Total Sales</span>
            </div>
            <div class="flex items-center">
              <span class="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              <span class="text-sm text-gray-600">Previous Period</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { dashboard } from "@/services/auth.service";
import { useToast } from "vue-toastification";

export default {
  name: "DashboardView",
  setup() {
    const toast = useToast();

    const data = ref({
      total_orders: 0,
      total_sales: 0,
      total_users: 0,
      recent_orders: [],
      top_selling_items: [],
      top_search_terms: [],
    });

    // Sample performance data for the chart
    const performanceData = ref([
      { month: "Jan", value: 60, amount: 45000 },
      { month: "Feb", value: 75, amount: 52000 },
      { month: "Mar", value: 45, amount: 38000 },
      { month: "Apr", value: 90, amount: 62000 },
      { month: "May", value: 65, amount: 48000 },
      { month: "Jun", value: 85, amount: 58000 },
    ]);

    const formatCurrency = (value) => {
      if (!value) return "₦0.00";
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }).format(value);
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const fetchDashboard = async () => {
      try {
        const response = await dashboard();
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
      performanceData,
      formatCurrency,
      formatDate,
    };
  },
};
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8f9fa;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #dee2e6;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #adb5bd;
}
</style>
