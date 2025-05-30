<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import DashboardFullMapView from "@/components/DashboardFullMapView.vue";
import { MapPin, User } from "lucide-vue-next";

definePageMeta({
  breadcrumb: "Dashboard",
});
import {
  MonitorSmartphone,
  AudioLines,
  FileWarning,
  Hourglass,
} from "lucide-vue-next";

import {
  Table,
  TableHeader,
  TableFooter,
  ActionButtons,
} from "@/components/DataTable";
import { StatCard } from "~/components/Card";
import EditUserModal from "~/features/monitoring/dashboard/ui/EditUserDialog.vue";
import DeleteUserModal from "~/features/monitoring/dashboard/ui/DeleteDialog.vue";

const selectedUser = ref(null);
const showEditModal = ref(false);
const showDeleteModal = ref(false);

const data = [
  {
    id: 1,
    name: "Sarah Connor",
    email: "sarah@gmail.com",
    avatar: "",
    role: "administrator",
    status: "Active",
    last_active: "2023-08-30 12:22:51",
    rides: 100,
  },
  {
    id: 2,
    name: "Rosemond Jones",
    email: "rose123@gmail.com",
    avatar: "",
    role: "customer",
    status: "Inactive",
    last_active: "2024-08-30 12:22:54",
    rides: 50,
  },
  {
    id: 3,
    name: "George Smith",
    email: "george@gmail.com",
    avatar: "",
    role: "guest",
    status: "Active",
    last_active: "2024-08-30 12:22:54",
    rides: 200,
  },
  {
    id: 4,
    name: "Alex Johnson",
    email: "sarah@gmail.com",
    avatar: "",
    role: "customer",
    status: "Inactive",
    last_active: "2024-08-30 12:22:54",
    rides: 75,
  },
  {
    id: 5,
    name: "Frank Castle",
    email: "frank@gmail.com",
    avatar: "",
    role: "operator",
    status: "Active",
    last_active: "2024-08-30 12:22:54",
    rides: 150,
  },
  {
    id: 6,
    name: "Clark Kent",
    email: "clark@gmail.com",
    avatar: "",
    role: "customer",
    status: "Inactive",
    last_active: "2024-08-30 12:22:54",
    rides: 60,
  },
  {
    id: 7,
    name: "Robert Downey",
    email: "robert@gmail.com",
    avatar: "",
    role: "guest",
    status: "Active",
    last_active: "2024-08-30 12:22:54",
    rides: 120,
  },
  {
    id: 8,
    name: "Tony Stark",
    email: "tony@gmail.com",
    avatar: "",
    role: "operator",
    status: "Inactive",
    last_active: "2024-08-30 12:22:54",
    rides: 80,
  },
  {
    id: 9,
    name: "Harry Potter",
    email: "harry@gmail.com",
    avatar: "",
    role: "administrator",
    status: "Active",
    last_active: "2024-08-30 12:22:54",
    rides: 90,
  },
  {
    id: 10,
    name: "Hermione Granger",
    email: "hermione@gmail.com",
    avatar: "",
    role: "customer",
    status: "Inactive",
    last_active: "2024-08-30 12:22:54",
    rides: 70,
  },
  {
    id: 11,
    name: "Bruce Wayne",
    email: "bruce@gmail.com",
    avatar: "",
    role: "administrator",
    status: "Active",
    last_active: "2024-08-30 12:22:54",
    rides: 110,
  },
  {
    id: 12,
    name: "Peter Parker",
    email: "peter@gmail.com",
    avatar: "",
    role: "operator",
    status: "Inactive",
    last_active: "2024-08-30 12:22:54",
    rides: 65,
  },
];

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

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "last_active", label: "Last Active", sortable: true },
  { key: "rides", label: "Rides", sortable: true },
  { key: "actions", label: "Actions" },
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
} = useDataTable(data);

function openFilterModal() {
  console.log("Open filter modal");
}

function handleEdit(row: any) {
  selectedUser.value = row;
  showEditModal.value = true;
}

function handleDelete(row: any) {
  selectedUser.value = row;
  showDeleteModal.value = true;
}

