<script setup>
import {
  AlertTriangle,
  ShieldAlert,
  RefreshCcw,
  Shield,
  MapPin,
  ShieldCheck,
  Wifi,
} from "lucide-vue-next";
import PageIntroduction from "~/components/PageIntroduction.vue";
import { ref, computed } from "vue";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardContent as ShadCardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const riskLevels = [
  {
    label: "Critical",
    color: "bg-red-500",
    dot: "bg-red-500",
    value: "CRITICAL",
  },
  {
    label: "High",
    color: "bg-orange-500",
    dot: "bg-orange-500",
    value: "HIGH",
  },
  {
    label: "Medium",
    color: "bg-yellow-400",
    dot: "bg-yellow-400",
    value: "MEDIUM",
  },
];

const allThreats = [
  {
    id: 1,
    type: "Burner Phone Cluster",
    risk: "MEDIUM",
    location: "Jamestown",
    detected: "Just now",
    desc: "New threat detected",
  },
  {
    id: 2,
    type: "Cross-Border SIM",
    risk: "HIGH",
    location: "Kaneshi",
    detected: "Just now",
    desc: "New threat detected",
  },
  {
    id: 3,
    type: "Network Downgrade",
    risk: "CRITICAL",
    location: "Maamobi",
    detected: "Just now",
    desc: "New threat detected",
  },
  {
    id: 4,
    type: "Cross-Border SIM",
    risk: "CRITICAL",
    location: "Kaneshe",
    detected: "Just now",
    desc: "New threat detected",
  },
];

const threatFilter = ref("All Threats");
const selectedThreatId = ref(null);
const filteredThreats = computed(() => {
  if (threatFilter.value === "All Threats") return allThreats;
  return allThreats.filter((t) => t.risk === threatFilter.value.toUpperCase());
});
const selectedThreat = computed(() =>
  allThreats.find((t) => t.id === selectedThreatId.value)
);
function selectThreat(id) {
  selectedThreatId.value = id;
}
function refreshThreats() {
  // Placeholder for refresh logic
}
function mitigateThreat() {
  // Placeholder for mitigation logic
}

