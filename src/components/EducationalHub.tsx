import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, CheckCircle, Award, ChevronRight, Lightbulb } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  completed: boolean;
  progress: number;
}

const EducationalHub: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const modules: Module[] = [
    {
      id: '1',
      title: 'Introduction to Waste-to-Energy',
      description: 'Learn the basics of converting waste into clean energy and its environmental benefits.',
      duration: '15 min',
      difficulty: 'beginner',
      topics: ['What is Waste-to-Energy?', 'Benefits for Environment', 'Types of Waste Processing'],
      completed: false,
      progress: 0,
    },
    {
      id: '2',
      title: 'The Science Behind Energy Generation',
      description: 'Understand the scientific processes that transform organic waste into usable energy.',
      duration: '20 min',
      difficulty: 'intermediate',
      topics: ['Anaerobic Digestion', 'Thermal Treatment', 'Biogas Production', 'Energy Conversion'],
      completed: false,
      progress: 0,
    },
    {
      id: '3',
      title: 'Waste Sorting & Classification',
      description: 'Master the art of proper waste sorting to maximize energy output and efficiency.',
      duration: '12 min',
      difficulty: 'beginner',
      topics: ['Organic vs Inorganic', 'Recyclables', 'Hazardous Materials', 'Best Practices'],
      completed: false,
      progress: 0,
    },
    {
      id: '4',
      title: 'Advanced Optimization Techniques',
      description: 'Explore AI-driven optimization methods for waste collection and energy generation.',
      duration: '25 min',
      difficulty: 'advanced',
      topics: ['Machine Learning Models', 'Route Optimization', 'Predictive Analytics', 'IoT Integration'],
      completed: false,
      progress: 0,
    },
    {
      id: '5',
      title: 'Community Impact & Sustainability',
      description: 'Discover how waste-to-energy initiatives create sustainable communities.',
      duration: '18 min',
      difficulty: 'beginner',
      topics: ['Economic Benefits', 'Job Creation', 'Carbon Reduction', 'Community Engagement'],
      completed: false,
      progress: 0,
    },
    {
      id: '6',
      title: 'Global Best Practices',
      description: 'Learn from successful waste-to-energy implementations around the world.',
      duration: '22 min',
      difficulty: 'intermediate',
      topics: ['European Models', 'Asian Innovations', 'African Solutions', 'Case Studies'],
      completed: false,
      progress: 0,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStartModule = (module: Module) => {
    setSelectedModule(module);
  };

  const handleCompleteModule = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
    setSelectedModule(null);
  };

  const overallProgress = (completedModules.length / modules.length) * 100;

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-indigo-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Educational Hub
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interactive learning modules about waste-to-energy technology and sustainability
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Your Learning Progress</h3>
            <span className="text-2xl font-bold text-indigo-600">{Math.round(overallProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>{completedModules.length} of {modules.length} modules completed</span>
            {completedModules.length === modules.length && (
              <div className="flex items-center text-green-600 font-semibold">
                <Award className="w-4 h-4 mr-1" />
                All modules completed!
              </div>
            )}
          </div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const isCompleted = completedModules.includes(module.id);
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer ${
                  isCompleted ? 'border-2 border-green-400' : ''
                }`}
                onClick={() => handleStartModule(module)}
              >
                <div className="p-6">
                  {isCompleted && (
                    <div className="flex items-center text-green-600 font-semibold mb-3">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Completed
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{module.duration}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {module.topics.slice(0, 3).map((topic, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <Lightbulb className="w-3 h-3 mr-2 text-yellow-500" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg'
                    }`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isCompleted ? 'Review Module' : 'Start Learning'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Module Detail Modal */}
        <AnimatePresence>
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedModule(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedModule.title}</h2>
                  <p className="text-gray-600 mb-6">{selectedModule.description}</p>

                  <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-bold text-gray-800">What You'll Learn:</h3>
                    {selectedModule.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-indigo-50 rounded-lg">
                        <ChevronRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedModule(null)}
                      className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleCompleteModule(selectedModule.id)}
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EducationalHub;
