# MediScan - Medicine QR Code Scanner

A modern React-based web application for pharmacy students to scan and verify medicine information using QR codes.

## Features

- **QR Code Scanner**: Scan medicine QR codes using your device camera
- **QR Code Generator**: Generate QR codes for medicines to print on packaging
- **Drug Information**: Comprehensive drug details including:
  - Available doses
  - Warnings (children, pregnancy, renal impairment, storage)
  - Indications
  - Regimen and dosage guidelines
  - Food interactions
  - Drug interactions (with useful/not useful indicators)

## Tech Stack

- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- html5-qrcode for QR scanning
- qrcode.react for QR generation
- React Router for navigation
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Open terminal in the project directory:
```bash
cd d:\mediscan
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Scanning QR Codes

1. Navigate to the "Scan" page
2. Click "Start Scanner" to activate your camera
3. Point the camera at a medicine QR code
4. The app will automatically detect and redirect to the drug info page

### Generating QR Codes

1. Navigate to the "Generate" page
2. Select a medicine from the dropdown
3. A QR code will be generated automatically
4. Click "Download PNG" to save the QR code
5. Print and attach to medicine packaging

### Viewing Drug Information

After scanning a QR code or clicking on a drug, you'll see:
- Drug name, category, and verification status
- Batch information (MFG date, EXP date, Batch No.)
- Available doses
- Warnings (expandable section)
- Indications
- Regimen guidelines
- Food interactions
- Drug interactions table

## Available Drugs

1. **Ciprofloxacin HCl** - Anti Bacterial
2. **Amoxicillin** - Anti Bacterial
3. **Ibuprofen** - Anti Inflammatory (NSAID)

## Project Structure

```
mediscan/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Scanner.jsx     # QR scanner component
│   │   ├── QRGenerator.jsx # QR code generator
│   │   └── DrugCard.jsx    # Drug display card
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── ScanPage.jsx    # QR scanner page
│   │   ├── GeneratePage.jsx # QR generator page
│   │   └── DrugInfoPage.jsx # Drug details page
│   ├── data/
│   │   └── drugs.js        # Drug database
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Adding New Drugs

To add a new drug, edit `src/data/drugs.js` and add a new object to the `drugs` array following the existing structure.

