import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  Pill, 
  Calendar, 
  Package,
  Clock,
  Utensils,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { getDrugById } from '../data/drugs';

const DrugInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    warnings: true,
    regimen: false,
    foodInteractions: false,
    drugInteractions: true
  });
  
  const drug = getDrugById(id);
  
  if (!drug) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Medicine Not Found</h1>
          <p className="text-gray-600 mb-6">The medicine you're looking for doesn't exist in our database.</p>
          <Link to="/scan">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Back to Scanner
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getUsefulBadge = (useful) => {
    if (useful === "Useful") {
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Useful</span>;
    } else if (useful === "Useful (but risky)") {
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Useful (Risky)</span>;
    } else {
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">Not Useful</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </motion.button>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Card */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl mb-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Drug Icon */}
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="flex-shrink-0 p-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-lg self-start"
              >
                <Pill className="w-12 h-12 text-white" />
              </motion.div>
              
              {/* Drug Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-800">{drug.name}</h1>
                  {drug.authenticityVerified && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full"
                    >
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Verified</span>
                    </motion.div>
                  )}
                </div>
                
                <p className="text-gray-500 mb-4">{drug.genericName}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium">
                    {drug.category}
                  </span>
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                    {drug.manufacturer}
                  </span>
                </div>
                
                {/* Batch Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">Batch No.</p>
                      <p className="font-semibold text-gray-700">{drug.batchNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-400">MFG Date</p>
                      <p className="font-semibold text-gray-700">{drug.mfgDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-xs text-gray-400">EXP Date</p>
                      <p className="font-semibold text-red-600">{drug.expDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-xs text-gray-400">Status</p>
                      <p className="font-semibold text-green-600">Authentic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Available Doses */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-primary-500" />
              Available Doses
            </h2>
            <div className="flex flex-wrap gap-3">
              {drug.doses.map((dose, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border border-primary-100"
                >
                  <div className="p-2 bg-primary-500 rounded-lg">
                    <Pill className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-primary-700">{dose.strength}</p>
                    <p className="text-sm text-gray-500">{dose.form}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Authenticity Note */}
          <motion.div 
            variants={itemVariants}
            className="bg-blue-50 rounded-3xl p-6 mb-6 border border-blue-100"
          >
            <div className="flex gap-4">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <p className="text-blue-700">{drug.authenticityNote}</p>
            </div>
          </motion.div>
          
          {/* Warnings Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl mb-6 border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleSection('warnings')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Warnings
              </h2>
              {expandedSections.warnings ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.warnings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="px-6 pb-6"
              >
                <div className="space-y-4">
                  {Object.entries(drug.warnings).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100"
                    >
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-800 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-amber-700 text-sm">{value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Indications */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl p-6 shadow-xl mb-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary-500" />
              Indications
            </h2>
            <div className="flex flex-wrap gap-2">
              {drug.indications.map((indication, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm border border-green-100"
                >
                  {indication}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          {/* Regimen Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl mb-6 border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleSection('regimen')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-500" />
                Regimen
              </h2>
              {expandedSections.regimen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.regimen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="px-6 pb-6"
              >
                <p className="text-gray-700 mb-4 p-4 bg-gray-50 rounded-2xl">
                  {drug.regimen.general}
                </p>
                
                <h3 className="font-semibold text-gray-700 mb-3">Specific Conditions:</h3>
                <div className="space-y-2">
                  {drug.regimen.specific.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-primary-50 rounded-xl"
                    >
                      <span className="font-medium text-primary-700 min-w-[180px]">{item.condition}</span>
                      <span className="text-gray-600">{item.duration}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Food Interactions */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl mb-6 border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleSection('foodInteractions')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-500" />
                Food Interactions
              </h2>
              {expandedSections.foodInteractions ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.foodInteractions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="px-6 pb-6"
              >
                <div className="space-y-3">
                  {drug.foodInteractions.map((interaction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100"
                    >
                      <Utensils className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-orange-800">{interaction.item}</p>
                        <p className="text-orange-700 text-sm">{interaction.effect}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Drug Interactions Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl mb-6 border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleSection('drugInteractions')}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                Drug Interactions
              </h2>
              {expandedSections.drugInteractions ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {expandedSections.drugInteractions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="px-6 pb-6"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Interacting Drug</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drug.drugInteractions.map((interaction, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-800">{interaction.drug}</span>
                          </td>
                          <td className="py-4 px-4">
                            {getUsefulBadge(interaction.useful)}
                          </td>
                          <td className="py-4 px-4 text-gray-600 text-sm hidden md:table-cell">
                            {interaction.description}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Legend:</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                      <span className="text-sm text-gray-600">Useful - Can be combined with caution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                      <span className="text-sm text-gray-600">Useful (Risky) - Use with increased monitoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                      <span className="text-sm text-gray-600">Not Useful - Avoid combination</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/scan" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors"
              >
                Scan Another Medicine
              </motion.button>
            </Link>
            <Link to="/generate" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-white text-primary-600 py-4 rounded-2xl font-semibold border-2 border-primary-200 hover:border-primary-400 transition-colors"
              >
                Generate QR Code
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DrugInfoPage;
