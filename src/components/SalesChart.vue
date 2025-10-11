<template>
  <div class="w-full h-full flex items-end justify-between px-4 py-6">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="flex flex-col items-center flex-1 mx-1"
    >
      <div
        class="bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg w-full transition-all duration-500 hover:opacity-80"
        :style="{ height: (item.sales / 100) * 100 + '%', minHeight: '10px' }"
      ></div>
      <span class="text-xs text-gray-500 mt-2">{{ item.day }}</span>
      <span class="text-xs font-medium text-gray-900 mt-1">{{
        item.sales
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalesChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
