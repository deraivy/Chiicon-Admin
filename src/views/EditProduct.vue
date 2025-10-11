<template>
  <div class="w-full mx-auto md:container px-5">
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="flex justify-center items-center min-h-[400px]"
    >
      <div class="flex flex-col items-center space-y-4">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <p class="text-gray-600 font-medium">Loading product details...</p>
      </div>
    </div>

    <!-- Main Form -->
    <div v-else-if="productData" class="space-y-8">
      <!-- Action Buttons -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div class="flex justify-between items-center">
          <div>
            <h1
              class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
            >
              <span class="bg-black bg-clip-text text-transparent">
                Edit Product
              </span>
            </h1>
            <p v-if="productData?.name" class="text-sm text-gray-600 mt-1">
              Updating: {{ productData.name }}
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              v-if="isEditing"
              @click="cancelEditing"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center space-x-2 border border-gray-200"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Cancel</span>
            </button>
            <button
              v-if="!isEditing"
              @click="toggleEditing"
              class="px-4 py-2 text-sm font-semibold text-white bg-green-600 to-purple-600 hover:bg-green-700 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Edit Product</span>
            </button>
            <button
              v-if="isEditing"
              @click="saveChanges"
              :disabled="isSubmitting"
              class="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              <svg
                v-if="isSubmitting"
                class="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{{ isSubmitting ? "Saving..." : "Save Changes" }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Product Title -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-emerald-100 rounded-xl">
                  <svg
                    class="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Product Information
                </h3>
              </div>
            </div>

            <!-- Name Field -->
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700">
                Product Title <span class="text-red-500">*</span>
              </label>
              <div v-if="isEditing" class="relative">
                <input
                  v-model="productData.name"
                  type="text"
                  :aria-describedby="!productData.name ? 'name-error' : ''"
                  required
                  class="w-full px-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                  placeholder="Enter product name"
                />
                <p
                  v-if="!productData.name"
                  id="name-error"
                  class="mt-1 text-sm text-red-600"
                >
                  Product name is required
                </p>
              </div>
              <div
                v-else
                class="p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <p class="text-lg font-semibold text-gray-900">
                  {{ productData.name || "Not provided" }}
                </p>
              </div>
            </div>

            <!-- Basic Details Grid -->
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100"
            >
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Model</label
                >
                <div v-if="isEditing" class="relative">
                  <input
                    v-model="productData.model"
                    type="text"
                    class="w-full px-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter model number"
                  />
                </div>
                <div v-else class="p-3 bg-gray-50 rounded-xl">
                  <p class="text-sm text-gray-700 font-medium">
                    {{ productData.model || "Not provided" }}
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Price</label
                >
                <div v-if="isEditing" class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 text-sm">$</span>
                  </div>
                  <input
                    v-model.number="productData.price"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full pl-8 pr-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                  />
                </div>
                <div v-else class="p-3 bg-gray-50 rounded-xl">
                  <p class="text-sm text-gray-700 font-medium">
                    ${{ Number(productData.price || 0).toFixed(2) }}
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Color</label
                >
                <div v-if="isEditing" class="relative">
                  <input
                    v-model="productData.color"
                    type="text"
                    class="w-full px-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter color"
                  />
                </div>
                <div v-else class="p-3 bg-gray-50 rounded-xl">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-4 h-4 rounded-full border-2 border-gray-300"
                      :style="{
                        backgroundColor: productData.color || '#f3f4f6',
                      }"
                    ></div>
                    <p class="text-sm text-gray-700 font-medium">
                      {{ productData.color || "Not provided" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stock Status -->
            <div class="mt-6 pt-6 border-t border-gray-100">
              <label class="block text-sm font-semibold text-gray-700 mb-3"
                >Stock Status</label
              >
              <div v-if="isEditing" class="flex space-x-6">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="productData.out_of_stock"
                    :value="false"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span class="text-sm font-medium text-green-700"
                    >In Stock</span
                  >
                  <div class="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="productData.out_of_stock"
                    :value="true"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span class="text-sm font-medium text-red-700"
                    >Out of Stock</span
                  >
                  <div class="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                </label>
              </div>
              <div
                v-else
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
              >
                <div
                  :class="[
                    'w-2 h-2 rounded-full',
                    productData.out_of_stock ? 'bg-red-500' : 'bg-green-500',
                  ]"
                ></div>
                <p
                  class="text-sm font-medium"
                  :class="[
                    'capitalize',
                    productData.out_of_stock
                      ? 'text-red-700'
                      : 'text-green-700',
                  ]"
                >
                  {{ productData.out_of_stock ? "Out of Stock" : "In Stock" }}
                </p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-100 rounded-xl">
                  <svg
                    class="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Description</h3>
              </div>
            </div>

            <div v-if="isEditing">
              <textarea
                v-model="productData.description"
                rows="4"
                class="w-full px-4 py-3 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter product description..."
              ></textarea>
            </div>
            <div
              v-else
              class="p-4 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px] prose prose-sm max-w-none"
            >
              <p
                v-if="productData.description"
                class="text-gray-700 leading-relaxed"
              >
                {{ productData.description }}
              </p>
              <p v-else class="text-gray-500 italic">No description provided</p>
            </div>
          </div>

          <!-- Specifications -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-emerald-100 rounded-xl">
                  <svg
                    class="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Specifications
                </h3>
              </div>
              <button
                v-if="isEditing"
                @click="addSpecification"
                class="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center space-x-1"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add</span>
              </button>
            </div>

            <div v-if="isEditing" class="space-y-4">
              <div
                v-for="(spec, index) in productData.specifications"
                :key="spec.id || index"
                class="flex items-center justify-between space-x-4"
              >
                <div class="grid grid-cols-1 md:grid-cols-3 space-x-4">
                  <div class="col-span-1">
                    <label class="block text-sm font-semibold text-gray-700"
                      >Name</label
                    >
                    <input
                      v-model="spec.name"
                      type="text"
                      class="w-full px-4 py-2 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter name"
                    />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm font-semibold text-gray-700"
                      >Specification</label
                    >
                    <input
                      v-model="spec.description"
                      type="text"
                      class="w-full px-4 py-2 text-base border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter values"
                    />
                  </div>
                </div>
                <button
                  @click="removeSpecification(index)"
                  class="p-2 bg-white rounded-full shadow-sm text-red-600 hover:text-red-800"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div v-else>
              <div
                v-if="productData.specifications?.length > 0"
                class="space-y-4"
              >
                <div
                  v-for="(spec, index) in productData.specifications"
                  :key="spec.id || index"
                  class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white"
                >
                  <!-- Name -->
                  <div class="flex flex-col">
                    <p class="font-medium text-gray-500 mb-1">Name</p>
                    <p class="text-gray-900 bg-gray-100 rounded-lg p-3">
                      {{ spec.name || "Unnamed" }}
                    </p>
                  </div>

                  <!-- Specification -->
                  <div class="flex flex-col md:col-span-2">
                    <p class="font-medium text-gray-500 mb-1">Specification</p>
                    <p
                      class="text-gray-700 bg-gray-100 rounded-lg p-3 w-full max-w-3xl"
                    >
                      {{ spec.description || "No value" }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <div
                  class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3"
                >
                  <svg
                    class="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p class="text-gray-500 text-sm">No specifications provided</p>
              </div>
            </div>

            <div v-if="isEditing" class="mt-4 flex justify-center items-center">
              <button
                @click="addSpecification"
                class="text-base font-semibold text-emerald-500 space-x-2 hover:text-emerald-800"
              >
                + Add New
              </button>
            </div>
          </div>
        </div>

        <!-- Images & Gallery Column -->
        <div class="space-y-6">
          <!-- Main Image -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-rose-100 rounded-xl">
                  <svg
                    class="w-5 h-5 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Main Image</h3>
              </div>
            </div>

            <div v-if="isEditing" class="space-y-3">
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors cursor-pointer"
              />
              <div
                v-if="isImageLoading.image"
                class="flex items-center justify-center py-8"
              >
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
                ></div>
              </div>
            </div>

            <div class="relative group">
              <div
                class="aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 border-opacity-50 group-hover:border-indigo-300 transition-colors"
              >
                <img
                  v-if="previewImage || productData.image"
                  :src="previewImage || productData.image"
                  alt="Product Image"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  v-else
                  class="absolute inset-0 flex flex-col items-center justify-center text-gray-400"
                >
                  <svg
                    class="w-12 h-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-sm text-center">No image</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Images -->
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-xl">
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Gallery Images
                </h3>
              </div>
            </div>

            <div v-if="isEditing" class="mb-4">
              <input
                type="file"
                accept="image/*"
                multiple
                @change="handleAdditionalImagesUpload"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              <div
                v-for="(img, index) in productData.product_images"
                :key="img.id || index"
                class="relative group"
              >
                <img
                  :src="img.image"
                  class="w-full aspect-square object-cover rounded-xl shadow-md group-hover:shadow-lg"
                  :alt="`Gallery image ${index + 1}`"
                />
                <button
                  v-if="isEditing"
                  @click="removeAdditionalImage(index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            </div>

            <div
              v-if="productData.product_images?.length === 0 && !isEditing"
              class="text-center py-8"
            >
              <div
                class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3"
              >
                <svg
                  class="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p class="text-gray-500 text-sm">No gallery images</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div class="max-w-md mx-auto">
        <div
          class="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Product not found
        </h3>
        <p class="text-gray-500 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <router-link
          to="/products"
          class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  updateProduct,
  uploadImage,
  getSingleProduct,
} from "@/services/auth.service";
import { useToast } from "vue-toastification";

