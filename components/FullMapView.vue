<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { InfoWindow } from "vue3-google-map";
import Tracker from "~/assets/svgs/tracker.svg";
import PhoneIcon from "@/assets/svgs/phone.svg";
import type {
  DeviceMapLocation,
  MarkerClickPayload,
} from "~/features/monitoring/charging-stations/types";
import MapView from "@/components/MapView.vue";
import { Marker } from "vue3-google-map";

type Props = {
  locations: DeviceMapLocation[];
  center?: { lat: number; lng: number };
};

const props = defineProps<Props>();

const map = ref<google.maps.Map | null>(null);

const markers = computed(() => {
  return props.locations.map((location) => {
    return {
      ...location,
      latitude: location.lat,
      longitude: location.lng,
      id: location.id.toString(),
    };
  });
});

function handleMarkerClick({ target }: MarkerClickPayload) {
  if (!map.value) return;
  map.value.setCenter({ lat: target.latitude, lng: target.longitude });
  map.value.setZoom(14);
}
</script>

<template>
  <div class="w-full h-full min-h-[400px]" style="min-height: 400px">
    <MapView
      v-model:map="map"
      :markers="markers"
      :icon="PhoneIcon"
      :zoom="12"
      :center="props.center"
      class="w-full h-full"
      @marker-click="handleMarkerClick"
    >
      <template
        v-for="marker in markers"
        :key="marker.id"
        #[`marker-${marker.id}`]
      >
        <InfoWindow
          v-if="marker.id"
          style="width: 170px; height: 80px"
          @closeclick="map?.setZoom(12)"
        >
          <div class="text-md text-start">
            <p class="text-sm">
              <span class="font-bold">IMEI:</span> {{ marker.IMEI }}
            </p>
            <p class="text-sm">
              <span class="font-bold">Phone:</span> {{ marker.phone_number }}
            </p>
            <p class="text-sm">
              <span class="font-bold">IMSI:</span> {{ marker.IMSI }}
            </p>
            <p class="text-sm">
              <span class="font-bold">Signal:</span>
              {{ marker.signal_strength }}%
            </p>
          </div>

          <!-- <div class="text-center mt-4">
            <Button
              @click="navigateTo(`/mqtt-modules/telemetry-data/${marker.id}`)"
            >
              View Details
              <ArrowRight class="ml-2 size-4" />
            </Button>
          </div> -->
        </InfoWindow>
      </template>
      <template #phone-marker>
        <Marker
          :options="{
            position: { lat: 5.56, lng: -0.205 },
            icon: Tracker,
          }"
        />
      </template>
    </MapView>
  </div>
</template>

<style scoped>
:deep(.vue3-google-map) {
  height: 100% !important;
  width: 100% !important;
}
</style>
