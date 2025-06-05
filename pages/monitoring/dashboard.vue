<script setup lang="ts">
import {
  SignalHigh,
  SignalMedium,
  SignalLow,
  MonitorSmartphone,
  AudioLines,
  FileWarning,
  Hourglass,
  RefreshCcw,
  Wifi,
  MessageCircle,
  Truck,
  Zap,
} from "lucide-vue-next";
import { Table, TableHeader, TableFooter } from "@/components/DataTable";
import { StatCard } from "~/components/Card";
import { ref, computed } from "vue";

definePageMeta({
  breadcrumb: "Dashboard",
});

const deviceLocations = [
  {
    id: 1,
    idTag: "SC-001",
    name: "Scooter 1",
    lat: 5.57,
    lng: -0.2,
    IMEI: "356789012345678",
    IMSI: "310150123456789",
    phone_number: "+2334567890",
    network: "AT&T",
    signal_strength: 90,
    band: "Band 1",
    optional: { active: 1 },
  },
  {
    id: 2,
    idTag: "SC-002",
    name: "Scooter 2",
    lat: 5.53,
    lng: -0.23,
    IMEI: "356789098765432",
    IMSI: "310260987654321",
    phone_number: "+2334567891",
    network: "T-Mobile",
    signal_strength: 60,
    band: "Band 3",
    optional: { active: 1 },
  },
  {
    id: 3,
    idTag: "SC-003",
    name: "Scooter 3",
    lat: 5.548,
    lng: -0.197,
    IMEI: "356789011223344",
    IMSI: "310410112233445",
    phone_number: "+2334567892",
    network: "Verizon",
    signal_strength: 35,
    band: "Band 5",
    optional: { active: 1 },
  },
  {
    id: 4,
    idTag: "SC-004",
    name: "Scooter 4",
    lat: 5.593,
    lng: -0.19,
    IMEI: "356789055667788",
    IMSI: "310120556677889",
    phone_number: "+2334567893",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 8",
    optional: { active: 1 },
  },
  {
    id: 5,
    idTag: "SC-005",
    name: "Scooter 5",
    lat: 5.567,
    lng: -0.201,
    IMEI: "356789022334455",
    IMSI: "310120556677880",
    phone_number: "+2334567894",
    network: "Vodafone",
    signal_strength: 75,
    band: "Band 38",
    optional: { active: 1 },
  },
  {
    id: 6,
    idTag: "SC-006",
    name: "Scooter 6",
    lat: 5.59,
    lng: -0.22,
    IMEI: "356789033445566",
    IMSI: "310120556677881",
    phone_number: "+2334567895",
    network: "MTN",
    signal_strength: 55,
    band: "Band 39",
    optional: { active: 1 },
  },
  {
    id: 7,
    idTag: "SC-007",
    name: "Scooter 7",
    lat: 5.55,
    lng: -0.22,
    IMEI: "356789044556677",
    IMSI: "310120556677882",
    phone_number: "+2334567896",
    network: "AirtelTigo",
    signal_strength: 65,
    band: "Band 40",
    optional: { active: 1 },
  },
  {
    id: 8,
    idTag: "SC-008",
    name: "Scooter 8",
    lat: 5.55,
    lng: -0.21,
    IMEI: "356789055667788",
    IMSI: "310120556677883",
    phone_number: "+2334567897",
    network: "Glo",
    signal_strength: 45,
    band: "Band 41",
    optional: { active: 1 },
  },
  {
    id: 9,
    idTag: "SC-009",
    name: "Scooter 9",
    lat: 5.58,
    lng: -0.18,
    IMEI: "356789066778899",
    IMSI: "310120556677884",
    phone_number: "+2334567898",
    network: "Expresso",
    signal_strength: 50,
    band: "GSM 900",
    optional: { active: 1 },
  },
  {
    id: 10,
    idTag: "SC-010",
    name: "Scooter 10",
    lat: 5.6,
    lng: -0.2,
    IMEI: "356789077889900",
    IMSI: "310120556677885",
    phone_number: "+2334567899",
    network: "Busy",
    signal_strength: 70,
    band: "GSM 1800",
    optional: { active: 1 },
  },
];

