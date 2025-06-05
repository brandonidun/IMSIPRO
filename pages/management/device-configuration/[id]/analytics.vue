// No content change, just move the file to
pages/management/device-configuration/[id]/analytics.vue

<script setup>
definePageMeta({
  breadcrumb: "Analytics",
});

import {
  Users,
  Activity,
  BarChart3,
  CalendarDays,
  RefreshCcw,
  Monitor,
  MonitorCheck,
  MonitorX,
  MonitorCog,
} from "lucide-vue-next";
import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import PageIntroduction from "@/components/PageIntroduction.vue";
import { ChartCard } from "~/components/Chart";
import { StatCard } from "~/components/Card";
import { useAnalyticsCharts } from "~/composables/useAnalyticsCharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useDataTable } from "~/composables/useDataTable";

// Dropdown for time range
const timeRange = ref("7d");

const statCardData = {
  "7d": [
    { title: "Total Tracked", value: 42, icon: Monitor, color: "blue" },
    { title: "Total Alerts", value: 156, icon: MonitorCheck, color: "blue" },
    { title: "Avg. Strength", value: "78%", icon: MonitorX, color: "blue" },
    {
      title: "Avg. Battery Level",
      value: "65%",
      icon: MonitorCog,
      color: "blue",
    },
  ],
  "30d": [
    { title: "Total Tracked", value: 120, icon: Monitor, color: "blue" },
    { title: "Total Alerts", value: 512, icon: MonitorCheck, color: "blue" },
    { title: "Avg. Strength", value: "81%", icon: MonitorX, color: "blue" },
    {
      title: "Avg. Battery Level",
      value: "69%",
      icon: MonitorCog,
      color: "blue",
    },
  ],
  year: [
    { title: "Total Tracked", value: 320, icon: Monitor, color: "blue" },
    { title: "Total Alerts", value: 2100, icon: MonitorCheck, color: "blue" },
    { title: "Avg. Strength", value: "75%", icon: MonitorX, color: "blue" },
    {
      title: "Avg. Battery Level",
      value: "62%",
      icon: MonitorCog,
      color: "blue",
    },
  ],
};
const statCards = computed(() => statCardData[timeRange.value]);

// Chart data for each time range (mock)
const chartData = {
  "7d": useAnalyticsCharts(),
  "30d": {
    ...useAnalyticsCharts(),
    deviceActivitySeries: [
      { name: "Active Devices", data: [20, 22, 25, 27, 30, 32, 35] },
      { name: "Inactive Devices", data: [8, 7, 6, 5, 4, 3, 2] },
    ],
    eventDistributionSeries: [120, 60, 30, 20],
    alertTypesSeries: [{ name: "Alerts", data: [40, 20, 30, 10] }],
    heatmapSeries: useAnalyticsCharts().heatmapSeries.map((day) => ({
      ...day,
      data: day.data.map(() => Math.floor(Math.random() * 101)),
    })),
  },
  year: {
    ...useAnalyticsCharts(),
    deviceActivitySeries: [
      { name: "Active Devices", data: [50, 60, 70, 80, 90, 100, 110] },
      { name: "Inactive Devices", data: [20, 18, 16, 14, 12, 10, 8] },
    ],
    eventDistributionSeries: [800, 500, 400, 400],
    alertTypesSeries: [{ name: "Alerts", data: [200, 100, 80, 20] }],
    heatmapSeries: useAnalyticsCharts().heatmapSeries.map((day) => ({
      ...day,
      data: day.data.map(() => Math.floor(Math.random() * 101)),
    })),
  },
};

const deviceActivitySeries = computed(
  () => chartData[timeRange.value].deviceActivitySeries
);
const deviceActivityOptions = computed(
  () => chartData[timeRange.value].deviceActivityOptions
);
const eventDistributionSeries = computed(
  () => chartData[timeRange.value].eventDistributionSeries
);
const eventDistributionOptions = computed(
  () => chartData[timeRange.value].eventDistributionOptions
);
const alertTypesSeries = computed(
  () => chartData[timeRange.value].alertTypesSeries
);
const alertTypesOptions = computed(
  () => chartData[timeRange.value].alertTypesOptions
);
const heatmapSeries = computed(() => chartData[timeRange.value].heatmapSeries);
const heatmapOptions = computed(
  () => chartData[timeRange.value].heatmapOptions
);

const tableColumns = [
  { key: "timestamp", label: "Timestamp" },
  { key: "user", label: "User" },
  { key: "event", label: "Event" },
  { key: "device", label: "Device" },
];
const tableRows = ref([
  {
    timestamp: "2024-06-01 09:12",
    user: "Alice",
    event: "Login",
    device: "Device A",
  },
  {
    timestamp: "2024-06-01 09:15",
    user: "Bob",
    event: "Alert",
    device: "Device B",
  },
  {
    timestamp: "2024-06-01 09:20",
    user: "Charlie",
    event: "Update",
    device: "Device C",
  },
  {
    timestamp: "2024-06-01 09:25",
    user: "Alice",
    event: "Other",
    device: "Device D",
  },
]);

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
} = useDataTable(tableRows.value);
</script>

<template>
  <main class="space-y-4">
    <PageIntroduction
      title="Analytics"
      :icon="BarChart3"
      description="View key metrics, trends, and recent activity across your devices and users."
      ><Select v-model="timeRange">
        <SelectTrigger class="w-full">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Time Range</SelectLabel>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select></PageIntroduction
    >

    <div class="flex flex-col gap-4 py-4 pt-0">
      <!-- Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 text-center">
        <StatCard
          v-for="card in statCards"
          :key="card.title"
          :title="card.title"
          :value="card.value"
          :icon="card.icon"
          :color="card.color"
        />
      </div>

      <!-- Main Charts Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <ChartCard
          title="Device Activity Over Time"
          :options="deviceActivityOptions"
          :series="deviceActivitySeries"
          type="area"
          :icon="Activity"
          color="blue"
        />
        <ChartCard
          title="Event Distribution"
          :options="eventDistributionOptions"
          :series="eventDistributionSeries"
          type="donut"
          :icon="BarChart3"
          color="gray"
        />
      </div>

      <!-- NEW: Heatmap and Bar Chart Row -->
      <div class="grid grid-cols-1 gap-4 px-4">
        <ChartCard
          title="Signal Strength by Time & Day"
          :options="heatmapOptions"
          :series="heatmapSeries"
          type="heatmap"
          :icon="BarChart3"
          color="indigo"
        />
      </div>

      <!-- Data Table -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <Table
          :columns="tableColumns"
          :rows="paginatedRows"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          :toggle-sort="toggleSort"
        >
          <template #header>
            <TableHeader
              title="Recent Events"
              v-model="search"
              @export="exportData"
            />
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
        <ChartCard
          title="Alert Types Distribution"
          :options="alertTypesOptions"
          :series="alertTypesSeries"
          type="bar"
          :icon="BarChart3"
          color="red"
        />
      </div>
    </div>
  </main>
</template>
