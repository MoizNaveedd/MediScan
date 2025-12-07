import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, Shield, ArrowRight } from 'lucide-react';

const DrugCard = ({ drug }) => {
  return (
    <Link to={`/drug/${drug.id}`}>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer group"
      >
        <div className="flex items-start gap-4">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="p-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl shadow-lg"
          >
            <Pill className="w-6 h-6 text-white" />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                {drug.name}
              </h3>
              {drug.authenticityVerified && (
                <Shield className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <p className="text-sm text-gray-500 mb-3">{drug.category}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {drug.doses.slice(0, 3).map((dose, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary-50 text-primary-600 rounded-lg text-xs font-medium"
                >
                  {dose.strength}
                </span>
              ))}
            </div>
            
            <div className="flex items-center text-primary-500 text-sm font-medium group-hover:text-primary-600">
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DrugCard;
