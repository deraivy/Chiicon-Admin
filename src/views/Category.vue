<template>
  <div>
    <div
      class="w-full bg-gray-100 flex items-center justify-center min-h-screen p-4 md:p-6"
    >
      <div class="container max-w-2xl">
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
        >
          <!-- Table Header -->
          <div
            class="p-6 md:p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white"
          >
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h2
                  class="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight"
                >
                  Categories
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Manage your categories effortlessly
                </p>
              </div>
              <div class="mt-4 md:mt-0">
                <button
                  @click="openAddModal"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <ion-icon name="add-outline" class="w-5 h-5"></ion-icon>
                  Add Category
                </button>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="category in categories"
                  :key="category.id"
                  class="hover:bg-gray-50 transition-all duration-150 ease-in-out"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="category.image || '/icons/camera.svg'"
                      alt="Category Image"
                      class="h-12 w-12 rounded object-cover border"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
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
                      class="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      @keyup.enter="saveEdit(category)"
                      placeholder="Enter category name"
                    />
                  </td>

                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <button
                      v-if="!category.isEditing"
                      @click="toggleEdit(category)"
                      class="text-indigo-600 hover:text-indigo-800 mr-4 transition-colors duration-150"
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
            v-if="categories.length === 0"
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
        class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8 transform transition-all duration-300 scale-100"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Add Category</h3>
          <button
            @click="closeAddModal"
            class="text-gray-500 hover:text-gray-700 transition-colors duration-150"
          >
            <ion-icon name="close-outline" class="w-6 h-6"></ion-icon>
          </button>
        </div>
        <form @submit.prevent="add">
          <div class="mb-6">
            <label
              for="categoryName"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>

            <!-- Single Image Upload -->
            <div
              class="border-2 border-gray shadow-inner rounded-lg self-start mb-4"
            >
              <div class="border-b border-grey-shades py-4 pl-5">
                <h3 class="font-bold capitalize text-lg 2xl:text-lg mb-3">
                  Product Image <span class="text-error">*</span>
                </h3>
                <p class="text-xs 2xl:text-sm">Upload one image</p>
              </div>
              <div class="p-4 flex justify-center">
                <label
                  for="file-upload"
                  class="hover:cursor-pointer flex flex-col items-center"
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="imageChange"
                  />
                  <div
                    class="relative h-[150px] w-[150px] rounded-md max-w-full border flex items-center justify-center"
                  >
                    <div
                      v-if="isImageLoading"
                      class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50"
                    >
                      <span class="image-loader"></span>
                    </div>
                    <img
                      v-else
                      :src="formData.image || '/icons/camera.svg'"
                      alt="Uploaded Image"
                      class="h-[100px] w-[100px] object-cover"
                    />
                    <div
                      class="absolute top-0 left-0 h-full w-full bg-grey-shades bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100"
                    >
                      <p class="text-center">Click</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <input
              v-model="formData.name"
              type="text"
              id="categoryName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter category name"
              required
            />
          </div>

          <div class="flex justify-end gap-3">
            <button
              type="button"
              @click="closeAddModal"
              class="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2"
              :disabled="isLoading"
            >
              <ion-icon
                v-if="isLoading"
                name="refresh-outline"
                class="w-4 h-4 animate-spin"
              ></ion-icon>
              {{ isLoading ? "Adding..." : "Add" }}
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

export default {
  name: "CategoryView",
  setup() {
    const toast = useToast();
    const categories = ref([]);
    const formData = ref({ name: "", image: "" });
    const isLoading = ref(false);
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
        const response = await allCategory();
        categories.value = response.data.categories.map((cat) => ({
          ...cat,
          isEditing: false,
          editedName: cat.name,
          isSaving: false,
        }));
      } catch {
        toast.error("Failed to load categories");
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

    onMounted(fetchCategories);

    return {
      categories,
      formData,
      isAddModalOpen,
      isLoading,
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

/* Modal backdrop blur (optional, requires Tailwind config support) */
@supports (backdrop-filter: blur(8px)) {
  .modal-backdrop {
    backdrop-filter: blur(8px);
  }
}
</style>