// Detection Algorithm Config state
const burnerEnabled = ref(true);
const burnerRadius = ref([500]);
const burnerTime = ref([5]);
const burnerThreshold = ref([5]);
const downgradeEnabled = ref(true);
const downgradeZones = ref(["Banking Areas"]);
const downgradeSensitivity = ref("High (All downgrades)");
const downgradeZoneOptions = [
  "Government Buildings",
  "Banking Areas",
  "Airport Perimeter",
  "Military Installations",
  "Embassy Zones",
];
const crossBorderEnabled = ref(true);
const crossBorderCarriers = ref([
  "Togo (Togocel, Moov)",
  `Côte d'Ivoire (MTN, Orange)`,
]);
const crossBorderCarrierOptions = [
  "Togo (Togocel, Moov)",
  `Côte d'Ivoire (MTN, Orange)`,
  "Burkina Faso (Telecel, Airtel)",
  "All Foreign Carriers",
];
const crossBorderThreshold = ref("Single Detection");
const crossBorderThresholdOptions = ["Single Detection", "Multiple Detections"];
function saveDetectionConfig() {
  // Save logic here
}
definePageMeta({
  breadcrumb: "Threat Radar",
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <PageIntroduction
      title="Threat Radar"
      description="Monitor and analyze threats in real-time"
      :icon="AlertTriangle"
      ><Button
        @click="refreshThreats"
        class="px-4 py-2 flex items-center gap-2"
      >
        <RefreshCcw class="w-4 h-4" /> Refresh
      </Button></PageIntroduction
    >
    <!-- Top bar -->
    <div
      class="flex items-center justify-between bg-white rounded-xl px-6 py-5 border"
    >
      <div class="flex items-center gap-6">
        <span
          v-for="level in riskLevels"
          :key="level.label"
          class="flex items-center gap-1 text-base"
        >
          <span :class="['w-3 h-3 rounded-full', level.dot]"></span>
          <span>{{ level.label }}</span>
        </span>
      </div>
      <Button class="font-semibold px-5 py-2 rounded-lg">Auto Detection</Button>
    </div>
    <!-- Main content -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Threat Details -->
      <Card
        class="col-span-1 bg-gray-50 max-h-[400px] flex flex-col align-start justify-start shadow-none"
      >
        <CardHeader>
          <CardTitle class="text-base font-semibold">Threat Details</CardTitle>
        </CardHeader>
        <CardContent>
          <template v-if="!selectedThreat">
            <div class="text-gray-500 text-sm">
              Select a threat from the radar or list to view details
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-1">
              <div>
                <span class="text-sm text-gray-500">Type</span><br />
                <span class="font-semibold text-sm">{{
                  selectedThreat.type
                }}</span>
              </div>
              <div>
                <span class="text-sm text-gray-500">Risk Level</span><br />
                <span class="font-bold text-sm flex items-center gap-2">
                  <span
                    :class="[
                      'w-3 h-3 rounded-full',
                      riskLevels.find((l) => l.value === selectedThreat.risk)
                        ?.dot,
                    ]"
                  ></span>
                  <span>{{ selectedThreat.risk }}</span>
                </span>
              </div>
              <div>
                <span class="text-sm text-gray-500">Location</span><br />
                <span class="text-sm font-semibold">{{
                  selectedThreat.location
                }}</span>
              </div>
              <div>
                <span class="text-sm text-gray-500">First Detected</span><br />
                <span class="font-semibold text-sm">{{
                  selectedThreat.detected
                }}</span>
              </div>
              <div>
                <span class="text-sm text-gray-500">Device Count</span><br />
                <span class="font-semibold text-sm">2</span>
              </div>
              <Button
                v-if="selectedThreat.risk === 'CRITICAL'"
                class="bg-red-500 hover:bg-red-600 text-white font-semibold mt-4 w-full flex items-center gap-2 justify-center"
              >
                <ShieldAlert class="w-5 h-5" />
                Mitigate Threat
              </Button>
            </div>
          </template>
        </CardContent>
      </Card>
      <!-- Active Threats -->
      <div class="col-span-2 flex flex-col gap-4 max-h-[400px]">
        <div class="flex items-center justify-between">
          <div class="text-base font-semibold">Active Threats</div>
          <div class="flex items-center gap-2">
            <Select v-model="threatFilter">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tracking Interval</SelectLabel>
                  <SelectItem value="All Threats">All Threats</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Card class="px-3 py-3 max-h-86 shadow-none border-1">
          <div class="overflow-auto flex flex-col gap-3 p-1">
            <div
              v-for="threat in filteredThreats"
              :key="threat.id"
              @click="selectThreat(threat.id)"
              :class="[
                'rounded-xl border cursor-pointer transition-all',
                threat.risk === 'CRITICAL'
                  ? 'border-red-200 bg-red-50'
                  : threat.risk === 'HIGH'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-yellow-200 bg-yellow-50',
                selectedThreatId === threat.id && threat.risk === 'CRITICAL'
                  ? 'ring-2 ring-red-400'
                  : selectedThreatId === threat.id && threat.risk === 'HIGH'
                  ? 'ring-2 ring-orange-400'
                  : selectedThreatId === threat.id && threat.risk === 'MEDIUM'
                  ? 'ring-2 ring-yellow-400'
                  : '',
                'p-5 flex flex-col gap-1',
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">{{ threat.type }}</span>
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-bold',
                    threat.risk === 'CRITICAL'
                      ? 'bg-red-500 text-white'
                      : threat.risk === 'HIGH'
                      ? 'bg-orange-400 text-white'
                      : 'bg-yellow-400 text-white',
                  ]"
                >
                  {{ threat.risk }}
                </span>
              </div>
              <div class="text-gray-600">{{ threat.desc }}</div>
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>{{ threat.detected }}</span>
                <span>{{ threat.location }}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <!-- Add Detection Algorithm Configuration card below the grid -->
    <Card class="shadow-none border-1 bg-gray-50">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-xl font-bold">
          Detection Algorithm Configuration
          <div class="flex justify-end ml-auto">
            <Button
              class="text-white font-semibold px-6 py-2 rounded-lg"
              @click="saveDetectionConfig"
            >
              Save Configuration
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Burner Phone Detection -->
          <Card class="p-4 flex flex-col gap-2 border shadow-none">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold text-base"
                >Burner Phone Detection</span
              >
              <Switch v-model="burnerEnabled" class="ml-auto" />
            </div>
            <div class="text-sm text-gray-600 mb-2">
              Detects clusters of new IMSI/IMEI pairs in a small area/timeframe
            </div>
            <div>
              <div class="font-medium text-xs mb-1">Radius (meters)</div>
              <Slider
                v-model="burnerRadius"
                :min="100"
                :max="1000"
                :step="50"
              />
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>100m</span><span>500m</span><span>1000m</span>
              </div>
            </div>
            <div class="mb-2">
              <div class="font-medium text-xs mb-1">Timeframe (minutes)</div>
              <Slider v-model="burnerTime" :min="5" :max="60" :step="5" />
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>5min</span><span>10min</span><span>60min</span>
              </div>
            </div>
            <div>
              <div class="font-medium text-xs mb-1">Threshold (devices)</div>
              <Input
                v-model="burnerThreshold"
                type="number"
                min="1"
                class="w-24"
              />
            </div>
          </Card>
          <!-- Network Downgrade -->
          <Card class="p-4 flex flex-col gap-2 border shadow-none">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold text-base">Network Downgrade</span>
              <Switch v-model="downgradeEnabled" class="ml-auto" />
            </div>
            <div class="text-sm text-gray-600 mb-2">
              Alerts when devices transition from 4G to 2G in secure zones
            </div>
            <div class="mb-2">
              <div class="font-medium text-xs mb-1">Secure Zones</div>
              <select
                v-model="downgradeZones"
                multiple
                class="w-full border rounded p-1 text-sm min-h-[80px]"
              >
                <option
                  v-for="zone in downgradeZoneOptions"
                  :key="zone"
                  :value="zone"
                >
                  {{ zone }}
                </option>
              </select>
            </div>
            <div>
              <div class="font-medium text-xs mb-1">Sensitivity</div>
              <Select v-model="downgradeSensitivity">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select sensitivity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High (All downgrades)"
                    >High (All downgrades)</SelectItem
                  >
                  <SelectItem value="Medium (Secure zones only)"
                    >Medium (Secure zones only)</SelectItem
                  >
                  <SelectItem value="Low (Critical only)"
                    >Low (Critical only)</SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
          </Card>
          <!-- Cross-Border SIM -->
          <Card class="p-4 flex flex-col gap-2 border shadow-none">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold text-base">Cross-Border SIM</span>
              <Switch v-model="crossBorderEnabled" class="ml-auto" />
            </div>
            <div class="text-sm text-gray-600 mb-2">
              Identifies foreign carrier SIM cards appearing in monitored areas
            </div>
            <div class="mb-2">
              <div class="font-medium text-xs mb-1">Monitored Carriers</div>
              <select
                v-model="crossBorderCarriers"
                multiple
                class="w-full border rounded p-1 text-sm min-h-[80px]"
              >
                <option
                  v-for="carrier in crossBorderCarrierOptions"
                  :key="carrier"
                  :value="carrier"
                >
                  {{ carrier }}
                </option>
              </select>
            </div>
            <div>
              <div class="font-medium text-xs mb-1">Alert Threshold</div>
              <Select v-model="crossBorderThreshold">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="opt in crossBorderThresholdOptions"
                    :key="opt"
                    :value="opt"
                    >{{ opt }}</SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  </main>
</template>

<style scoped></style>
