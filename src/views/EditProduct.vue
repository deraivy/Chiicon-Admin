<template>
  <div class="bg-[#f2f2f2] min-h-screen font-sans">
    <div class="mx-auto w-full max-w-7xl px-6 py-8 md:py-12 lg:py-16">
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 px-4 md:px-0"
      >
        <h2
          class="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700"
        >
          Edit Product
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
                >Edit Product</span
              >
            </li>
          </ol>
        </nav>
      </div>

      <div>
        <div
          v-if="isLoading"
          class="text-center text-lg font-semibold text-gray-600"
        >
          Loading...
        </div>

        <div v-else-if="productData" class="bg-white p-8 rounded-xl shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Product Name -->
            <div class="col-span-1 sm:col-span-2">
              <label for="name" class="text-sm font-medium text-gray-700"
                >Name</label
              >
              <div v-if="isEditing">
                <input
                  v-model="productData.name"
                  type="text"
                  id="name"
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.name || "Not provided" }}
                </p>
              </div>
            </div>

            <!-- Model -->
            <div class="col-span-1 sm:col-span-2">
              <label for="model" class="text-sm font-medium text-gray-700"
                >Model</label
              >
              <div v-if="isEditing">
                <input
                  v-model="productData.model"
                  type="text"
                  id="model"
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.model || "Not provided" }}
                </p>
              </div>
            </div>

            <!-- Price -->
            <div class="col-span-1 sm:col-span-2">
              <label for="price" class="text-sm font-medium text-gray-700"
                >Price</label
              >
              <div v-if="isEditing">
                <input
                  v-model.number="productData.price"
                  type="number"
                  id="price"
                  step="0.01"
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.price || "Not provided" }}
                </p>
              </div>
            </div>

            <!-- Color -->
            <div class="col-span-1 sm:col-span-2">
              <label for="color" class="text-sm font-medium text-gray-700"
                >Color</label
              >
              <div v-if="isEditing">
                <input
                  v-model="productData.color"
                  type="text"
                  id="color"
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.color || "Not provided" }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <div class="col-span-1 sm:col-span-2">
              <label for="description" class="text-sm font-medium text-gray-700"
                >Description</label
              >
              <div v-if="isEditing">
                <textarea
                  v-model="productData.description"
                  rows="3"
                  id="description"
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.description || "Not provided" }}
                </p>
              </div>
            </div>

            <!-- Image -->
            <div class="md:col-span-2">
              <label class="form-label">Image</label>
              <div v-if="isEditing">
                <!-- File Input for Image Upload -->
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
                <!-- Display current image URL as text input (optional) -->
                <input
                  v-model="productData.image"
                  type="text"
                  class="mt-2 form-input"
                  placeholder="Or enter image URL"
                />
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.image || "Not provided" }}
                </p>
              </div>
              <img
                :src="previewImage || productData.image"
                alt="Product Image"
                class="mt-4 w-40 rounded-lg shadow-md"
                v-if="previewImage || productData.image"
              />
            </div>

            <!-- Specification -->
            <div class="col-span-1 sm:col-span-2">
              <label
                for="specification_1"
                class="text-sm font-medium text-gray-700"
                >Specification</label
              >
              <div v-if="isEditing">
                <input
                  v-model="productData.specification_1"
                  type="text"
                  id="specification_1"
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div v-else>
                <p
                  class="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm"
                >
                  {{ productData.specification_1 || "Not provided" }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6 space-x-4">
            <button
              v-if="isEditing"
              @click="cancelEditing"
              class="bg-gray-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              v-if="!isEditing"
              @click="toggleEditing"
              class="bg-teal-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-teal-700"
            >
              Edit Product
            </button>
            <button
              v-if="isEditing"
              @click="saveChanges"
              class="bg-teal-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSingleProduct, updateProduct } from "@/services/auth.service";
import { useToast } from "vue-toastification";

export default {
  name: "EditProductView",
  setup() {
    const route = useRoute();
    const toast = useToast();
    const productData = ref(null);
    const originalProductData = ref(null); // Store original data for cancel
    const isLoading = ref(true);
    const isEditing = ref(false);
    const previewImage = ref(null); // For image preview before upload

    // Fetch single product details
    const fetchProduct = async () => {
      const productId = route.params.id;
      if (!productId) {
        toast.error("Product ID is missing!");
        return;
      }

      try {
        const response = await getSingleProduct(productId);
        console.log("Fetch API Response:", response); // Debug raw response

        // Handle different response structures
        if (response?.data?.product) {
          productData.value = { ...response.data.product };
        } else if (response?.data) {
          productData.value = { ...response.data };
        } else {
          throw new Error("Unexpected response structure");
        }
        originalProductData.value = { ...productData.value }; // Store original data
        console.log("Assigned productData:", productData.value); // Debug assigned data
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(err.response?.data?.message || "Failed to fetch product.");
      } finally {
        isLoading.value = false;
      }
    };

    const toggleEditing = () => {
      isEditing.value = true;
      previewImage.value = null; // Reset preview when entering edit mode
    };

    const cancelEditing = () => {
      productData.value = { ...originalProductData.value }; // Revert to original
      previewImage.value = null; // Clear preview
      isEditing.value = false;
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Preview the image locally
        previewImage.value = URL.createObjectURL(file);
        // For actual upload, you'll need to handle this in saveChanges
        productData.value.imageFile = file; // Store file for upload
        productData.value.image = null; // Clear URL if using file upload
      }
    };

    const saveChanges = async () => {
      try {
        isLoading.value = true;
        const productId = route.params.id;
        if (!productId) {
          toast.error("Product ID is missing!");
          return;
        }

        // Handle image upload if a file is selected
        let updatedProductData = { ...productData.value };
        if (productData.value.imageFile) {
          // Example: Upload to a service like Cloudinary or your backend
          const formData = new FormData();
          formData.append("image", productData.value.imageFile);
          // Replace with your actual upload endpoint
          const uploadResponse = await uploadImage(formData);
          updatedProductData.image = uploadResponse.data.url; // Assume response has URL
          delete updatedProductData.imageFile; // Remove file from data
        }

        console.log("Sending product data:", updatedProductData); // Debug log
        const response = await updateProduct(productId, updatedProductData);
        productData.value = { ...response.data.product }; // Update with server response
        originalProductData.value = { ...response.data.product }; // Update original
        previewImage.value = null; // Clear preview
        toast.success("Product updated successfully!");
        isEditing.value = false;
      } catch (error) {
        console.error("Update error:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while updating the product."
        );
      } finally {
        isLoading.value = false;
      }
    };

    // Placeholder for image upload function (implement based on your backend)
    const uploadImage = async (formData) => {
      // Example using Axios (adjust to your actual service)
      const response = await fetch("https://your-upload-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });
      return response.json(); // Expecting { url: "new-image-url" }
    };

    onMounted(fetchProduct);

    return {
      productData,
      isLoading,
      isEditing,
      previewImage,
      saveChanges,
      toggleEditing,
      cancelEditing,
      handleImageUpload,
    };
  },
};
</script>
