import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine, Search, CheckCircle, XCircle, ArrowRight, Key } from 'lucide-react';
import Scanner from '../components/Scanner';
import { getDrugById, getAllDrugs } from '../data/drugs';
import { incrementScanCount } from '../utils/scanTracker';

const ScanPage = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [scannedDrug, setScannedDrug] = useState(null);
  const [showSerialInput, setShowSerialInput] = useState(false);
  const [serialInput, setSerialInput] = useState('');
  const [serialError, setSerialError] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const [manualSerialInput, setManualSerialInput] = useState('');
  const [manualSerialError, setManualSerialError] = useState(null);
  const [selectedManualDrug, setSelectedManualDrug] = useState(null);
  const [showManualSerialInput, setShowManualSerialInput] = useState(false);
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
        setScannedDrug(drug);
        setScanResult({ success: true, drug });
        setError(null);
        // Show serial input screen instead of auto-navigating
        setShowSerialInput(true);
      } else {
        setScanResult({ success: false, message: "Drug not found in database" });
        setError("The scanned QR code doesn't match any medicine in our database.");
      }
    } catch (err) {
      setError("Invalid QR code format");
    }
  };

  const validateSerialNumber = (serial) => {
    const trimmedSerial = serial.trim().toUpperCase().replace(/\s/g, '');
    
    if (trimmedSerial.length !== 9) {
      return { valid: false, error: "Serial number must be exactly 9 characters (3 letters + 6 digits)" };
    }

    // Check format: 3 letters followed by 6 digits
    if (!/^[A-Z]{3}\d{6}$/.test(trimmedSerial)) {
      return { valid: false, error: "Serial number must be 3 letters followed by 6 digits (e.g., ABC123456)" };
    }

    return { valid: true, serial: trimmedSerial };
  };

  const handleSerialSubmit = (e, drug = null, isManual = false) => {
    e.preventDefault();
    const currentSerialInput = isManual ? manualSerialInput : serialInput;
    const currentDrug = drug || scannedDrug;
    
    if (isManual) {
      setManualSerialError(null);
    } else {
      setSerialError(null);
    }

    const validation = validateSerialNumber(currentSerialInput);
    
    if (!validation.valid) {
      if (isManual) {
        setManualSerialError(validation.error);
      } else {
        setSerialError(validation.error);
      }
      return;
    }

    const trimmedSerial = validation.serial;

    // Check if serial matches the drug's serial number
    if (currentDrug && currentDrug.serialNumber.toUpperCase() !== trimmedSerial) {
      const errorMsg = "Invalid serial number. Please check the code on the medicine package.";
      if (isManual) {
        setManualSerialError(errorMsg);
      } else {
        setSerialError(errorMsg);
      }
      return;
    }

    // Increment scan count
    incrementScanCount(trimmedSerial);

    // Navigate to drug details
    navigate(`/drug/${currentDrug.id}`, { state: { serialNumber: trimmedSerial } });
  };

  const handleSerialInputChange = (e, isManual = false) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); // Only allow letters and digits
    
    // Enforce format: first 3 must be letters, rest must be digits
    if (value.length > 0) {
      const letters = value.match(/^[A-Z]*/)?.[0] || '';
      const digits = value.replace(/^[A-Z]*/, '').replace(/\D/g, '');
      
      // Limit to 3 letters
      const limitedLetters = letters.substring(0, 3);
      // Limit to 6 digits
      const limitedDigits = digits.substring(0, 6);
      
      value = limitedLetters + limitedDigits;
    }
    
    if (value.length <= 9) {
      if (isManual) {
        setManualSerialInput(value);
        setManualSerialError(null);
      } else {
        setSerialInput(value);
        setSerialError(null);
      }
    }
  };

  const handleReset = () => {
    setShowSerialInput(false);
    setScannedDrug(null);
    setScanResult(null);
    setSerialInput('');
    setSerialError(null);
  };

  const handleManualReset = () => {
    setShowManualSerialInput(false);
    setSelectedManualDrug(null);
    setManualSerialInput('');
    setManualSerialError(null);
    setManualInput('');
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
      setSelectedManualDrug(found);
      setShowManualSerialInput(true);
      setError(null);
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
        {/* Serial Input Screen (from QR scan) */}
        {showSerialInput && scannedDrug ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-2xl mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicine Verified!</h1>
              <p className="text-gray-600 mb-1">{scannedDrug.name}</p>
              <p className="text-gray-500 text-sm">Please enter the 9-character serial number (3 letters + 6 digits)</p>
            </motion.div>

            {/* Serial Input Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
                    onSubmit={(e) => handleSerialSubmit(e, null, false)}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                    <Key className="w-5 h-5 text-primary-500" />
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={serialInput}
                    onChange={(e) => handleSerialInputChange(e, false)}
                    placeholder="ABC123456"
                    maxLength={9}
                    className="w-full px-6 py-4 text-2xl text-center tracking-widest rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none transition-colors font-mono uppercase"
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {serialInput.length}/9 characters (3 letters + 6 digits)
                  </p>
                </div>

                {serialError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600"
                  >
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{serialError}</p>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    type="button"
                    className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={serialInput.length !== 9}
                    className="flex-1 px-6 py-4 bg-primary-500 text-white rounded-2xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Verify & Continue
                  </motion.button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        ) : (
          <>
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
            
            {/* Scan Result (for errors only) */}
            {scanResult && !scanResult.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 rounded-2xl bg-red-50 border border-red-200"
              >
                <div className="flex items-start gap-4">
                  <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-800 text-lg">Not Found</h3>
                    <p className="text-red-600">{scanResult.message}</p>
                  </div>
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
          </>
        )}
        
        {/* Manual Serial Input Screen */}
        {showManualSerialInput && selectedManualDrug ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center p-4 bg-primary-100 rounded-2xl mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Medicine Selected</h1>
              <p className="text-gray-600 mb-1">{selectedManualDrug.name}</p>
              <p className="text-gray-500 text-sm">Please enter the 9-character serial number (3 letters + 6 digits)</p>
            </motion.div>

            {/* Serial Input Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={(e) => handleSerialSubmit(e, selectedManualDrug, true)}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
                    <Key className="w-5 h-5 text-primary-500" />
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={manualSerialInput}
                    onChange={(e) => handleSerialInputChange(e, true)}
                    placeholder="ABC123456"
                    maxLength={9}
                    className="w-full px-6 py-4 text-2xl text-center tracking-widest rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none transition-colors font-mono uppercase"
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {manualSerialInput.length}/9 characters (3 letters + 6 digits)
                  </p>
                </div>

                {manualSerialError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600"
                  >
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{manualSerialError}</p>
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleManualReset}
                    className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={manualSerialInput.length !== 9}
                    className="flex-1 px-6 py-4 bg-primary-500 text-white rounded-2xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    Verify & Continue
                  </motion.button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        ) : (
          <>
            {/* Only show manual search and quick links when not in serial input mode */}
            {!showSerialInput && (
          <>
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
                    onClick={() => {
                      setSelectedManualDrug(drug);
                      setShowManualSerialInput(true);
                    }}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600 transition-colors"
                  >
                    {drug.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ScanPage;
