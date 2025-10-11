<template>
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
            <router-link
              to="/dashboard"
              class="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors"
            >
              Home
            </router-link>
          </li>
          <li class="text-neutral-500">/</li>
          <li>
            <router-link
              to="/products"
              class="text-sm font-medium text-neutral-500 hover:text-indigo-600 transition-colors"
            >
              Products
            </router-link>
          </li>
          <li class="text-neutral-500">/</li>
          <li>
            <span class="text-sm font-medium text-neutral-700"
              >View Product</span
            >
          </li>
        </ol>
      </nav>
    </div>

    <!-- Loading & Error Handling -->
    <div v-if="isLoading" class="text-center text-lg text-gray-600 py-10">
      <div
        class="animate-spin inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"
      ></div>
      <span class="ml-2">Loading...</span>
    </div>
    <div
      v-else-if="error"
      class="text-center text-red-600 font-semibold bg-red-50 p-4 rounded-xl"
    >
      {{ error }}
    </div>

    <!-- Product Card -->
    <div
      v-else-if="product"
      class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div class="flex flex-col md:flex-row gap-12">
        <!-- Product Images -->
        <div class="relative flex flex-col items-center">
          <img
            :src="product.image || '/images/placeholder.jpg'"
            :alt="product.name || 'Product Image'"
            @error="handleImageError"
            class="w-80 h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
          <div v-if="product.product_images?.length" class="flex gap-2 mt-4">
            <img
              v-for="img in product.product_images"
              :key="img.id"
              :src="img.image || img.url || '/images/placeholder.jpg'"
              :alt="`Product Image ${img.id}`"
              @error="handleImageError"
              @click="product.image = img.image || img.url"
              class="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
          <p v-else class="text-sm text-gray-500 mt-4">
            No additional images available.
          </p>
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
            {{
              product.price
                ? `$${product.price.toFixed(2)}`
                : "Price Unavailable"
            }}
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
              :class="product.out_of_stock ? 'bg-red-500' : 'bg-green-500'"
            ></span>
            <p class="text-base font-medium text-neutral-700">
              In Stock:
              <span
                :class="
                  product.out_of_stock
                    ? 'text-red-600 font-semibold'
                    : 'text-green-600 font-semibold'
                "
              >
                {{ product.out_of_stock ? "No" : "Yes" }}
              </span>
            </p>
          </div>

          <!-- Model -->
          <div>
            <p class="text-base font-medium text-neutral-700">
              Model:
              <span class="font-semibold">{{ product.model || "N/A" }}</span>
            </p>
          </div>

          <!-- Description -->
          <div>
            <p class="text-neutral-600 leading-relaxed">
              {{ product.description || "No description available." }}
            </p>
          </div>

          <!-- Created At -->
          <div>
            <p class="text-sm text-neutral-500">
              Added on: {{ formatDate(product.created_at) || "N/A" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- No Product Found -->
    <div
      v-else
      class="text-center text-gray-600 font-semibold bg-white p-8 rounded-xl shadow-md"
    >
      No product found.
    </div>

    <!-- Specifications -->
    <div
      v-if="product && product.specifications?.length"
      class="mt-8 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3
        class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700 mb-6"
      >
        Specifications
      </h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-5 text-base">
        <li
          v-for="spec in product.specifications"
          :key="spec.id"
          class="spec-item"
        >
          <span class="spec-label font-medium text-neutral-700"
            >{{ spec.name || "N/A" }}:</span
          >
          {{ spec.description || "N/A" }}
        </li>
      </ul>
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

    // Format date for display
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    onMounted(() => {
      singleProduct();
    });

    // Ensure formatDate is returned
    return { product, isLoading, error, formatDate };
  },
};
</script>
