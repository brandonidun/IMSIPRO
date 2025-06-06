<script setup lang="ts">
import {
  Siren,
  TrendingUp,
  Shield,
  AlertTriangle,
  Waves,
  PieChart,
  BarChart3,
  Eye,
  Edit,
  Trash2,
} from "lucide-vue-next";
import { StatCard } from "~/components/Card";
import FullMapView from "@/components/FullMapView.vue";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ChartCard from "@/components/Chart/ChartCard.vue";
import { useAnalyticsCharts } from "~/composables/useAnalyticsCharts";
import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import { ref, computed } from "vue";
// Placeholder stat card data
const statCards = [
  {
    title: "Crime Predictions",
    value: 1428,
    icon: TrendingUp,
    color: "blue",
    change: "+12% from last week",
    changeColor: "text-green-600",
    arrow: "↑",
  },
  {
    title: "High Risk Areas",
    value: 24,
    icon: AlertTriangle,
    color: "red",
    change: "8% from last week",
    changeColor: "text-red-600",
    arrow: "↑",
  },
  {
    title: "IMSI Catchers",
    value: 9,
    icon: Waves,
    color: "purple",
    change: "5% from last week",
    changeColor: "text-yellow-600",
    arrow: "↑",
  },
  {
    title: "Prevented Crimes",
    value: 37,
    icon: Shield,
    color: "green",
    change: "+15% from last week",
    changeColor: "text-green-600",
    arrow: "↑",
  },
];

const threatLevel = ref("MEDIUM");
const threatColor = ref("bg-yellow-400 text-yellow-900");
const threatBar = ref("bg-yellow-400");
const threatDesc = ref("Moderate risk of criminal activity in monitored areas");
const predictedHotspots = ref([
  {
    name: "Downtown District",
    level: "CRITICAL",
    color: "text-red-600",
    dot: "bg-red-500",
  },
  {
    name: "Northside Shopping Mall",
    level: "HIGH",
    color: "text-orange-500",
    dot: "bg-orange-400",
  },
  {
    name: "Eastside Park",
    level: "MEDIUM",
    color: "text-yellow-500",
    dot: "bg-yellow-300",
  },
]);
const activeAlerts = ref([
  {
    type: "Theft",
    location: "Downtown District",
    color: "text-red-600",
    dot: "bg-red-500",
  },
  {
    type: "Vandalism",
    location: "Eastside Park",
    color: "text-orange-500",
    dot: "bg-orange-400",
  },
]);

// Placeholder map data
const crimeLocations = ref([
  {
    id: 1,
    idTag: "CR-001",
    name: "Incident 1",
    lat: 51.515,
    lng: -0.13,
    IMEI: "123456789012345",
    IMSI: "310150123456789",
    phone_number: "+441234567890",
    network: "Vodafone",
    signal_strength: 80,
    band: "Band 1",
    optional: { active: 1 },
  },
  {
    id: 2,
    idTag: "CR-002",
    name: "Incident 2",
    lat: 51.52,
    lng: -0.11,
    IMEI: "123456789012346",
    IMSI: "310150123456790",
    phone_number: "+441234567891",
    network: "O2",
    signal_strength: 60,
    band: "Band 3",
    optional: { active: 1 },
  },
]);
const mapCenter = ref({ lat: 51.515, lng: -0.13 });

// Chart data (mock)
const chartData = useAnalyticsCharts();
const crimeTypeSeries = [44, 23, 19, 14];
const crimeTypeOptions = {
  labels: ["Theft", "Vandalism", "Assault", "Other"],
  legend: { position: "right" },
  colors: ["#ef4444", "#f59e0b", "#6366f1", "#6b7280"],
};
const crimeByDaySeries = [
  {
    name: "Crimes",
    data: [12, 18, 25, 30, 28, 35, 40],
  },
];
const crimeByDayOptions = {
  chart: { type: "bar" },
  xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  colors: ["#3b82f6"],
};

// Timeline state
const periods = [
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];
const selectedPeriod = ref("7d");
const timelineData = computed(() => [
  {
    type: "Theft",
    time: "Today, 11:30 AM",
    location: "Downtown District",
    risk: "CRITICAL",
    riskColor: "bg-red-500",
    tags: ["Pickpocket", "Tourist Area"],
  },
  {
    type: "Vandalism",
    time: "Yesterday, 10:15 PM",
    location: "Eastside Park",
    risk: "HIGH",
    riskColor: "bg-orange-400",
    tags: ["Graffiti", "Public Property"],
  },
]);

