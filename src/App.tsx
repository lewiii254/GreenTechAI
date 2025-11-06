import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import ToolsPage from './pages/ToolsPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  useEffect(() => {
    // Update page title
    document.title = 'GreenAI - Turning Waste Into Energy With AI';
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/community" element={<CommunityPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-12"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="bg-gradient-to-br from-green-400 to-blue-400 p-2 rounded-lg">
                      <div className="h-6 w-6 bg-white rounded opacity-80"></div>
                    </div>
                    <span className="text-2xl font-bold">GreenAI</span>
                  </div>
                  <p className="text-green-100 leading-relaxed max-w-md">
                    Transforming waste into energy through AI-powered optimization. 
                    Building a sustainable future for communities worldwide.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Features</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>AI Optimization</li>
                    <li>Smart Collection</li>
                    <li>Energy Analytics</li>
                    <li>Community Network</li>
                    <li>Weather Impact</li>
                    <li>Carbon Calculator</li>
                    <li>AI Predictions</li>
                    <li>Challenges & Rewards</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>Documentation</li>
                    <li>Contact Us</li>
                    <li>Community</li>
                    <li>Feedback</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
                <p>&copy; 2025 GreenAI. Powered by sustainable technology and community collaboration.</p>
              </div>
            </div>
          </motion.footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;