<template>
  <div class="bg-green-500">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#262d34] text-white">
        <div class="p-4 border-b border-gray-800">
          <div class="flex items-center justify-between">
            <h2 class="text-white font-bold text-2xl">Chi~icon</h2>
          </div>
        </div>
        <nav class="mt-5 px-2">
          <div class="space-y-4">
            <router-link
              to="/dashboard"
              class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-800 text-white group transition-all duration-200 hover:bg-gray-700"
            >
              <ion-icon name="layers-outline" class="w-5 h-5"></ion-icon>
              Dashboard
            </router-link>

            <!-- Products -->
            <router-link
              to="/products"
              class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <svg
                class="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Products
            </router-link>

            <!-- Category -->
            <router-link
              to="/category"
              class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white group transition-all duration-200"
            >
              <ion-icon name="clipboard-outline" class="w-5 h-5"></ion-icon>
              Category
            </router-link>
          </div>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawerComponent",
};
</script>

<style></style>
