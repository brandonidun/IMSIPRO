export type DeviceMapLocation = {
  lng: number;
  lat: number;
  IMEI: string;
  IMSI: string;
  phone_number: string;
  network: string;
  signal_strength: number;
  band: string;
  id: number;
  idTag: string;
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
