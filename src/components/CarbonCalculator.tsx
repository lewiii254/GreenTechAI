import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TreePine, Car, Home, Lightbulb, Calculator } from 'lucide-react';

interface CalculatorInput {
  wasteAmount: number;
  wasteType: 'organic' | 'plastic' | 'paper' | 'mixed';
  frequency: 'daily' | 'weekly' | 'monthly';
}

interface CarbonResults {
  carbonSaved: number;
  treesEquivalent: number;
  carMilesEquivalent: number;
  energyGenerated: number;
  homesPowered: number;
}

const CarbonCalculator: React.FC = () => {
  const [input, setInput] = useState<CalculatorInput>({
    wasteAmount: 10,
    wasteType: 'organic',
    frequency: 'weekly',
  });

  const [results, setResults] = useState<CarbonResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Conversion factors (simplified for demo)
  const conversionFactors = {
    organic: { carbon: 0.45, energy: 2.1 },
    plastic: { carbon: 0.32, energy: 3.8 },
    paper: { carbon: 0.38, energy: 1.5 },
    mixed: { carbon: 0.35, energy: 2.2 },
  };

  const frequencyMultiplier = {
    daily: 365,
    weekly: 52,
    monthly: 12,
  };

  const calculateImpact = () => {
    const factor = conversionFactors[input.wasteType];
    const multiplier = frequencyMultiplier[input.frequency];
    const annualWaste = input.wasteAmount * multiplier;

    const carbonSaved = annualWaste * factor.carbon;
    const energyGenerated = annualWaste * factor.energy;

    const results: CarbonResults = {
      carbonSaved: parseFloat(carbonSaved.toFixed(2)),
      treesEquivalent: Math.round(carbonSaved / 20), // 1 tree absorbs ~20kg CO2/year
      carMilesEquivalent: Math.round(carbonSaved * 2.5), // ~0.4kg CO2 per mile
      energyGenerated: parseFloat(energyGenerated.toFixed(2)),
      homesPowered: parseFloat((energyGenerated / 10000).toFixed(2)), // avg home uses ~10,000 kWh/year
    };

    setResults(results);
    setShowResults(true);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-12 h-12 text-green-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Carbon Footprint Calculator
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your environmental impact and see how much carbon you're saving!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Waste Details</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waste Amount (kg)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={input.wasteAmount}
                  onChange={(e) => setInput({ ...input, wasteAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waste Type
                </label>
                <select
                  value={input.wasteType}
                  onChange={(e) => setInput({ ...input, wasteType: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="organic">Organic (Food, Garden waste)</option>
                  <option value="plastic">Plastic</option>
                  <option value="paper">Paper & Cardboard</option>
                  <option value="mixed">Mixed Waste</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Frequency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setInput({ ...input, frequency: freq })}
                      className={`py-3 px-4 rounded-lg font-semibold capitalize transition-all ${
                        input.frequency === freq
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={calculateImpact}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Calculate Impact
              </motion.button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Annual Impact</h3>

            {showResults && results ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-5 bg-gradient-to-br from-green-100 to-green-200 rounded-xl border-2 border-green-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Leaf className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Carbon Saved</p>
                        <p className="text-3xl font-bold text-green-700">{results.carbonSaved} kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lightbulb className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Energy Generated</p>
                        <p className="text-2xl font-bold text-blue-700">{results.energyGenerated} kWh</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TreePine className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Equivalent to planting</p>
                        <p className="text-2xl font-bold text-purple-700">{results.treesEquivalent} trees</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Car className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Saves emissions from</p>
                        <p className="text-2xl font-bold text-orange-700">{results.carMilesEquivalent} car miles</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Home className="w-8 h-8 text-cyan-600" />
                      <div>
                        <p className="text-sm text-gray-600">Can power</p>
                        <p className="text-2xl font-bold text-cyan-700">{results.homesPowered} homes/year</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>🌟 Amazing!</strong> By properly managing your waste, you're making a 
                    significant positive impact on our planet. Keep up the great work!
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Enter your waste details and calculate your impact</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarbonCalculator;
