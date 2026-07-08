import React from 'react';
import { useMap } from 'react-leaflet';
import { FiPlus, FiMinus } from 'react-icons/fi';

export default function MapZoomControls() {
  const map = useMap();

  return (
    <div className="map-zoom-controls-wrapper">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          map.zoomIn();
        }} 
        aria-label="Zoom in"
        className="zoom-btn"
      >
        <FiPlus />
      </button>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          map.zoomOut();
        }} 
        aria-label="Zoom out"
        className="zoom-btn"
      >
        <FiMinus />
      </button>
    </div>
  );
}
