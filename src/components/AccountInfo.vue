<template>
  <div
    className="z-50 h-screen fixed card  w-full bg-[#333] bg-opacity-70 overflow-y-auto inset-0 outline-none focus:outline-none"
  >
    <div class="max-w-[700px] rounded px-3 mx-auto flex items-center h-full">
      <div
        class="bg-white w-[600px] relative rounded-lg animate__animated animate__zoomIn"
      >
        <div class="h-[100px] bg-primary">
          <div @click="closeModal" class="flex justify-end p-4 cursor-pointer">
            <img
              src="/icons/close-white.svg"
              alt=""
              class="rounded-full border p-2"
            />
          </div>
        </div>
        <div class="flex justify-around w-full px-10 relative pt-5">
          <div class="w-full self-center">
            <div
              class="h-[100px] w-[100px] md:h-[150px] md:w-[150px] border rounded-full"
            >
              <img
                :src="
                  adminProfile?.img_str
                    ? adminProfile?.img_str
                    : '/icons/avatar.svg'
                "
                alt=""
                class="rounded-full h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-contain"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 leading-[30px] w-full">
            <h3 class="font-bold break-all text-xl capitalize">
              {{ adminProfile?.first_name }} {{ adminProfile?.last_name }}
            </h3>
            <p>{{ adminProfile?.email }}</p>
            <p
              class="px-2 py-2 rounded-lg text-xs font-semibold flex items-center whitespace-nowrap justify-center"
              :class="
                adminProfile?.active_status
                  ? 'bg-primary-tint text-primary-shades'
                  : 'bg-error-tint text-error-shades'
              "
            >
              {{ adminProfile?.active_status ? "Active" : "Inactive" }}
            </p>
          </div>
        </div>
        <div class="md:p-10 py-8 pl-5">
          <div class="flex justify-between mb-3">
            <h4 class="w-2/4 text-grey-shades text-sm">Phone Number</h4>
            <h4 class="w-3/6 font-bold text-sm">
              {{ adminProfile?.phone }}
            </h4>
          </div>
          <!-- <div class="flex mb-3">
            <h4 class="w-2/4 text-grey-shades text-sm">Department</h4>
            <h4 class="w-3/6 font-bold text-sm uppercase">
              {{ adminProfile?.department }}
            </h4>
          </div> -->
          <div class="flex mb-3">
            <h4 class="w-2/4 text-grey-shades text-sm">Designation</h4>
            <h4 class="w-3/6 font-bold text-sm uppercase">
              {{ adminProfile?.role?.role_name }}
            </h4>
          </div>

          <!-- <div class="flex justify-center mt-5 md:mt-8">
            <button
              type="button"
              class="hover:text-primary-shades w-2/5 h-[50px] p-2 text-white text-xs rounded border-0 bg-black active:bg-black focus:bg-black hover:bg-black cursor-pointer"
            >
              <span>View Tickets</span>
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "@/store/auth";
import moment from "moment";

export default defineComponent({
  name: "AccountInformation",
  emits: ["close-account"],
  props: {
    adminProfile: {
      type: Object,
    },
  },
  setup(props, context) {
    //  Function to emit close modal
    const closeModal = () => {
      context.emit("close-account");
    };
    const store = useAuthStore();
    return { closeModal, store, moment };
  },
});
</script>

<style scoped></style>
