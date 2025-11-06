import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Brain, Calendar, AlertCircle, Target } from 'lucide-react';

interface PredictionData {
  date: string;
  actual: number;
  predicted: number;
  confidence: number;
}

interface InsightItem {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
}

const WastePrediction: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter'>('week');
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const accuracy = 92;

  useEffect(() => {
    // Simulate AI predictions based on historical data
    generatePredictions(timeframe);
  }, [timeframe, generatePredictions]);

  const generatePredictions = React.useCallback((period: string) => {
    // Mock historical data with predictions
    const baseData: PredictionData[] = [];
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
    const now = new Date();

    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      // Simulate actual and predicted values with some variance
      const baseValue = 15 + Math.sin(i / 7) * 5; // Weekly pattern
      const weekendBoost = date.getDay() === 0 || date.getDay() === 6 ? 3 : 0;
      const actual = i < days - 3 ? baseValue + weekendBoost + (Math.random() - 0.5) * 2 : 0;
      const predicted = baseValue + weekendBoost + (Math.random() - 0.5) * 1.5;
      
      baseData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        actual: parseFloat(actual.toFixed(1)),
        predicted: parseFloat(predicted.toFixed(1)),
        confidence: 85 + Math.random() * 10,
      });
    }

    setPredictions(baseData);
    generateInsights(baseData);
  }, []);

  const generateInsights = (data: PredictionData[]) => {
    const insights: InsightItem[] = [];
    
    // Analyze trends
    const recentPredictions = data.slice(-7);
    const avgPredicted = recentPredictions.reduce((sum, d) => sum + d.predicted, 0) / recentPredictions.length;
    
    if (avgPredicted > 20) {
      insights.push({
        type: 'warning',
        title: 'High Waste Volume Expected',
        message: `Our AI predicts ${avgPredicted.toFixed(1)} tons/day average. Consider scheduling extra collection routes.`,
      });
    }

    // Weekend pattern
    const hasWeekendData = data.some(d => d.date.includes('Sat') || d.date.includes('Sun'));
    if (hasWeekendData) {
      insights.push({
        type: 'info',
        title: 'Weekend Pattern Detected',
        message: 'Higher waste volumes expected on weekends. Collection efficiency can be optimized by 15%.',
      });
    }

    // Seasonal insight
    const month = new Date().getMonth();
    if (month >= 5 && month <= 8) { // Summer months
      insights.push({
        type: 'success',
        title: 'Summer Optimization',
        message: 'Organic waste increases by 25% in summer. Energy generation potential is higher!',
      });
    }

    setInsights(insights);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Brain className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <Target className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              AI Waste Prediction
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Machine learning models predict future waste generation patterns to optimize collection and energy production
          </p>
        </motion.div>

        {/* Accuracy Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full px-6 py-3 shadow-lg border-2 border-purple-200">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <div>
                <span className="text-sm text-gray-600">Model Accuracy</span>
                <span className="text-2xl font-bold text-purple-600 ml-3">{accuracy}%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-2 inline-flex space-x-2">
            {(['week', 'month', 'quarter'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
                  timeframe === period
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Prediction Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Waste Generation Forecast</h3>
            
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={predictions}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'Tons/Day', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  name="Historical Data"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#ec4899"
                  fillOpacity={1}
                  fill="url(#colorPredicted)"
                  strokeDasharray="5 5"
                  name="AI Prediction"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">AI Insights</h3>
            
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-600">{insight.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="mt-6 p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-600" />
                  Model Information
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Uses LSTM neural network</li>
                  <li>• Trained on 2+ years of data</li>
                  <li>• Considers weather & seasonality</li>
                  <li>• Updates every 24 hours</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WastePrediction;
