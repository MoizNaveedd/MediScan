import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScanLine, QrCode, Shield, Pill, Heart, Stethoscope } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen px-4 py-8"
    >
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Verified Medicine Scanner</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Scan & Verify Your
              <span className="text-primary-500 block">Medicine Instantly</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              MediScan helps pharmacy students and healthcare professionals verify medicine authenticity 
              and access detailed drug information through QR code scanning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/scan">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors"
                >
                  <ScanLine className="w-5 h-5" />
                  Start Scanning
                </motion.button>
              </Link>
              <Link to="/generate">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-primary-200 hover:border-primary-400 transition-colors"
                >
                  <QrCode className="w-5 h-5" />
                  Generate QR
                </motion.button>
              </Link>
            </div>
          </motion.div>
          
          {/* Right Illustration */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Background circles */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl opacity-40"
              />
              
              {/* Main card */}
              <motion.div 
                animate={floatingAnimation}
                className="relative glass rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="p-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-lg"
                  >
                    <Pill className="w-16 h-16 text-white" />
                  </motion.div>
                </div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-primary-200 rounded-full w-3/4 mx-auto" />
                  <div className="h-4 bg-primary-100 rounded-full w-1/2 mx-auto" />
                  <div className="flex justify-center gap-2 mt-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Verified</span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">Safe</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating icons */}
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 -right-4 p-3 bg-white rounded-2xl shadow-lg"
              >
                <Heart className="w-8 h-8 text-red-400" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 p-3 bg-white rounded-2xl shadow-lg"
              >
                <Stethoscope className="w-8 h-8 text-primary-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <motion.section variants={itemVariants} className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It <span className="text-primary-500">Works</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: QrCode,
              title: "Generate QR Code",
              description: "Select a medicine from our database and generate a unique QR code containing all drug information.",
              color: "from-blue-400 to-blue-600"
            },
            {
              icon: ScanLine,
              title: "Scan Medicine",
              description: "Use your camera to scan the QR code on the medicine package to instantly access drug details.",
              color: "from-primary-400 to-primary-600"
            },
            {
              icon: Shield,
              title: "Verify & Learn",
              description: "View comprehensive drug information including warnings, interactions, and dosage guidelines.",
              color: "from-green-400 to-green-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
            >
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        variants={itemVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-primary-500/30"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Verify Your Medicine?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Start scanning QR codes on medicine packages to access detailed drug information 
            and ensure authenticity.
          </p>
          <Link to="/scan">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
      
      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
        <p>© 2024 MediScan. Built for Pharmacy Students.</p>
      </footer>
    </motion.div>
  );
};

export default Home;
