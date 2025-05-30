export type ChargerMapLocation = {
  lng: number;
  lat: number;
  idTag: string;
  id: number;
  name: string;
  optional: {
    active: number;
  };
};

export type MarkerData = {
  id: string;
  latitude: number;
  longitude: number;
};

export type MarkerClickPayload = {
  target: MarkerData;
  map: google.maps.Map | null;
};
