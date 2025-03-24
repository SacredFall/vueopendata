<template>
    <div class="flex justify-center items-center h-screen">
      <div @click="handleClick" class="bg-red-400 hover:cursor-pointer ">
        <img src="/kingVon.jpg" alt="">
        <h1>DONT DISTURB KING VON</h1>
        <div v-if="isPlaying" class="fixed inset-0 bg-black flex justify-center items-center z-50 cursor-none">
          <div class="max-w-full max-h-full flex flex-col">

            <h1 class="text-red-600 text-3xl mb-16">KING VON DID NOT LIKE THAT [25.30.163.49].</h1>
            <img src="/kingVonStare.gif" alt="Playing GIF" class="max-w-full max-h-full" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isPlaying = ref(false)
  let audio = null
  
  const handleClick = () => {
    if (!isPlaying.value) {
      isPlaying.value = true
      audio = new Audio('/von.mp3')
      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
      })
      requestFullScreen()
    }
  }
  
  const requestFullScreen = () => {
    const element = document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  }
  </script>
  
  <style scoped>
  .cursor-none {
    cursor: none;
  }
  </style>