import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import { Icon } from "@iconify/vue";
import Popper from "vue3-popper";
import { createPinia } from "pinia";
const pinia = createPinia();

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
};
const app = createApp(App);
app.use(router);
app.use(VueAwesomePaginate);
app.use(Toast, toastOptions);
app.use(pinia);
app.component("BasePopper", Popper);
app.component("AppIcon", Icon);
app.mount("#app");
