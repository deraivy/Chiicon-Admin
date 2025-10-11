<template>
  <section>
    <!-- Loading state -->
    <section
      v-if="isLoading"
      class="h-screen w-screen flex justify-center items-center"
    >
      <h2 class="text-2xl">Loading…</h2>
    </section>

    <!-- Main content -->
    <section v-else class="flex h-screen bg-gray-100">
      <template v-if="isLoggedIn && !route.meta.noNavbar">
        <aside class="hidden lg:block">
          <NavigationDrawer :isOpen="true" />
        </aside>

        <div v-if="drawerModal" class="fixed inset-0 z-50">
          <div
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="closeNavDrawer"
          ></div>

          <div class="absolute top-0 left-0">
            <NavigationDrawer
              :isOpen="true"
              :isMobileOpen="true"
              @close-drawer="closeNavDrawer"
            />
          </div>
        </div>
      </template>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <header
          v-if="isLoggedIn && !route.meta.noNavbar"
          class="flex items-center bg-white px-4 py-3 shadow-sm sticky top-0 z-20"
        >
          <button @click="openNavDrawer" class="lg:hidden">
            <AppIcon icon="mdi:menu" class="w-6 h-6 text-pink-900" />
          </button>

          <div class="relative flex items-center ml-auto">
            <div
              @click="toggleDropdown"
              class="flex items-center gap-3 cursor-pointer select-none"
            >
              <img
                :src="profile?.img_str || '/icons/avatar.svg'"
                class="h-8 w-8 rounded-full border object-cover"
                alt="profile"
              />
              <div class="hidden sm:block">
                <p class="font-semibold text-gray-800 text-sm">
                  {{ profile.first_name }} {{ profile.last_name }}
                </p>
                <p class="text-gray-600 text-xs">
                  {{ profile.is_admin ? "Admin" : "User" }}
                </p>
              </div>
              <AppIcon
                icon="majesticons:chevron-down-line"
                class="w-8 h-8 text-green-700"
              />
            </div>

            <div
              v-if="showDropdown"
              class="absolute right-0 top-10 mt-2 w-48 p-2.5 rounded-md shadow bg-white text-gray-700 z-50"
            >
              <div @click="openAccountInfo" class="menu-item">
                Account Information
              </div>
              <div @click="openPasswordModal" class="menu-item">
                Change Password
              </div>
              <div @click="logOut" class="menu-item text-red-600">Logout</div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto p-5">
          <router-view />
        </main>
      </div>
    </section>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";
import { getAdmin } from "./services/auth.auth.service";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "App",
  components: { NavigationDrawer },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isLoading = ref(true);
    const isLoggedIn = ref(false);
    const drawerModal = ref(false);
    const profile = ref({});
    const showDropdown = ref(false);

    const openNavDrawer = () => (drawerModal.value = true);
    const closeNavDrawer = () => (drawerModal.value = false);
    const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

    const fetchAdmin = async () => {
      try {
        const response = await getAdmin();
        if (response.status === 200) {
          profile.value = response.data.admin;
          isLoggedIn.value = true;
        } else {
          logOut();
        }
      } catch (error) {
        logOut();
      } finally {
        isLoading.value = false;
      }
    };

    const logOut = () => {
      sessionStorage.clear();
      isLoggedIn.value = false;
      router.push("/");
    };

    const openAccountInfo = () => console.log("Open Account Info modal");
    const openPasswordModal = () => console.log("Open Change Password modal");

    onMounted(() => {
      const sessionData = sessionStorage.getItem("sessionData");
      if (sessionData) {
        fetchAdmin();
      } else {
        isLoading.value = false;
      }
    });

    return {
      isLoading,
      isLoggedIn,
      drawerModal,
      showDropdown,
      openNavDrawer,
      closeNavDrawer,
      toggleDropdown,
      fetchAdmin,
      logOut,
      openAccountInfo,
      openPasswordModal,
      profile,
      route,
    };
  },
};
</script>

<style>
.menu-item {
  @apply px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
