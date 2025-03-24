<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="fixed flex justify-center py-4 w-full mb-12">
    <div class="flex flex-row space-x-12 bg-gray-800 shadow-lg p-3 rounded-2xl px-4">
      <RouterLink to="/">
        <i
          class="pi pi-home text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
        ></i>
      </RouterLink>
      <RouterLink to = "/graphs">

          <i
            class="pi pi-chart-line text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
          ></i>
      </RouterLink>
    

      <RouterLink to="/null">
          <i
          class="pi pi-user text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
          ></i>
        </RouterLink>
        <RouterLink to="/about">
          <i
            class="pi pi-info-circle text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
          ></i>
        </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>