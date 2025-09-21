import React, { useEffect, useRef } from 'react';

// Declare the Leaflet 'L' object as it is loaded from a CDN script
declare const L: any;

interface MapProps {
  lat: number;
  lng: number;
}

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null); // To hold the map instance

  useEffect(() => {
    // Ensure Leaflet is loaded and the container ref is available
    if (typeof L === 'undefined' || !mapContainerRef.current) {
      return;
    }

    // Initialize the map only once
    if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapContainerRef.current).setView([lat, lng], 15);

        // Add the tile layer (the map images)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        // Add a marker
        L.marker([lat, lng]).addTo(mapInstanceRef.current)
            .bindPopup('<b>Kantor HalloHukum</b><br>Kami berada di sini!')
            .openPopup();
    } else {
        // If map already exists, just update its view
        mapInstanceRef.current.setView([lat, lng], 15);
    }
    
    // Cleanup function to remove the map instance when the component unmounts
    return () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
    };
  }, [lat, lng]);

  return (
    <div 
        ref={mapContainerRef} 
        className="h-80 w-full rounded-2xl shadow-md z-10"
        aria-label="Peta lokasi kantor HalloHukum"
    />
  );
};

export default Map;
