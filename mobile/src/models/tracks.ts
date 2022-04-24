import { convertDistanceToString } from '../utils/distance';

export type Transport =
  | 'Пешком'
  | 'Самокат'
  | 'Велосипед'
  | 'Ролики'
  | 'Скейтборд'
  | 'Лыжи';

export type Coordinate = {
  lon: number;
  lat: number;
};

export interface IBackendTrack {
  id: string;
  name: string;
  region?: string;
  distance: number;
  time: string;
  transport: Transport;
  coords?: Coordinate[];
}

export interface IFrontendTrack {
  id: string;
  name: string;
  region: string;
  distance: string;
  time: string;
  transport: Transport;
  coords?: Coordinate[];
}

export const serializeBackendTrack = (from: IBackendTrack): IFrontendTrack => ({
  id: from.id,
  name: from.name,
  region: from.region || 'Неизвестно',
  distance: convertDistanceToString(from.distance),
  time: from.time,
  transport: from.transport,
  coords: from.coords,
});
