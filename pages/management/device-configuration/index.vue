<script setup lang="ts">
import { Cog, Laptop } from "lucide-vue-next";
import { StatCard } from "~/components/Card";

definePageMeta({
  breadcrumb: "Device Configuration",
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <PageIntroduction
      title="Device Configuration"
      description="Configure the device settings, frequency bands, and other settings."
      :icon="Cog"
    >
      <Button>Add Device</Button>
    </PageIntroduction>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
      <StatCard title="Devices" value="28" :icon="Laptop" color="blue" />
      <StatCard
        title="Active Bands"
        value="2"
        :icon="AudioLines"
        color="blue"
      />
      <StatCard title="Alerts" value="32" :icon="FileWarning" color="blue" />
      <StatCard title="Uptime" :value="54" :icon="Hourglass" color="blue" />
    </div>
    <!-- Device Management Card Grid -->
    <Card class="mt-4 p-6">
      <CardHeader
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <CardTitle>Device Management</CardTitle>
        <Button variant="default">+ Add New Device</Button>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search devices..."
            class="border rounded px-3 py-2 w-full md:w-1/3"
          />
          <select class="border rounded px-3 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
          <select class="border rounded px-3 py-2">
            <option>All Types</option>
            <option>Portable</option>
            <option>Fixed</option>
            <option>Vehicle</option>
          </select>
        </div>
        <div class="flex gap-8 border-b mb-6">
          <button
            class="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold"
          >
            All Devices
          </button>
          <button class="pb-2 text-gray-500">Active</button>
          <button class="pb-2 text-gray-500">Inactive</button>
          <button class="pb-2 text-gray-500">Maintenance</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            v-for="device in deviceCards"
            :key="device.IMSI"
            class="shadow-sm border"
          >
            <CardHeader class="flex flex-row items-center justify-between">
              <CardTitle class="text-lg font-semibold"
                >Tracker #{{ device.IMSI.slice(-3) }}</CardTitle
              >
              <span
                class="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-semibold"
                >Active</span
              >
            </CardHeader>
            <CardContent>
              <div class="text-gray-500 text-sm mb-2">Portable Device</div>
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
              <Button variant="ghost" size="icon"
                ><span class="i-lucide-eye w-5 h-5"
              /></Button>
              <Button variant="ghost" size="icon"
                ><span class="i-lucide-pencil w-5 h-5"
              /></Button>
              <Button variant="ghost" size="icon"
                ><span class="i-lucide-trash w-5 h-5"
              /></Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  </main>
</template>
