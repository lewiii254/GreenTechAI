import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Send, Users, Heart } from 'lucide-react';
import GamificationSystem from './GamificationSystem';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const CommunitySection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '', type: 'suggestion' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How does AI optimize waste-to-energy conversion?',
      answer: 'Our AI algorithms analyze waste composition, volume patterns, and energy demand to optimize sorting, processing timing, and conversion parameters. This increases efficiency by up to 25% compared to traditional methods.'
    },
    {
      id: '2',
      question: 'What types of waste can be converted to energy?',
      answer: 'We can process organic waste, paper products, certain plastics, and biomass materials. Our AI helps determine the optimal energy conversion method for each waste type, including anaerobic digestion, gasification, and thermal conversion.'
    },
    {
      id: '3',
      question: 'How much energy can be generated from household waste?',
      answer: 'On average, 1 ton of mixed household waste can generate 500-600 kWh of electricity. However, our AI optimization can increase this by 15-30% through better sorting and processing techniques.'
    },
    {
      id: '4',
      question: 'Is waste-to-energy environmentally safe?',
      answer: 'Yes, modern waste-to-energy processes are highly regulated and emit fewer pollutants than landfills. Our AI monitoring ensures optimal combustion conditions, minimizing emissions while maximizing energy output.'
    },
    {
      id: '5',
      question: 'How can I contribute waste to the energy program?',
      answer: 'Use our map feature to find the nearest collection point. Our AI will analyze your waste profile and suggest the best drop-off location and timing for maximum energy conversion efficiency.'
    },
  ];

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFeedback({ name: '', email: '', message: '', type: 'suggestion' });
    setIsSubmitting(false);
    alert('Thank you for your feedback! We\'ll review it and get back to you soon.');
  };

  const communityStats = [
    { icon: Users, label: 'Community Members', value: '12,847' },
    { icon: Heart, label: 'Waste Points Added', value: '342' },
    { icon: MessageCircle, label: 'Feedback Received', value: '1,205' },
  ];

  return (
    <section id="community" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Community <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Engagement</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community in building a sustainable future. Share knowledge, provide feedback, and help optimize our waste-to-energy network.
          </p>
        </motion.div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center border border-white/20"
            >
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gamification System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 mb-12"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Your Impact & Achievements</h3>
            <GamificationSystem />
          </motion.div>

          {/* FAQs Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 bg-gray-50">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">Share Your Feedback</h3>
            
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={feedback.name}
                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={feedback.email}
                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Type
                </label>
                <select
                  id="type"
                  value={feedback.type}
                  onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="suggestion">Suggestion</option>
                  <option value="new-location">New Waste Point</option>
                  <option value="improvement">Improvement</option>
                  <option value="bug">Report Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Share your thoughts, suggestions, or report new waste collection points..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;