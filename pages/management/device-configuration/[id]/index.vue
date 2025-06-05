<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, reactive } from "vue";
import PageIntroduction from "@/components/PageIntroduction.vue";
import {
  Cctv,
  CloudCog,
  LocateFixed,
  Lock,
  AlertTriangle,
  Key,
  Shield,
} from "lucide-vue-next";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { StatCard } from "~/components/Card";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// For demo, import or define deviceLocations here. In real app, fetch from store or API.
interface DeviceLocation {
  id: number;
  name: string;
  IMSI: string;
  // Add other properties as needed
}

const deviceLocations = [
  {
    id: 1,
    idTag: "SC-001",
    name: "Scooter 1",
    lat: 5.56,
    lng: -0.205,
    IMEI: "356789012345678",
    IMSI: "310150123456789",
    phone_number: "+2334567890",
    network: "AT&T",
    signal_strength: 90,
    band: "Band 1",
    optional: { active: 1 },
    status: "active",
    type: "portable",
  },
  {
    id: 2,
    idTag: "SC-002",
    name: "Scooter 2",
    lat: 5.675,
    lng: -0.01,
    IMEI: "356789098765432",
    IMSI: "310260987654321",
    phone_number: "+2334567891",
    network: "T-Mobile",
    signal_strength: 60,
    band: "Band 3",
    optional: { active: 1 },
    status: "inactive",
    type: "vehicle",
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
    status: "active",
    type: "fixed",
  },
  {
    id: 4,
    idTag: "SC-004",
    name: "Scooter 4",
    lat: 5.59,
    lng: -0.22,
    IMEI: "356789055667788",
    IMSI: "310120556677889",
    phone_number: "+2334567893",
    network: "Sprint",
    signal_strength: 80,
    band: "Band 8",
    optional: { active: 1 },
    status: "active",
    type: "vehicle",
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
    status: "inactive",
    type: "portable",
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
    status: "maintenance",
    type: "fixed",
  },
  {
    id: 7,
    idTag: "SC-007",
    name: "Scooter 7",
    lat: 5.62,
    lng: -0.22,
    IMEI: "356789044556677",
    IMSI: "310120556677882",
    phone_number: "+2334567896",
    network: "AirtelTigo",
    signal_strength: 65,
    band: "Band 40",
    optional: { active: 1 },
    status: "active",
    type: "vehicle",
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
    status: "inactive",
    type: "portable",
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
    status: "maintenance",
    type: "fixed",
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
    status: "active",
    type: "vehicle",
  },
];
const selectedBands = ref<string[]>([]);
const savedBands = ref<string[]>([]);
const isChanged = computed(
  () => JSON.stringify(selectedBands.value) !== JSON.stringify(savedBands.value)
);
const selectedType = ref<string>("");
const searchQuery = ref("");
const filteredData = computed(() => {
  let data = deviceLocations;
  if (savedBands.value.length) {
    data = data.filter((d) => savedBands.value.includes(d.band));
  }
  if (selectedType.value) {
    data = data.filter((d) => d.type === selectedType.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    data = data.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.idTag.toLowerCase().includes(q) ||
        d.IMEI.toLowerCase().includes(q) ||
        d.IMSI.toLowerCase().includes(q) ||
        d.phone_number.toLowerCase().includes(q)
    );
  }
  return data;
});
const deviceCards = computed(() => filteredData.value.slice(0, 6)); // Example: show first 6

const route = useRoute();
const deviceId = computed(() => Number(route.params.id));
const device = computed(() =>
  deviceLocations.find((d) => d.id === deviceId.value)
);

const networkForm = reactive({
  mode: "4G LTE Preferred",
  apn: "internet",
  ip: "192.168.1.1",
});
const trackingForm = reactive({
  interval: "1 minute",
  accuracy: "high",
  geofencing: false,
});

function saveNetworkSettings() {
  // Save logic here
}
function saveTrackingSettings() {
  // Save logic here
}

