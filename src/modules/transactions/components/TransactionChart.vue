<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js'
import { useTransactionStore } from '@/modules/transactions/store/transactionStore'

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const store = useTransactionStore()

let chart: Chart | null = null

const renderChart = () => {
  if (!canvasRef.value) return

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Income', 'Expense'],
      datasets: [
        {
          data: [store.totalIncome, store.totalExpense],
        },
      ],
    },
    options: {
        plugins: {
            legend: {
            position: 'bottom',
            },
        },
    }
  })
}

onMounted(renderChart)

watch(
  () => store.transactions,
  () => {
    renderChart()
  }
)
</script>

<template>
  <div class="p-4 bg-white rounded shadow">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>