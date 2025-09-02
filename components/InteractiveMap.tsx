import React, { useState, useEffect, useRef } from 'react';
import { MOCK_MAP_LOCATIONS, MAP_STYLES } from '../constants';
import { MapLocation } from '../types';

const getMarkerIcon = (type: MapLocation['type']) => {
    let color;
    switch(type) {
        case 'mall': color = '#EA4335'; break; // Red for Malls
        case 'government': color = '#4285F4'; break; // Blue for Government
        case 'religious': color = '#34A853'; break; // Green for Religious
        default: color = '#FBBC05'; // Yellow as fallback
    }
    return {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: color,
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new (window as any).google.maps.Point(12, 24),
    };
};


const InteractiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState<MapLocation['type'] | 'all'>('all');
  const [mapStatus, setMapStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && !map) {
        const albanyCenter = { lat: 42.665, lng: -73.79 };
        const newMap = new (window as any).google.maps.Map(mapRef.current, {
          center: albanyCenter,
          zoom: 12,
          styles: MAP_STYLES,
          disableDefaultUI: true,
          zoomControl: true,
        });
        setMap(newMap);
        setMapStatus('loaded');
      }
    };
    
    const checkForGoogleMaps = (retries = 5) => {
        if (typeof (window as any).google !== 'undefined' && typeof (window as any).google.maps !== 'undefined') {
          initMap();
        } else if (retries > 0) {
          setTimeout(() => checkForGoogleMaps(retries - 1), 500);
        } else {
          setMapStatus('error');
          console.error("Google Maps API failed to load. Please check the API key in index.html and ensure you have an active internet connection.");
        }
      };
  
      checkForGoogleMaps();

  }, [mapRef, map]);

  useEffect(() => {
    markers.forEach(marker => marker.setMap(null));
    activeInfoWindow?.close();

    if (map) {
      const typeFilteredLocations = selectedType === 'all' 
        ? MOCK_MAP_LOCATIONS 
        : MOCK_MAP_LOCATIONS.filter(loc => loc.type === selectedType);

      const newMarkers = typeFilteredLocations.map(location => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: getMarkerIcon(location.type),
          animation: (window as any).google.maps.Animation.DROP,
        });

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `<div class="p-2"><h4 class="font-bold text-gray-800">${location.name}</h4></div>`,
        });

        marker.addListener('click', () => {
          activeInfoWindow?.close();
          infoWindow.open(map, marker);
          setActiveInfoWindow(infoWindow);
        });
        return marker;
      });
      setMarkers(newMarkers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, map]);

  const locationTypes: { id: MapLocation['type'] | 'all', name: string }[] = [
    {id: 'all', name: 'All'},
    {id: 'mall', name: 'Malls'},
    {id: 'government', name: 'Government'},
    {id: 'religious', name: 'Religious Centers'}
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Interactive Map</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {locationTypes.map((locType) => (
          <button
            key={locType.id}
            onClick={() => setSelectedType(locType.id)}
            className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${
              selectedType === locType.id
                ? 'bg-county-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {locType.name}
          </button>
        ))}
      </div>
      <div 
        ref={mapRef} 
        className="h-80 w-full rounded-lg border-2 border-gray-200" 
        aria-label="Map of Albany County"
      >
        {mapStatus === 'loading' && (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                <p>Loading map...</p>
            </div>
        )}
        {mapStatus === 'error' && (
            <div className="flex items-center justify-center h-full text-red-700 bg-red-50 rounded-lg">
                <div className="text-center p-4">
                    <p className="font-bold">Map Failed to Load</p>
                    <p className="text-sm">Please check the API key in index.html.</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;