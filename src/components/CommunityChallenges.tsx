import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Users, Zap, Target, Award } from 'lucide-react';
import toast from 'react-hot-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'community';
  goal: number;
  current: number;
  unit: string;
  reward: {
    points: number;
    badge?: string;
  };
  timeLeft: number; // hours
  participants: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const CommunityChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Weekend Warrior',
      description: 'Collect and properly sort 50kg of waste this weekend',
      type: 'individual',
      goal: 50,
      current: 28,
      unit: 'kg',
      reward: { points: 500, badge: 'Weekend Warrior' },
      timeLeft: 36,
      participants: 127,
      difficulty: 'easy',
    },
    {
      id: '2',
      title: 'Energy Champions',
      description: 'Team challenge: Generate 1000 kWh of energy this month',
      type: 'team',
      goal: 1000,
      current: 643,
      unit: 'kWh',
      reward: { points: 2000, badge: 'Energy Champion' },
      timeLeft: 168,
      participants: 45,
      difficulty: 'medium',
    },
    {
      id: '3',
      title: 'Zero Waste Week',
      description: 'Community goal: Achieve 95% waste-to-energy conversion rate',
      type: 'community',
      goal: 95,
      current: 87,
      unit: '%',
      reward: { points: 1500, badge: 'Zero Waste Hero' },
      timeLeft: 72,
      participants: 892,
      difficulty: 'hard',
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Report 10 new waste collection points this week',
      type: 'individual',
      goal: 10,
      current: 6,
      unit: 'points',
      reward: { points: 300 },
      timeLeft: 120,
      participants: 234,
      difficulty: 'easy',
    },
  ]);

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'individual' | 'team' | 'community'>('all');

  useEffect(() => {
    // Simulate time countdown
    const timer = setInterval(() => {
      setChallenges(prev =>
        prev.map(challenge => ({
          ...challenge,
          timeLeft: Math.max(0, challenge.timeLeft - 1),
        }))
      );
    }, 3600000); // Update every hour

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (days > 0) {
      return `${days}d ${remainingHours}h`;
    }
    return `${hours}h`;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'from-green-500 to-emerald-500';
    if (percentage >= 50) return 'from-blue-500 to-cyan-500';
    if (percentage >= 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return <Target className="w-5 h-5" />;
      case 'team':
        return <Users className="w-5 h-5" />;
      case 'community':
        return <Zap className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const joinChallenge = (challenge: Challenge) => {
    toast.success(`You've joined the "${challenge.title}" challenge!`);
    setSelectedChallenge(null);
  };

  const filteredChallenges = activeFilter === 'all' 
    ? challenges 
    : challenges.filter(c => c.type === activeFilter);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Community Challenges
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join time-limited challenges, compete with others, and earn rewards while making a positive impact!
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-lg p-2 inline-flex space-x-2">
            {(['all', 'individual', 'team', 'community'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge, index) => {
            const progress = (challenge.current / challenge.goal) * 100;
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setSelectedChallenge(challenge)}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${getProgressColor(progress)} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(challenge.type)}
                        <span className="text-sm font-semibold uppercase opacity-90">
                          {challenge.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">{challenge.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)} bg-white bg-opacity-90`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-white text-opacity-90">{challenge.description}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-semibold">Progress</span>
                      <span className="text-2xl font-bold text-gray-800">
                        {challenge.current} / {challenge.goal} {challenge.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`bg-gradient-to-r ${getProgressColor(progress)} h-full rounded-full`}
                      />
                    </div>
                    <div className="text-center mt-1 text-sm text-gray-600">
                      {progress.toFixed(1)}% Complete
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <div className="text-sm font-semibold text-gray-800">
                        {formatTimeLeft(challenge.timeLeft)}
                      </div>
                      <div className="text-xs text-gray-600">left</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Users className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                      <div className="text-sm font-semibold text-gray-800">
                        {challenge.participants}
                      </div>
                      <div className="text-xs text-gray-600">joined</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <Award className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
                      <div className="text-sm font-semibold text-gray-800">
                        {challenge.reward.points}
                      </div>
                      <div className="text-xs text-gray-600">points</div>
                    </div>
                  </div>

                  {/* Reward Badge */}
                  {challenge.reward.badge && (
                    <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-300">
                      <div className="flex items-center justify-center space-x-2">
                        <Trophy className="w-4 h-4 text-yellow-700" />
                        <span className="text-sm font-semibold text-yellow-800">
                          Unlock: {challenge.reward.badge}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Challenge Detail Modal */}
        <AnimatePresence>
          {selectedChallenge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedChallenge(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedChallenge.title}</h2>
                <p className="text-gray-600 mb-6">{selectedChallenge.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Goal</span>
                    <span className="font-bold text-gray-800">
                      {selectedChallenge.goal} {selectedChallenge.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Time Left</span>
                    <span className="font-bold text-gray-800">
                      {formatTimeLeft(selectedChallenge.timeLeft)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Reward</span>
                    <span className="font-bold text-yellow-600">
                      {selectedChallenge.reward.points} points
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => joinChallenge(selectedChallenge)}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Join Challenge
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CommunityChallenges;
