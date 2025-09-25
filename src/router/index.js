import { createRouter, createWebHistory } from "vue-router";
import { session } from "@/utils";
import Login from "@/views/auth/login.vue";
import Register from "@/views/auth/register.vue";
import Verifyemail from "@/views/auth/verifyemail.vue";
import Dashboard from "../views/Dashboard.vue";
import Category from "../views/Category.vue";
import Products from "@/views/Products.vue";
import AddProduct from "@/views/addProduct.vue";
import ViewProduct from "@/views/ViewProduct.vue";
import EditProduct from "@/views/EditProduct.vue";
import Customers from "@/views/Customers.vue";
import ViewCustomer from "@/views/viewCustomer.vue";
import SingleOrder from "@/views/singleOrder.vue";
import Invoice from "@/components/invoice.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { noNavbar: true },
  },

  {
    path: "/verifyemail",
    name: "verifyemail",
    component: Verifyemail,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
    meta: { noNavbar: true },
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true, noNavbar: false },
  },

  {
    path: "/category",
    name: "category",
    component: Category,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/addproducts",
    name: "addproducts",
    component: AddProduct,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/viewproduct/:id",
    name: "viewproduct",
    component: ViewProduct,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/editproduct/:id",
    name: "editproduct",
    component: EditProduct,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/viewcustomer/:id",
    name: "viewcustomer",
    component: ViewCustomer,
    meta: { requiresAuth: true, noNavbar: false },
  },
  {
    path: "/order/:id",
    name: "order",
    component: SingleOrder,
    meta: { requiresAuth: true, noNavbar: false },
    props: true,
  },
  {
    path: "/invoice/:id",
    name: "invoice",
    component: Invoice,
    meta: { requiresAuth: true, noNavbar: false },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const sessionData = session.get("sessionData");

  if (requiresAuth && !sessionData) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
