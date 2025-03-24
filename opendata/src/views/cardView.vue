<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-3xl bg-transparent rounded-xl shadow-lg overflow-hidden">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-center mb-6 text-white">NYPD Arrest Records</h1>

        <!-- Search Form -->
        <div class="mb-6 p-4 bg-gray-700 rounded-lg">
          <form @submit.prevent="fetchArrests" class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1">
              <label for="sexFilter" class="block text-sm font-medium text-gray-700 mb-1"
                >Filter by Gender</label
              >
              <select
                id="sexFilter"
                v-model="filters.sex"
                class="w-full p-2 text-sm border border-gray-800 rounded-md focus:ring-2 text-white"
              >
                <option value="">All Genders</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="N">Non-binary</option>
              </select>
            </div>

            <div class="flex-1">
              <label for="raceFilter" class="block text-sm font-medium text-gray-700 mb-1"
                >Filter by Race</label
              >
              <select
                id="raceFilter"
                v-model="filters.race"
                class="w-full p-2 text-sm border border-gray-800 rounded-md focus:ring-2 text-white"
              >
                <option value="">All Races</option>
                <option value="BLACK">Black</option>
                <option value="WHITE">White</option>
                <option value="ASIAN / PACIFIC ISLANDER">ASIAN / PACIFIC ISLANDER</option>
                <option value="WHITE HISPANIC">White Hispanic</option>
                <option value="BLACK HISPANIC">Black Hispanic</option>
              </select>
            </div>

            <div class="flex items-end gap-2">
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-md transition-colors duration-200"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Search</span>
                <span v-else>Loading...</span>
              </button>
              <button
                type="button"
                @click="resetFilters"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 text-sm rounded-md transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <!-- Loading and Error States -->
        <div v-if="isLoading" class="text-center py-6">
          <p class="text-gray-500">Loading arrest records...</p>
        </div>

        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm"
        >
          <p>Error loading data: {{ error }}</p>
        </div>

        <!-- Cards Container -->
        <div
          v-if="!isLoading && !error"
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[30vh] p-2"
        >
          <infoCard
            v-for="(arrest, index) in arrestsData"
            :key="arrest.arrest_key || index"
            :arrestData="arrest"
          />

          <div v-if="arrestsData.length === 0" class="col-span-full text-center py-6">
            <p class="text-gray-500">No arrest records found</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import infoCard from '@/components/infoCard.vue'

const apiUrl = 'https://data.cityofnewyork.us/resource/8h9b-rp9u.json'

const arrestsData = ref([])
const isLoading = ref(false)
const error = ref(null)

const filters = reactive({
  sex: '',
  race: '',
})

const fetchArrests = async () => {
  try {
    isLoading.value = true
    error.value = null

    const params = {}
    if (filters.sex) params.perp_sex = filters.sex
    if (filters.race) params.perp_race = filters.race

    params.$limit = 100

    const response = await axios.get(apiUrl, { params })
    arrestsData.value = response.data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching arrest data:', err)
  } finally {
    isLoading.value = false
  }
}

const resetFilters = () => {
  filters.sex = ''
  filters.race = ''
  fetchArrests()
}

fetchArrests()
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
