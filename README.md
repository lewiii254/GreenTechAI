# 🌱 GreenAI - Waste-to-Energy Optimization Platform

<div align="center">

![GreenAI Logo](https://via.placeholder.com/200x80/10B981/FFFFFF?text=GreenAI)

**Turning Waste Into Energy With AI**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [🤖 ML Model Integration](#-ml-model-integration)
- [🔌 API Integration Guide](#-api-integration-guide)
- [🗺️ External Services Setup](#️-external-services-setup)
- [📁 Project Structure](#-project-structure)
- [🔗 Integration Points](#-integration-points)
- [🛠️ Development Workflow](#️-development-workflow)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## 🎯 Project Overview

GreenAI is an AI-powered waste-to-energy optimization platform that helps communities transform waste into clean, renewable energy. The platform combines machine learning algorithms with an intuitive React frontend to provide intelligent waste management solutions.

### 🎨 Design Philosophy
- **Eco-friendly UI**: Green/blue color palette reflecting environmental consciousness
- **Mobile-first**: Responsive design optimized for all devices
- **Accessibility**: WCAG 2.1 compliant with proper contrast ratios
- **Performance**: Optimized bundle size and lazy loading

---

## ✨ Features

### 🏠 **Landing Page**
- Compelling branding with animated hero section
- Clear value proposition and call-to-action
- Feature highlights with smooth animations

### 🗣️ **AI Query Interface**
- **Text Input**: Natural language processing for waste optimization queries
- **Voice Input**: Web Speech API integration for hands-free interaction
- **Voice Output**: Text-to-speech responses using ElevenLabs API
- **Chat Interface**: Styled conversation bubbles with typing indicators

### 🗺️ **Interactive Map**
- Real-time waste collection points visualization
- Nearest point highlighting with ML-powered recommendations
- Google Maps integration with directions
- Capacity and efficiency metrics display

### 📊 **Insights Dashboard**
- **Waste Analytics**: Weekly generation trends and patterns
- **Energy Metrics**: Predicted output and conversion efficiency
- **Impact Visualization**: CO₂ reduction and environmental benefits
- **Interactive Charts**: Built with Recharts for responsive data display

### 👥 **Community Engagement**
- FAQ section with expandable answers
- Feedback form for community suggestions
- New waste point reporting system
- Community statistics and engagement metrics

### 🔔 **Smart Notifications & Alerts**
- Real-time notifications for waste collection schedules
- Energy generation milestone alerts
- Community updates and announcements
- Achievement and badge notifications
- Customizable notification preferences
- Web push notifications support

### 🏆 **Gamification & Rewards System**
- User profiles with levels and XP progression
- Achievement badges with different rarities
- Leaderboards with weekly/monthly rankings
- Point-based reward system
- Progress tracking for environmental impact
- Community challenges and competitions

---

## 🏗️ Architecture

```mermaid
graph TB
    A[React Frontend] --> B[API Gateway]
    B --> C[Python ML Backend]
    B --> D[Node.js API Server]
    C --> E[ML Models]
    C --> F[Data Processing]
    D --> G[Database]
    D --> H[External APIs]
    H --> I[Google Maps]
    H --> J[ElevenLabs]
    H --> K[Weather API]
```

### 🔄 Data Flow
1. **User Input** → Frontend captures text/voice queries
2. **API Gateway** → Routes requests to appropriate services
3. **ML Processing** → Python backend processes waste optimization
4. **Data Storage** → Results stored in database
5. **Real-time Updates** → WebSocket connections for live data
6. **External Integration** → Maps, voice synthesis, and weather data

---

## 🚀 Quick Start

### 📋 Prerequisites

```bash
# Required versions
Node.js >= 18.0.0
npm >= 9.0.0
Python >= 3.8
Git >= 2.30.0
```

### 🛠️ Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/greenai-frontend.git
cd greenai-frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your API keys
nano .env.local
```

4. **Start Development Server**
```bash
npm run dev
```

5. **Open in Browser**
```
http://localhost:5173
```

---

## 🤖 ML Model Integration

### 📂 Repository Structure

Your Python ML model should be structured as follows:

```
ml-waste-optimization/
├── models/
│   ├── waste_classifier.pkl
│   ├── energy_predictor.pkl
│   └── optimization_model.pkl
├── src/
│   ├── data_processing.py
│   ├── model_inference.py
│   └── api_server.py
├── requirements.txt
└── README.md
```

### 🔧 Step 1: Set Up Python Backend

Create a Flask/FastAPI server in your ML repository:

```python
# ml-waste-optimization/src/api_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from data_processing import preprocess_waste_data
from model_inference import predict_energy_output

app = Flask(__name__)
CORS(app)

# Load pre-trained models
waste_classifier = joblib.load('../models/waste_classifier.pkl')
energy_predictor = joblib.load('../models/energy_predictor.pkl')

@app.route('/api/analyze-waste', methods=['POST'])
def analyze_waste():
    """Analyze waste composition and predict energy output"""
    try:
        data = request.json
        
        # Process input data
        processed_data = preprocess_waste_data(data)
        
        # Make predictions
        waste_classification = waste_classifier.predict(processed_data)
        energy_prediction = energy_predictor.predict(processed_data)
        
        return jsonify({
            'waste_type': waste_classification.tolist(),
            'predicted_energy': float(energy_prediction[0]),
            'efficiency_score': calculate_efficiency(processed_data),
            'recommendations': generate_recommendations(waste_classification)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/optimize-collection', methods=['POST'])
def optimize_collection():
    """Optimize waste collection routes"""
    try:
        data = request.json
        
        # Your optimization logic here
        optimized_routes = optimize_routes(data['locations'])
        
        return jsonify({
            'optimized_routes': optimized_routes,
            'estimated_savings': calculate_savings(optimized_routes),
            'collection_schedule': generate_schedule(optimized_routes)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### 🔧 Step 2: Create Frontend ML Service

Create a service file to communicate with your ML backend:

```typescript
// src/services/mlService.ts
const ML_API_BASE_URL = process.env.VITE_ML_API_URL || 'http://localhost:5000/api';

export interface WasteAnalysisRequest {
  wasteType: string;
  quantity: number;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
}

export interface WasteAnalysisResponse {
  waste_type: string[];
  predicted_energy: number;
  efficiency_score: number;
  recommendations: string[];
}

export interface CollectionOptimizationRequest {
  locations: Array<{
    id: string;
    lat: number;
    lng: number;
    wasteAmount: number;
  }>;
}

export interface CollectionOptimizationResponse {
  optimized_routes: Array<{
    route_id: string;
    locations: string[];
    estimated_time: number;
    fuel_savings: number;
  }>;
  estimated_savings: number;
  collection_schedule: Array<{
    location_id: string;
    pickup_time: string;
    priority: number;
  }>;
}

class MLService {
  private async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${ML_API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`ML API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async analyzeWaste(data: WasteAnalysisRequest): Promise<WasteAnalysisResponse> {
    return this.makeRequest<WasteAnalysisResponse>('/analyze-waste', data);
  }

  async optimizeCollection(data: CollectionOptimizationRequest): Promise<CollectionOptimizationResponse> {
    return this.makeRequest<CollectionOptimizationResponse>('/optimize-collection', data);
  }

  async getEnergyPrediction(wasteData: any): Promise<number> {
    const response = await this.analyzeWaste(wasteData);
    return response.predicted_energy;
  }

  async getOptimizationRecommendations(query: string): Promise<string> {
    // 🔗 INTEGRATION POINT: Replace with actual ML model query processing
    const mockResponse = await new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`Based on your query about "${query}", our AI recommends optimizing collection routes to increase efficiency by 23% and reduce costs by 15%.`);
      }, 1000);
    });
    
    return mockResponse;
  }
}

export const mlService = new MLService();
```

### 🔧 Step 3: Update React Components

Update your React components to use the ML service:

```typescript
// src/components/QuerySection.tsx - Integration Example
import { mlService } from '../services/mlService';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputText.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputText,
    sender: 'user',
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, userMessage]);
  setInputText('');
  setIsLoading(true);

  try {
    // 🔗 INTEGRATION POINT: Replace with actual ML service call
    const aiResponse = await mlService.getOptimizationRecommendations(inputText);
    
    const responseMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, responseMessage]);
    speakText(aiResponse);
  } catch (error) {
    console.error('ML Service Error:', error);
    // Handle error appropriately
  } finally {
    setIsLoading(false);
  }
};
```

### 🔧 Step 4: Environment Configuration

Add ML service configuration to your environment:

```bash
# .env.local
VITE_ML_API_URL=http://localhost:5000/api
VITE_ML_API_KEY=your_ml_api_key_here
```

---

## 🔌 API Integration Guide

### 🌐 Backend API Structure

Create a Node.js/Express backend to handle non-ML operations:

```javascript
// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Waste collection points API
app.get('/api/collection-points', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query;
    
    // 🔗 INTEGRATION POINT: Replace with your database query
    const points = await getCollectionPoints(lat, lng, radius);
    
    res.json({
      success: true,
      data: points,
      nearest: findNearestPoint(points, lat, lng)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Waste analytics API
app.get('/api/analytics/waste-trends', async (req, res) => {
  try {
    const { timeRange = 'week' } = req.query;
    
    // 🔗 INTEGRATION POINT: Replace with your analytics service
    const trends = await getWasteTrends(timeRange);
    
    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Community feedback API
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = req.body;
    
    // 🔗 INTEGRATION POINT: Save to your database
    const result = await saveFeedback(feedback);
    
    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: result.id
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Backend API running on port 3001');
});
```

### 🔧 Frontend API Service

Create a comprehensive API service for your React app:

```typescript
// src/services/apiService.ts
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api';

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'collection' | 'processing' | 'energy-plant';
  capacity: number;
  efficiency: number;
  distance?: number;
  isNearest?: boolean;
}

export interface WasteTrend {
  date: string;
  waste: number;
  energy: number;
  efficiency: number;
}

export interface FeedbackData {
  name: string;
  email: string;
  message: string;
  type: string;
}

class ApiService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Collection Points
  async getCollectionPoints(lat?: number, lng?: number, radius?: number): Promise<CollectionPoint[]> {
    const params = new URLSearchParams();
    if (lat) params.append('lat', lat.toString());
    if (lng) params.append('lng', lng.toString());
    if (radius) params.append('radius', radius.toString());

    return this.makeRequest<CollectionPoint[]>(`/collection-points?${params}`);
  }

  // Analytics
  async getWasteTrends(timeRange: 'week' | 'month' | 'year' = 'week'): Promise<WasteTrend[]> {
    return this.makeRequest<WasteTrend[]>(`/analytics/waste-trends?timeRange=${timeRange}`);
  }

  async getImpactMetrics(): Promise<any> {
    return this.makeRequest('/analytics/impact-metrics');
  }

  // Community
  async submitFeedback(feedback: FeedbackData): Promise<{ success: boolean; id: string }> {
    return this.makeRequest('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  async getFAQs(): Promise<any[]> {
    return this.makeRequest('/faqs');
  }
}

export const apiService = new ApiService();
```

---

## 🗺️ External Services Setup

### 🌍 Google Maps Integration

1. **Get API Key**
```bash
# Visit: https://console.cloud.google.com/apis/credentials
# Enable: Maps JavaScript API, Places API, Directions API
```

2. **Add to Environment**
```bash
# .env.local
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

3. **Install Google Maps Package**
```bash
npm install @googlemaps/js-api-loader
```

4. **Create Maps Service**
```typescript
// src/services/mapsService.ts
import { Loader } from '@googlemaps/js-api-loader';

class MapsService {
  private loader: Loader;
  private map: google.maps.Map | null = null;

  constructor() {
    this.loader = new Loader({
      apiKey: process.env.VITE_GOOGLE_MAPS_API_KEY!,
      version: 'weekly',
      libraries: ['places', 'geometry']
    });
  }

  async initializeMap(element: HTMLElement, center: { lat: number; lng: number }) {
    const google = await this.loader.load();
    
    this.map = new google.maps.Map(element, {
      center,
      zoom: 12,
      styles: [
        // Custom green theme styles
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ color: '#f5f5f5' }]
        }
      ]
    });

    return this.map;
  }

  async addMarkers(points: CollectionPoint[]) {
    if (!this.map) return;

    const google = await this.loader.load();
    
    points.forEach(point => {
      const marker = new google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: this.map,
        title: point.name,
        icon: {
          url: this.getMarkerIcon(point.type),
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: this.createInfoWindowContent(point)
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });
  }

  private getMarkerIcon(type: string): string {
    const icons = {
      collection: '/icons/truck-marker.png',
      processing: '/icons/factory-marker.png',
      'energy-plant': '/icons/energy-marker.png'
    };
    return icons[type] || '/icons/default-marker.png';
  }

  private createInfoWindowContent(point: CollectionPoint): string {
    return `
      <div class="p-4">
        <h3 class="font-bold text-lg">${point.name}</h3>
        <p class="text-gray-600">${point.address}</p>
        <div class="mt-2">
          <span class="text-sm">Capacity: ${point.capacity}%</span>
          <span class="text-sm ml-4">Efficiency: ${point.efficiency}%</span>
        </div>
        <button onclick="getDirections(${point.lat}, ${point.lng})" 
                class="mt-2 bg-green-500 text-white px-4 py-2 rounded">
          Get Directions
        </button>
      </div>
    `;
  }
}

export const mapsService = new MapsService();
```

### 🎤 ElevenLabs Voice Integration

1. **Get API Key**
```bash
# Visit: https://elevenlabs.io/
# Sign up and get your API key
```

2. **Add to Environment**
```bash
# .env.local
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_ELEVENLABS_VOICE_ID=your_preferred_voice_id
```

3. **Create Voice Service**
```typescript
// src/services/voiceService.ts
class VoiceService {
  private apiKey: string;
  private voiceId: string;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.apiKey = process.env.VITE_ELEVENLABS_API_KEY!;
    this.voiceId = process.env.VITE_ELEVENLABS_VOICE_ID!;
  }

  async synthesizeSpeech(text: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Voice synthesis error:', error);
      // Fallback to Web Speech API
      return this.fallbackToWebSpeech(text);
    }
  }

  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
      }

      const audioData = await this.audioContext.decodeAudioData(audioBuffer);
      const source = this.audioContext.createBufferSource();
      source.buffer = audioData;
      source.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }

  private async fallbackToWebSpeech(text: string): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
      }
      // Return empty buffer for consistency
      resolve(new ArrayBuffer(0));
    });
  }
}

export const voiceService = new VoiceService();
```

---

## 📁 Project Structure

```
greenai-frontend/
├── 📁 public/
│   ├── 🖼️ icons/
│   │   ├── truck-marker.png
│   │   ├── factory-marker.png
│   │   └── energy-marker.png
│   └── 📄 index.html
├── 📁 src/
│   ├── 📁 components/           # React Components
│   │   ├── 🏠 Header.tsx
│   │   ├── 🌟 LandingPage.tsx
│   │   ├── 💬 QuerySection.tsx
│   │   ├── 🗺️ MapSection.tsx
│   │   ├── 📊 InsightsDashboard.tsx
│   │   └── 👥 CommunitySection.tsx
│   ├── 📁 services/            # API & External Services
│   │   ├── 🤖 mlService.ts     # ML Model Integration
│   │   ├── 🌐 apiService.ts    # Backend API Calls
│   │   ├── 🗺️ mapsService.ts   # Google Maps Integration
│   │   └── 🎤 voiceService.ts  # ElevenLabs Voice Synthesis
│   ├── 📁 hooks/               # Custom React Hooks
│   │   ├── useGeolocation.ts
│   │   ├── useVoiceRecognition.ts
│   │   └── useWebSocket.ts
│   ├── 📁 types/               # TypeScript Definitions
│   │   ├── api.ts
│   │   ├── ml.ts
│   │   └── maps.ts
│   ├── 📁 utils/               # Utility Functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   ├── 🎨 App.tsx              # Main App Component
│   ├── 🎨 main.tsx             # React Entry Point
│   └── 🎨 index.css            # Global Styles
├── 📄 package.json
├── 📄 tailwind.config.js
├── 📄 vite.config.ts
├── 📄 tsconfig.json
├── 📄 .env.example
└── 📖 README.md
```

---

## 🔗 Integration Points

### 🤖 ML Model Integration Points

#### 1. **Query Processing** (`src/components/QuerySection.tsx`)
```typescript
// 🔗 INTEGRATION POINT: Line 89-95
const handleSubmit = async (e: React.FormEvent) => {
  // Replace simulateAIResponse with actual ML service call
  const aiResponse = await mlService.getOptimizationRecommendations(inputText);
  // Process and display response
};
```

#### 2. **Waste Analysis** (`src/components/InsightsDashboard.tsx`)
```typescript
// 🔗 INTEGRATION POINT: Line 45-60
useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      // Replace mock data with ML predictions
      const trends = await mlService.getWasteTrends(timeRange);
      const predictions = await mlService.getEnergyPredictions();
      setAnalyticsData({ trends, predictions });
    } catch (error) {
      console.error('Analytics fetch error:', error);
    }
  };
  fetchAnalytics();
}, [timeRange]);
```

#### 3. **Collection Optimization** (`src/components/MapSection.tsx`)
```typescript
// 🔗 INTEGRATION POINT: Line 78-85
const optimizeRoutes = async (userLocation: Location) => {
  try {
    // Replace mock data with ML optimization
    const optimization = await mlService.optimizeCollection({
      userLocation,
      collectionPoints: wastePoints
    });
    setOptimizedRoutes(optimization.routes);
  } catch (error) {
    console.error('Route optimization error:', error);
  }
};
```

### 🌐 Backend API Integration Points

#### 1. **Collection Points** (`src/services/apiService.ts`)
```typescript
// 🔗 INTEGRATION POINT: Replace with your database
async getCollectionPoints(lat?: number, lng?: number): Promise<CollectionPoint[]> {
  // Connect to your PostgreSQL/MongoDB database
  // Query collection points based on location
  return this.makeRequest<CollectionPoint[]>('/collection-points');
}
```

#### 2. **Real-time Updates** (`src/hooks/useWebSocket.ts`)
```typescript
// 🔗 INTEGRATION POINT: WebSocket connection for live data
export const useWebSocket = (url: string) => {
  useEffect(() => {
    // Connect to your WebSocket server for real-time updates
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle real-time waste collection updates
    };
  }, [url]);
};
```

### 🗺️ External Service Integration Points

#### 1. **Google Maps** (`src/components/MapSection.tsx`)
```typescript
// 🔗 INTEGRATION POINT: Line 125-140
useEffect(() => {
  const initializeMap = async () => {
    if (mapRef.current) {
      // Replace with your Google Maps API key
      const map = await mapsService.initializeMap(mapRef.current, userLocation);
      await mapsService.addMarkers(wastePoints);
    }
  };
  initializeMap();
}, [userLocation, wastePoints]);
```

#### 2. **Voice Synthesis** (`src/components/QuerySection.tsx`)
```typescript
// 🔗 INTEGRATION POINT: Line 156-165
const speakText = async (text: string) => {
  try {
    // Replace with ElevenLabs API integration
    const audioBuffer = await voiceService.synthesizeSpeech(text);
    await voiceService.playAudio(audioBuffer);
  } catch (error) {
    // Fallback to Web Speech API
    console.error('Voice synthesis error:', error);
  }
};
```

---

## 🛠️ Development Workflow

### 🔄 Multi-Service Development

1. **Start ML Backend**
```bash
# Terminal 1: ML Service
cd ../ml-waste-optimization
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/api_server.py
```

2. **Start Node.js Backend**
```bash
# Terminal 2: Backend API
cd ../backend
npm install
npm run dev
```

3. **Start React Frontend**
```bash
# Terminal 3: Frontend
npm run dev
```

### 🧪 Testing Integration

```bash
# Test ML service connection
curl -X POST http://localhost:5000/api/analyze-waste \
  -H "Content-Type: application/json" \
  -d '{"wasteType": "organic", "quantity": 10}'

# Test backend API
curl http://localhost:3001/api/collection-points

# Run frontend tests
npm run test
```

### 🔍 Environment Variables

Create comprehensive environment configuration:

```bash
# .env.local
# API Endpoints
VITE_API_URL=http://localhost:3001/api
VITE_ML_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:3001

# External Services
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_ELEVENLABS_VOICE_ID=your_voice_id

# Feature Flags
VITE_ENABLE_VOICE_SYNTHESIS=true
VITE_ENABLE_REAL_TIME_UPDATES=true
VITE_DEBUG_MODE=true
```

---

## 🚢 Deployment

### 🐳 Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "run", "preview"]
```

### 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to your hosting service
# (Vercel, Netlify, AWS, etc.)
```

### 🌐 Environment-Specific Configs

```bash
# .env.production
VITE_API_URL=https://api.greenai.com
VITE_ML_API_URL=https://ml.greenai.com
VITE_WS_URL=wss://api.greenai.com
```

---

## 🤝 Contributing

### 📋 Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow ESLint and Prettier configurations
   - Write meaningful commit messages

2. **Component Structure**
   - Keep components under 200 lines
   - Use custom hooks for complex logic
   - Implement proper error boundaries

3. **Testing**
   - Write unit tests for utilities
   - Integration tests for API services
   - E2E tests for critical user flows

### 🔄 Pull Request Process

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📞 Support & Contact

- **Documentation**: [docs.greenai.com](https://docs.greenai.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/greenai-frontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/greenai-frontend/discussions)
- **Email**: support@greenai.com

---

<div align="center">

**Built with ❤️ for a sustainable future**

[⭐ Star this repo](https://github.com/yourusername/greenai-frontend) | [🐛 Report Bug](https://github.com/yourusername/greenai-frontend/issues) | [💡 Request Feature](https://github.com/yourusername/greenai-frontend/issues)

</div>