// Forecast Alerts Table
const forecastColumns = [
  { key: "type", label: "Type" },
  { key: "location", label: "Location" },
  { key: "risk", label: "Risk" },
  { key: "timeframe", label: "Timeframe" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];
const forecastRows = ref([
  {
    type: {
      label: "Theft",
      desc: "Property Crime",
      icon: AlertTriangle,
      color: "bg-red-100",
      iconColor: "text-red-500",
    },
    location: { name: "Downtown District", coords: [51.505, -0.09] },
    risk: "CRITICAL",
    timeframe: "Next 6 hours",
    status: "Active",
  },
  {
    type: {
      label: "Vandalism",
      desc: "Property Crime",
      icon: AlertTriangle,
      color: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    location: { name: "Eastside Park", coords: [51.515, -0.07] },
    risk: "HIGH",
    timeframe: "Next 24 hours",
    status: "Active",
  },
  {
    type: {
      label: "Assault",
      desc: "Violent Crime",
      icon: AlertTriangle,
      color: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    location: { name: "Northside Bar District", coords: [51.51, -0.11] },
    risk: "MEDIUM",
    timeframe: "Next 7 days",
    status: "Pending",
  },
]);

import { useDataTable } from "~/composables/useDataTable";
const {
  search: forecastSearch,
  paginatedRows: forecastPaginatedRows,
  toggleSort: forecastToggleSort,
  sortKey: forecastSortKey,
  sortOrder: forecastSortOrder,
  currentPage: forecastCurrentPage,
  totalPages: forecastTotalPages,
  filtered: forecastFiltered,
  perPage: forecastPerPage,
  goToNext: forecastGoToNext,
  goToPrev: forecastGoToPrev,
  exportData: forecastExportData,
} = useDataTable(forecastRows.value);
</script>
<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <PageIntroduction
      title="Crime Forecast"
      description="View the crime forecast for various locations"
      :icon="Siren"
    />
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <StatCard
        v-for="card in statCards"
        :key="card.title"
        :title="card.title"
        :value="card.value"
        :icon="card.icon"
        :color="card.color"
      />
    </div>
    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Risk Overview -->
      <Card class="col-span-1 shadow-none bg-gray-50">
        <CardHeader>
          <CardTitle>Risk Overview</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <div class="mb-4">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-medium text-gray-700"
                >Current Threat Level</span
              >
              <span
                :class="[
                  'rounded-full px-3 py-1 text-xs font-bold',
                  threatColor,
                ]"
                >{{ threatLevel }}</span
              >
            </div>
            <div class="w-full h-2 rounded-full bg-gray-200 mb-1">
              <div
                :class="['h-2 rounded-full', threatBar]"
                style="width: 70%"
              ></div>
            </div>
            <div class="text-gray-500 text-sm">{{ threatDesc }}</div>
          </div>
          <div class="mb-4">
            <div class="flex items-center justify-between mb-1">
              <span class="font-medium text-gray-700">Predicted Hotspots</span>
              <span
                class="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-semibold"
                >5 areas</span
              >
            </div>
            <div class="flex flex-col gap-1">
              <div
                v-for="h in predictedHotspots"
                :key="h.name"
                class="flex items-center gap-2"
              >
                <span :class="['w-2 h-2 rounded-full', h.dot]"></span>
                <span class="text-gray-700 text-sm">{{ h.name }}</span>
                <span :class="['ml-auto text-xs font-bold', h.color]">{{
                  h.level
                }}</span>
              </div>
            </div>
            <a href="#" class="text-xs text-blue-600 mt-1 hover:underline"
              >Show all...</a
            >
          </div>
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="font-medium text-gray-700">Active Alerts</span>
              <span
                class="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold"
                >2 active</span
              >
            </div>
            <div class="flex flex-col gap-1">
              <div
                v-for="a in activeAlerts"
                :key="a.type"
                class="flex items-center gap-2"
              >
                <span :class="['w-2 h-2 rounded-full', a.dot]"></span>
                <span class="text-gray-700 text-sm">{{ a.type }}</span>
                <span class="text-xs text-gray-400">{{ a.location }}</span>
              </div>
            </div>
            <a href="#" class="text-xs text-blue-600 mt-1 hover:underline"
              >Show more...</a
            >
          </div>
        </CardContent>
      </Card>
      <!-- Crime Risk Heatmap -->
      <Card class="col-span-2 shadow-none p-0">
        <CardHeader class="flex justify-center p-4">
          <CardTitle class="flex items-center justify-between w-full"
            ><span class="text-base">Crime Risk Heatmap</span>
            <div class="flex gap-4 ml-auto">
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-red-500"></span>
                <span class="text-xs">Critical</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-orange-400"></span>
                <span class="text-xs">High</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-yellow-300"></span>
                <span class="text-xs">Medium</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-green-400"></span>
                <span class="text-xs">Low</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                <span class="text-xs">Police</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-purple-500"></span>
                <span class="text-xs">Camera</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <div
            class="w-full h-[350px] rounded-xl flex items-center justify-center"
          >
            <FullMapView :locations="crimeLocations" class="w-full h-full" />
          </div>
        </CardContent>
      </Card>
    </div>
    <!-- Charts Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      <ChartCard
        title="Crime Types Distribution"
        :series="crimeTypeSeries"
        :options="crimeTypeOptions"
        :icon="PieChart"
        color="indigo"
        type="donut"
      />
      <ChartCard
        title="Crimes by Day of Week"
        :series="crimeByDaySeries"
        :options="crimeByDayOptions"
        :icon="BarChart3"
        color="blue"
        type="bar"
      />
    </div>
    <!-- Historical Crime Timeline -->
    <Card class="shadow-none">
      <CardHeader>
        <CardTitle>Historical Crime Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2 mb-4">
          <button
            v-for="period in periods"
            :key="period.value"
            @click="selectedPeriod = period.value"
            :class="[
              'px-4 py-1 rounded-md text-sm font-medium',
              selectedPeriod === period.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700',
            ]"
          >
            {{ period.label }}
          </button>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, i) in timelineData"
            :key="i"
            class="flex items-start gap-4 bg-white rounded-lg p-4 border"
          >
            <div class="flex flex-col items-center">
              <span
                :class="['w-3 h-3 rounded-full mt-1', item.riskColor]"
              ></span>
              <span
                v-if="i < timelineData.length - 1"
                class="w-0.5 flex-1 bg-gray-200 my-1"
              ></span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-base">{{ item.type }}</span>
                <span
                  :class="[
                    'ml-2 px-3 py-1 rounded-full text-xs font-bold',
                    item.risk === 'CRITICAL'
                      ? 'bg-red-500 text-white'
                      : item.risk === 'HIGH'
                      ? 'bg-orange-400 text-white'
                      : 'bg-yellow-300 text-gray-900',
                  ]"
                >
                  {{ item.risk }}
                </span>
              </div>
              <div class="text-xs text-gray-500 mb-1">
                {{ item.time }}
              </div>
              <div class="text-sm text-gray-700 mb-1">
                {{ item.location }}
              </div>
              <div class="flex gap-2 mt-1">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="bg-gray-100 text-xs px-2 py-0.5 rounded-full text-gray-700"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <!-- Forecast Alerts Table -->

    <Table
      :columns="forecastColumns"
      :rows="forecastPaginatedRows"
      :sort-key="forecastSortKey"
      :sort-order="forecastSortOrder"
      :toggle-sort="forecastToggleSort"
    >
      <template #header>
        <TableHeader
          title="Forecast Alerts"
          v-model="forecastSearch"
          @export="forecastExportData"
        />
      </template>
      <template #cell-type="{ row }">
        <div class="flex items-center gap-3">
          <span :class="['rounded-full p-2', row.type.color]">
            <component
              :is="row.type.icon"
              :class="['w-5 h-5', row.type.iconColor]"
            />
          </span>
          <div>
            <div class="font-semibold text-base">{{ row.type.label }}</div>
            <div class="text-xs text-gray-500">{{ row.type.desc }}</div>
          </div>
        </div>
      </template>
      <template #cell-location="{ row }">
        <div>
          <div class="font-semibold">{{ row.location.name }}</div>
          <div class="text-xs text-gray-500">
            [ {{ row.location.coords[0] }}, {{ row.location.coords[1] }} ]
          </div>
        </div>
      </template>
      <template #cell-risk="{ row }">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-bold',
            row.risk === 'CRITICAL'
              ? 'bg-red-100 text-red-600'
              : row.risk === 'HIGH'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-yellow-50 text-yellow-800',
          ]"
        >
          {{ row.risk }}
        </span>
      </template>
      <template #cell-status="{ row }">
        <span
          :class="[
            'px-3 py-1 rounded-full text-xs font-semibold',
            row.status === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700',
          ]"
        >
          {{ row.status }}
        </span>
      </template>
      <template #cell-actions>
        <div class="flex">
          <Button variant="ghost" class="p-0">
            <Eye class="w-4 h-4" />
          </Button>
          <Button variant="ghost" class="p-0">
            <Edit class="w-4 h-4" />
          </Button>
          <Button variant="ghost" class="p-0">
            <Trash2 class="w-4 h-4" />
          </Button>
        </div>
      </template>
      <template #footer>
        <TableFooter
          :page="forecastCurrentPage"
          :total="forecastFiltered.length"
          :totalPages="forecastTotalPages"
          :rows="forecastPaginatedRows"
          @next="forecastGoToNext"
          @prev="forecastGoToPrev"
        />
      </template>
    </Table>
  </main>
</template>