const columns = [
  { key: "IMSI", label: "IMSI" },
  { key: "phone_number", label: "Phone Number" },
  { key: "IMEI", label: "IMEI" },
  { key: "signal_strength", label: "Signal" },
  { key: "network", label: "Network" },
];

const data = [
  {
    IMSI: "310150123456789",
    IMEI: "356789012345678",
    phone_number: "+2334567890",
    network: "AT&T",
    signal_strength: 90,
    band: "Band 1",
  },
  {
    IMSI: "310260987654321",
    IMEI: "356789098765432",
    phone_number: "+2334567890",
    network: "T-Mobile",
    signal_strength: 60,
    band: "Band 3",
  },
  {
    IMSI: "310410112233445",
    IMEI: "356789011223344",
    phone_number: "+2334567890",
    network: "Verizon",
    signal_strength: 35,
    band: "Band 5",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 8",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 38",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 39",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 40",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 41",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "GSM 900",
  },
  {
    IMSI: "310120556677889",
    IMEI: "356789055667788",
    phone_number: "+2334567890",
    network: "Sprint",
    signal_strength: 80,
    band: "GSM 1800",
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
} = useDataTable(data);

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

const allBands = [
  {
    group: "FDD",
    short_description: "Frequency Division Duplexing",
    description:
      "Allows simultaneous two-way communication by using separate frequency bands for transmitting (uplink) and receiving (downlink) data. This ensures continuous, low-latency communication.",
    bands: ["Band 1", "Band 3", "Band 5", "Band 8"],
  },
  {
    group: "TDD",
    short_description: "Time Division Duplexing",
    description:
      "Uses a single frequency band for both uplink and downlink communication, alternating between them in time slots. This reduces the need for separate frequency bands but requires more complex synchronization.",
    bands: ["Band 38", "Band 39", "Band 40", "Band 41"],
  },
  {
    group: "GSM",
    short_description: "Global System for Mobile Communications",
    description:
      "A legacy cellular technology that uses 900 MHz and 1800 MHz frequency bands for voice and data communication. It is still used in some regions for basic mobile services.",
    bands: ["GSM 900", "GSM 1800"],
  },
];
const selectedBands = ref<string[]>([]);
const savedBands = ref<string[]>([]);
const isChanged = computed(
  () => JSON.stringify(selectedBands.value) !== JSON.stringify(savedBands.value)
);

function toggleBand(band: string) {
  if (selectedBands.value.includes(band)) {
    selectedBands.value = selectedBands.value.filter((b) => b !== band);
  } else {
    selectedBands.value.push(band);
  }
}
function saveConfig() {
  savedBands.value = [...selectedBands.value];
}

const alerts = [
  {
    type: "warning",
    message: "Suspicious device detected: IMSI 310260987654321",
    time: "2 minutes ago",
  },
  {
    type: "danger",
    message: "Potential burner phone detected on GSM network",
    time: "15 minutes ago",
  },
  {
    type: "info",
    message: "New roaming device connected from foreign carrier",
    time: "32 minutes ago",
  },
  {
    type: "warning",
    message: "Signal interference detected on Band 3",
    time: "1 hour ago",
  },
];

const filteredData = computed(() =>
  savedBands.value.length
    ? deviceLocations.filter((d) => savedBands.value.includes(d.band))
    : deviceLocations
);
const filteredLocations = filteredData;

function refreshTable() {
  console.log("Table refreshed!");
}

const userLocation = ref<{ lat: number; lng: number } | null>(null);

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (error) => {
        // Fallback to a default location if denied or error
        userLocation.value = { lat: 5.5913754, lng: -0.2497702 };
      }
    );
  } else {
    userLocation.value = { lat: 5.5913754, lng: -0.2497702 };
  }
});

