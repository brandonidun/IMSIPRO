<script setup lang="ts">
import {
  Cog,
  Monitor,
  MonitorCheck,
  MonitorX,
  MonitorCog,
  Eye,
  Pencil,
  Trash,
} from "lucide-vue-next";
import { StatCard } from "~/components/Card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

definePageMeta({
  breadcrumb: "Device Configuration",
});

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
const activeDeviceCards = computed(() =>
  deviceCards.value.filter((device) => device.status === "active")
);
const inactiveDeviceCards = computed(() =>
  deviceCards.value.filter((device) => device.status === "inactive")
);
const maintenanceDeviceCards = computed(() =>
  deviceCards.value.filter((device) => device.status === "maintenance")
);
const showAddDeviceDialog = ref(false);
const editingDeviceIndex = ref<number | null>(null);
const newDevice = ref({
  idTag: "",
  name: "",
  type: "",
  IMEI: "",
  IMSI: "",
  phone_number: "",
  network: "",
  signal_strength: 0,
  band: "",
  status: "",
  lat: 0,
  lng: 0,
} as Record<string, any>);

function openEditDevice(device: Record<string, any>, index: number) {
  editingDeviceIndex.value = index;
  Object.assign(newDevice.value, { ...device });
  showAddDeviceDialog.value = true;
}

