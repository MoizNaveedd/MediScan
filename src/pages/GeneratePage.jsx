import { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, ChevronDown, Pill, Info } from 'lucide-react';
import QRGenerator from '../components/QRGenerator';
import { getAllDrugs } from '../data/drugs';

const GeneratePage = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const drugs = getAllDrugs();
  
  // Get current page URL for QR code base
  const baseUrl = window.location.origin;
  
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="min-h-screen px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary-100 rounded-2xl mb-4">
            <QrCode className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Generate QR Code</h1>
          <p className="text-gray-600">Select a medicine to generate its QR code for scanning</p>
        </motion.div>
        
        {/* Drug Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Medicine
          </label>
          
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-primary-400 transition-colors text-left"
            >
              {selectedDrug ? (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-xl">
                    <Pill className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{selectedDrug.name}</p>
                    <p className="text-sm text-gray-500">{selectedDrug.category}</p>
                  </div>
                </div>
              ) : (
                <span className="text-gray-400">Choose a medicine...</span>
              )}
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </motion.button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10"
              >
                {drugs.map((drug, index) => (
                  <motion.button
                    key={drug.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedDrug(drug);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-primary-50 transition-colors text-left ${
                      selectedDrug?.id === drug.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${
                      selectedDrug?.id === drug.id 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Pill className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{drug.name}</p>
                      <p className="text-sm text-gray-500">{drug.category}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {drug.doses.length} doses
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* QR Code Generator */}
        {selectedDrug ? (
          <QRGenerator drug={selectedDrug} baseUrl={baseUrl} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200"
          >
            <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Select a medicine above to generate its QR code</p>
          </motion.div>
        )}
        
        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex gap-4">
            <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">How to use the QR Code</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Download the QR code and print it on medicine packaging</li>
                <li>• When scanned, it will redirect to the medicine's detail page</li>
                <li>• The QR code contains a unique URL for this specific medicine</li>
                <li>• Use the copy button to share the direct link</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GeneratePage;
