<template>
  <div class="w-full h-full flex items-end justify-between px-4 py-6">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="flex flex-col items-center"
    >
      <div
        class="bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg w-8 transition-all duration-500 hover:opacity-80"
        :style="{
          height: (item.revenue / 60000) * 100 + '%',
          minHeight: '20px',
        }"
      ></div>
      <span class="text-xs text-gray-500 mt-2">{{ item.month }}</span>
      <span class="text-xs font-medium text-gray-900 mt-1"
        >${{ (item.revenue / 1000).toFixed(0) }}k</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "RevenueChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>