function addDevice() {
  if (editingDeviceIndex.value !== null) {
    // Update existing device
    deviceLocations[editingDeviceIndex.value] = {
      ...deviceLocations[editingDeviceIndex.value], // preserve all existing fields
      ...newDevice.value, // overwrite with new values
      id: deviceLocations[editingDeviceIndex.value].id, // explicitly preserve id
      optional: deviceLocations[editingDeviceIndex.value].optional, // explicitly preserve optional
    };
  } else {
    // Add new device
    deviceLocations.push({
      id: deviceLocations.length + 1,
      idTag: newDevice.value.idTag,
      name: newDevice.value.name,
      type: newDevice.value.type,
      IMEI: newDevice.value.IMEI,
      IMSI: newDevice.value.IMSI,
      phone_number: newDevice.value.phone_number,
      network: newDevice.value.network,
      signal_strength: newDevice.value.signal_strength,
      band: newDevice.value.band,
      status: newDevice.value.status,
      lat: newDevice.value.lat,
      lng: newDevice.value.lng,
      optional: { active: 1 },
    });
  }
  showAddDeviceDialog.value = false;
  editingDeviceIndex.value = null;
  Object.assign(newDevice.value, {
    idTag: "",
    name: "",
    type: "",
    IMEI: "",
    IMSI: "",
    phone_number: "",
    network: "",
    signal_strength: 0,
    band: "",
    status: "",
    lat: 0,
    lng: 0,
  });
}
</script>
<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <PageIntroduction
      title="Device Configuration"
      description="Configure the device settings, frequency bands, and other settings."
      :icon="Cog"
    >
      <Dialog v-model:open="showAddDeviceDialog">
        <DialogTrigger as-child>
          <Button class="bg-[#192a3b]">+ Add New Device</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{{
              editingDeviceIndex !== null ? "Edit Device" : "Add New Device"
            }}</DialogTitle>
            <DialogDescription>
              Enter all the details for the new device below. Click Add Device
              when done.
            </DialogDescription>
          </DialogHeader>
          <form @submit.prevent="addDevice">
            <div class="grid gap-4 py-4">
              <FormField v-slot="{ componentField }" :name="'idTag'">
                <FormItem>
                  <FormLabel>ID Tag</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ID Tag"
                      v-model="newDevice.idTag"
                      v-bind="componentField"
                      required
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="'name'">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      v-model="newDevice.name"
                      v-bind="componentField"
                      required
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
              <div class="grid grid-cols-2 gap-4">
                <FormField v-slot="{ componentField }" :name="'type'">
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select v-model="newDevice.type">
                        <SelectTrigger class="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="portable">Portable</SelectItem>
                            <SelectItem value="fixed">Fixed</SelectItem>
                            <SelectItem value="vehicle">Vehicle</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" :name="'status'">
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select v-model="newDevice.status">
                        <SelectTrigger class="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="maintenance"
                              >Maintenance</SelectItem
                            >
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <FormField v-slot="{ componentField }" :name="'band'">
                <FormItem>
                  <FormLabel>Band</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Band"
                      v-model="newDevice.band"
                      v-bind="componentField"
                      required
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <DialogFooter>
              <Button type="submit">{{
                editingDeviceIndex !== null ? "Save Changes" : "Add Device"
              }}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageIntroduction>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <StatCard title="Devices" value="28" :icon="Monitor" color="blue" />
      <StatCard
        title="Active Devices"
        value="23"
        :icon="MonitorCheck"
        color="blue"
      />
      <StatCard
        title="Inactive Devices"
        value="3"
        :icon="MonitorX"
        color="blue"
      />
      <StatCard title="Maintenance" value="2" :icon="MonitorCog" color="blue" />
    </div>
    <!-- Device Management Card Grid -->
    <Card class="px-6">
      <CardHeader
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full p-0"
      >
        <CardTitle class="text-lg font-semibold">Device Management</CardTitle>
      </CardHeader>
      <div class="flex gap-4">
        <Input
          v-model="searchQuery"
          class="w-3/4"
          type="text"
          placeholder="Search devices..."
        />
        <Select v-model="selectedType">
          <SelectTrigger class="w-1/4">
            <SelectValue placeholder="Select the type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="portable"> Portable </SelectItem>
              <SelectItem value="fixed"> Fixed </SelectItem>
              <SelectItem value="vehicle"> Vehicle </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Tabs default-value="all_devices" class="w-full">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="all_devices">All Devices</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="all_devices">
          <Card class="px-0 shadow-none border-none">
            <CardHeader class="px-0">
              <CardTitle>All Devices</CardTitle>
              <CardDescription>
                All devices are listed here. You can filter by type and status.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2 px-0">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  v-for="(device, index) in deviceCards"
                  :key="device.IMSI"
                  class="shadow-sm border"
                >
                  <CardHeader
                    class="flex flex-row items-center justify-between"
                  >
                    <CardTitle class="text-lg font-semibold"
                      >Tracker #{{ device.IMSI.slice(-3) }}</CardTitle
                    >
                    <span
                      :class="{
                        'bg-green-100 text-green-700':
                          device.status === 'active',
                        'bg-red-100 text-red-700': device.status === 'inactive',
                        'bg-yellow-100 text-yellow-700':
                          device.status === 'maintenance',
                      }"
                      class="text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      {{
                        device.status === "active"
                          ? "Active"
                          : device.status === "inactive"
                          ? "Inactive"
                          : "Maintenance"
                      }}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div class="text-gray-500 text-sm mb-2">
                      Portable Device
                    </div>
                    <div class="flex flex-col gap-1 text-sm">
                      <div class="flex justify-between">
                        <span>Last Seen:</span> <span>2 mins ago</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Battery:</span> <span>N/A</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Signal:</span>
                        <span>{{
                          device.signal_strength > 75
                            ? "Strong"
                            : device.signal_strength > 40
                            ? "Weak"
                            : "No Signal"
                        }}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter class="flex gap-4 pt-2">
                    <div class="flex flex-row gap-1 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="View"
                      >
                        <NuxtLink
                          :to="`/management/device-configuration/${device.id}`"
                        >
                          <Eye class="w-5 h-5" />
                        </NuxtLink>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Edit"
                        @click="openEditDevice(device, index)"
                      >
                        <Pencil class="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Delete"
                      >
                        <Trash class="w-5 h-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card class="px-0 shadow-none border-none">
            <CardHeader class="px-0">
              <CardTitle>Active Devices</CardTitle>
              <CardDescription>
                Only active devices are listed here.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2 px-0">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  v-for="(device, index) in activeDeviceCards"
                  :key="device.IMSI"
                  class="shadow-sm border"
                >
                  <CardHeader
                    class="flex flex-row items-center justify-between"
                  >
                    <CardTitle class="text-lg font-semibold"
                      >Tracker #{{ device.IMSI.slice(-3) }}</CardTitle
                    >
                    <span
                      :class="{
                        'bg-green-100 text-green-700':
                          device.status === 'active',
                        'bg-red-100 text-red-700': device.status === 'inactive',
                        'bg-yellow-100 text-yellow-700':
                          device.status === 'maintenance',
                      }"
                      class="text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      {{
                        device.status === "active"
                          ? "Active"
                          : device.status === "inactive"
                          ? "Inactive"
                          : "Maintenance"
                      }}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div class="text-gray-500 text-sm mb-2">
                      Portable Device
                    </div>
                    <div class="flex flex-col gap-1 text-sm">
                      <div class="flex justify-between">
                        <span>Last Seen:</span> <span>2 mins ago</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Battery:</span> <span>N/A</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Signal:</span>
                        <span>{{
                          device.signal_strength > 75
                            ? "Strong"
                            : device.signal_strength > 40
                            ? "Weak"
                            : "No Signal"
                        }}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter class="flex gap-4 pt-2">
                    <div class="flex flex-row gap-1 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="View"
                      >
                        <NuxtLink
                          :to="`/management/device-configuration/${device.id}`"
                        >
                          <Eye class="w-5 h-5" />
                        </NuxtLink>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Edit"
                        @click="openEditDevice(device, index)"
                      >
                        <Pencil class="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Delete"
                      >
                        <Trash class="w-5 h-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card class="px-0 shadow-none border-none">
            <CardHeader class="px-0">
              <CardTitle>Inactive Devices</CardTitle>
              <CardDescription>
                Only inactive devices are listed here.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2 px-0">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  v-for="(device, index) in inactiveDeviceCards"
                  :key="device.IMSI"
                  class="shadow-sm border"
                >
                  <CardHeader
                    class="flex flex-row items-center justify-between"
                  >
                    <CardTitle class="text-lg font-semibold"
                      >Tracker #{{ device.IMSI.slice(-3) }}</CardTitle
                    >
                    <span
                      :class="{
                        'bg-green-100 text-green-700':
                          device.status === 'active',
                        'bg-red-100 text-red-700': device.status === 'inactive',
                        'bg-yellow-100 text-yellow-700':
                          device.status === 'maintenance',
                      }"
                      class="text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      {{
                        device.status === "active"
                          ? "Active"
                          : device.status === "inactive"
                          ? "Inactive"
                          : "Maintenance"
                      }}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div class="text-gray-500 text-sm mb-2">
                      Portable Device
                    </div>
                    <div class="flex flex-col gap-1 text-sm">
                      <div class="flex justify-between">
                        <span>Last Seen:</span> <span>2 mins ago</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Battery:</span> <span>N/A</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Signal:</span>
                        <span>{{
                          device.signal_strength > 75
                            ? "Strong"
                            : device.signal_strength > 40
                            ? "Weak"
                            : "No Signal"
                        }}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter class="flex gap-4 pt-2">
                    <div class="flex flex-row gap-1 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="View"
                      >
                        <NuxtLink
                          :to="`/management/device-configuration/${device.id}`"
                        >
                          <Eye class="w-5 h-5" />
                        </NuxtLink>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Edit"
                        @click="openEditDevice(device, index)"
                      >
                        <Pencil class="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Delete"
                      >
                        <Trash class="w-5 h-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="maintenance">
          <Card class="px-0 shadow-none border-none">
            <CardHeader class="px-0">
              <CardTitle>Maintenance Devices</CardTitle>
              <CardDescription>
                Only devices under maintenance are listed here.
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2 px-0">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  v-for="(device, index) in maintenanceDeviceCards"
                  :key="device.IMSI"
                  class="shadow-sm border"
                >
                  <CardHeader
                    class="flex flex-row items-center justify-between"
                  >
                    <CardTitle class="text-lg font-semibold"
                      >Tracker #{{ device.IMSI.slice(-3) }}</CardTitle
                    >
                    <span
                      :class="{
                        'bg-green-100 text-green-700':
                          device.status === 'active',
                        'bg-red-100 text-red-700': device.status === 'inactive',
                        'bg-yellow-100 text-yellow-700':
                          device.status === 'maintenance',
                      }"
                      class="text-xs px-3 py-1 rounded-full font-semibold"
                    >
                      {{
                        device.status === "active"
                          ? "Active"
                          : device.status === "inactive"
                          ? "Inactive"
                          : "Maintenance"
                      }}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <div class="text-gray-500 text-sm mb-2">
                      Portable Device
                    </div>
                    <div class="flex flex-col gap-1 text-sm">
                      <div class="flex justify-between">
                        <span>Last Seen:</span> <span>2 mins ago</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Battery:</span> <span>N/A</span>
                      </div>
                      <div class="flex justify-between">
                        <span>Signal:</span>
                        <span>{{
                          device.signal_strength > 75
                            ? "Strong"
                            : device.signal_strength > 40
                            ? "Weak"
                            : "No Signal"
                        }}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter class="flex gap-4 pt-2">
                    <div class="flex flex-row gap-1 ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="View"
                      >
                        <NuxtLink
                          :to="`/management/device-configuration/${device.id}`"
                        >
                          <Eye class="w-5 h-5" />
                        </NuxtLink>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Edit"
                        @click="openEditDevice(device, index)"
                      >
                        <Pencil class="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        aria-label="Delete"
                      >
                        <Trash class="w-5 h-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  </main>
</template>
