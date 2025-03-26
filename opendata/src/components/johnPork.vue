<template>
  <div>
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-gray-800 px-18 pb-36 pt-30 rounded-lg text-center shadow-lg">
        <div class="flex flex-col mb-6">
          <h1 class="text-3xl text-white">JOHN PORK</h1>
          <p class="text-white mt-4">+1 (718)-984-2820</p>
        </div>
        <img src="/johnPork.jpeg" alt="John Pork" class="w-24 h-24 rounded-full mx-auto mb-4" />
        <p class="mb-4 text-white">Do you accept the call?</p>
        <div class="flex justify-around space-x-4">
          <button
            @click="acceptCall"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-not-allowed"
            :disabled="true"
          >
            Accept
          </button>
          <button
            @click="declineCall"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            :disabled="buttonsDisabled"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showJumpScare"
      class="fixed inset-0 flex items-center justify-center bg-black z-50 cursor-none"
    >
      <img
        src="/jumpScareImage.webp"
        alt="Jump Scare"
        class="w-full h-full object-cover"
        draggable="false"
      />
      <img
        v-if="showAdditionalJumpScare"
        src="/jumpScareImage2.png"
        alt="Additional Jump Scare"
        class="absolute w-1/2 h-1/2 object-cover"
        draggable="false"
      />
      <audio ref="jumpScareAudio" src="/jumpScareSound.mp3"></audio>
      <audio ref="additionalJumpScareAudio" src="/ascending-jumpscare.mp3"></audio>
    </div>
    <div
      v-if="showDialogue"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-none"
    >
      <p class="text-white text-2xl">{{ dialogueText }}</p>
    </div>
    <div
      v-if="showPopup"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    >
      <div class="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
        <img
          src="/jumpScareImage.webp"
          alt="Jump Scare"
          class="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <p class="text-white mb-4">Would you like to see the full sentence?</p>
        <div class="flex justify-around space-x-4">
          <button
            @click="continueDialogue"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Yes
          </button>
          <button
            @click="stopJohnPork"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            No(John Pork Won't call again)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const audio = ref(null)
const showModal = ref(false)
const declineCount = ref(0)
const buttonsDisabled = ref(false)
const showJumpScare = ref(false)
const showAdditionalJumpScare = ref(false)
const additionalJumpScareAudio = ref(null)
const dialogueText = ref('')
const showDialogue = ref(false)
const typeSound = new Audio('/typeSound.mp3')
const showPopup = ref(false)
const johnPorkStopped = ref(false)
const warningAudio = new Audio('/warning.mp3')

const acceptCall = () => {
  showModal.value = false
  audio.value.pause()
  showDialogueMessage('Call accepted')
  showRandomModal()
}

const declineCall = () => {
  audio.value.pause()
  showModal.value = false
  showDialogueMessage('John Pork will remember this.')
  declineCount.value++
  if (declineCount.value > 3) {
    handleTooManyDeclines()
  } else {
    showRandomModal()
  }
}

const ringTone = () => {
  audio.value = new Audio('/ringing.mp3')
  audio.value.play()
}

const showRandomModal = () => {
  if (johnPorkStopped.value) return
  const randomTime = Math.floor(Math.random() * 2000)
  setTimeout(() => {
    if (!johnPorkStopped.value) {
      showModal.value = true
      ringTone()
    }
  }, randomTime)
}

const handleTooManyDeclines = () => {
  document.body.style.backgroundColor = 'red'
  buttonsDisabled.value = true
  setTimeout(() => {
    buttonsDisabled.value = false
    document.body.style.backgroundColor = ''
  }, 20000)

  // Use the existing warningAudio reference
  warningAudio.loop = true
  warningAudio.play()

  showDialogueMessage('Warning: Too many declines!')
  setTimeout(() => {
    requestFullScreen()
    showJumpScare.value = true
    const jumpScareAudio = audio.value
    jumpScareAudio.src = '/jumpScareSound.mp3'
    jumpScareAudio.play()

    setTimeout(() => {
      showAdditionalJumpScare.value = true
      additionalJumpScareAudio.value.src = '/ascending-jumpscare.mp3'
      additionalJumpScareAudio.value.play()
      setTimeout(() => {
        displayDialogue('244 ')
      }, 5000)
    }, 5000)
  }, 5000)
}

const displayDialogue = (text) => {
  dialogueText.value = ''
  showDialogue.value = true
  let index = 0
  const interval = setInterval(() => {
    if (index < text.length) {
      dialogueText.value += text[index]
      const sound = new Audio('/typeSound.mp3')
      sound.play()
      index++
      if (dialogueText.value === '244') {
        clearInterval(interval)
        showPopup.value = true
      }
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

const continueDialogue = () => {
  showPopup.value = false
  displayDialogue('Recognise it?')
}

const stopJohnPork = () => {
  showPopup.value = false
  johnPorkStopped.value = true
  warningAudio.loop = false
  warningAudio.pause()
  document.body.style.backgroundColor = ''
  buttonsDisabled.value = false
  showModal.value = false
  showJumpScare.value = false
  showAdditionalJumpScare.value = false
  showDialogue.value = false
}

const showDialogueMessage = (message) => {
  typeSound.play()
  dialogueText.value = message
  showDialogue.value = true
  setTimeout(() => {
    showDialogue.value = false
    dialogueText.value = ''
  }, 1500)
}

onMounted(() => {
  showRandomModal()
})
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
