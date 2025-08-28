<template>
  <div>
    <div class="bg-gray-100 min-h-screen font-sans">
      <div class="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <!-- Header Section -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 px-4"
        >
          <h2
            class="text-xl md:text-2xl uppercase font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gray-900"
          >
            Add Products
          </h2>
          <nav
            class="mt-4 sm:mt-0 flex items-center text-gray-600"
            aria-label="Breadcrumb"
          >
            <ol class="inline-flex items-center space-x-2">
              <router-link
                to="/dashboard"
                class="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Dashboard
              </router-link>
              <li><span class="mx-2 text-gray-400">/</span></li>
              <li
                class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                Products
              </li>
            </ol>
          </nav>
        </div>

        <!-- Main Container -->
        <div class="w-full">
          <div class="container max-w-7xl">
            <div class="bg-[white] rounded-2xl overflow-hidden">
              <!-- Header -->
              <div class="p-6 bg-[#fff] border-b border-gray-200">
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900">Products</h2>
                    <p class="mt-1 text-sm text-gray-600">
                      Manage your products efficiently
                    </p>
                  </div>
                  <router-link
                    to="/addproducts"
                    class="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <ion-icon
                      name="add-circle-outline"
                      class="w-5 h-5 mr-2"
                    ></ion-icon>
                    Add Product
                  </router-link>
                </div>
              </div>

              <!-- Loading State -->
              <div v-if="isLoading" class="p-8 text-center">
                <div class="flex justify-center items-center space-x-2">
                  <div
                    class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-600"
                  ></div>
                  <p class="text-gray-600">Loading products...</p>
                </div>
              </div>

              <!-- Table Content -->
              <div v-else-if="products.length" class="p-6 space-y-6">
                <!-- Header Row -->
                <div
                  class="grid grid-cols-5 gap-4 bg-[#f3f3f3] rounded-lg px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider shadow-sm"
                >
                  <div>Name</div>
                  <div>Model</div>
                  <div>Price</div>
                  <div>Category</div>
                  <div class="text-right">Actions</div>
                </div>

                <!-- Product Rows -->
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="grid grid-cols-5 gap-4 bg-[#f3f3f3] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 px-6 py-4 border border-gray-100"
                >
                  <div class="flex items-center space-x-4">
                    <img
                      class="h-12 w-12 rounded-lg object-cover shadow-sm border border-gray-200 transition-transform duration-300 hover:scale-105"
                      :src="product.image"
                      :alt="product.name"
                    />
                    <span class="text-sm font-medium text-gray-900">{{
                      product.name
                    }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-700">
                    {{ product.model }}
                  </div>
                  <div
                    class="flex items-center text-sm font-medium text-gray-900"
                  >
                    ₦{{ formatPrice(product.price) }}
                  </div>
                  <div class="flex items-center text-sm text-gray-700">
                    {{ product.category_name }}
                  </div>
                  <div class="flex items-center justify-end space-x-3">
                    <router-link
                      :to="{ name: 'viewproduct', params: { id: product.id } }"
                      class="flex items-center text-gray-300 bg-gray-600 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-200"
                    >
                      <ion-icon name="eye-outline" class="w-5 h-5"></ion-icon>
                    </router-link>
                    <router-link
                      :to="{ name: 'editproduct', params: { id: product.id } }"
                      class="flex items-center text-indigo-200 bg-indigo-500 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      <ion-icon
                        name="create-outline"
                        class="w-5 h-5"
                      ></ion-icon>
                    </router-link>
                    <div
                      @click="openDeleteModal(product)"
                      class="flex items-center bg-red-500 text-red-200 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      <ion-icon name="trash-outline" class="w-5 h-5"></ion-icon>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="p-12 text-center bg-[#f3f3f3]">
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
                <p class="mt-4 text-gray-600 text-lg font-medium">
                  No products found
                </p>
                <p class="mt-2 text-sm text-gray-500">
                  Click "Add Product" to get started
                </p>
              </div>
              <!-- Pagination Component -->
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
        </div>
      </div>
    </div>

    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate__animated animate__fadeIn"
      @click.self="closeDeleteModal"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8 transform transition-all duration-300 scale-100"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Confirm Deletion</h3>
          <button
            @click="closeDeleteModal"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-150"
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
            class="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            @click="deleteProduct"
            class="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2"
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
</template>

<script>
import { ref, onMounted } from "vue";
import { allProducts, delProduct } from "@/services/auth.service";
import { useToast } from "vue-toastification";
import "vue-awesome-paginate/dist/style.css";

export default {
  name: "ProductsView",
  setup() {
    const toast = useToast();
    const products = ref([]);
    const isLoading = ref(false);

    // pagination state
    const currentPage = ref(1);
    const perPage = ref(25);
    const totalItems = ref(0);
    const deletingProduct = ref(null);
    const isDeleteModalOpen = ref(false);
    const isDeleting = ref(false);

    const formatPrice = (price) => {
      return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const fetchProducts = async (page = 1) => {
      isLoading.value = true;
      try {
        const response = await allProducts({
          page,
          per_page: perPage.value,
          sort: "created_at:desc",
        });
        console.log("API Response:", response.data);
        if (response?.data?.products) {
          products.value = response.data.products;
          totalItems.value = Number(response.data.total_items); // Ensure it's a number
          console.log(
            "Total Items:",
            totalItems.value,
            "Per Page:",
            perPage.value
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load products");
      } finally {
        isLoading.value = false;
      }
    };

    const handlePageChange = (page) => {
      console.log("Current Page:", currentPage.value, "New Page:", page);
      fetchProducts(page);
    };

    //
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

        // Only show toast if API confirms deletion
        if (response.status === 200 || response.data.success) {
          // Remove the deleted product from the local list immediately
          products.value = products.value.filter(
            (p) => p.id !== deletingProduct.value.id
          );

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

    onMounted(() => fetchProducts(currentPage.value));

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
    };
  },
};
</script>
<style>
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
