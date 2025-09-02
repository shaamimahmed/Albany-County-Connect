
export enum TicketStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export interface Ticket {
  id: string;
  description: string;
  department: string;
  status: TicketStatus;
  timestamp: string;
  image: string; // base64 image data
  resolutionImage?: string;
  closureTimestamp?: string;
}

export interface WeatherData {
  current: {
    temp: number;
    weather: {
      main: string;
      icon: string;
    }[];
  };
  daily: {
    dt: number;
    temp: {
      day: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
  }[];
}

// Represents the structure of the OpenWeatherMap /data/2.5/forecast API response
export interface ForecastApiResponse {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'emergency' | 'community' | 'traffic';
  timestamp: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  type: 'social' | 'government' | 'private' | 'community';
}

export interface Promotion {
  id: string;
  business: string;
  offer: string;
  expiry: string;
}

// FIX: Add MapLocation interface for InteractiveMap component
export interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  type: 'mall' | 'government' | 'religious';
}

// New User type for authentication
export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

// New types for the categorized and animated locations menu
export interface Location {
  name:string;
  url: string;
  details?: string; // For hours or other info
}

export interface LocationCategory {
  name: string;
  icon: React.ReactNode;
  items: Location[];
}

// New type for InfoModal content
export interface ModalContent {
  title: string;
  body: React.ReactNode;
}
