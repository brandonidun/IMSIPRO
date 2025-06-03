<script setup lang="ts">
import { GoogleMap, CustomMarker, Marker, Circle } from "vue3-google-map";
import type {
  MarkerClickPayload,
  MarkerData,
} from "~/features/monitoring/charging-stations/types";

// Import the Google Maps API key from the public runtime config (from .env)
const { GOOGLE_MAPS_API_KEY } = useRuntimeConfig().public;

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        hue: "#008eff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: "0",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        saturation: "-60",
      },
      {
        lightness: "-20",
      },
    ],
  },
];

type Emits = {
  (e: "click", event: google.maps.MapMouseEvent): void;
  (e: "marker-click", payload: MarkerClickPayload): void;
};
type Props = {
  zoom?: number;
  center?: google.maps.LatLngLiteral;
  markers?: MarkerData[];
  icon?: string;
};

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  zoom: 15,
  center: () => ({ lat: 5.5913754, lng: -0.2497702 }),
  markers: () => [],
});

const map = defineModel<google.maps.Map | null>("map", { default: null });

const mapComponent = ref<{ map: google.maps.Map } | null>(null);

function onMapClick(event: google.maps.MapMouseEvent) {
  emit("click", event);
}

function onMarkerClick(event: google.maps.MapMouseEvent, marker: MarkerData) {
  emit("marker-click", {
    target: marker,
    map: map.value,
  });
}

const circleCenter = { lat: 5.56, lng: -0.205 };
const circleRadius = 5000;
</script>

<template>
  <GoogleMap
    ref="mapComponent"
    :api-key="GOOGLE_MAPS_API_KEY as string"
    style="width: 100%; height: 100%"
    :center="props.center"
    :zoom="props.zoom"
    :styles="MAP_STYLES"
    @click="onMapClick"
    @tilesloaded="map = mapComponent?.map ?? null"
  >
    <Circle
      :options="{
        center: circleCenter,
        radius: circleRadius,
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
      }"
    />
    <Marker
      v-for="marker in props.markers"
      :key="marker.latitude + marker.longitude"
      :options="{
        position: { lat: marker.latitude, lng: marker.longitude },
        icon: props.icon,
      }"
      @click="onMarkerClick($event, marker)"
    >
      <slot :name="`marker-${marker.id}`" />
    </Marker>
  </GoogleMap>
</template>

<style scoped></style>
