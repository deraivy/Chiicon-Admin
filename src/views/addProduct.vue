<template>
  <div class="w-full mx-auto md:container px-5">
    <Header
      :title="'Add Product'"
      :subTitle="'Product Overview'"
      class="mb-12"
    />

    <!-- Form Section -->
    <div v-if="productData">
      <form @submit.prevent="addP" class="space-y-8">
        <!-- Product Info Section -->
        <div class="space-y-6 bg-white pb-6 rounded-lg">
          <div class="p-4 border-b border-gray-200 bg-white rounded-t-lg">
            <h3 class="text-base font-semibold text-gray-800 uppercase">
              Product Information
            </h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
            <!-- Name, Category, Price, Color, Model, Out of Stock, Description -->
            <div>
              <label
                for="productName"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Product Name</label
              >
              <input
                v-model="productData.name"
                type="text"
                id="productName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label
                for="category"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Category</label
              >
              <select
                v-model="productData.category_id"
                id="category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option value="" disabled>Select a category</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label
                for="price"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Price ($)</label
              >
              <input
                v-model="productData.price"
                type="number"
                id="price"
                step="0.01"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label
                for="color"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Color</label
              >
              <input
                v-model="productData.color"
                type="text"
                id="color"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label
                for="model"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Model</label
              >
              <input
                v-model="productData.model"
                type="text"
                id="model"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label
                for="outOfStock"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Out of Stock</label
              >
              <select
                v-model="productData.out_of_stock"
                id="outOfStock"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option :value="false">In Stock</option>
                <option :value="true">Out of Stock</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="productData.description"
                id="description"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your product description"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Primary Photo Section -->
        <div class="space-y-6 bg-white pb-6 rounded-lg">
          <div class="p-4 border-b border-gray-200 bg-white rounded-t-lg">
            <h3 class="text-base font-semibold text-gray-800 uppercase">
              Primary Product Photo
            </h3>
          </div>
          <div class="px-6">
            <label
              for="photo"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Upload Photo</label
            >
            <div
              class="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-indigo-500 transition-all duration-200"
            >
              <input
                ref="fileInput"
                type="file"
                id="photo"
                accept="image/*"
                class="hidden"
                @change="handleImageUploadGeneric($event, 'image')"
              />
              <div v-if="isImageLoading.image" class="flex justify-center">
                <div class="image-loader"></div>
              </div>
              <div v-else-if="!productData.image" class="text-gray-500">
                <ion-icon
                  name="cloud-upload-outline"
                  class="w-14 h-14 text-indigo-500"
                ></ion-icon>
                <p class="mt-2 text-lg font-semibold">
                  Drop your image here, or
                  <span
                    class="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                    @click="$refs.fileInput.click()"
                  >
                    click to upload
                  </span>
                </p>
              </div>
              <div v-else class="relative">
                <img
                  :src="productData.image"
                  alt="Preview"
                  class="max-h-48 mx-auto rounded-md shadow-sm"
                />
                <button
                  @click="removePhoto"
                  class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-all duration-200"
                >
                  <ion-icon name="close-outline" class="w-5 h-5"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Images Section -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-medium mb-4">Additional Product Images</h3>
          <div class="grid grid-cols-2 gap-6">
            <div v-for="n in 2" :key="n">
              <label class="block mb-2 font-medium"
                >Additional Image {{ n }}</label
              >
              <div
                @click="additionalInputs[n - 1]?.click()"
                class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400"
              >
                <input
                  :ref="(el) => (additionalInputs[n - 1] = el)"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="
                    handleImageUploadGeneric($event, `additionalImage${n}`)
                  "
                />
                <div
                  v-if="isImageLoading[`additionalImage${n}`]"
                  class="flex justify-center"
                >
                  <div class="image-loader"></div>
                </div>
                <div v-else-if="!productData[`additionalImage${n}`]">
                  <p class="text-gray-500">Click to upload additional image</p>
                </div>
                <div v-else class="relative inline-block">
                  <img
                    :src="productData[`additionalImage${n}`]"
                    :alt="`Additional Image ${n}`"
                    class="max-h-40 rounded-lg shadow"
                  />
                  <button
                    type="button"
                    @click.stop="removeAdditionalImage(n)"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Specifications Section -->
        <div class="bg-white rounded-xl shadow p-6">
          <h3 class="text-lg font-medium mb-4">Product Specifications</h3>
          <div
            v-for="(spec, index) in productData.specifications"
            :key="index"
            class="grid grid-cols-2 gap-4 border-b pb-4 mb-4"
          >
            <div>
              <label class="block mb-2 font-medium">Specification Name</label>
              <input
                v-model="spec.name"
                type="text"
                placeholder="e.g., Weight"
                class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label class="block mb-2 font-medium">Description</label>
              <textarea
                v-model="spec.description"
                rows="2"
                placeholder="e.g., 500g"
                class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
              ></textarea>
            </div>
            <div class="col-span-2 flex justify-end">
              <button
                v-if="productData.specifications.length > 1"
                type="button"
                @click="removeSpec(index)"
                class="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="addSpec"
            class="px-3 py-1 bg-green-500 text-white rounded-lg"
          >
            Add Specification
          </button>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 px-6">
          <router-link
            to="/products"
            class="py-2 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >Cancel</router-link
          >
          <button
            type="submit"
            class="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2"
            :disabled="isSubmitting"
          >
            <ion-icon
              v-if="isSubmitting"
              name="refresh-outline"
              class="w-4 h-4 animate-spin"
            ></ion-icon>
            {{ isSubmitting ? "Submitting..." : "Add Product" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { addProduct, allCategory, uploadImage } from "@/services/auth.service";
import { useToast } from "vue-toastification";
import Header from "@/components/Header.vue";
export default {
  name: "AddProductView",
  components: { Header },
  setup() {
    const router = useRouter();
    const toast = useToast();

    const productData = reactive({
      name: "",
      price: "",
      color: "",
      model: "",
      category_id: "",
      description: "",
      image: "",
      out_of_stock: false,
      additionalImage1: "",
      additionalImage2: "",
      specifications: [{ name: "", description: "" }],
    });

    const isSubmitting = ref(false);
    const categories = ref([]);
    const fileInput = ref(null);
    const additionalInputs = reactive([]);
    const isImageLoading = reactive({
      image: false,
      additionalImage1: false,
      additionalImage2: false,
    });

    const fetchCategories = async () => {
      try {
        const response = await allCategory();
        categories.value = response.data.categories;
      } catch {
        toast.error("Failed to fetch categories.");
      }
    };

    const generateID = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from(
        { length: 30 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };

    const uploadToCloudinary = async (imageBase64) => {
      try {
        const data = {
          public_id: generateID(),
          action: "upload",
          folder: "sn/upload",
          image: imageBase64,
        };
        const response = await uploadImage(data);
        return response?.data?.data?.img_url || "";
      } catch {
        toast.error("Failed to upload image to Cloudinary.");
        throw new Error("Upload failed");
      }
    };

    const handleImageUploadGeneric = async (event, key) => {
      const file = event.target.files?.[0];
      if (!file) return toast.error("No image selected.");
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type))
        return toast.error("Invalid image type.");
      if (file.size > 5 * 1024 * 1024)
        return toast.error("Image must be less than 5MB.");

      try {
        isImageLoading[key] = true;
        const reader = new FileReader();
        reader.onload = async () => {
          const imgStr = reader.result?.split(",")[1];
          if (imgStr) productData[key] = await uploadToCloudinary(imgStr);
          isImageLoading[key] = false;
        };
        reader.readAsDataURL(file);
      } catch {
        isImageLoading[key] = false;
        toast.error("Image upload failed.");
      }
    };

    const removePhoto = () => (productData.image = "");
    const removeAdditionalImage = () =>
      (productData[`additionalImage${additionalInputs.length}`] = "");
    const addSpec = () =>
      productData.specifications.push({ name: "", description: "" });
    const removeSpec = (index) => productData.specifications.splice(index, 1);

    const addP = async () => {
      isSubmitting.value = true;
      try {
        const payload = {
          name: productData.name,
          price: parseFloat(productData.price),
          color: productData.color,
          model: productData.model,
          category_id: productData.category_id,
          description: productData.description,
          image: productData.image,
          out_of_stock: productData.out_of_stock,
          specifications: productData.specifications.filter(
            (s) => s.name && s.description
          ),
          product_images: [
            productData.additionalImage1,
            productData.additionalImage2,
          ].filter(Boolean),
        };

        const res = await addProduct(payload);
        router.push({
          path: "/products",
          state: { newProduct: res.data.data },
        });
      } catch {
        toast.error("Failed to add product. Please try again.");
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(fetchCategories);

    return {
      productData,
      isSubmitting,
      categories,
      handleImageUploadGeneric,
      removePhoto,
      removeAdditionalImage,
      addP,
      fileInput,
      additionalInputs,
      isImageLoading,
      addSpec,
      removeSpec,
    };
  },
};
</script>

<style scoped>
.image-loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
