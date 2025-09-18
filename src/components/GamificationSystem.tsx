import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Recycle,
  Leaf,
  Crown,
  Medal,
  Gift
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalPoints: number;
  rank: number;
  badges: Badge[];
  achievements: Achievement[];
  stats: UserStats;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  category: 'waste' | 'energy' | 'community' | 'environmental';
  completedAt?: Date;
  progress: number;
  maxProgress: number;
}

interface UserStats {
  wasteContributed: number;
  energyGenerated: number;
  co2Saved: number;
  daysActive: number;
  communityContributions: number;
}

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  points: number;
  change: number;
}

const GamificationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'achievements' | 'leaderboard'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [newReward, setNewReward] = useState<Badge | null>(null);

  // Mock data - replace with real API calls
  useEffect(() => {
    const mockProfile: UserProfile = {
      id: '1',
      name: 'Eco Warrior',
      avatar: '🌱',
      level: 12,
      xp: 2450,
      xpToNextLevel: 3000,
      totalPoints: 15680,
      rank: 3,
      badges: [
        {
          id: '1',
          name: 'First Contribution',
          description: 'Made your first waste contribution',
          icon: '🎯',
          rarity: 'common',
          unlockedAt: new Date('2024-01-15')
        },
        {
          id: '2',
          name: 'Energy Generator',
          description: 'Generated 100 kWh of energy',
          icon: '⚡',
          rarity: 'rare',
          unlockedAt: new Date('2024-02-01')
        },
        {
          id: '3',
          name: 'Community Leader',
          description: 'Helped 10 community members',
          icon: '👥',
          rarity: 'epic',
          unlockedAt: new Date('2024-02-15')
        },
        {
          id: '4',
          name: 'Eco Champion',
          description: 'Saved 1 ton of CO2',
          icon: '🌍',
          rarity: 'legendary',
          progress: 85,
          maxProgress: 100
        }
      ],
      achievements: [
        {
          id: '1',
          title: 'Waste Warrior',
          description: 'Contribute 500kg of waste',
          points: 500,
          icon: '♻️',
          category: 'waste',
          completedAt: new Date('2024-02-10'),
          progress: 500,
          maxProgress: 500
        },
        {
          id: '2',
          title: 'Energy Master',
          description: 'Generate 1000 kWh of energy',
          points: 1000,
          icon: '⚡',
          category: 'energy',
          progress: 750,
          maxProgress: 1000
        },
        {
          id: '3',
          title: 'Green Guardian',
          description: 'Save 2 tons of CO2',
          points: 2000,
          icon: '🌿',
          category: 'environmental',
          progress: 1200,
          maxProgress: 2000
        }
      ],
      stats: {
        wasteContributed: 485,
        energyGenerated: 1250,
        co2Saved: 1.8,
        daysActive: 45,
        communityContributions: 12
      }
    };

    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, user: { name: 'Green Master', avatar: '🏆', level: 25 }, points: 45680, change: 2 },
      { rank: 2, user: { name: 'Eco Legend', avatar: '🌟', level: 22 }, points: 38920, change: -1 },
      { rank: 3, user: { name: 'Eco Warrior', avatar: '🌱', level: 12 }, points: 15680, change: 1 },
      { rank: 4, user: { name: 'Waste Hero', avatar: '♻️', level: 18 }, points: 28450, change: 0 },
      { rank: 5, user: { name: 'Energy Pro', avatar: '⚡', level: 15 }, points: 22100, change: -2 },
    ];

    setUserProfile(mockProfile);
    setLeaderboard(mockLeaderboard);

    // Simulate earning a new badge
    setTimeout(() => {
      const newBadge: Badge = {
        id: '5',
        name: 'Weekly Champion',
        description: 'Top contributor this week!',
        icon: '🏅',
        rarity: 'epic',
        unlockedAt: new Date()
      };
      setNewReward(newBadge);
      setShowRewardModal(true);
    }, 5000);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'waste': return Recycle;
      case 'energy': return Zap;
      case 'community': return Users;
      case 'environmental': return Leaf;
      default: return Target;
    }
  };

  const calculateProgress = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  if (!userProfile) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{userProfile.avatar}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            <div className="flex items-center space-x-4 mt-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Level {userProfile.level}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                Rank #{userProfile.rank}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {userProfile.totalPoints.toLocaleString()} pts
              </span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>XP Progress</span>
            <span>{userProfile.xp} / {userProfile.xpToNextLevel}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(userProfile.xp / userProfile.xpToNextLevel) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-white h-3 rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'profile', label: 'Profile', icon: Users },
          { id: 'achievements', label: 'Achievements', icon: Award },
          { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-colors ${
              activeTab === tab.id
                ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Waste Contributed', value: `${userProfile.stats.wasteContributed}kg`, icon: Recycle, color: 'from-green-500 to-emerald-500' },
                  { label: 'Energy Generated', value: `${userProfile.stats.energyGenerated}kWh`, icon: Zap, color: 'from-blue-500 to-cyan-500' },
                  { label: 'CO₂ Saved', value: `${userProfile.stats.co2Saved}t`, icon: Leaf, color: 'from-purple-500 to-indigo-500' },
                  { label: 'Days Active', value: userProfile.stats.daysActive.toString(), icon: TrendingUp, color: 'from-orange-500 to-red-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Badges */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userProfile.badges.slice(0, 4).map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-br ${getRarityColor(badge.rarity)} p-4 rounded-xl text-white text-center relative overflow-hidden`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h4 className="font-semibold text-sm">{badge.name}</h4>
                      <p className="text-xs opacity-90 mt-1">{badge.description}</p>
                      {badge.progress && badge.maxProgress && (
                        <div className="mt-2">
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <div
                              className="bg-white h-2 rounded-full"
                              style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs mt-1">{badge.progress}/{badge.maxProgress}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {userProfile.achievements.map((achievement, index) => {
                const IconComponent = getCategoryIcon(achievement.category);
                const progress = calculateProgress(achievement.progress, achievement.maxProgress);
                const isCompleted = achievement.completedAt !== undefined;

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600">
                              {achievement.points} pts
                            </span>
                            {isCompleted && (
                              <Medal className="h-5 w-5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-2 rounded-full ${
                                  isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                              />
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {achievement.progress} / {achievement.maxProgress}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    entry.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-white ${
                      entry.rank === 1 ? 'bg-yellow-500' :
                      entry.rank === 2 ? 'bg-gray-400' :
                      entry.rank === 3 ? 'bg-orange-600' :
                      'bg-gray-300'
                    }`}>
                      {entry.rank <= 3 ? (
                        entry.rank === 1 ? <Crown className="h-6 w-6" /> :
                        <Medal className="h-6 w-6" />
                      ) : (
                        entry.rank
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{entry.user.avatar}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">{entry.user.name}</h4>
                            <p className="text-sm text-gray-600">Level {entry.user.level}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">
                            {entry.points.toLocaleString()} pts
                          </p>
                          <div className={`flex items-center text-sm ${
                            entry.change > 0 ? 'text-green-600' :
                            entry.change < 0 ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {entry.change > 0 && '↗'}
                            {entry.change < 0 && '↘'}
                            {entry.change === 0 && '→'}
                            <span className="ml-1">
                              {entry.change === 0 ? 'No change' : `${Math.abs(entry.change)} ${entry.change > 0 ? 'up' : 'down'}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && newReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRewardModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">New Badge Earned!</h3>
              
              <div className={`bg-gradient-to-br ${getRarityColor(newReward.rarity)} p-6 rounded-xl text-white mx-auto w-32 h-32 flex flex-col items-center justify-center mb-4`}>
                <div className="text-4xl mb-2">{newReward.icon}</div>
                <h4 className="font-semibold text-sm">{newReward.name}</h4>
              </div>
              
              <p className="text-gray-600 mb-6">{newReward.description}</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRewardModal(false)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Awesome!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationSystem;