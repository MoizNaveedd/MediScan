import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, ScanLine, QrCode, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/scan', label: 'Scan', icon: ScanLine },
    { path: '/generate', label: 'Generate', icon: QrCode },
  ];
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-primary-500 rounded-xl"
            >
              <Pill className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-primary-700">
              Medi<span className="text-primary-500">Scan</span>
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                        : 'text-gray-600 hover:bg-primary-100 hover:text-primary-600'}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium hidden sm:block">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
