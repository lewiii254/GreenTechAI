import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, Zap, Leaf, Recycle, Calendar } from 'lucide-react';

const InsightsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data for charts
  const weeklyWasteData = [
    { day: 'Mon', waste: 12, energy: 28, efficiency: 85 },
    { day: 'Tue', waste: 15, energy: 35, efficiency: 87 },
    { day: 'Wed', waste: 18, energy: 42, efficiency: 89 },
    { day: 'Thu', waste: 14, energy: 32, efficiency: 88 },
    { day: 'Fri', waste: 20, energy: 48, efficiency: 92 },
    { day: 'Sat', waste: 25, energy: 58, efficiency: 90 },
    { day: 'Sun', waste: 22, energy: 52, efficiency: 88 },
  ];

  const wasteTypeData = [
    { name: 'Organic', value: 45, color: '#10B981' },
    { name: 'Paper', value: 25, color: '#3B82F6' },
    { name: 'Plastic', value: 20, color: '#8B5CF6' },
    { name: 'Metal', value: 10, color: '#F59E0B' },
  ];

  const impactMetrics = [
    {
      title: 'Total Waste Processed',
      value: '126 tons',
      change: '+12%',
      icon: Recycle,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Energy Generated',
      value: '295 kWh',
      change: '+18%',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'CO₂ Reduced',
      value: '2.4 tons',
      change: '+15%',
      icon: Leaf,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Efficiency Rate',
      value: '89.2%',
      change: '+3%',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="insights" className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Energy <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track waste processing, energy generation, and environmental impact with real-time analytics.
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${metric.color} p-3 rounded-xl`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                  {metric.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Waste to Energy Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Weekly Waste-to-Energy Trends</h3>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyWasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="waste"
                  stackId="1"
                  stroke="#10B981"
                  fill="url(#wasteGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stackId="2"
                  stroke="#3B82F6"
                  fill="url(#energyGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Waste Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Waste Type Distribution</h3>
            
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {wasteTypeData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Efficiency Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Conversion Efficiency</h3>
          
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyWasteData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="efficiency" fill="url(#efficiencyGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsDashboard;