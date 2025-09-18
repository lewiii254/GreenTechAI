// 🔗 INTEGRATION POINT: Gamification Service for User Progress and Achievements

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  totalPoints: number;
  badges: string[];
  achievements: string[];
  stats: {
    wasteContributed: number;
    energyGenerated: number;
    co2Saved: number;
    daysActive: number;
    communityContributions: number;
  };
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: 'waste' | 'energy' | 'community' | 'streak' | 'level';
    value: number;
    operator: 'gte' | 'eq' | 'lte';
  }[];
  points: number;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  category: 'waste' | 'energy' | 'community' | 'environmental';
  requirements: {
    type: string;
    value: number;
  }[];
  points: number;
  icon: string;
}

class GamificationService {
  private readonly API_BASE = process.env.VITE_API_URL || 'http://localhost:3001/api';

  // 🔗 INTEGRATION POINT: Get user progress from your backend
  async getUserProgress(userId: string): Promise<UserProgress> {
    try {
      const response = await fetch(`${this.API_BASE}/gamification/users/${userId}/progress`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user progress: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user progress:', error);
      
      // Return mock data for development
      return {
        userId,
        level: 12,
        xp: 2450,
        totalPoints: 15680,
        badges: ['first-contribution', 'energy-generator', 'community-leader'],
        achievements: ['waste-warrior', 'energy-master'],
        stats: {
          wasteContributed: 485,
          energyGenerated: 1250,
          co2Saved: 1.8,
          daysActive: 45,
          communityContributions: 12
        }
      };
    }
  }

  // 🔗 INTEGRATION POINT: Update user progress when actions are performed
  async updateUserProgress(userId: string, action: {
    type: 'waste_contributed' | 'energy_generated' | 'community_action' | 'login';
    value: number;
    metadata?: any;
  }): Promise<{ 
    newLevel?: number; 
    newBadges?: string[]; 
    newAchievements?: string[]; 
    pointsEarned: number; 
  }> {
    try {
      const response = await fetch(`${this.API_BASE}/gamification/users/${userId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user progress: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update user progress:', error);
      
      // Return mock response for development
      return {
        pointsEarned: Math.floor(Math.random() * 100) + 10,
        newBadges: Math.random() > 0.8 ? ['weekly-champion'] : [],
        newAchievements: Math.random() > 0.9 ? ['eco-master'] : []
      };
    }
  }

  // 🔗 INTEGRATION POINT: Get leaderboard data
  async getLeaderboard(timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time' = 'weekly', limit = 10): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.API_BASE}/gamification/leaderboard?timeframe=${timeframe}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      
      // Return mock data for development
      return [
        { rank: 1, user: { name: 'Green Master', avatar: '🏆', level: 25 }, points: 45680, change: 2 },
        { rank: 2, user: { name: 'Eco Legend', avatar: '🌟', level: 22 }, points: 38920, change: -1 },
        { rank: 3, user: { name: 'Eco Warrior', avatar: '🌱', level: 12 }, points: 15680, change: 1 },
      ];
    }
  }

  // 🔗 INTEGRATION POINT: Get available badges and achievements
  async getBadgeDefinitions(): Promise<BadgeDefinition[]> {
    try {
      const response = await fetch(`${this.API_BASE}/gamification/badges`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch badge definitions: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch badge definitions:', error);
      return [];
    }
  }

  async getAchievementDefinitions(): Promise<AchievementDefinition[]> {
    try {
      const response = await fetch(`${this.API_BASE}/gamification/achievements`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch achievement definitions: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch achievement definitions:', error);
      return [];
    }
  }

  // Utility functions for XP and level calculations
  static calculateLevel(xp: number): number {
    // Level formula: level = floor(sqrt(xp / 100))
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }

  static calculateXPForLevel(level: number): number {
    // XP required for level: xp = (level - 1)^2 * 100
    return Math.pow(level - 1, 2) * 100;
  }

  static calculateXPToNextLevel(currentXP: number): number {
    const currentLevel = this.calculateLevel(currentXP);
    const nextLevelXP = this.calculateXPForLevel(currentLevel + 1);
    return nextLevelXP - currentXP;
  }

  // Point calculation based on actions
  static calculatePoints(action: string, value: number): number {
    const pointMultipliers = {
      waste_contributed: 2, // 2 points per kg
      energy_generated: 1, // 1 point per kWh
      community_action: 50, // 50 points per community contribution
      login: 10, // 10 points for daily login
      feedback_submitted: 25,
      new_location_suggested: 100,
    };

    return (pointMultipliers[action] || 1) * value;
  }

  // Badge checking logic
  static checkBadgeEligibility(userStats: UserProgress['stats'], badgeRequirements: BadgeDefinition['requirements']): boolean {
    return badgeRequirements.every(req => {
      const userValue = userStats[req.type as keyof typeof userStats] || 0;
      
      switch (req.operator) {
        case 'gte': return userValue >= req.value;
        case 'eq': return userValue === req.value;
        case 'lte': return userValue <= req.value;
        default: return false;
      }
    });
  }

  // Achievement progress calculation
  static calculateAchievementProgress(userStats: UserProgress['stats'], achievement: AchievementDefinition): number {
    const totalProgress = achievement.requirements.reduce((sum, req) => {
      const userValue = userStats[req.type as keyof typeof userStats] || 0;
      return sum + Math.min(userValue / req.value, 1);
    }, 0);

    return (totalProgress / achievement.requirements.length) * 100;
  }
}

export const gamificationService = new GamificationService();