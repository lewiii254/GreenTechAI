import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Facebook, Twitter, Linkedin, Instagram, Copy, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareableData {
  carbonSaved: number;
  energyGenerated: number;
  wasteProcessed: number;
  treesEquivalent: number;
}

const SocialSharing: React.FC<{ data: ShareableData }> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    return `🌱 I've made a positive impact on the environment! 
    
✅ ${data.carbonSaved}kg CO₂ saved
⚡ ${data.energyGenerated} kWh energy generated
♻️ ${data.wasteProcessed} tons waste processed
🌳 Equivalent to planting ${data.treesEquivalent} trees

Join me in making the planet greener with @GreenAI! 🌍

#WasteToEnergy #Sustainability #ClimateAction`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnPlatform = (platform: string) => {
    const text = generateShareText();
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(shareUrl);

    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'instagram':
        toast.info('Instagram sharing works best from mobile app!');
        return;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
    toast.success(`Sharing to ${platform}!`);
  };

  const copyToClipboard = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Your Impact</span>
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Share Your Achievement</h2>
              <p className="text-gray-600 mb-6">
                Let others know about your positive environmental impact!
              </p>

              {/* Impact Preview */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{data.carbonSaved}kg</div>
                    <div className="text-sm text-gray-600">CO₂ Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{data.energyGenerated}</div>
                    <div className="text-sm text-gray-600">kWh Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{data.wasteProcessed}</div>
                    <div className="text-sm text-gray-600">Tons Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">{data.treesEquivalent}</div>
                    <div className="text-sm text-gray-600">Trees Planted</div>
                  </div>
                </div>
              </div>

              {/* Social Platforms */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => shareOnPlatform('facebook')}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="font-semibold">Share on Facebook</span>
                </button>

                <button
                  onClick={() => shareOnPlatform('twitter')}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="font-semibold">Share on Twitter</span>
                </button>

                <button
                  onClick={() => shareOnPlatform('linkedin')}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="font-semibold">Share on LinkedIn</span>
                </button>

                <button
                  onClick={() => shareOnPlatform('instagram')}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="font-semibold">Share on Instagram</span>
                </button>
              </div>

              {/* Copy to Clipboard */}
              <button
                onClick={copyToClipboard}
                className={`w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all ${
                  copied
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span className="font-semibold">Copy to Clipboard</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-4 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialSharing;
