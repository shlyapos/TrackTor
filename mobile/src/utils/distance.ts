import { Coordinate } from '../models/tracks';
import { magicDifferenceValue } from './variables';

// Converts numeric degrees to radians
const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};

export const calcCrow = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  var R = 6371; // km

  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
};

export const differenceBetweenCoords = (
  coord1: Coordinate,
  coord2: Coordinate
): boolean => {
  const difference = Math.abs(
    Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
        Math.pow(coord1.lon - coord2.lon, 2)
    )
  );

  return difference > magicDifferenceValue;
};

export const convertDistanceToString = (distance: number): string => {
  return (Math.floor(distance * 100) / 100).toString() + ' км';
};
