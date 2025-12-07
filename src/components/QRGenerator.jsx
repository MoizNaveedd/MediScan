import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const QRGenerator = ({ drug, baseUrl }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);
  
  const drugUrl = `${baseUrl}/drug/${drug.id}`;
  
  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    img.onload = () => {
      // Draw white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the QR code
      ctx.drawImage(img, 25, 25, 250, 250);
      
      // Add text at bottom
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(drug.name, canvas.width / 2, canvas.height - 10);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${drug.id}-qrcode.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(drugUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
    >
      {/* QR Code Display */}
      <div 
        ref={qrRef}
        className="flex justify-center mb-6"
      >
        <motion.div 
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="p-6 bg-white rounded-2xl shadow-lg border-4 border-primary-100"
        >
          <QRCodeSVG 
            value={drugUrl}
            size={200}
            level="H"
            includeMargin={true}
            fgColor="#0c4a6e"
            bgColor="#ffffff"
          />
        </motion.div>
      </div>
      
      {/* Drug Info */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">{drug.name}</h3>
        <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
          {drug.category}
        </span>
      </div>
      
      {/* URL Display */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <p className="text-xs text-gray-500 mb-1">QR Code URL:</p>
        <p className="text-sm text-gray-700 font-mono break-all">{drugUrl}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download PNG
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all ${
            copied 
              ? 'bg-green-50 border-green-400 text-green-600' 
              : 'border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QRGenerator;