function handleView(row: any) {
  console.log("View row:", row);
}

const uptime = ref("00:00:00");
let intervalId: number | null = null;

function updateUptime() {
  let loginTime = parseInt(localStorage.getItem("loginTime") || "0", 10);
  if (!loginTime) {
    // If not set, set it now
    loginTime = Date.now();
    localStorage.setItem("loginTime", loginTime.toString());
  }
  const diff = Math.floor((Date.now() - loginTime) / 1000);
  const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const seconds = String(diff % 60).padStart(2, "0");
  uptime.value = `${hours}:${minutes}:${seconds}`;
}

onMounted(() => {
  updateUptime();
  intervalId = window.setInterval(updateUptime, 1000);
});

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId);
});
</script>

<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <StatCard
        title="Devices"
        value="28"
        :icon="MonitorSmartphone"
        color="blue"
      />
      <StatCard
        title="Active Bands"
        value="2"
        :icon="AudioLines"
        color="blue"
      />
      <StatCard title="Alerts" value="32" :icon="FileWarning" color="blue" />
      <StatCard title="Uptime" :value="uptime" :icon="Hourglass" color="blue" />
    </div>
    <Card class="shadow-none pb-0">
      <CardHeader class="flex items-center justify-between">
        <CardTitle class="text-base">Device Location Map</CardTitle>
      </CardHeader>
      <DashboardFullMapView
        :locations="chargerLocations ?? []"
        class="min-h-[300px] h-full"
      />
    </Card>
    <div>
      <Table
        :rows="paginatedRows"
        :columns="columns"
        :sort-key="sortKey"
        :sort-order="sortOrder"
        :toggle-sort="toggleSort"
      >
        <template #header>
          <TableHeader
            title="User Management"
            v-model="search"
            @export="exportData"
            @filter="openFilterModal"
          />
        </template>
        <template #cell-name="{ row }">
          <div class="flex flex-row space-x-4 items-center">
            <div
              class="flex items-center justify-center rounded-full bg-gray-100 h-10 w-10 border-2 border-gray-200"
            >
              <img
                v-if="row.avatar"
                :src="row.avatar"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
              />
              <User v-else class="text-gray-500" />
            </div>
            <div class="flex flex-col space-x-4">
              <span>
                {{ row.name }}
              </span>
              <span class="text-sm text-gray-500">
                {{ row.email }}
              </span>
            </div>
          </div>
        </template>
        <template #cell-status="{ row }">
          <span
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="{
              'bg-green-100 text-green-800': row.status === 'Active',
              'bg-red-100 text-red-800': row.status === 'Inactive',
              'bg-yellow-100 text-yellow-800': row.status === 'Pending',
            }"
          >
            {{ row.status }}
          </span>
        </template>
        <template #cell-role="{ row }">
          <span
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="{
              'bg-violet-100 text-violet-800': row.role === 'administrator',
              'bg-orange-100 text-orange-800': row.role === 'customer',
              'bg-emerald-100 text-emerald-800': row.role === 'guest',
              'bg-pink-100 text-pink-800': row.role === 'operator',
            }"
          >
            {{ row.role }}
          </span>
        </template>
        <template #cell-actions="{ row }">
          <ActionButtons
            :actions="['view', 'edit', 'delete']"
            @view="() => handleView(row)"
            @edit="() => handleEdit(row)"
            @delete="() => handleDelete(row)"
          />
        </template>
        <template #footer>
          <TableFooter
            :page="currentPage"
            :total="(filtered ?? []).length"
            :totalPages="totalPages"
            :rows="paginatedRows"
            @next="goToNext"
            @prev="goToPrev"
          />
        </template>
      </Table>
    </div>
    <EditUserModal
      v-if="showEditModal"
      :open="showEditModal"
      :user="selectedUser"
      @close="showEditModal = false"
    />

    <DeleteUserModal
      v-if="showDeleteModal"
      :open="showDeleteModal"
      :user="selectedUser"
      @confirm="
        () => {
          console.log('Delete confirmed for', selectedUser);
          showDeleteModal = false;
        }
      "
      @update:open="showDeleteModal = false"
    />
  </main>
</template>
