export interface Track {
  id: string;
  name: string;
  region: string;
  distance: number;
  time: string;
  transport: Transport;
  coords: TrackCoord[];
}

export interface TrackCoord {
  lat: number;
  lng: number;
}

export type Transport = 
  | 'foot'
  | 'skateboard'
  | 'bicycle' 