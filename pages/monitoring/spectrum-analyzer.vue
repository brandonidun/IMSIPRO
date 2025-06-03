<script setup>
definePageMeta({
  breadcrumb: "Spectrum Analyzer",
});

import { Signal, Wifi, Radio, BarChart3, RefreshCcw } from "lucide-vue-next";
import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import PageIntroduction from "@/components/PageIntroduction.vue";
import { ChartCard } from "~/components/Chart";
import { StatCard } from "~/components/Card";
import { useNetworkCharts } from "~/composables/useNetworkCharts";

const { pieChartOptions, lineChartOptions } = useNetworkCharts();

// const signalTrendSeries = [
//   {
//     name: "Avg Signal (dBm)",
//     data: [-85, -90, -80, -88, -87, -84],
//   },
// ];

// const networkDistributionSeries = [40, 30, 20, 10]; // 40% MTN, etc.

// const spectrumData = [
//   {
//     imei: "868120056728319",
//     sim: "024XXXXXXX",
//     imsi: "620021234567890",
//     band: "LTE B3",
//     signal: -87,
//     network: "MTN",
//     status: "Online",
//   },
//   {
//     imei: "868120056728320",
//     sim: "054XXXXXXX",
//     imsi: "620021234567891",
//     band: "LTE B20",
//     signal: -91,
//     network: "Vodafone",
//     status: "Offline",
//   },
//   {
//     imei: "868120056728321",
//     sim: "055XXXXXXX",
//     imsi: "620021234567892",
//     band: "3G 2100",
//     signal: -80,
//     network: "AirtelTigo",
//     status: "Online",
//   },
// ];

function generateRandomSignal() {
  return Math.floor(Math.random() * 15) - 95; // -95 to -80
}

function generateSpectrumData() {
  const networks = ["MTN", "Vodafone", "AirtelTigo", "Glo"];
  const bands = ["LTE B3", "LTE B20", "3G 2100", "5G NR"];
  const statuses = ["Online", "Offline"];

  const newSpectrum = Array.from({ length: 20 }).map((_, i) => {
    const signal = generateRandomSignal();
    const network = networks[i % networks.length];
    return {
      imei: `8681200567283${100 + i}`,
      sim: `05${Math.floor(10000000 + Math.random() * 89999999)}`,
      imsi: `62002${Math.floor(100000000 + Math.random() * 899999999)}`,
      band: bands[i % bands.length],
      signal,
      network,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });

  return newSpectrum;
}
const spectrumData = ref(generateSpectrumData());
const signalTrendSeries = ref([
  {
    name: "Avg Signal (dBm)",
    data: [],
  },
]);
const networkDistributionSeries = ref([0, 0, 0, 0]);

const columns = [
  { key: "imei", label: "IMEI" },
  { key: "sim", label: "SIM Number" },
  { key: "imsi", label: "IMSI" },
  { key: "network", label: "Network" },
  { key: "band", label: "Band" },
  { key: "signal", label: "Signal (dBm)" },
  { key: "status", label: "Status" },
];

function updateSpectrumDashboard() {
  const updated = generateSpectrumData();
  spectrumData.value = updated;

  // Pie chart logic (unchanged)
  const networkCounts = {};
  updated.forEach((d) => {
    networkCounts[d.network] = (networkCounts[d.network] || 0) + 1;
  });
  const total = updated.length;
  networkDistributionSeries.value = Object.values(networkCounts).map((count) =>
    Math.round((count / total) * 100)
  );

  // Signal trend logic — include timestamp
  const avgSignal = Math.round(
    updated.reduce((sum, d) => sum + d.signal, 0) / updated.length
  );

  const timestamp = new Date().toLocaleTimeString(); // or use `toISOString()` for UTC

  signalTrendSeries.value[0].data.push({
    x: timestamp,
    y: avgSignal,
  });

  if (signalTrendSeries.value[0].data.length > 10) {
    signalTrendSeries.value[0].data.shift(); // maintain 10 points
  }
}

let intervalId;
onMounted(() => {
  updateSpectrumDashboard(); // initial
  intervalId = setInterval(updateSpectrumDashboard, 60000); // every 1 min
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const {
  search,
  paginatedRows,
  toggleSort,
  sortKey,
  sortOrder,
  currentPage,
  totalPages,
  filtered,
  perPage,
  goToNext,
  goToPrev,
  exportData,
} = useDataTable(spectrumData);
</script>

<template>
  <main class="space-y-4">
    <PageIntroduction
      title="Spectrum Analyzer"
      :icon="Radio"
      description="Monitor real-time network signal strength, cellular band usage, and SIM status across all devices in the fleet."
    >
      <Button @click="updateSpectrumDashboard" class="ml-4">
        <RefreshCcw class="w-4 h-4" /> Refresh Now
      </Button>
    </PageIntroduction>

    <div class="flex flex-col gap-6 py-4 pt-0">
      <!-- Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 text-center">
        <StatCard
          title="Active SIMs"
          :value="spectrumData.length"
          :icon="Signal"
          color="green"
        />

        <StatCard
          title="Avg Signal Strength"
          :value="`${Math.round(
            spectrumData.reduce((sum, d) => sum + d.signal, 0) /
              spectrumData.length
          )} dBm`"
          :icon="BarChart3"
          color="yellow"
        />

        <StatCard
          title="Bands in Use"
          :value="[...new Set(spectrumData.map((d) => d.band))].length"
          :icon="Wifi"
          color="blue"
        />
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <ChartCard
          title="Network Distribution"
          :options="pieChartOptions"
          :series="networkDistributionSeries"
          type="donut"
          :icon="BarChart3"
          color="gray"
        />
        <ChartCard
          title="Signal Strength Trend"
          :options="lineChartOptions"
          :series="signalTrendSeries"
          type="line"
          :icon="BarChart3"
          color="gray"
        />
      </div>

      <!-- Data Table -->
      <div class="p-4 pt-0">
        <Table
          :columns="columns"
          :rows="paginatedRows"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          :toggle-sort="toggleSort"
        >
          <template #header>
            <TableHeader
              title="Device Spectrum Table"
              v-model="search"
              @export="exportData"
            />
          </template>

          <template #cell-status="{ row }">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                row.status === 'Online'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800',
              ]"
            >
              {{ row.status }}
            </span>
          </template>

          <template #footer>
            <TableFooter
              :page="currentPage"
              :total="filtered.length"
              :totalPages="totalPages"
              :rows="paginatedRows"
              @next="goToNext"
              @prev="goToPrev"
            />
          </template>
        </Table>
      </div>
    </div>
  </main>
</template>
