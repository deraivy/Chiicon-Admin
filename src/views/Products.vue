<template>
  <div class="bg-[#f1f1f1] min-h-screen font-sans antialiased">
    <div class="w-full mx-auto md:container px-5">
      <!-- Header Section -->

      <!-- Loading State -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
      >
        <Header :title="'Products'" :subTitle="'Overview'" class="mb-6" />
        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              @input="searchProducts"
              placeholder="Search by product code..."
              type="search"
              class="w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
            <ion-icon
              name="search-outline"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            ></ion-icon>
          </div>
          <!-- Reload -->
          <button
            @click="clearAll"
            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            title="Reload"
          >
            <img src="/images/reload.png" class="w-4 h-4" />
          </button>
          <!-- Add Product -->
          <router-link
            to="/add-product"
            class="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition text-sm font-medium shadow"
          >
            + Add Product
          </router-link>
        </div>
      </div>
      <div v-if="isLoading" class="space-y-4">
        <div
          class="grid grid-cols-6 gap-4 bg-gray-100 rounded-lg px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider shadow-sm"
        >
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div
          v-for="n in 5"
          :key="n"
          class="grid grid-cols-6 gap-4 bg-white rounded-lg shadow-sm px-6 py-4 animate-pulse"
        >
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 bg-gray-200 rounded-lg"></div>
            <div class="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="flex items-center justify-end space-x-3">
            <div class="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div class="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div class="h-8 w-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- Product Table -->
      <div v-else class="overflow-x-auto p-6 rounded-2xl bg-white">
        <!-- Table -->
        <table class="min-w-full text-sm">
          <thead>
            <tr
              class="bg-gray-100 text-gray-700 uppercase text-xs font-semibold"
            >
              <th class="p-4 text-left">S/N</th>
              <th class="p-4 text-left">Name</th>
              <th class="p-4 text-left">Model</th>
              <th class="p-4 text-left">Price</th>
              <th class="p-4 text-left">Category</th>
              <th class="p-4 text-left">Stock</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, idx) in products"
              :key="product.id"
              class="hover:bg-gray-50 odd:bg-white even:bg-gray-50 transition"
            >
              <td class="p-4">{{ idx + 1 }}</td>
              <td class="p-4 flex items-center gap-3">
                <img
                  :src="product.image"
                  class="h-10 w-10 rounded-lg object-cover border"
                />
                <span class="font-medium">{{ product.name }}</span>
              </td>
              <td class="p-4">{{ product.model }}</td>
              <td class="p-4 font-semibold">
                ${{ formatPrice(product.price) }}
              </td>
              <td class="p-4">{{ product.category_name }}</td>
              <td class="p-4">
                <span
                  :class="[
                    product.out_of_stock
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700',
                    'px-3 py-1 rounded-full text-xs font-medium',
                  ]"
                >
                  {{ product.out_of_stock ? "Out of Stock" : "In Stock" }}
                </span>
              </td>
              <td class="p-4 flex justify-end gap-2">
                <router-link
                  :to="{ name: 'viewproduct', params: { id: product.id } }"
                  class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                  title="View"
                >
                  <ion-icon name="eye-outline"></ion-icon>
                </router-link>
                <router-link
                  :to="{ name: 'editproduct', params: { id: product.id } }"
                  class="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-500 hover:text-white transition"
                  title="Edit"
                >
                  <ion-icon name="create-outline"></ion-icon>
                </router-link>
                <button
                  @click="openDeleteModal(product)"
                  class="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                  title="Delete"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-end mt-6">
          <vue-awesome-paginate
            v-if="products.length"
            v-model="currentPage"
            :total-items="totalItems"
            :items-per-page="perPage"
            @click="handlePageChange"
            class="pagination-container"
          />
        </div>
      </div>

      <!-- No Products State -->
      <div
        v-if="!isLoading && !products.length"
        class="text-center py-12 bg-white rounded-xl shadow-sm"
      >
        <svg
          class="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="mt-4 text-lg font-medium text-gray-700">No products found</p>
        <p class="mt-2 text-sm text-gray-500">
          Click "Add Product" to get started
        </p>
      </div>

      <!-- Delete Modal -->
      <div
        v-if="isDeleteModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      >
        <div
          class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-100"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Confirm Deletion</h3>
            <button
              @click="closeDeleteModal"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ion-icon name="close-outline" class="w-6 h-6"></ion-icon>
            </button>
          </div>
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete "<strong>{{
              deletingProduct?.name
            }}</strong
            >"? This action cannot be undone.
          </p>
          <div class="flex justify-end gap-3">
            <button
              @click="closeDeleteModal"
              class="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              @click="deleteProduct"
              class="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center gap-2"
              :disabled="isDeleting"
            >
              <ion-icon
                v-if="isDeleting"
                name="refresh-outline"
                class="w-4 h-4 animate-spin"
              ></ion-icon>
              {{ isDeleting ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onActivated } from "vue";
import { allProducts, delProduct, search } from "@/services/auth.service";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import "vue-awesome-paginate/dist/style.css";
import Header from "@/components/Header.vue";

export default {
  components: { Header },
  name: "ProductsView",
  setup() {
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const products = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const perPage = ref(25);
    const totalItems = ref(0);
    const deletingProduct = ref(null);
    const isDeleteModalOpen = ref(false);
    const isDeleting = ref(false);
    const searchQuery = ref("");

    const formatPrice = (price) => {
      return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const searchProducts = async () => {
      if (!searchQuery.value.trim()) {
        // If empty, just load normal products
        await fetchProducts(1);
        return;
      }

      isLoading.value = true;
      try {
        const response = await search(searchQuery.value);
        if (response?.data?.products) {
          products.value = response.data.products;
          totalItems.value = response.data.products.length; // search results may not be paginated
        }
      } catch (error) {
        console.error("Search error:", error);
        toast.error("Failed to search products");
      } finally {
        isLoading.value = false;
      }
    };

    const fetchProducts = async (page = 1) => {
      isLoading.value = true;
      try {
        const response = await allProducts({
          page,
          per_page: perPage.value,
          search: searchQuery.value, // pass search
        });
        if (response?.data?.products) {
          products.value = response.data.products;
          totalItems.value = Number(response.data.total_items);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load products");
      } finally {
        isLoading.value = false;
      }
    };

    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchProducts(page);
    };

    const openDeleteModal = (product) => {
      deletingProduct.value = product;
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
      isDeleteModalOpen.value = false;
      deletingProduct.value = null;
    };

    const deleteProduct = async () => {
      if (!deletingProduct.value?.id) return;

      isDeleting.value = true;
      try {
        const response = await delProduct(deletingProduct.value.id);
        if (response.status === 200 || response.data.success) {
          products.value = products.value.filter(
            (p) => p.id !== deletingProduct.value.id
          );
          totalItems.value -= 1;
          toast.success("Product deleted successfully!");
          closeDeleteModal();
        } else {
          throw new Error("Deletion failed");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete product"
        );
      } finally {
        isDeleting.value = false;
      }
    };

    // Handle navigation with new product data
    const handleNavigation = () => {
      if (route.state?.newProduct) {
        products.value.unshift({
          ...route.state.newProduct,
          category_name: route.state.newProduct.category_name || "Unknown",
          favorited: route.state.newProduct.favorited || false,
          out_of_stock: route.state.newProduct.out_of_stock || false,
        });
        totalItems.value += 1;
        toast.success("Product added successfully!");
        router.replace({ ...route, state: {} });
      } else if (route.state?.updatedProduct) {
        const index = products.value.findIndex(
          (p) => p.id === route.state.updatedProduct.id
        );
        if (index !== -1) {
          products.value[index] = {
            ...route.state.updatedProduct,
            category_name:
              route.state.updatedProduct.category_name ||
              products.value[index].category_name,
            favorited:
              route.state.updatedProduct.favorited ??
              products.value[index].favorited,
            out_of_stock:
              route.state.updatedProduct.out_of_stock ??
              products.value[index].out_of_stock,
          };
          toast.success("Product updated successfully!");
          router.replace({ ...route, state: {} });
        }
      }
    };

    onMounted(() => {
      fetchProducts(currentPage.value);
      handleNavigation();
    });

    onActivated(handleNavigation);

    return {
      products,
      isLoading,
      currentPage,
      perPage,
      totalItems,
      handlePageChange,
      fetchProducts,
      formatPrice,
      deleteProduct,
      openDeleteModal,
      closeDeleteModal,
      isDeleteModalOpen,
      deletingProduct,
      isDeleting,
      searchQuery,
      searchProducts,
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
  border-radius: 5px !important;
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
