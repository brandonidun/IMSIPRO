<script setup>
definePageMeta({
  breadcrumb: "Charging Station",
});

import { MapPin, BatteryCharging, Zap, CalendarClock } from "lucide-vue-next";

import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import PageIntroduction from "@/components/PageIntroduction.vue";
import DashboardFullMapView from "@/components/DashboardFullMapView.vue";
import { ChartCard } from "~/components/Chart";
import { StatCard } from "~/components/Card";

const chargerLocations = [
  { id: "SC-001", name: "Scooter 1", lat: 5.56, lng: -0.205 },
  { id: "SC-002", name: "Scooter 2", lat: 5.675, lng: -0.01 },
  { id: "SC-003", name: "Scooter 3", lat: 5.548, lng: -0.197 },
  { id: "SC-004", name: "Scooter 4", lat: 5.603, lng: -0.186 },
  { id: "SC-005", name: "Scooter 5", lat: 5.567, lng: -0.201 },
  { id: "SC-006", name: "Scooter 6", lat: 5.59, lng: -0.22 },
  { id: "SC-007", name: "Scooter 7", lat: 5.62, lng: -0.19 },
  { id: "SC-008", name: "Scooter 8", lat: 5.55, lng: -0.21 },
  { id: "SC-009", name: "Scooter 9", lat: 5.58, lng: -0.18 },
  { id: "SC-010", name: "Scooter 10", lat: 5.6, lng: -0.2 },
];

const totalStations = 15;
const activeStations = 12;
const reservedSlots = 5;
const energyStats = [1200, 1350, 1280, 1400, 1500, 1425];
const energyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const energyConsumptionSeries = [
  {
    name: "Energy Consumed (kWh)",
    data: energyStats,
  },
];

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
} = useDataTable([
  {
    id: "CS-001",
    location: "East Legon",
    status: "Active",
    queue: 2,
    reserved: true,
    faults: 0,
  },
  {
    id: "CS-002",
    location: "Airport City",
    status: "Inactive",
    queue: 0,
    reserved: false,
    faults: 1,
  },
  {
    id: "CS-003",
    location: "Osu",
    status: "Active",
    queue: 3,
    reserved: true,
    faults: 0,
  },
  {
    id: "CS-004",
    location: "Dzorwulu",
    status: "Active",
    queue: 1,
    reserved: false,
    faults: 0,
  },
]);

const columns = [
  { key: "id", label: "Station ID" },
  { key: "location", label: "Location" },
  { key: "status", label: "Status" },
  { key: "queue", label: "Queue Length" },
  { key: "reserved", label: "Reserved" },
  { key: "faults", label: "Faults" },
];
</script>

<template>
  <main class="space-y-4">
    <PageIntroduction
      title="Charging Stations"
      :icon="BatteryCharging"
      description="Monitor charging station locations, real-time availability, queue lengths, and energy consumption. Detect faults and manage reservations efficiently."
    />
    <div class="flex flex-col gap-6 py-4 pt-0">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 text-center">
        <StatCard
          title="Total Stations"
          :value="totalStations"
          :icon="MapPin"
          color="blue"
        />
        <StatCard
          title="Active Stations"
          :value="activeStations"
          :icon="BatteryCharging"
          color="green"
        />
        <StatCard
          title="Reserved Slots"
          :value="reservedSlots"
          :icon="CalendarClock"
          color="yellow"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <ChartCard
          title="Monthly Energy Consumption"
          :options="{
            stroke: {
              curve: 'smooth',
            },
            colors: ['#546E7A', '#E91E63'],
            xaxis: { categories: energyLabels },
          }"
          :series="energyConsumptionSeries"
          :icon="Zap"
          color="gray"
        />

        <Card class="shadow-none pb-0">
          <CardHeader class="flex items-center justify-between">
            <CardTitle class="text-base">Charging Station Map</CardTitle>
            <MapPin />
          </CardHeader>
          <DashboardFullMapView
            :locations="chargerLocations ?? []"
            class="min-h-[300px] h-full"
          />
        </Card>
      </div>

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
              title="Charging Station Records"
              v-model="search"
              @export="exportData"
            />
          </template>

          <template #cell-status="{ row }">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-semibold',
                row.status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ row.status }}
            </span>
          </template>

          <template #cell-reserved="{ row }">
            <span
              class="text-sm font-medium"
              :class="row.reserved ? 'text-green-600' : 'text-gray-500'"
            >
              {{ row.reserved ? "Yes" : "No" }}
            </span>
          </template>

          <template #cell-faults="{ row }">
            <span
              :class="[
                'text-sm font-medium',
                row.faults > 0 ? 'text-red-600' : 'text-gray-500',
              ]"
            >
              {{ row.faults }} Issue{{ row.faults !== 1 ? "s" : "" }}
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