const statCards = [
  {
    title: "Security Level",
    value: "High",
    valueClass: "text-green-600",
    icon: Lock,
    iconBg: "bg-green-100",
    subtext: "All critical protections enabled",
    progress: "full",
    progressClass: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    title: "Active Threats",
    value: "2",
    valueClass: "text-red-500",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    subtext: "1 spoofing attempt, 1 MITM detected",
    progress: null,
  },
  {
    title: "Encryption",
    value: "AES-256",
    valueClass: "text-purple-500",
    icon: Key,
    iconBg: "bg-purple-100",
    subtext: "Military-grade encryption",
    progress: "dots",
  },
];

const spoofingSensitivity = ref("medium");
const mitmSensitivity = ref("medium");
const ddosSensitivity = ref("low");
const trackingProtection = ref("high");
const realTimeMonitoring = ref(true);
const automaticBlocking = ref(true);
const anomalyDetection = ref(false);
const encryptionMethod = ref("aes-256");
const keyRotation = ref("Monthly");
const keyStorage = ref("HSM");
const keyLength = ref("256-bit");
const secureProtocols = ref(["TLS 1.2", "TLS 1.3", "SRTP"]);
const protocolOptions = ["TLS 1.2", "TLS 1.3", "IPSec", "SRTP"];

function onProtocolCheck(protocol: string, checked: boolean) {
  if (checked && !secureProtocols.value.includes(protocol)) {
    secureProtocols.value = [...secureProtocols.value, protocol];
  } else if (!checked && secureProtocols.value.includes(protocol)) {
    secureProtocols.value = secureProtocols.value.filter((p) => p !== protocol);
  }
}

// Add these arrays to <script setup>
const statCardsRow = [
  { title: "Security Level", value: "High", icon: Lock, color: "green" },
  { title: "Active Threats", value: "2", icon: AlertTriangle, color: "red" },
  { title: "Encryption", value: "AES-256", icon: Key, color: "purple" },
];

const detectionSensitivities = [
  {
    label: "Spoofing Detection",
    model: spoofingSensitivity,
  },
  {
    label: "MITM Detection",
    model: mitmSensitivity,
  },
  {
    label: "DDoS Detection",
    model: ddosSensitivity,
  },
  {
    label: "Tracking Protection",
    model: trackingProtection,
  },
];

const keyManagementOptions = [
  {
    label: "Key Rotation",
    model: keyRotation,
    items: ["Monthly", "Quarterly", "Yearly"],
  },
  {
    label: "Key Storage",
    model: keyStorage,
    items: ["HSM", "TPM", "Software"],
  },
  {
    label: "Key Length",
    model: keyLength,
    items: ["128-bit", "256-bit", "384-bit"],
  },
];

const encryptionMethods = [
  { key: "aes-128", label: "AES-128", desc: "Standard encryption", icon: Key },
  { key: "aes-256", label: "AES-256", desc: "Military-grade", icon: Key },
  { key: "rsa-2048", label: "RSA-2048", desc: "Asymmetric", icon: Shield },
  { key: "ecc-384", label: "ECC-384", desc: "Elliptic curve", icon: Shield },
];

const toggles = [
  {
    label: "Real-time Monitoring",
    desc: "Continuous spectrum analysis",
    model: realTimeMonitoring,
  },
  {
    label: "Automatic Blocking",
    desc: "Block detected threats",
    model: automaticBlocking,
  },
  {
    label: "Anomaly Detection",
    desc: "AI-powered behavior analysis",
    model: anomalyDetection,
  },
];
</script>

