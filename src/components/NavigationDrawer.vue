<template>
  <div
    class="flex flex-col justify-between h-screen max-w-[280px] bg-[#1ca25e] text-white shadow w-60 animate__animated animate__slideInLeft"
  >
    <!-- Top section: Logo + Navigation -->
    <div class="space-y-3 py-5 overflow-y-auto scrollbar-hide">
      <!-- Header / Close Button -->
      <div class="flex flex-col">
        <div
          @click="$emit('close-drawer')"
          class="lg:hidden self-end flex items-center p-2 cursor-pointer hover:bg-white/20 rounded-full transition"
        >
          <AppIcon icon="mdi:close" class="w-6 h-6" />
        </div>
        <div class="pl-6 mb-4">
          <h2 class="text-xl font-bold tracking-wide">Chi Icon</h2>
        </div>
      </div>

      <!-- Navigation Items -->
      <div class="flex flex-col gap-1">
        <div v-for="(item, index) in navItems" :key="index" class="px-2 py-1">
          <!-- Parent with children -->
          <div v-if="item.children">
            <div
              @click="toggleDropdown(index)"
              class="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-white/20 transition"
              :class="{ 'bg-white/25': activeDropdown === index }"
            >
              <AppIcon :icon="item.icon" class="w-5 h-5 mr-3 opacity-90" />
              <span v-if="isOpen || isMobileOpen" class="text-sm font-medium">
                {{ item.text }}
              </span>
              <AppIcon
                v-if="isOpen || isMobileOpen"
                icon="lineicons:chevron-down"
                class="w-5 h-5 ml-auto transition-transform"
                :class="{ 'rotate-180': activeDropdown === index }"
              />
            </div>

            <!-- Dropdown -->
            <div
              v-if="activeDropdown === index && (isOpen || isMobileOpen)"
              class="ml-6 mt-2 pl-3 border-l border-white/20 flex flex-col gap-1"
            >
              <router-link
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                :to="child.path"
                class="flex items-center px-3 py-2 rounded-md text-sm text-white/90 hover:bg-white/10 transition"
                active-class="bg-white/30 text-white font-semibold"
              >
                {{ child.text }}
              </router-link>
            </div>
          </div>

          <!-- Single items -->
          <router-link
            v-else
            :to="item.path"
            class="flex items-center px-4 py-3 rounded-lg hover:bg-white/20 transition"
            active-class="bg-white/25 font-semibold"
          >
            <AppIcon :icon="item.icon" class="w-5 h-5 mr-3 opacity-90" />
            <span v-if="isOpen || isMobileOpen" class="text-sm font-medium">
              {{ item.text }}
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Bottom section: Logout -->
    <div class="p-2 border-t border-white/20">
      <button
        @click="logout"
        class="w-full flex items-center px-3 py-3 rounded-lg bg-white/10 hover:bg-red-600 transition text-white font-medium"
      >
        <AppIcon icon="mdi:logout" class="w-5 h-5 mr-3" />
        <span v-if="isOpen || isMobileOpen">Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "NavigationDrawer",
  props: {
    isOpen: Boolean,
    isMobileOpen: Boolean,
  },
  setup() {
    const activeDropdown = ref(null);

    const navItems = [
      {
        text: "Dashboard",
        icon: "material-symbols:dashboard",
        path: "/dashboard",
      },
      {
        text: "Products",
        icon: "material-symbols:inventory-2",
        children: [
          {
            text: "All Products",
            path: "/products",
            icon: "material-symbols:view-list",
          },
          {
            text: "Add Product",
            path: "/addproducts",
            icon: "material-symbols:add-box",
          },
        ],
      },
      {
        text: "Customers",
        icon: "material-symbols:group",
        path: "/customers",
      },
      {
        text: "Categories",
        icon: "material-symbols:category",
        path: "/category",
      },
      {
        text: "Orders",
        icon: "material-symbols:shopping-cart",
        path: "/orders",
      },
      {
        text: "Settings",
        icon: "material-symbols:settings",
        path: "/settings",
      },
    ];

    const toggleDropdown = (index) => {
      activeDropdown.value = activeDropdown.value === index ? null : index;
    };

    const logout = () => {
      sessionStorage.clear();
      window.location.href = "/";
    };

    return { navItems, activeDropdown, toggleDropdown, logout };
  },
};
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
