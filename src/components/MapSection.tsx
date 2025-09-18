import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Truck, Zap, Clock } from 'lucide-react';

interface WastePoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'collection' | 'processing' | 'energy-plant';
  capacity: number;
  efficiency: number;
  distance: number;
  isNearest: boolean;
}

const MapSection: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<WastePoint | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Mock data for waste collection points
  const wastePoints: WastePoint[] = [
    {
      id: '1',
      name: 'EcoCycle Collection Hub',
      address: '123 Green Street, Eco City',
      lat: 40.7128,
      lng: -74.0060,
      type: 'collection',
      capacity: 85,
      efficiency: 92,
      distance: 0.8,
      isNearest: true,
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
      distance: 2.3,
      isNearest: false,
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
      distance: 1.5,
      isNearest: false,
    },
  ];

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
            Find the nearest waste collection points and energy conversion facilities in your area.
          </p>
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
              {/* Placeholder for actual map - replace with Google Maps/Mapbox */}
              <div className="h-96 lg:h-[500px] bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Interactive Map</p>
                    <p className="text-gray-500 text-sm">Google Maps/Mapbox integration will go here</p>
                  </div>
                </div>

                {/* Simulated map markers */}
                {wastePoints.map((point, index) => {
                  const IconComponent = getPointIcon(point.type);
                  return (
                    <motion.div
                      key={point.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        point.isNearest ? 'animate-pulse' : ''
                      }`}
                      style={{
                        left: `${30 + index * 20}%`,
                        top: `${40 + index * 15}%`,
                      }}
                      onClick={() => setSelectedPoint(point)}
                    >
                      <div className={`bg-gradient-to-r ${getPointColor(point.type)} p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
                        point.isNearest ? 'ring-4 ring-green-300 ring-opacity-50' : ''
                      }`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {point.isNearest && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          Nearest Point
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Points List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Collection Points</h3>
            {wastePoints.map((point, index) => {
              const IconComponent = getPointIcon(point.type);
              return (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                        <span className="text-sm text-gray-600">{point.distance} km away</span>
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
    </section>
  );
};

export default MapSection;