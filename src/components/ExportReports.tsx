import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, FileSpreadsheet, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

type ReportType = 'impact' | 'analytics' | 'collection' | 'energy';
type Format = 'pdf' | 'csv' | 'json';

interface ReportConfig {
  type: ReportType;
  format: Format;
  dateRange: 'week' | 'month' | 'quarter' | 'year';
  includeSections: string[];
}

const ExportReports: React.FC = () => {
  const [config, setConfig] = useState<ReportConfig>({
    type: 'impact',
    format: 'pdf',
    dateRange: 'month',
    includeSections: ['summary', 'charts', 'recommendations'],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'impact', label: 'Environmental Impact', icon: '🌍' },
    { value: 'analytics', label: 'Waste Analytics', icon: '📊' },
    { value: 'collection', label: 'Collection Statistics', icon: '🚛' },
    { value: 'energy', label: 'Energy Generation', icon: '⚡' },
  ];

  const availableSections = {
    impact: ['summary', 'charts', 'carbon-savings', 'recommendations'],
    analytics: ['summary', 'charts', 'trends', 'predictions'],
    collection: ['summary', 'routes', 'efficiency', 'schedule'],
    energy: ['summary', 'output', 'efficiency', 'forecast'],
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, this would call an API to generate the report
    const reportData = {
      ...config,
      generatedAt: new Date().toISOString(),
      data: getMockReportData(),
    };

    if (config.format === 'csv') {
      downloadCSV(reportData);
    } else if (config.format === 'json') {
      downloadJSON(reportData);
    } else {
      // For PDF, we'd typically use a library like jsPDF
      toast.success('PDF report generated! (Demo mode - actual PDF generation would happen here)');
    }

    setIsGenerating(false);
    toast.success(`${config.format.toUpperCase()} report generated successfully!`);
  };

  const getMockReportData = () => {
    return {
      summary: {
        totalWaste: 126,
        energyGenerated: 295,
        carbonSaved: 2.4,
        efficiency: 89.2,
      },
      period: config.dateRange,
      trends: [
        { date: '2025-01-01', waste: 12, energy: 28 },
        { date: '2025-01-02', waste: 15, energy: 35 },
        { date: '2025-01-03', waste: 18, energy: 42 },
      ],
    };
  };

  const downloadCSV = (data: any) => {
    const csvContent = convertToCSV(data.data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    downloadFile(blob, `greenai-report-${Date.now()}.csv`);
  };

  const downloadJSON = (data: any) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    downloadFile(blob, `greenai-report-${Date.now()}.json`);
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any) => {
    let csv = 'Metric,Value\n';
    csv += `Total Waste,${data.summary.totalWaste} tons\n`;
    csv += `Energy Generated,${data.summary.energyGenerated} kWh\n`;
    csv += `Carbon Saved,${data.summary.carbonSaved} tons\n`;
    csv += `Efficiency,${data.summary.efficiency}%\n`;
    csv += '\nDate,Waste (tons),Energy (kWh)\n';
    data.trends.forEach((row: any) => {
      csv += `${row.date},${row.waste},${row.energy}\n`;
    });
    return csv;
  };

  const toggleSection = (section: string) => {
    setConfig(prev => ({
      ...prev,
      includeSections: prev.includeSections.includes(section)
        ? prev.includeSections.filter(s => s !== section)
        : [...prev.includeSections, section],
    }));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Download className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Export Reports
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate comprehensive reports of your environmental impact and analytics
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Report Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {reportTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setConfig({ ...config, type: type.value as ReportType })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    config.type === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-gray-800">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Export Format
            </label>
            <div className="flex space-x-3">
              {(['pdf', 'csv', 'json'] as Format[]).map(format => (
                <button
                  key={format}
                  onClick={() => setConfig({ ...config, format })}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold uppercase transition-all ${
                    config.format === format
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {format === 'pdf' && <FileText className="w-4 h-4 inline mr-2" />}
                  {format === 'csv' && <FileSpreadsheet className="w-4 h-4 inline mr-2" />}
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date Range
            </label>
            <select
              value={config.dateRange}
              onChange={(e) => setConfig({ ...config, dateRange: e.target.value as any })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          {/* Include Sections */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Include Sections
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableSections[config.type].map(section => (
                <button
                  key={section}
                  onClick={() => toggleSection(section)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    config.includeSections.includes(section)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <CheckCircle
                      className={`w-5 h-5 mr-2 ${
                        config.includeSections.includes(section)
                          ? 'text-green-600'
                          : 'text-gray-400'
                      }`}
                    />
                    <span className="font-medium text-gray-700 capitalize">
                      {section.replace('-', ' ')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateReport}
            disabled={isGenerating || config.includeSections.length === 0}
            className={`w-full py-4 rounded-lg font-bold text-white transition-all ${
              isGenerating || config.includeSections.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Generating Report...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Generate & Download Report
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExportReports;
