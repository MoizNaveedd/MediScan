import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine, Search, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Scanner from '../components/Scanner';
import { getDrugById, getAllDrugs } from '../data/drugs';

const ScanPage = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [error, setError] = useState(null);
  
  const handleScan = (result) => {
    try {
      // Try to extract drug ID from scanned URL or direct ID
      let drugId = result;
      
      // Check if it's a URL
      if (result.includes('/drug/')) {
        drugId = result.split('/drug/').pop();
      }
      
      // Check if drug exists
      const drug = getDrugById(drugId);
      
      if (drug) {
        setScanResult({ success: true, drug });
        setError(null);
        // Auto navigate after short delay
        setTimeout(() => {
          navigate(`/drug/${drugId}`);
        }, 1500);
      } else {
        setScanResult({ success: false, message: "Drug not found in database" });
        setError("The scanned QR code doesn't match any medicine in our database.");
      }
    } catch (err) {
      setError("Invalid QR code format");
    }
  };
  
  const handleManualSearch = (e) => {
    e.preventDefault();
    const drugs = getAllDrugs();
    const searchTerm = manualInput.toLowerCase().trim();
    
    // Search by ID or name
    const found = drugs.find(
      drug => 
        drug.id.toLowerCase().includes(searchTerm) || 
        drug.name.toLowerCase().includes(searchTerm)
    );
    
    if (found) {
      navigate(`/drug/${found.id}`);
    } else {
      setError("No medicine found with that name or ID");
    }
  };

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
            <ScanLine className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Scan Medicine QR Code</h1>
          <p className="text-gray-600">Point your camera at the QR code on the medicine package</p>
        </motion.div>
        
        {/* Scanner Component */}
        <Scanner onScan={handleScan} onError={(err) => setError(err.message)} />
        
        {/* Scan Result */}
        {scanResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 rounded-2xl ${
              scanResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-4">
              {scanResult.success ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-green-800 text-lg">Medicine Found!</h3>
                    <p className="text-green-700">{scanResult.drug.name}</p>
                    <p className="text-green-600 text-sm mt-1">Redirecting to details...</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-800 text-lg">Not Found</h3>
                    <p className="text-red-600">{scanResult.message}</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Error Message */}
        {error && !scanResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600"
          >
            {error}
          </motion.div>
        )}
        
        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 text-gray-500">or search manually</span>
          </div>
        </div>
        
        {/* Manual Search */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleManualSearch}
          className="relative"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter medicine name or ID..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none transition-colors text-gray-700"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 bg-primary-500 text-white rounded-2xl hover:bg-primary-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.form>
        
        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <p className="text-gray-500 text-sm mb-3">Quick access:</p>
          <div className="flex flex-wrap gap-2">
            {getAllDrugs().map(drug => (
              <motion.button
                key={drug.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/drug/${drug.id}`)}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600 transition-colors"
              >
                {drug.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScanPage;
