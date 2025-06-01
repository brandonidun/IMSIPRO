<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, reactive } from "vue";
import PageIntroduction from "@/components/PageIntroduction.vue";
import { Cctv, CloudCog, LocateFixed } from "lucide-vue-next";
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
</script>

<template>
  <div>
    <PageIntroduction
      :title="`Tracker #${device?.IMSI.slice(-3)}`"
      :description="`Details for device ${device?.idTag} and IMSI ${device?.IMSI} configuration`"
      :icon="Cctv"
    />
    <div class="p-10">
      <Card class="p-4">
        <CardTitle class="font-semibold">Advanced Configuration</CardTitle>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Network Settings -->
          <div class="bg-white dark:bg-muted rounded-xl p-6 border">
            <div class="flex items-center gap-2 mb-4">
              <CloudCog />
              <span class="text-lg font-semibold">Network Settings</span>
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
            class="flex flex-col justify-between bg-white dark:bg-muted rounded-xl p-6 border"
          >
            <div class="flex items-center gap-2 mb-4">
              <LocateFixed />
              <span class="text-lg font-semibold">Tracking Settings</span>
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
  </div>
</template>