const userRole = ref(
  typeof window !== "undefined"
    ? localStorage.getItem("role") || "user"
    : "user"
);

const suspiciousDetections = [
  {
    title: "Burner Phone Cluster",
    level: "CRITICAL",
    levelColor: "bg-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    desc: "15 new IMSI/IMEI pairs in Nima (5min radius)",
    time: "2 min ago",
    meta: "GPS: 5.614818, -0.205874",
  },
  {
    title: "Network Downgrade",
    level: "HIGH",
    levelColor: "bg-orange-400",
    borderColor: "border-orange-200",
    bgColor: "bg-orange-50",
    desc: "4G→2G transition in Jamestown secure zone",
    time: "8 min ago",
    meta: "IMEI: 35******7890",
  },
  {
    title: "Cross-Border SIM",
    level: "MEDIUM",
    levelColor: "bg-yellow-400",
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
    desc: "Togo carrier SIM detected in Airport area",
    time: "15 min ago",
    meta: "IMSI: 621******4321",
  },
];
const detectionAlgos = [
  "Burner Phone Cluster Detection",
  "Network Downgrade Alerts",
  "Cross-Border SIM Tracking",
];

const intelFeed = [
  {
    title: "",
    message: "15 new devices detected in Nima hotspot",
    time: "",
    color: "bg-red-50",
    border: "border-red-100",
    text: "text-red-700",
    timeAgo: "",
  },
  {
    title: "SWAT Team Dispatched",
    message: "5 units en route to Nima coordinates",
    time: "5 min ago",
    color: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-700",
  },
  {
    title: "Network Downgrade",
    message: "IMEI: 35******7890 switched to 2G in secure zone",
    time: "12 min ago",
    color: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-700",
  },
  {
    title: "New Patrol Checkpoint",
    message: "Checkpoint established at Nima Junction",
    time: "18 min ago",
    color: "bg-purple-50",
    border: "border-purple-100",
    text: "text-purple-700",
  },
  {
    title: "Signal Jam Activated",
    message: "2G networks disabled in Nima perimeter",
    time: "22 min ago",
    color: "bg-green-50",
    border: "border-green-100",
    text: "text-green-700",
  },
  {
    title: "",
    message: "15 new devices detected in Nima hotspot",
    time: "",
    color: "bg-red-50",
    border: "border-red-100",
    text: "text-red-700",
    timeAgo: "",
  },
  {
    title: "SWAT Team Dispatched",
    message: "5 units en route to Nima coordinates",
    time: "5 min ago",
    color: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-700",
  },
  {
    title: "Network Downgrade",
    message: "IMEI: 35******7890 switched to 2G in secure zone",
    time: "12 min ago",
    color: "bg-orange-50",
    border: "border-orange-100",
    text: "text-orange-700",
  },
];

