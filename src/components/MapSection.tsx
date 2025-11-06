import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Truck, Zap, Clock, Locate, Layers, Filter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface WastePoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'collection' | 'processing' | 'energy-plant';
  capacity: number;
  efficiency: number;
  distance?: number;
  isNearest?: boolean;
}

// Custom marker icons for different types
const createCustomIcon = (type: string, isNearest: boolean = false) => {
  const colors = {
    collection: '#10b981', // green
    'energy-plant': '#3b82f6', // blue
    processing: '#8b5cf6', // purple
  };
  
  const color = colors[type as keyof typeof colors] || '#6b7280';
  const size = isNearest ? 40 : 32;
  
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        ${isNearest ? 'animation: pulse 2s infinite;' : ''}
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${type === 'collection' 
            ? '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>'
            : type === 'energy-plant' 
            ? '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>'
            : '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>'
          }
        </svg>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Component to recenter map when user location changes
const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

// Mock data for waste collection points - expanded with more locations
const allWastePoints: WastePoint[] = [
  {
    id: '1',
    name: 'EcoCycle Collection Hub',
    address: '123 Green Street, Eco City',
    lat: 40.7128,
    lng: -74.0060,
    type: 'collection',
    capacity: 85,
    efficiency: 92,
  },
  {
    id: '2',
    name: 'Renewable Energy Plant',
    address: '456 Sustainability Ave, Green Valley',
    lat: 40.7580,
    lng: -73.9855,
    type: 'energy-plant',
    capacity: 70,
    efficiency: 88,
  },
  {
    id: '3',
    name: 'Waste Processing Center',
    address: '789 Circular Economy Blvd, Eco District',
    lat: 40.6892,
    lng: -74.0445,
    type: 'processing',
    capacity: 95,
    efficiency: 85,
  },
  {
    id: '4',
    name: 'Green Valley Collection Point',
    address: '234 Eco Lane, Green Valley',
    lat: 40.7489,
    lng: -73.9680,
    type: 'collection',
    capacity: 78,
    efficiency: 90,
  },
  {
    id: '5',
    name: 'Solar Energy Converter',
    address: '567 Renewable Road, Eco City',
    lat: 40.7306,
    lng: -73.9352,
    type: 'energy-plant',
    capacity: 82,
    efficiency: 94,
  },
  {
    id: '6',
    name: 'Central Recycling Facility',
    address: '890 Sustainability Street, Green District',
    lat: 40.6782,
    lng: -73.9442,
    type: 'processing',
    capacity: 88,
    efficiency: 87,
  },
];

const MapSection: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<WastePoint | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({ lat: 40.7128, lng: -74.0060 });
  const [mapLayer, setMapLayer] = useState<'street' | 'satellite'>('street');
  const [filterType, setFilterType] = useState<string>('all');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showUserRadius] = useState(true);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate distances and find nearest point
  const wastePoints = useMemo(() => {
    const pointsWithDistance = allWastePoints.map(point => ({
      ...point,
      distance: calculateDistance(userLocation.lat, userLocation.lng, point.lat, point.lng),
    }));

    // Find the nearest point
    let nearestDistance = Infinity;
    let nearestId = '';
    pointsWithDistance.forEach(point => {
      if (point.distance < nearestDistance) {
        nearestDistance = point.distance;
        nearestId = point.id;
      }
    });

    return pointsWithDistance.map(point => ({
      ...point,
      isNearest: point.id === nearestId,
    }));
  }, [userLocation]);

  // Filter points by type
  const filteredPoints = useMemo(() => {
    if (filterType === 'all') return wastePoints;
    return wastePoints.filter(point => point.type === filterType);
  }, [wastePoints, filterType]);

  // Get user's current location
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          // Keep default location if geolocation fails
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('Geolocation is not supported by your browser');
    }
  };

  // Get map tiles based on selected layer
  const getMapTiles = () => {
    if (mapLayer === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      };
    }
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };
  };

  const getDirections = (point: WastePoint) => {
    // Placeholder for Google Maps/Mapbox directions
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'collection': return Truck;
      case 'energy-plant': return Zap;
      case 'processing': return Clock;
      default: return MapPin;
    }
  };

  const getPointColor = (type: string) => {
    switch (type) {
      case 'collection': return 'from-green-500 to-emerald-500';
      case 'energy-plant': return 'from-blue-500 to-cyan-500';
      case 'processing': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="map" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Waste Collection <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Network</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the nearest waste collection points and energy conversion facilities in your area with our interactive map.
          </p>
        </motion.div>

        {/* Map Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-6 justify-center"
        >
          <motion.button
            onClick={getUserLocation}
            disabled={isLoadingLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            <Locate className={`h-5 w-5 ${isLoadingLocation ? 'animate-spin' : ''}`} />
            <span>{isLoadingLocation ? 'Getting Location...' : 'Use My Location'}</span>
          </motion.button>

          <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-lg">
            <Layers className="h-5 w-5 text-gray-600" />
            <select
              value={mapLayer}
              onChange={(e) => setMapLayer(e.target.value as 'street' | 'satellite')}
              className="bg-transparent border-none outline-none text-gray-700 font-medium cursor-pointer"
            >
              <option value="street">Street View</option>
              <option value="satellite">Satellite View</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-lg">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-700 font-medium cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="collection">Collection Points</option>
              <option value="energy-plant">Energy Plants</option>
              <option value="processing">Processing Centers</option>
            </select>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Real Leaflet Map */}
              <div className="h-96 lg:h-[500px] relative">
                <MapContainer
                  center={[userLocation.lat, userLocation.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url={getMapTiles().url}
                    attribution={getMapTiles().attribution}
                  />
                  
                  <RecenterMap center={[userLocation.lat, userLocation.lng]} />

                  {/* User location marker */}
                  <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={L.divIcon({
                      html: `
                        <div style="
                          background: #ef4444;
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          border: 3px solid white;
                          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                        "></div>
                      `,
                      className: 'user-location-marker',
                      iconSize: [20, 20],
                      iconAnchor: [10, 10],
                    })}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>Your Location</strong>
                      </div>
                    </Popup>
                  </Marker>

                  {/* User radius circle */}
                  {showUserRadius && (
                    <Circle
                      center={[userLocation.lat, userLocation.lng]}
                      radius={5000} // 5km radius
                      pathOptions={{
                        color: '#10b981',
                        fillColor: '#10b981',
                        fillOpacity: 0.1,
                        weight: 2,
                        dashArray: '5, 10',
                      }}
                    />
                  )}

                  {/* Waste collection points with clustering */}
                  <MarkerClusterGroup>
                    {filteredPoints.map((point) => (
                      <Marker
                        key={point.id}
                        position={[point.lat, point.lng]}
                        icon={createCustomIcon(point.type, point.isNearest || false)}
                        eventHandlers={{
                          click: () => setSelectedPoint(point),
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[200px]">
                            <h3 className="font-bold text-lg mb-2">{point.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{point.address}</p>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div>
                                <p className="text-xs text-gray-500">Capacity</p>
                                <p className="font-semibold">{point.capacity}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Efficiency</p>
                                <p className="font-semibold">{point.efficiency}%</p>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-xs text-gray-500">Distance</p>
                              <p className="font-semibold">{point.distance?.toFixed(2)} km</p>
                            </div>
                            {point.isNearest && (
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2 text-center">
                                Nearest Point
                              </div>
                            )}
                            <button
                              onClick={() => getDirections(point)}
                              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 hover:shadow-lg transition-all duration-200"
                            >
                              <Navigation className="h-4 w-4" />
                              <span>Get Directions</span>
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MarkerClusterGroup>
                </MapContainer>
              </div>

              {/* Map Legend */}
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-gray-700">Collection Points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Energy Plants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-gray-700">Processing Centers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-gray-700">Your Location</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Points List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Collection Points ({filteredPoints.length})
              </h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
              {filteredPoints
                .sort((a, b) => (a.distance || 0) - (b.distance || 0))
                .map((point, index) => {
                  const IconComponent = getPointIcon(point.type);
                  return (
                    <motion.div
                      key={point.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-200 ${
                        point.isNearest ? 'ring-2 ring-green-400 ring-opacity-50' : ''
                      } ${selectedPoint?.id === point.id ? 'shadow-xl border-2 border-green-400' : ''}`}
                      onClick={() => setSelectedPoint(point)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`bg-gradient-to-r ${getPointColor(point.type)} p-2 rounded-lg`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-800">{point.name}</h4>
                            {point.isNearest && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Nearest
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-3">{point.address}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500">Capacity</p>
                              <p className="font-semibold text-gray-800">{point.capacity}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Efficiency</p>
                              <p className="font-semibold text-gray-800">{point.efficiency}%</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">{point.distance?.toFixed(2)} km away</span>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                getDirections(point);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1 hover:shadow-lg transition-all duration-200"
                            >
                              <Navigation className="h-3 w-3" />
                              <span>Directions</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;