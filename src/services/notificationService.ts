// 🔗 INTEGRATION POINT: Notification Service for Real-time Updates
export interface NotificationData {
  type: 'collection' | 'energy' | 'community' | 'achievement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  userId?: string;
}

class NotificationService {
  private subscribers: ((notification: NotificationData) => void)[] = [];
  private wsConnection: WebSocket | null = null;

  // 🔗 INTEGRATION POINT: Connect to your WebSocket server
  connect(userId: string) {
    const wsUrl = `${process.env.VITE_WS_URL || 'ws://localhost:3001'}/notifications?userId=${userId}`;
    
    try {
      this.wsConnection = new WebSocket(wsUrl);
      
      this.wsConnection.onopen = () => {
        console.log('Notification service connected');
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const notification: NotificationData = JSON.parse(event.data);
          this.notifySubscribers(notification);
        } catch (error) {
          console.error('Failed to parse notification:', error);
        }
      };

      this.wsConnection.onclose = () => {
        console.log('Notification service disconnected');
        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connect(userId), 5000);
      };

      this.wsConnection.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to notification service:', error);
    }
  }

  disconnect() {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  subscribe(callback: (notification: NotificationData) => void) {
    this.subscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers(notification: NotificationData) {
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification subscriber:', error);
      }
    });
  }

  // 🔗 INTEGRATION POINT: Send notification via API
  async sendNotification(notification: NotificationData): Promise<void> {
    try {
      const response = await fetch(`${process.env.VITE_API_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (!response.ok) {
        throw new Error(`Failed to send notification: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
      throw error;
    }
  }

  // 🔗 INTEGRATION POINT: Get user notifications from API
  async getUserNotifications(userId: string, limit = 50): Promise<any[]> {
    try {
      const response = await fetch(
        `${process.env.VITE_API_URL}/notifications/${userId}?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }

      const data = await response.json();
      return data.notifications || [];
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      return [];
    }
  }

  // 🔗 INTEGRATION POINT: Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.VITE_API_URL}/notifications/${notificationId}/read`,
        { method: 'PATCH' }
      );

      if (!response.ok) {
        throw new Error(`Failed to mark notification as read: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  }

  // Predefined notification templates
  static templates = {
    collectionReminder: (location: string, timeLeft: string): NotificationData => ({
      type: 'collection',
      title: 'Collection Reminder',
      message: `Collection at ${location} in ${timeLeft}. Don't miss it!`,
      priority: 'high',
      actionUrl: '#map'
    }),

    energyMilestone: (amount: number): NotificationData => ({
      type: 'energy',
      title: 'Energy Milestone Reached!',
      message: `Your community has generated ${amount} kWh this month! 🎉`,
      priority: 'medium',
      actionUrl: '#insights'
    }),

    newBadge: (badgeName: string): NotificationData => ({
      type: 'achievement',
      title: 'New Badge Earned!',
      message: `You've earned the "${badgeName}" badge!`,
      priority: 'medium',
      actionUrl: '#community'
    }),

    communityUpdate: (message: string): NotificationData => ({
      type: 'community',
      title: 'Community Update',
      message,
      priority: 'low',
      actionUrl: '#community'
    })
  };
}

export const notificationService = new NotificationService();