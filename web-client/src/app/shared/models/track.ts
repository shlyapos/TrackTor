export interface Track {
  id: string;
  name: string;
  region: string;
  distance: number;
  time: string;
  transport: Transport;
}

export type Transport = 
  | 'foot'
  | 'skateboard'
  | 'bicycle' 