<template>
  <main class="flex flex-col gap-4 p-4">
    <PageIntroduction
      :title="`Catcher #${device?.IMSI.slice(-3)}`"
      :description="`Details for device ${device?.idTag} and IMSI ${device?.IMSI} configuration`"
      :icon="Cctv"
    />
    <!-- Stat Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <StatCard
        v-for="card in statCardsRow"
        :key="card.title"
        :title="card.title"
        :value="card.value"
        :icon="card.icon"
        :color="card.color"
      />
    </div>
    <div>
      <Card class="p-4 shadow-none bg-muted/50">
        <CardTitle
          class="flex items-center justify-center text-lg font-semibold text-center"
          >Advanced Configuration</CardTitle
        >
        <Separator />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Network Settings -->
          <div class="dark:bg-muted rounded-xl p-6 border-none bg-muted/50">
            <div class="flex items-center gap-2 mb-4">
              <CloudCog />
              <span class="text-base font-semibold">Network Settings</span>
            </div>
            <form @submit.prevent="saveNetworkSettings">
              <FormField v-slot="{ componentField }" :name="'mode'">
                <FormItem>
                  <FormLabel>Network Mode</FormLabel>
                  <FormControl>
                    <Select v-model="networkForm.mode">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select network mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Network Mode</SelectLabel>
                          <SelectItem value="4G LTE Preferred"
                            >4G LTE Preferred</SelectItem
                          >
                          <SelectItem value="3G Only">3G Only</SelectItem>
                          <SelectItem value="2G Only">2G Only</SelectItem>
                          <SelectItem value="Auto">Auto</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="'apn'">
                <FormItem>
                  <FormLabel>APN Configuration</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter APN"
                      v-model="networkForm.apn"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="'ip'">
                <FormItem>
                  <FormLabel>IP Address</FormLabel>
                  <FormControl>
                    <Input
                      v-model="networkForm.ip"
                      v-bind="componentField"
                      placeholder="192.168.1.0"
                      disabled
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <Button type="submit" class="w-full mt-4"
                >Save Network Settings</Button
              >
            </form>
          </div>
          <!-- Tracking Settings -->
          <div
            class="flex flex-col justify-between bg-muted/50 dark:bg-muted rounded-xl p-6 border-none"
          >
            <div class="flex items-center gap-2 mb-4">
              <LocateFixed />
              <span class="text-base font-semibold">Tracking Settings</span>
            </div>
            <form @submit.prevent="saveTrackingSettings">
              <FormField v-slot="{ componentField }" :name="'interval'">
                <FormItem>
                  <FormLabel>Tracking Interval</FormLabel>
                  <FormControl>
                    <Select v-model="trackingForm.interval">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tracking Interval</SelectLabel>
                          <SelectItem value="30 seconds">30 seconds</SelectItem>
                          <SelectItem value="1 minute">1 minute</SelectItem>
                          <SelectItem value="5 minutes">5 minutes</SelectItem>
                          <SelectItem value="10 minutes">10 minutes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="'accuracy'">
                <FormItem>
                  <FormLabel>GPS Accuracy</FormLabel>
                  <FormControl>
                    <Select v-model="trackingForm.accuracy">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select accuracy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>GPS Accuracy</SelectLabel>
                          <SelectItem value="high"
                            >High (Best accuracy)</SelectItem
                          >
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low"
                            >Low (Battery saving)</SelectItem
                          >
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="'geofencing'">
                <FormItem>
                  <FormLabel>Enable Geofencing</FormLabel>
                  <FormControl>
                    <Checkbox
                      v-model="trackingForm.geofencing"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <Button type="submit" class="w-full mt-4"
                >Save Tracking Settings</Button
              >
            </form>
          </div>
        </div>
      </Card>
    </div>
    <Card class="p-6 shadow-none bg-muted/50 rounded-2xl">
      <CardTitle class="text-lg font-semibold mb-1">Threat Detection</CardTitle>
      <CardDescription class="mb-6">
        Configure real-time threat detection settings
      </CardDescription>

      <!-- Active Threat Alerts -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- IMSI Spoofing Attempt -->
        <div class="flex-1 border-2 border-red-200 bg-red-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-1">
            <span class="text-red-600 font-semibold"
              >IMSI Spoofing Attempt</span
            >
            <span
              class="bg-red-500/90 text-white text-xs px-3 py-1 rounded-full font-bold"
              >CRITICAL</span
            >
          </div>
          <div class="text-xs text-gray-500 mb-2">
            Detected from device ID: 38:7A:0B:EF
          </div>
          <div class="flex justify-between text-xs text-gray-500">
            <span>2 min ago</span>
            <span>Signal strength: -85 dBm</span>
          </div>
        </div>
        <!-- MITM Attack -->
        <div
          class="flex-1 border-2 border-orange-200 bg-orange-50 rounded-xl p-4"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-orange-600 font-semibold">MITM Attack</span>
            <span
              class="bg-orange-400 text-white text-xs px-3 py-1 rounded-full font-bold"
              >HIGH</span
            >
          </div>
          <div class="text-xs text-gray-500 mb-2">
            Detected on frequency: 1800 MHz
          </div>
          <div class="flex justify-between text-xs text-gray-500">
            <span>15 min ago</span>
            <span>Signal strength: -72 dBm</span>
          </div>
        </div>
      </div>

      <!-- Detection Sensitivity -->
      <div>
        <div class="font-semibold text-gray-700 mb-2">
          Detection Sensitivity
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div v-for="(s, i) in detectionSensitivities" :key="s.label">
            <div class="text-sm font-medium mb-1">{{ s.label }}</div>
            <Select v-model="s.model.value">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Toggles -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          v-for="toggle in toggles"
          :key="toggle.label"
          class="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3"
        >
          <Switch v-model="toggle.model.value" />
          <div>
            <div class="font-medium">{{ toggle.label }}</div>
            <div class="text-xs text-gray-500">{{ toggle.desc }}</div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <Button>Save Detection Settings</Button>
      </div>
    </Card>
    <Card class="p-6 shadow-none bg-muted/50 rounded-2xl mt-6">
      <CardTitle class="flex items-center gap-2 text-lg font-semibold mb-1">
        Encryption Settings
      </CardTitle>
      <CardDescription class="mb-6">
        Configure data encryption and secure communication
      </CardDescription>

      <!-- Encryption Method -->
      <div>
        <div class="font-semibold text-gray-700 mb-2">Encryption Method</div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button
            v-for="method in encryptionMethods"
            :key="method.key"
            @click="encryptionMethod = method.key"
            :class="[
              'flex flex-col items-center justify-center rounded-xl border-2 p-4 transition',
              encryptionMethod === method.key
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 bg-white dark:bg-muted',
            ]"
            type="button"
          >
            <component :is="method.icon" class="w-7 h-7 mb-2" />
            <div class="font-semibold">{{ method.label }}</div>
            <div class="text-xs text-gray-500">{{ method.desc }}</div>
          </button>
        </div>
      </div>

      <!-- Key Management -->
      <div class="mb-6">
        <div class="font-semibold text-gray-700 mb-2">Key Management</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div v-for="option in keyManagementOptions" :key="option.label">
            <div class="text-sm font-medium mb-1">{{ option.label }}</div>
            <Select v-model="option.model.value">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="item in option.items"
                  :key="item"
                  :value="item"
                  >{{ item }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" class="flex items-center gap-2">
            <Key class="w-4 h-4" /> Generate New Key
          </Button>
          <Button variant="outline" class="flex items-center gap-2">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
            </svg>
            Export Key
          </Button>
          <Button variant="outline" class="flex items-center gap-2">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
            </svg>
            Import Key
          </Button>
        </div>
      </div>

      <!-- Secure Protocols -->
      <div class="mb-6">
        <div class="font-semibold text-gray-700 mb-2">Secure Protocols</div>
        <div class="flex flex-wrap gap-2">
          <FormField
            v-for="protocol in protocolOptions"
            :key="protocol"
            type="checkbox"
            :name="protocol"
            v-slot="{ value, handleChange }"
          >
            <FormItem
              class="flex flex-row items-center gap-x-2 rounded-md border p-2 shadow-none"
            >
              <FormControl>
                <Checkbox
                  :model-value="secureProtocols.includes(protocol)"
                  @update:model-value="
                    onProtocolCheck(protocol, $event === true)
                  "
                  class="accent-blue-600"
                />
                <FormLabel class="font-medium">{{ protocol }}</FormLabel>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>

      <div class="flex justify-end">
        <Button>Save Encryption Settings</Button>
      </div>
    </Card>
  </main>
</template>
