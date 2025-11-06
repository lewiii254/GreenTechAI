import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Wind, Thermometer, Droplets, AlertTriangle } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'rainy' | 'cloudy' | 'windy';
  windSpeed: number;
  precipitation: number;
}

interface ImpactMetric {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  percentage: number;
  description: string;
}

const WeatherImpact: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    humidity: 65,
    condition: 'sunny',
    windSpeed: 12,
    precipitation: 0,
  });

  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([]);

  useEffect(() => {
    // Simulate weather data - in production, fetch from weather API
    const mockWeather: WeatherData = {
      temperature: 22,
      humidity: 65,
      condition: 'sunny',
      windSpeed: 12,
      precipitation: 0,
    };
    setWeather(mockWeather);
    
    // Calculate impact based on weather
    calculateImpact(mockWeather);
  }, []);

  const calculateImpact = (weatherData: WeatherData) => {
    const impacts: ImpactMetric[] = [];

    // Temperature impact
    if (weatherData.temperature > 30) {
      impacts.push({
        factor: 'High Temperature',
        impact: 'negative',
        percentage: -15,
        description: 'Decomposition accelerates, may affect storage efficiency',
      });
    } else if (weatherData.temperature < 10) {
      impacts.push({
        factor: 'Low Temperature',
        impact: 'positive',
        percentage: 10,
        description: 'Slower decomposition, better storage conditions',
      });
    } else {
      impacts.push({
        factor: 'Temperature',
        impact: 'positive',
        percentage: 5,
        description: 'Optimal temperature for waste processing',
      });
    }

    // Humidity impact
    if (weatherData.humidity > 70) {
      impacts.push({
        factor: 'High Humidity',
        impact: 'negative',
        percentage: -12,
        description: 'Increased moisture in organic waste, lower energy output',
      });
    } else {
      impacts.push({
        factor: 'Humidity',
        impact: 'neutral',
        percentage: 0,
        description: 'Acceptable humidity levels for processing',
      });
    }

    // Rain impact
    if (weatherData.precipitation > 5) {
      impacts.push({
        factor: 'Heavy Rain',
        impact: 'negative',
        percentage: -20,
        description: 'Collection delays expected, wet waste reduces efficiency',
      });
    } else if (weatherData.precipitation > 0) {
      impacts.push({
        factor: 'Light Rain',
        impact: 'negative',
        percentage: -8,
        description: 'Minor collection delays possible',
      });
    }

    // Wind impact
    if (weatherData.windSpeed > 25) {
      impacts.push({
        factor: 'Strong Winds',
        impact: 'negative',
        percentage: -10,
        description: 'Collection operations may be suspended for safety',
      });
    } else if (weatherData.windSpeed > 15) {
      impacts.push({
        factor: 'Moderate Wind',
        impact: 'neutral',
        percentage: -3,
        description: 'Slight impact on outdoor waste handling',
      });
    }

    setImpactMetrics(impacts);
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-gray-500" />;
      case 'windy':
        return <Wind className="w-12 h-12 text-cyan-500" />;
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getOverallImpact = () => {
    const total = impactMetrics.reduce((sum, metric) => sum + metric.percentage, 0);
    if (total > 0) return { text: 'Favorable', color: 'text-green-600', bg: 'bg-green-100' };
    if (total < -10) return { text: 'Challenging', color: 'text-red-600', bg: 'bg-red-100' };
    return { text: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  };

  const overall = getOverallImpact();

  return (
    <section className="py-16 bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Weather Impact Analysis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-time weather conditions affecting waste collection and energy generation efficiency
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Weather Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Conditions</h3>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                {getWeatherIcon()}
                <div>
                  <p className="text-5xl font-bold text-gray-800">{weather.temperature}°C</p>
                  <p className="text-gray-600 capitalize">{weather.condition}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Humidity</span>
                </div>
                <span className="font-semibold text-gray-800">{weather.humidity}%</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-cyan-600" />
                  <span className="text-gray-700">Wind Speed</span>
                </div>
                <span className="font-semibold text-gray-800">{weather.windSpeed} km/h</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CloudRain className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Precipitation</span>
                </div>
                <span className="font-semibold text-gray-800">{weather.precipitation} mm</span>
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-lg ${overall.bg}`}>
              <div className="flex items-center space-x-2">
                <Thermometer className={`w-5 h-5 ${overall.color}`} />
                <span className={`font-semibold ${overall.color}`}>
                  Overall Impact: {overall.text}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Impact Analysis Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Impact Factors</h3>
            
            <div className="space-y-4">
              {impactMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    metric.impact === 'positive'
                      ? 'bg-green-50 border-green-500'
                      : metric.impact === 'negative'
                      ? 'bg-red-50 border-red-500'
                      : 'bg-gray-50 border-gray-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      {metric.impact === 'negative' && (
                        <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      {metric.factor}
                    </h4>
                    <span
                      className={`font-bold ${
                        metric.impact === 'positive'
                          ? 'text-green-600'
                          : metric.impact === 'negative'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {metric.percentage > 0 ? '+' : ''}{metric.percentage}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>💡 Tip:</strong> Weather conditions are automatically factored into our route 
                optimization algorithm to ensure maximum efficiency and safety for collection teams.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WeatherImpact;
