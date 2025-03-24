<template>
  <div
    class="bg-gray-700 rounded-lg shadow-md p-4 w-full max-w-xs transition-all duration-200 hover:shadow-lg"
  >
    <div class="space-y-2">
      <h3 class="text-lg font-semibold text-white">Suspect Information</h3>
      <div class="flex justify-between items-center">
        <span class="text-white">Gender:</span>

        <span class="font-medium text-white">{{ perpSex }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-white">Race:</span>
        <span class="font-medium text-white">{{ perpRace }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  arrestData: {
    type: Object,
    required: true,
  },
})

const perpSex = computed(() => {
  const sex = props.arrestData.perp_sex
  if (!sex) return 'Unknown'
  return sex === 'M' ? 'Male' : sex === 'F' ? 'Female' : sex === 'N' ? 'Non-binary' : sex
})

const perpRace = computed(() => {
  const race = props.arrestData.perp_race
  if (!race) return 'Unknown'
  return race.charAt(0) + race.slice(1).toLowerCase()
})
</script>
