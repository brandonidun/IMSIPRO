<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { InfoWindow } from "vue3-google-map";
import Tracker from "~/assets/svgs/tracker.svg";
import type {
  DeviceMapLocation,
  MarkerClickPayload,
} from "~/features/monitoring/charging-stations/types";
import MapView from "@/components/MapView.vue";

type Props = {
  locations: DeviceMapLocation[];
  center?: { lat: number; lng: number };
  selectedMarkerId?: string | number | null;
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
      :zoom="12"
      :icon="Tracker"
      :center="props.center"
      :selected-marker-id="props.selectedMarkerId"
      class="w-full h-full"
      @marker-click="handleMarkerClick"
    >
      <template
        v-for="marker in markers"
        :key="marker.id"
        #[`marker-${marker.id}`]
      >
        <InfoWindow
          v-if="marker.id && marker.id == props.selectedMarkerId"
          style="width: 170px; height: 80px"
          @closeclick="map?.setZoom(12)"
        >
          <div class="text-md text-center">
            <p class="text-lg font-bold">
              {{ marker.idTag }}
            </p>
            <p class="text-sm">
              <span class="font-bold">Signal:</span>
              {{ marker.signal_strength }}%
            </p>
            <p class="text-sm">
              <span class="font-bold">Status:</span>
              {{
                "status" in marker && marker.status
                  ? String(marker.status).charAt(0).toUpperCase() +
                    String(marker.status).slice(1)
                  : "Unknown"
              }}
            </p>
          </div>
        </InfoWindow>
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
