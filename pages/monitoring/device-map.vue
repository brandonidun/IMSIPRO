<script setup lang="ts">
import { Map, Radar, ShieldAlert, Fence, MapPinned } from "lucide-vue-next";
import { StatCard } from "~/components/Card";
import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import { ref, onMounted, computed } from "vue";

definePageMeta({
  breadcrumb: "Device Map",
});

const trackingDevices = [
  {
    id: 1,
    idTag: "SC-001",
    name: "Scooter 1",
    status: "active",
    lat: 5.56,
    lng: -0.205,
    phone_number: "+2334567890",
    IMSI: "310150123456789",
    signal_strength: 90,
  },
  {
    id: 2,
    idTag: "SC-002",
    name: "Scooter 2",
    status: "inactive",
    lat: 5.675,
    lng: -0.01,
    phone_number: "+2334567891",
    IMSI: "310260987654321",
    signal_strength: 60,
  },
  {
    id: 3,
    idTag: "SC-003",
    name: "Scooter 3",
    status: "active",
    lat: 5.548,
    lng: -0.197,
    phone_number: "+2334567892",
    IMSI: "310410112233445",
    signal_strength: 35,
  },
  {
    id: 4,
    idTag: "SC-004",
    name: "Scooter 4",
    status: "active",
    lat: 5.603,
    lng: -0.186,
    phone_number: "+2334567893",
    IMSI: "310120556677889",
    signal_strength: 80,
  },
  {
    id: 5,
    idTag: "SC-005",
    name: "Scooter 5",
    status: "inactive",
    lat: 5.567,
    lng: -0.201,
    phone_number: "+2334567894",
    IMSI: "310120556677880",
    signal_strength: 75,
  },
  {
    id: 6,
    idTag: "SC-006",
    name: "Scooter 6",
    status: "maintenance",
    lat: 5.59,
    lng: -0.22,
    phone_number: "+2334567895",
    IMSI: "310120556677881",
    signal_strength: 55,
  },
  {
    id: 7,
    idTag: "SC-007",
    name: "Scooter 7",
    status: "active",
    lat: 5.62,
    lng: -0.19,
    phone_number: "+2334567896",
    IMSI: "310120556677882",
    signal_strength: 65,
  },
  {
    id: 8,
    idTag: "SC-008",
    name: "Scooter 8",
    status: "inactive",
    lat: 5.55,
    lng: -0.21,
    phone_number: "+2334567897",
    IMSI: "310120556677883",
    signal_strength: 45,
  },
  {
    id: 9,
    idTag: "SC-009",
    name: "Scooter 9",
    status: "maintenance",
    lat: 5.58,
    lng: -0.18,
    phone_number: "+2334567898",
    IMSI: "310120556677884",
    signal_strength: 50,
  },
  {
    id: 10,
    idTag: "SC-010",
    name: "Scooter 10",
    status: "active",
    lat: 5.6,
    lng: -0.2,
    phone_number: "+2334567899",
    IMSI: "310120556677885",
    signal_strength: 70,
  },
];

const DEFAULT_CENTER = { lat: 5.5913754, lng: -0.2497702 };
const userLocation = ref<{ lat: number; lng: number } | null>(DEFAULT_CENTER);
const selectedCenter = ref(DEFAULT_CENTER);
const selectedMarkerId = ref<string | number | null>(null);

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        selectedCenter.value = userLocation.value;
      },
      (error) => {
        userLocation.value = DEFAULT_CENTER;
        selectedCenter.value = DEFAULT_CENTER;
      }
    );
  } else {
    userLocation.value = DEFAULT_CENTER;
    selectedCenter.value = DEFAULT_CENTER;
  }
});

// Combine device locations and user location for markers
const allMarkers = computed(() => {
  if (userLocation.value) {
    return [
      ...trackingDevices,
      {
        id: "user-location",
        idTag: "You are here",
        name: "You are here",
        status: "user",
        lat: userLocation.value.lat,
        lng: userLocation.value.lng,
        phone_number: "-",
        IMSI: "-",
        signal_strength: 0,
        isUser: true,
      },
    ];
  }
  return trackingDevices;
});

const columns = [
  { key: "idTag", label: "Tracker" },
  { key: "status", label: "Status" },
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
} = useDataTable(trackingDevices);

function centerOnTracker(tracker: any) {
  selectedCenter.value = { lat: tracker.lat, lng: tracker.lng };
  selectedMarkerId.value = tracker.id;
}
</script>

<template>
  <main class="flex flex-col h-screen w-full gap-4 px-4">
    <PageIntroduction
      title="Device Map"
      description="View the map of the devices"
      :icon="Map"
    />
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <StatCard title="Tracked Devices" value="28" :icon="Radar" color="blue" />
      <StatCard
        title="Active Tracking"
        value="2"
        :icon="MapPinned"
        color="blue"
      />
      <StatCard title="Geofence Zones" value="32" :icon="Fence" color="blue" />
      <StatCard
        title="Alerts Today"
        value="5"
        :icon="ShieldAlert"
        color="blue"
      />
    </div>
    <div class="grid w-full grid-cols-3 h-full rounded-xl gap-4">
      <Card class="shadow-none col-span-2 pb-0 overflow-hidden">
        <CardHeader class="flex items-center justify-between">
          <CardTitle class="text-base">Live Tracking Map</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <DeviceMapView
            :locations="allMarkers"
            :center="selectedCenter"
            :selected-marker-id="selectedMarkerId"
            class="min-h-[400px] h-full"
          />
        </CardContent>
      </Card>
      <div class="md:col-span-1 h-full">
        <Table
          :columns="columns"
          :rows="paginatedRows"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          :toggle-sort="toggleSort"
          @row-click="centerOnTracker"
        >
          <template #header>
            <TableHeader
              title="Connected Trackers"
              v-model="search"
              @export="exportData"
            ></TableHeader>
          </template>
          <template #cell-status="{ row }">
            <span
              :class="{
                'text-green-700 font-semibold': row.status === 'active',
                'text-yellow-700 font-semibold': row.status === 'maintenance',
                'text-red-700 font-semibold': row.status === 'inactive',
              }"
            >
              {{ row.status.charAt(0).toUpperCase() + row.status.slice(1) }}
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
