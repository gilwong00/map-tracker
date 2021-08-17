interface Coordinates {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

export interface Location {
  coords: Coordinates;
  timestamp: number;
}

export interface Track {
  _id?: string;
  name?: string;
  userId: string;
  locations: Array<Location>;
}
