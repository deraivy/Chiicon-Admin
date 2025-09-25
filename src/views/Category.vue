<template>
  <div>
    <div class="bg-[] h-screen p-6">
      <Header :title="'Categories'" :subTitle="'Overview'" class="mb-6" />

      <div class="">
        <div class="bg-white rounded-2xl overflow-hidden">
          <div
            class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 p-6"
          >
            <div class="relative max-w-2xl w-full">
              <input
                placeholder="Search by product code..."
                type="search"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-base"
              />
              <ion-icon
                name="search-outline"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              ></ion-icon>
            </div>
            <div class="flex items-center gap-3">
              <!-- Add Product -->
              <button
                @click="openAddModal"
                class="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium shadow"
              >
                + Add Category
              </button>
            </div>
          </div>

          <!-- Loading Skeleton -->
          <div v-if="isLoadingCategories" class="animate-pulse">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 p-6">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-8"></div>
                    </th>
                    <th class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-24"></div>
                    </th>
                    <th class="px-6 py-4 text-right">
                      <div class="h-4 bg-gray-200 rounded w-16"></div>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="n in 5" :key="n">
                    <td class="px-6 py-4">
                      <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex justify-end gap-2">
                        <div class="h-6 bg-gray-200 rounded w-12"></div>
                        <div class="h-6 bg-gray-200 rounded w-12"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Table -->
          <div v-else class="overflow-x-auto bg-white rounded-lg shadow px-6">
            <table
              class="w-full table-auto border-2 border-blue-500 rounded-lg overflow-hidden mx-auto"
            >
              <thead>
                <tr
                  class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal"
                >
                  <th class="py-3 px-6 text-left">#</th>
                  <th class="py-3 px-6 text-left">Icon</th>
                  <th class="py-3 px-6 text-left">Name</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm">
                <tr
                  v-for="(category, index) in categories"
                  :key="category.id"
                  class="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td class="py-3 px-6 text-left">{{ index + 1 }}</td>
                  <td class="py-3 px-6 text-left">
                    <img
                      :src="category.image || '/icons/camera.svg'"
                      alt="Category Image"
                      class="h-8 w-8 rounded object-cover border"
                    />
                  </td>
                  <td v-if="!category.isEditing" class="py-3 px-6 text-left">
                    <div
                      v-if="!category.isEditing"
                      class="text-sm font-medium text-gray-900"
                    >
                      {{ category.name }}
                    </div>
                    <input
                      v-else
                      v-model="category.editedName"
                      type="text"
                      class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      @keyup.enter="saveEdit(category)"
                      placeholder="Enter category name"
                    />
                  </td>

                  <td class="py-3 px-6 text-center">
                    <button
                      v-if="!category.isEditing"
                      @click="toggleEdit(category)"
                      class="text-green-600 hover:text-green-800 mr-4 transition-colors duration-150"
                    >
                      Edit
                    </button>
                    <button
                      v-else
                      @click="saveEdit(category)"
                      class="text-green-600 hover:text-green-800 mr-4 transition-colors duration-150"
                      :disabled="category.isSaving"
                    >
                      {{ category.isSaving ? "Saving..." : "Save" }}
                    </button>
                    <button
                      @click="openDeleteModal(category)"
                      class="text-red-600 hover:text-red-800 transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div
            v-if="!isLoadingCategories && categories.length === 0"
            class="p-6 text-center text-gray-500 bg-gray-50 border-t border-gray-200"
          >
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
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
            <p class="mt-2 text-sm">
              No categories found. Add one to get started!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div
      v-if="isAddModalOpen"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate__animated animate__fadeIn"
      @click.self="closeAddModal"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8 transform transition-all duration-300 scale-100"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-2xl font-bold text-gray-800">Add Category</h3>
            <p class="mt-1 text-sm text-gray-500">
              Add your product category and necessary information from here
            </p>
          </div>
          <button
            @click="closeAddModal"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-150"
          >
            <ion-icon
              name="close-outline"
              class="w-6 h-6 p-2 bg-white shadow-md hover:bg-red-100 hover:text-red-600 rounded-full"
            ></ion-icon>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="add" class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name</label
            >
            <input
              v-model="formData.name"
              type="text"
              id="name"
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter category name"
              required
            />
          </div>

          <!-- Category Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Category Image</label
            >
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition"
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                class="hidden"
                @change="imageChange"
              />
              <label for="file-upload" class="flex flex-col items-center">
                <div v-if="!formData.image" class="text-gray-500">
                  Drag your images here
                  <p class="text-xs mt-1 text-gray-400">
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </p>
                </div>
                <div v-else class="relative inline-block">
                  <img
                    :src="formData.image"
                    alt="Uploaded Image"
                    class="h-24 w-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    @click="formData.image = ''"
                    class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <ion-icon name="close-outline" class="w-4 h-4"></ion-icon>
                  </button>
                </div>
              </label>
            </div>
          </div>

          <!-- Published -->
          <div class="flex items-center">
            <label class="mr-3 text-sm font-medium text-gray-700"
              >Published</label
            >
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="formData.published"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
              ></div>
            </label>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="closeAddModal"
              class="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2"
              :disabled="isLoading"
            >
              <ion-icon
                v-if="isLoading"
                name="refresh-outline"
                class="w-4 h-4 animate-spin"
              ></ion-icon>
              {{ isLoading ? "Adding..." : "Add Category" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
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
            deletingCategory?.name
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
            @click="deleteCategory"
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
import { useToast } from "vue-toastification";
import {
  allCategory,
  addCategory,
  updateCategory,
  delCategory,
  uploadImage,
} from "@/services/auth.service";
import Header from "@/components/Header.vue";

export default {
  name: "CategoryView",
  components: { Header },
  setup() {
    const toast = useToast();
    const categories = ref([]);
    const formData = ref({ name: "", image: "" });
    const isLoading = ref(false);
    const isLoadingCategories = ref(true);
    const isAddModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const deletingCategory = ref(null);
    const isDeleting = ref(false);
    const isImageLoading = ref(false);

    const openAddModal = () => {
      isAddModalOpen.value = true;
    };

    const closeAddModal = () => {
      isAddModalOpen.value = false;
      formData.value = { name: "", image: "" }; // Reset form
    };

    const add = async () => {
      isLoading.value = true;
      try {
        const response = await addCategory(formData.value);

        const newCategory = {
          ...response.data.category,
          isEditing: false,
          editedName: response.data.category.name,
          isSaving: false,
        };

        // Directly push new category to list
        categories.value.push(newCategory);

        toast.success("Category added successfully");
        closeAddModal();
      } catch {
        toast.error("Error adding category");
      }
      isLoading.value = false;
    };

    const fetchCategories = async () => {
      try {
        isLoadingCategories.value = true; // Set loading to true
        const response = await allCategory();
        categories.value = response.data.categories.map((cat) => ({
          ...cat,
          isEditing: false,
          editedName: cat.name,
          isSaving: false,
        }));
      } catch {
        toast.error("Failed to load categories");
      } finally {
        isLoadingCategories.value = false; // Always set loading to false
      }
    };

    const imageChange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        toast.error("No image selected.");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, or GIF).");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("Image size must be less than 5MB.");
        return;
      }

      try {
        isImageLoading.value = true;
        const reader = new FileReader();
        reader.onload = async () => {
          const imageStr = reader.result?.split(",")[1];
          if (imageStr) {
            await uploadToCloudinary(imageStr);
          } else {
            toast.error("Failed to read image.");
          }
        };
        reader.onerror = () => {
          toast.error("Failed to read image file.");
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Image processing error:", error);
        toast.error("An error occurred while processing the image.");
      } finally {
        isImageLoading.value = false;
      }
    };

    const generateID = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";
      for (let i = 0; i < 30; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
      }
      return id;
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
        if (response?.data?.data?.img_url) {
          formData.value.image = response.data.data.img_url;
        } else {
          toast.error("Failed to retrieve image URL from Cloudinary.");
        }
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        toast.error("Failed to upload image to Cloudinary.");
      }
    };

    const toggleEdit = (category) => {
      category.isEditing = true;
    };

    const saveEdit = async (category) => {
      category.isSaving = true;
      try {
        await updateCategory(category.id, { name: category.editedName });
        category.name = category.editedName;
        category.isEditing = false;
        toast.success("Category updated successfully");
      } catch {
        toast.error("Failed to update category");
      }
      category.isSaving = false;
    };

    const openDeleteModal = (category) => {
      deletingCategory.value = category;
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
      isDeleteModalOpen.value = false;
      deletingCategory.value = null;
    };

    const deleteCategory = async () => {
      isDeleting.value = true;
      try {
        await delCategory(deletingCategory.value.id);
        categories.value = categories.value.filter(
          (cat) => cat.id !== deletingCategory.value.id
        );
        toast.success("Category deleted successfully");
        closeDeleteModal();
      } catch {
        toast.error("Failed to delete category");
      }
      isDeleting.value = false;
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      formData,
      isAddModalOpen,
      isLoading,
      isLoadingCategories, // Add to return
      openAddModal,
      closeAddModal,
      add,
      toggleEdit,
      saveEdit,
      isDeleteModalOpen,
      deletingCategory,
      isDeleting,
      openDeleteModal,
      closeDeleteModal,
      deleteCategory,
      imageChange,
    };
  },
};
</script>

<style scoped>
/* Subtle gradient on table row hover */
tbody tr:hover {
  background: linear-gradient(to right, #f9fafb, #f1f5f9);
}

/* Enhanced skeleton animation */
.animate-pulse {
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

/* Modal backdrop blur (optional, requires Tailwind config support) */
@supports (backdrop-filter: blur(8px)) {
  .modal-backdrop {
    backdrop-filter: blur(8px);
  }
}
</style>
