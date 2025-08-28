<template>
  <section v-if="route.meta.noNavbar"><router-view /></section>

  <section v-else>
    <div class="fixed">
      <NavigationDrawer />
    </div>
    <!-- Nav -->
    <div class="w-full" :class="{ 'pl-[250px]': isDrawerVisible }">
      <div class="bg-white shadow-lg font-sans">
        <div
          class="mx-auto w-full max-w-7xl px-4 sm:px-5 py-6 md:px-10 md:py-12 lg:py-6"
        >
          <nav class="flex justify-between items-center">
            <!-- Logo -->
            <div>
              <router-link to="/" class="text-xl font-bold uppercase"
                >Chi~icon</router-link
              >
            </div>

            <!-- Cart & Login (Desktop) -->
            <div class="flex items-center space-x-6">
              <div class="relative">
                <router-link
                  to="/login"
                  class="cursor-pointer hover:text-red-600"
                >
                </router-link>
              </div>

              <router-link
                to="/register"
                class="cursor-pointer hover:text-red-600"
                >Login</router-link
              >

              <div class="flex items-center">
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray">Tom Cook</p>
                  <p class="text-xs text-gray-400">View profile</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <router-view />
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import NavigationDrawer from "../src/components/NavigationDrawer.vue";
export default {
  components: { NavigationDrawer },
  setup() {
    const route = useRoute();
    const isDrawerVisible = ref(true);

    return { route, isDrawerVisible };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
