<template>
  <div>
    <h2 class="text-sm lg:text-base font-bold text-black uppercase">
      {{ title }}
    </h2>
    <p class="text-sm text-[#707070] capitalize">{{ subTitle }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  props: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
