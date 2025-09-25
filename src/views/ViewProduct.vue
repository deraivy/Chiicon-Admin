<template>
  <div class="bg-[#f1f1f1] min-h-screen font-sans">
    <div class="w-full mx-auto md:container px-5">
      <!-- Breadcrumb -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 px-4 md:px-0"
      >
        <h2
          class="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700"
        >
          View Product
        </h2>
        <nav
          class="mt-4 sm:mt-0 flex items-center text-neutral-500"
          aria-label="Breadcrumb"
        >
          <ol class="inline-flex items-center space-x-3">
            <li>
              <router-link to="/dashboard" class="breadcrumb-link"
                >Home</router-link
              >
            </li>
            <li class="breadcrumb-divider"></li>
            <li>
              <router-link to="/products" class="breadcrumb-link"
                >Products</router-link
              >
            </li>
            <li class="breadcrumb-divider"></li>
            <li>
              <span class="text-sm font-medium text-neutral-700"
                >View Product</span
              >
            </li>
          </ol>
        </nav>
      </div>

      <!-- Loading & Error Handling -->
      <div v-if="isLoading" class="text-center text-lg text-gray-600">
        Loading...
      </div>
      <div v-else-if="error" class="text-center text-red-600 font-semibold">
        {{ error }}
      </div>

      <!-- Product Card -->
      <div
        v-else-if="product"
        class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex flex-col md:flex-row gap-12">
          <!-- Product Image -->
          <div class="relative overflow-hidden rounded-xl group">
            <img
              :src="product.image || '/images/placeholder.jpg'"
              :alt="product.name || 'Product Image'"
              class="w-80 h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>

          <!-- Product Details -->
          <div class="flex-1 space-y-6">
            <div>
              <p
                class="text-xs font-bold text-indigo-600 tracking-widest uppercase"
              >
                {{ product.category_name || "Category" }}
              </p>
              <h2
                class="text-4xl font-extrabold text-neutral-900 mt-2 tracking-tight leading-tight"
              >
                {{ product.name || "Product Name" }}
              </h2>
            </div>
            <p
              class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              {{ product.price ? `$${product.price}` : "Price Unavailable" }}
            </p>

            <!-- Color -->
            <div class="flex items-center">
              <p class="text-base font-medium text-neutral-700">Color:</p>
              <span
                v-if="product.color"
                :style="{ backgroundColor: product.color }"
                class="inline-block w-6 h-6 rounded-full ml-2 shadow-sm border border-neutral-200"
              ></span>
              <p v-else class="text-gray-500 ml-2">Not Specified</p>
            </div>

            <!-- Stock -->
            <div class="flex items-center gap-4">
              <span
                class="h-3 w-3 rounded-full"
                :class="product.inStock ? 'bg-green-500' : 'bg-red-500'"
              ></span>
              <p class="text-base font-medium text-neutral-700">
                In Stock:
                <span
                  :class="
                    product.inStock
                      ? 'text-green-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  "
                >
                  {{ product.inStock ? "Yes" : "No" }}
                </span>
              </p>
            </div>

            <!-- Description -->
            <p class="text-neutral-600 leading-relaxed">
              {{ product.description || "No description available." }}
            </p>
          </div>
        </div>
      </div>

      <!-- No Product Found -->
      <div v-else class="text-center text-gray-600 font-semibold">
        No product found.
      </div>

      <!-- Specifications -->
      <div
        v-if="product"
        class="mt-8 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <h3
          class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 mb-6"
        >
          Specifications
        </h3>
        <!-- <ul class="grid grid-cols-1 md:grid-cols-2 gap-5 text-base">
          <li class="spec-item">
            <span class="spec-label">Brand:</span>
            {{ product.specification_1 || "N/A" }}
          </li>
          <li class="spec-item">
            <span class="spec-label">Material:</span>
            {{ product.specification_2 || "N/A" }}
          </li>
          <li class="spec-item">
            <span class="spec-label">Age Range:</span>
            {{ product.specification_3 || "N/A" }}
          </li>
          <li class="spec-item">
            <span class="spec-label">Dimensions:</span>
            {{ product.specification_4 || "N/A" }}
          </li>
          <li class="spec-item">
            <span class="spec-label">Weight:</span>
            {{ product.specification_5 || "N/A" }}
          </li>
          <li class="spec-item">
            <span class="spec-label">Color:</span> {{ product.color || "N/A" }}
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSingleProduct } from "@/services/auth.service";

export default {
  setup() {
    const toast = useToast();
    const route = useRoute();
    const product = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const singleProduct = async () => {
      const productId = route.params.id;
      if (!productId) {
        error.value = "Product ID is missing!";
        toast.error(error.value);
        return;
      }

      isLoading.value = true;
      try {
        const response = await getSingleProduct(productId);
        product.value = response.data.product || response.data;
        if (!product.value) {
          throw new Error("Product data not found in response.");
        }
      } catch (err) {
        error.value =
          err.response?.data?.message ||
          err.message ||
          "Failed to load product.";
        toast.error(error.value);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      singleProduct();
    });

    return { product, isLoading, error };
  },
};
</script>
