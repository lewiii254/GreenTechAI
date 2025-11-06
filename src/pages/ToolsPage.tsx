import React from 'react';
import { motion } from 'framer-motion';
import WastePrediction from '../components/WastePrediction';
import CarbonCalculator from '../components/CarbonCalculator';
import ExportReports from '../components/ExportReports';

const ToolsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 pt-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Tools & Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Advanced tools for predicting, calculating, and analyzing your waste management data
          </p>
        </div>
        
        <WastePrediction />
        <CarbonCalculator />
        <ExportReports />
      </motion.div>
    </div>
  );
};

export default ToolsPage;
