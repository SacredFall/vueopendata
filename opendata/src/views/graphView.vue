<script setup>
import { ref, onMounted, watch } from 'vue'
import BarChart from '@/components/charts/BarChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import axios from 'axios'

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Demographics',
      backgroundColor: '#4169E1',
      data: []
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

const currentChart = ref('bar')
const selectedCategory = ref('perp_race')

const getColorPalette = (count) => {
  const colors = [
    '#4169E1',
    '#FF6347',
    '#32CD32',
    '#FFD700',
    '#8A2BE2',
    '#FF69B4',
    '#00CED1',
    '#FF8C00',
    '#7B68EE',
    '#20B2AA',
  ]
  return colors.slice(0, count)
}

const fetchData = async () => {
  try {
    const response = await axios.get('https://data.cityofnewyork.us/resource/8h9b-rp9u.json')
    const data = response.data

    const categoryCounts = {}
    data.forEach(person => {
      const categoryValue = person[selectedCategory.value]
      if (categoryValue) {
        categoryCounts[categoryValue] = (categoryCounts[categoryValue] || 0) + 1
      }
    })

    const labels = Object.keys(categoryCounts)
    const values = Object.values(categoryCounts)
    const backgroundColors = getColorPalette(labels.length)

    chartData.value = {
      labels: labels,
      datasets: [
        {
          label: selectedCategory.value.toUpperCase(),
          backgroundColor: currentChart.value === 'pie' ? backgroundColors : '#4169E1',
          data: values
        }
      ]
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

watch(selectedCategory, () => {
  fetchData()
})

const showBarChart = () => {
  currentChart.value = 'bar'
  fetchData()
}

const showLineChart = () => {
  currentChart.value = 'line'
  fetchData()
}

const showPieChart = () => {
  currentChart.value = 'pie'
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-4 flex flex-col bg-gray-900 rounded-2xl w-7/10 mt-12">
      <div class="flex flex-row justify-center space-x-12 bg-gray-800 shadow-lg p-3 rounded-2xl px-4 mb-4">
        <i
          class="pi pi-chart-line text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
          @click="showLineChart"
        ></i>
        <i
          class="pi pi-chart-pie text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
          @click="showPieChart"
        ></i>
        <i
          class="pi pi-chart-bar text-white text-2xl transition-transform transform hover:scale-125 hover:shadow-lg hover:bg-gray-500 p-3 rounded-md"
          @click="showBarChart"
        ></i>
      </div>

      <div class="w-full flex justify-center">
        <div class="bg-gray-800 shadow-lg rounded-2xl w-full p-4">
          <div class="mb-4">
            <label for="category" class="text-white mr-2">Select Category:</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="p-2 rounded-md bg-gray-700 text-white"
            >
              <option value="perp_race">Race</option>
              <option value="perp_sex">Sex</option>
            </select>
          </div>

          <div class="chart-container">
            <BarChart
              v-if="currentChart === 'bar'"
              :key="selectedCategory + '-bar'"
              :chart-data="chartData"
              :options="chartOptions"
            />
            <LineChart
              v-if="currentChart === 'line'"
              :key="selectedCategory + '-line'"
              :chart-data="chartData"
              :options="chartOptions"
            />
            <PieChart
              v-if="currentChart === 'pie'"
              :key="selectedCategory + '-pie'"
              :chart-data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  height: 400px;
  width: 100%;
}
</style>