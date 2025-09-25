<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <h1 class="text-2xl font-bold">Invoice</h1>
        <div class="text-right">
          <img src="/logo.png" alt="Logo" class="h-10 mb-2" />
          <p class="text-sm">59 Station Rd, Purls Bridge, United Kingdom</p>
          <p class="text-sm">019579034</p>
          <p class="text-sm">kachabazar@gmail.com</p>
          <p class="text-sm">kachabazar-admin.vercel.app</p>
        </div>
      </div>

      <!-- Invoice Info -->
      <div class="flex justify-between mb-6">
        <div>
          <p class="font-semibold">INVOICE</p>
          <span
            class="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium"
          >
            Delivered
          </span>
          <p class="mt-4 text-sm text-gray-600">DATE</p>
          <p class="font-medium">20 Sep, 2025</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">INVOICE NO</p>
          <p class="font-medium">#12241</p>

          <p class="mt-4 text-sm text-gray-600">INVOICE TO</p>
          <p class="font-medium">00 000</p>
          <p class="font-medium">justin@gmail.com</p>
          <p class="font-medium">dfdd</p>
          <p class="font-medium">00, UNI, 000</p>
        </div>
      </div>

      <!-- Product Table -->
      <table class="w-full border rounded-lg overflow-hidden mb-6">
        <thead class="bg-gray-100 text-left text-sm font-semibold">
          <tr>
            <th class="p-3">SR.</th>
            <th class="p-3">PRODUCT TITLE</th>
            <th class="p-3">QUANTITY</th>
            <th class="p-3">ITEM PRICE</th>
            <th class="p-3">AMOUNT</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr class="border-b">
            <td class="p-3">1</td>
            <td class="p-3 font-medium">Canada Salmon</td>
            <td class="p-3">3</td>
            <td class="p-3">$221.96</td>
            <td class="p-3 text-red-500 font-medium">$665.88</td>
          </tr>
          <tr>
            <td class="p-3">2</td>
            <td class="p-3 font-medium">Calabaza Squash</td>
            <td class="p-3">2</td>
            <td class="p-3">$98.03</td>
            <td class="p-3 text-red-500 font-medium">$196.06</td>
          </tr>
        </tbody>
      </table>

      <!-- Payment Info -->
      <div class="grid grid-cols-3 gap-4 text-sm mb-6">
        <div>
          <p class="text-gray-600">PAYMENT METHOD</p>
          <p class="font-medium">Cash</p>
        </div>
        <div>
          <p class="text-gray-600">SHIPPING COST</p>
          <p class="font-medium">$60.00</p>
        </div>
        <div>
          <p class="text-gray-600">DISCOUNT</p>
          <p class="font-medium">$0.00</p>
        </div>
      </div>

      <!-- Total -->
      <div class="text-right mb-6">
        <p class="text-gray-600 text-sm">TOTAL AMOUNT</p>
        <p class="text-2xl font-bold text-red-500">$921.94</p>
      </div>

      <!-- Actions -->
      <div class="flex justify-between">
        <button
          class="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700"
        >
          Download Invoice
        </button>
        <div class="flex gap-3">
          <button
            class="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200"
          >
            Email Invoice
          </button>
          <button
            class="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InvoiceView",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
