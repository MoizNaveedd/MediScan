/**
 * Utility functions for tracking serial number scans
 */

const STORAGE_KEY = 'mediscan_serial_scans';

/**
 * Get scan count for a specific serial number
 * @param {string} serialNumber - The 12-digit serial number
 * @returns {number} - Number of times this serial has been scanned
 */
export const getScanCount = (serialNumber) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    
    const scans = JSON.parse(stored);
    return scans[serialNumber] || 0;
  } catch (error) {
    console.error('Error reading scan count:', error);
    return 0;
  }
};

/**
 * Increment scan count for a serial number
 * @param {string} serialNumber - The 12-digit serial number
 * @returns {number} - New scan count after incrementing
 */
export const incrementScanCount = (serialNumber) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let scans = stored ? JSON.parse(stored) : {};
    
    const currentCount = scans[serialNumber] || 0;
    scans[serialNumber] = currentCount + 1;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
    return scans[serialNumber];
  } catch (error) {
    console.error('Error incrementing scan count:', error);
    return 1;
  }
};

/**
 * Check if this is the first scan (count will be 0 before incrementing)
 * @param {string} serialNumber - The 12-digit serial number
 * @returns {boolean} - True if this is the first scan
 */
export const isFirstScan = (serialNumber) => {
  return getScanCount(serialNumber) === 0;
};