const mitigationActions = [
  {
    label: "Jam 2G Networks (Nima Zone)",
    color: "bg-red-500 hover:bg-red-600",
    icon: Wifi,
  },
  {
    label: "Send Public Warning (Jamestown)",
    color: "bg-orange-500 hover:bg-orange-600",
    icon: MessageCircle,
  },
  {
    label: "Deploy SWAT Team (5 units)",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: Truck,
  },
];
const recentMitigations = [
  "2G jamming activated in Nima (3 min ago)",
  "Patrol alerted about suspicious devices (10 min ago)",
];
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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      <div class="md:col-span-3 h-full">
        <div class="alert-ticker-container">
          <div class="alert-ticker-track">
            <template v-for="(alert, idx) in [...alerts, ...alerts]" :key="idx">
              <div
                class="flex flex-col justify-center min-w-[350px] max-w-xs mx-2 rounded-lg border-l-4 p-4"
                :class="{
                  'bg-yellow-50 border-yellow-400': alert.type === 'warning',
                  'bg-red-50 border-red-400': alert.type === 'danger',
                  'bg-blue-50 border-blue-400': alert.type === 'info',
                }"
              >
                <div class="flex items-center gap-2">
                  <span
                    v-if="alert.type === 'warning' || alert.type === 'danger'"
                  >
                    <svg
                      class="w-6 h-6 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 22h20L12 2zm0 16v-4m0 8h.01" />
                    </svg>
                  </span>
                  <span v-else>
                    <svg
                      class="w-6 h-6 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  <span class="font-medium text-base">{{ alert.message }}</span>
                </div>
                <span class="text-xs text-gray-500 mt-1">{{ alert.time }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        :class="[
          'shadow-none pb-0 overflow-hidden h-full',
          userRole === 'law_enforcement' ? 'md:col-span-2' : 'md:col-span-3',
        ]"
      >
        <CardHeader class="flex items-center justify-between">
          <CardTitle class="text-base">Device Location Map</CardTitle>
        </CardHeader>
        <CardContent class="p-0">
          <FullMapView
            :locations="deviceLocations"
            :center="userLocation ?? undefined"
            class="min-h-[400px] h-full"
          />
        </CardContent>
      </Card>
      <Card
        v-if="userRole === 'law_enforcement'"
        class="shadow-none h-full flex flex-col md:col-span-1 max-h-[475px]"
      >
        <CardHeader>
          <CardTitle class="text-base font-bold"
            >Suspicious Activity Detection</CardTitle
          >
        </CardHeader>
        <CardContent class="flex flex-col gap-3 overflow-y-auto">
          <div
            v-for="d in suspiciousDetections"
            :key="d.title"
            :class="['rounded-xl border p-4', d.borderColor, d.bgColor, 'mb-2']"
          >
            <div class="flex items-center justify-between mb-1">
              <span
                :class="
                  'font-semibold text-lg ' +
                  (d.level === 'CRITICAL'
                    ? 'text-red-700'
                    : d.level === 'HIGH'
                    ? 'text-orange-700'
                    : 'text-yellow-700')
                "
                >{{ d.title }}</span
              >
              <span
                :class="
                  'px-3 py-1 rounded-full text-xs font-bold text-white ' +
                  d.levelColor
                "
                >{{ d.level }}</span
              >
            </div>
            <div class="text-sm text-gray-700 mb-1">{{ d.desc }}</div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ d.time }}</span>
              <span>{{ d.meta }}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="pt-0">
          <div>
            <div class="font-semibold text-sm text-gray-800">
              Detection Algorithms:
            </div>
            <ul class="space-y-1 text-sm">
              <li
                v-for="algo in detectionAlgos"
                :key="algo"
                class="flex items-center gap-2"
              >
                <span
                  class="w-2 h-2 rounded-full bg-blue-500 inline-block"
                ></span>
                <span>{{ algo }}</span>
              </li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        v-if="userRole === 'law_enforcement'"
        class="shadow-none h-full flex flex-col md:col-span-1"
      >
        <CardHeader class="flex items-center gap-2">
          <CardTitle class="text-base font-bold flex items-center gap-2">
            Proactive Mitigation Panel
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <div class="flex flex-col gap-3">
            <Button
              v-for="(action, i) in mitigationActions"
              :key="action.label"
              :class="[
                'rounded-xl text-white text-sm flex items-center justify-center gap-2 py-5 w-full min-h-[56px] shadow-none border-none transition-all',
              ]"
              size="lg"
            >
              <component :is="action.icon" class="w-6 h-6" />
              {{ action.label }}
            </Button>
          </div>
          <hr />
          <div>
            <div class="font-semibold text-gray-800 mb-2">Recent Actions:</div>
            <ul class="space-y-1">
              <li
                v-for="(item, i) in recentMitigations"
                :key="i"
                class="flex items-center gap-2 text-sm"
              >
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card
        v-if="userRole === 'law_enforcement'"
        class="shadow-none h-full flex flex-col md:col-span-2 max-h-[480px]"
      >
        <CardHeader class="flex items-center gap-2">
          <CardTitle class="text-base font-bold flex items-center gap-2">
            Operational Intelligence Feed
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-2 overflow-y-auto">
          <div
            v-for="(item, i) in intelFeed"
            :key="i"
            :class="['rounded-lg border p-3', item.color, item.border]"
          >
            <div class="flex justify-between items-center">
              <span
                v-if="item.title"
                :class="'font-semibold text-sm' + item.text"
                >{{ item.title }}</span
              >
              <span v-if="item.time" class="text-xs text-gray-500">{{
                item.time
              }}</span>
            </div>
            <div
              :class="[
                item.title ? 'text-sm' : 'font-medium text-base',
                item.text,
                'mb-1',
              ]"
            >
              {{ item.message }}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      <div class="md:col-span-2 h-full">
        <Table
          :columns="columns"
          :rows="paginatedRows"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          :toggle-sort="toggleSort"
        >
          <template #header>
            <TableHeader
              title="Connected Devices"
              v-model="search"
              @export="exportData"
              ><Button
                @click="$emit('export')"
                class="flex items-center gap-1 px-3 py-2 bg-gray-100 shadow-none rounded-md text-sm text-primary hover:bg-gray-300"
              >
                <RefreshCcw class="w-4 h-4 text-gray-700" />
                <span class="text-gray-700 hidden md:block">Refresh</span>
              </Button></TableHeader
            >
          </template>
          <template #cell-signal_strength="{ row }">
            <div class="flex flex-col items-center">
              <span
                class="text-sm font-medium"
                :class="{
                  'text-green-700': row.signal_strength > 75,
                  'text-yellow-700':
                    row.signal_strength > 40 && row.signal_strength <= 75,
                  'text-red-700': row.signal_strength <= 40,
                }"
              >
                {{ row.signal_strength }}%
              </span>
              <SignalHigh
                v-if="row.signal_strength > 75"
                class="text-green-500"
              />
              <SignalMedium
                v-else-if="row.signal_strength > 40"
                class="text-yellow-500"
              />
              <SignalLow v-else class="text-red-500" />
            </div>
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
      <div class="h-full flex flex-col">
        <Card class="h-full flex flex-col shadow-none">
          <CardHeader>
            <CardTitle>Band Configuration</CardTitle>
            <CardDescription>Select active frequency bands</CardDescription>
          </CardHeader>
          <CardContent class="flex flex-col gap-4 flex-1">
            <div
              class="flex flex-col gap-2"
              v-for="group in allBands"
              :key="group.group"
            >
              <HoverCard>
                <HoverCardTrigger as-child
                  ><div class="font-semibold mb-2">
                    {{ group.group }} Bands
                  </div></HoverCardTrigger
                >
                <HoverCardContent>
                  <h5 class="text-md font-semibold">{{ group.group }}</h5>
                  <p class="text-sm text-gray-500">
                    {{ group.short_description }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ group.description }}
                  </p>
                </HoverCardContent>
              </HoverCard>

              <div class="flex flex-wrap gap-1">
                <Button
                  v-for="band in group.bands"
                  :key="band"
                  :variant="
                    selectedBands.includes(band) ? 'default' : 'outline'
                  "
                  class="p-3 text-sm"
                  @click="toggleBand(band)"
                >
                  {{ band }}
                </Button>
              </div>
            </div>
            <Button
              class="w-full mt-auto"
              variant="default"
              :disabled="!isChanged"
              @click="saveConfig"
            >
              Save Configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</template>

<style scoped>
.alert-ticker-container {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  background: transparent;
  position: relative;
  height: 100px;
}
.alert-ticker-track {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  width: fit-content;
  animation: ticker-scroll 30s linear infinite;
}
@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