export default {
  name: "EditProductView",
  setup() {
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(false);
    const isEditing = ref(false);
    const previewImage = ref(null);
    const isSubmitting = ref(false);

    // Reactive product state
    const productData = reactive({
      name: "",
      price: "",
      color: "",
      model: "",
      category_id: "",
      description: "",
      image: "",
      out_of_stock: false,
      specifications: [],
      product_images: [],
    });

    // Store original data for reset
    const originalProductData = ref({});
    const isImageLoading = reactive({
      image: false,
    });

    // Fetch single product details
    const fetchProduct = async () => {
      const productId = route.params.id;
      if (!productId) {
        toast.error("Product ID is missing!");
        return;
      }

      try {
        isLoading.value = true;
        const response = await getSingleProduct(productId);
        const product = response?.data?.product || response?.data;

        if (product) {
          Object.assign(productData, product);
          originalProductData.value = { ...product };
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error(err.response?.data?.message || "Failed to fetch product.");
      } finally {
        isLoading.value = false;
      }
    };

    const toggleEditing = () => {
      if (isEditing.value) {
        // Reset to original data
        Object.assign(productData, originalProductData.value);
        previewImage.value = null;
      }
      isEditing.value = !isEditing.value;
    };

    const cancelEditing = () => {
      Object.assign(productData, originalProductData.value);
      previewImage.value = null;
      isEditing.value = false;
    };

    const generateID = () =>
      Array.from(
        { length: 30 },
        () =>
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
            Math.floor(Math.random() * 62)
          ]
      ).join("");

    const uploadToCloudinary = async (imageBase64) => {
      const data = {
        public_id: generateID(),
        action: "upload",
        folder: "sn/upload",
        image: imageBase64,
      };
      const response = await uploadImage(data);
      return response?.data?.data?.img_url || "";
    };

    const handleAdditionalImagesUpload = async (event) => {
      const files = event.target.files;
      for (let file of files) {
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          toast.error("Invalid image type.");
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image must be less than 5MB.");
          continue;
        }
        const reader = new FileReader();
        reader.onload = async () => {
          const imgStr = reader.result?.split(",")[1];
          if (imgStr) {
            const uploadedUrl = await uploadToCloudinary(imgStr);
            productData.product_images.push({
              id: generateID(),
              image: uploadedUrl,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const removeAdditionalImage = (index) => {
      productData.product_images.splice(index, 1);
    };

    const handleImageUploadGeneric = async (event, key) => {
      const file = event.target.files?.[0];
      if (!file) return toast.error("No image selected.");
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type))
        return toast.error("Invalid image type.");
      if (file.size > 5 * 1024 * 1024)
        return toast.error("Image must be less than 5MB.");

      isImageLoading[key] = true;
      const reader = new FileReader();
      reader.onload = async () => {
        const imgStr = reader.result?.split(",")[1];
        if (imgStr) {
          const uploadedUrl = await uploadToCloudinary(imgStr);
          if (key === "image") {
            previewImage.value = uploadedUrl;
          }
          productData[key] = uploadedUrl;
        }
        isImageLoading[key] = false;
      };
      reader.readAsDataURL(file);
    };

    const handleImageUpload = (event) =>
      handleImageUploadGeneric(event, "image");

    const addSpecification = () => {
      productData.specifications.push({
        id: generateID(),
        name: "",
        description: "",
      });
    };

    const removeSpecification = (index) => {
      productData.specifications.splice(index, 1);
    };

    const saveChanges = async () => {
      try {
        isSubmitting.value = true;
        const productId = route.params.id;
        if (!productId) {
          toast.error("Product ID is missing!");
          return;
        }

        // Basic validation
        if (!productData.name.trim()) {
          toast.error("Product name is required!");
          return;
        }

        const response = await updateProduct(productId, productData);
        Object.assign(productData, response.data.product);
        originalProductData.value = { ...response.data.product };
        previewImage.value = null;
        toast.success("Product updated successfully!");
        isEditing.value = false;
      } catch (error) {
        console.error("Update error:", error);
        toast.error(error.response?.data?.message || "Error updating product.");
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      productData,
      originalProductData,
      isEditing,
      previewImage,
      isImageLoading,
      isSubmitting,
      saveChanges,
      isLoading,
      toggleEditing,
      cancelEditing,
      fetchProduct,
      addSpecification,
      removeSpecification,
      handleAdditionalImagesUpload,
      removeAdditionalImage,
      handleImageUpload,
    };
  },
};
</script>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.aspect-square {
  aspect-ratio: 1;
}
</style>
