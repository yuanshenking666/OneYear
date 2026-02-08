
export interface TimeDiff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: number;
}

export interface Footprint {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface GardenPhoto {
  id: string;
  x: number;
  y: number;
  url: string;
  rotation: number;
}

export enum AppSection {
  HOME = 'HOME',
  NOTES = 'NOTES',
  GARDEN = 'GARDEN',
  TIMELINE = 'TIMELINE'
}
