<template>
  <div class="w-full mx-auto md:container px-5">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <!-- Header Text -->
      <div class="mb-4 sm:mb-0">
        <Header :title="'All Users'" :subTitle="'Overview'" class="" />
      </div>

      <!-- Controls -->
      <div
        class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
      >
        <!-- Search -->
        <div class="relative w-full sm:w-56">
          <input
            v-model="searchQuery"
            @input="searchProducts"
            placeholder="Search by product code..."
            type="search"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          />
          <i
            class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></i>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto rounded-2xl bg-white">
      <div class="flex flex-col">
        <div v-if="isLoading" class="p-6 space-y-6">
          <div
            class="grid grid-cols-5 gap-4 bg-[#f3f3f3] rounded-lg px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider shadow-sm"
          >
            <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <!-- Product Rows Skeleton -->
          <div
            v-for="n in 5"
            :key="n"
            class="grid grid-cols-5 gap-4 bg-[#f3f3f3] rounded-lg shadow-md px-6 py-4 border border-gray-100 animate-pulse"
          >
            <div class="flex justify-center items-center space-x-4">
              <div class="h-12 w-12 bg-gray-300 rounded-lg"></div>
              <div class="h-4 w-32 bg-gray-300 rounded"></div>
            </div>
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="flex items-center justify-end space-x-3">
              <div class="h-8 w-8 bg-gray-300 rounded-lg"></div>
              <div class="h-8 w-8 bg-gray-300 rounded-lg"></div>
              <div class="h-8 w-8 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="customers && customers.length"
          class="overflow-x-auto pb-4 p-6"
        >
          <div class="min-w-full inline-block align-middle">
            <div class="overflow-hidden border rounded-lg border-gray-300">
              <table
                class="table-auto min-w-full rounded-xl"
                role="table"
                aria-label="Customer List"
              >
                <thead>
                  <tr class="bg-gray-100">
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      S/N
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Username
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-300">
                  <tr
                    @click="rowClick(customer.id)"
                    v-for="(customer, index) in customers"
                    :key="customer.id || index"
                    class="hover:bg-gray-50 odd:bg-white even:bg-gray-50 transition"
                  >
                    <td class="p-5">
                      {{ (currentPage - 1) * perPage + index + 1 }}
                    </td>
                    <td
                      class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                    >
                      {{ customer.first_name }} {{ customer.last_name }}
                    </td>
                    <td
                      class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                    >
                      {{ customer.email }}
                    </td>
                    <td
                      class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                    >
                      {{ customer.username }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-else class="p-5 text-center">
          <img
            src="/images/no-data.png"
            class="mx-auto h-[50px] w-[50px]"
            alt=""
          />
          <p class="font-bold text-sm text-accent text-center">
            No Data Available
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center pt-6">
        <div class="text-sm text-gray-700 mb-4 sm:mb-0">
          Showing
          <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
          to
          <span class="font-medium">{{
            Math.min(currentPage * perPage, totalItems)
          }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </div>

        <vue-awesome-paginate
          :model-value="currentPage"
          :total-items="totalItems"
          :items-per-page="perPage"
          :page-size="5"
          @update:model-value="(page) => handlePageChange(page)"
          class="pagination-container"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { allCustomers } from "../services/auth.auth.service";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";

export default {
  name: "CustomersView",
  components: { Header },
  setup() {
    const customers = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref(null);
    const router = useRouter();
    const currentPage = ref(1);
    const perPage = ref(25);
    const totalItems = ref(0);
    const searchRef = ref("");

    const fetchCustomers = async (page = 1, search = "") => {
      isLoading.value = true;
      errorMessage.value = null;

      try {
        const params = {
          page: page,
          per_page: perPage.value,
        };
        if (search) {
          params.search = search;
        }
        const response = await allCustomers(params);
        if (response?.data) {
          customers.value = response.data.users || response.data.data || [];
          totalItems.value = Number(
            response.data.total_items || response.data.total || 0
          );
          const totalPages = Math.ceil(totalItems.value / perPage.value);
          if (page > totalPages && totalPages > 0) {
            currentPage.value = totalPages;
            fetchCustomers(totalPages, search);
            return;
          }
        }
      } catch (error) {
        console.error("Fetch error:", error);
        errorMessage.value =
          "Failed to load customers. Please try again later.";
        customers.value = [];
        totalItems.value = 0;
      } finally {
        isLoading.value = false;
      }
    };

    const handlePageChange = (page) => {
      console.log("Page change triggered:", page);
      if (page !== currentPage.value) {
        currentPage.value = page;
        fetchCustomers(page, searchRef.value);
      }
    };

    const handleSearchRef = () => {
      currentPage.value = 1;
      fetchCustomers(1, searchRef.value);
    };

    const clearAll = () => {
      searchRef.value = "";
      currentPage.value = 1;
      fetchCustomers(1);
    };

    // Function to single detail
    const rowClick = (id) => {
      router.push(`/viewCustomer/${id}`);
    };

    onMounted(() => {
      fetchCustomers(1);
    });

    return {
      customers,
      isLoading,
      errorMessage,
      currentPage,
      totalItems,
      perPage,
      searchRef,
      rowClick,
      handlePageChange,
      handleSearchRef,
      clearAll,
    };
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
}

:deep(.paginate-buttons) {
  height: 30px !important;
  width: 30px !important;
  border-radius: 20px !important;
  cursor: pointer !important;
  background-color: rgb(242, 242, 242) !important;
  border: 1px solid rgb(217, 217, 217) !important;
  color: black !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease !important;
}

:deep(.paginate-buttons:hover) {
  background-color: #24965b !important;
  transform: translateY(-1px) !important;
  color: white !important;
}

:deep(.active-page) {
  background-color: #1ea15e !important;
  border: 1px solid #1ea15e !important;
  color: white !important;
}

:deep(.active-page:hover) {
  background-color: #24965b !important;
  transform: translateY(-1px) !important;
}

:deep(.paginate-buttons:disabled) {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
  background-color: #f5f5f5 !important;
}
</style>
