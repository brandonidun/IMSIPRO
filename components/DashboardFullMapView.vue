<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { InfoWindow } from "vue3-google-map";
import type {
  ChargerMapLocation,
  MarkerClickPayload,
} from "~/features/monitoring/charging-stations/types";
import MapView from "@/components/MapView.vue";

type Props = {
  locations: ChargerMapLocation[];
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
  <div class="w-full h-full">
    <MapView
      v-model:map="map"
      :markers="markers"
      :zoom="12"
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
          style="width: 250px"
          @closeclick="map?.setZoom(12)"
        >
          <div class="text-lg text-center">
            <p class="text-2xl font-bold">{{ marker.name }}</p>
            <p class="text-gray-400 text-xl font-bold">({{ marker.id }})</p>
          </div>
          <div class="text-center mt-4">
            <Button
              @click="navigateTo(`/mqtt-modules/telemetry-data/${marker.id}`)"
            >
              View details
              <ArrowRight class="ml-2 size-4" />
            </Button>
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
