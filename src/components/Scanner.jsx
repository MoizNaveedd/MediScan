import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { Camera, CameraOff, AlertCircle, RefreshCw } from 'lucide-react';

const Scanner = ({ onScan, onError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const html5QrCodeRef = useRef(null);
  const scannerContainerRef = useRef(null);

  const startScanner = async () => {
    try {
      setError(null);
      
      // Clean up any existing scanner
      if (html5QrCodeRef.current) {
        try {
          await html5QrCodeRef.current.stop();
          html5QrCodeRef.current.clear();
        } catch (e) {
          // Ignore stop errors
        }
      }

      const html5QrCode = new Html5Qrcode("qr-reader", { verbose: false });
      html5QrCodeRef.current = html5QrCode;

      // Get available cameras
      const cameras = await Html5Qrcode.getCameras();
      
      if (cameras && cameras.length === 0) {
        throw new Error("No cameras found on this device");
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore - QR not detected yet
        }
      );

      setIsScanning(true);
    } catch (err) {
      console.error("Scanner error:", err);
      let errorMsg = err.message || "Failed to access camera";
      if (err.name === "NotAllowedError") {
        errorMsg = "Camera permission denied. Please allow camera access in your browser settings.";
      } else if (err.name === "NotFoundError") {
        errorMsg = "No camera found on this device.";
      } else if (err.name === "NotReadableError") {
        errorMsg = "Camera is already in use by another application.";
      }
      setError(errorMsg);
      if (onError) onError(err);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Scanner Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        ref={scannerContainerRef}
      >
        {/* QR Reader Element - this is where the camera video will appear */}
        <div 
          id="qr-reader" 
          className="qr-reader-container"
          style={{ 
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            display: isScanning ? 'block' : 'none',
          }}
        />

        {/* Placeholder when not scanning */}
        {!isScanning && (
          <div className="w-full aspect-square max-w-md mx-auto flex items-center justify-center bg-gray-800 rounded-3xl">
            <div className="text-center p-8">
              {error ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-400"
                >
                  <AlertCircle className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Camera Error</p>
                  <p className="text-gray-400 text-sm mb-4">{error}</p>
                  <button
                    onClick={startScanner}
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-gray-400"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Camera className="w-20 h-20 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-xl font-medium text-white">Camera Ready</p>
                  <p className="text-sm mt-2 text-gray-400">Click the button below to start scanning</p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Scanning overlay with corner brackets */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-primary-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-primary-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary-400 rounded-br-lg" />
              
              {/* Scanning line animation */}
              <motion.div 
                animate={{ y: [0, 240, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Control Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex justify-center"
      >
        {isScanning ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopScanner}
            className="flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
          >
            <CameraOff className="w-5 h-5" />
            Stop Scanner
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startScanner}
            className="flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors"
          >
            <Camera className="w-5 h-5" />
            Start Scanner
          </motion.button>
        )}
      </motion.div>

      {/* Status indicator */}
      {isScanning && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary-600 bg-primary-50 px-4 py-2 rounded-full">
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <span className="font-medium">Camera active - Point at QR code</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Scanner;
