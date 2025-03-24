<script setup>
import { RouterView } from 'vue-router'
import taskBar from '@/components/taskBar.vue'
import johnPork from '@/components/johnPork.vue'
</script>

<template>
  <johnPork />
  <div class="relative">
    <div class="absolute top-0 left-0 w-full flex justify-center h-64 pointer-events-none">
      <img src="/RACE.png" alt="" style="width: auto" />
    </div>
    <div class="flex justify-center">
      <taskBar></taskBar>
    </div>
    <RouterView />
  </div>
  <!--https://data.cityofnewyork.us/resource/8h9b-rp9u.json-->
</template>

<style>
body {
  background-color: #1a202c;
}
.relative {
  position: relative;
  height: 100vh;
}
</style>
