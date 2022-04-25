export interface Track {
  id: string;
  userId: string;
  name: string;
  transportType: TransportType;
  region: string;
  distance: number;
  time: number;
}

export enum TransportType  {
  Hiking,
  Scooter,
  Bicycle,
  Roller,
  Skateboard,
  Skiing
}