export const drugs = [
  {
    id: "ciprofloxacin-hcl",
    name: "Ciprofloxacin HCl",
    genericName: "Ciprofloxacin Hydrochloride",
    category: "Anti Bacterial",
    manufacturer: "MediScan Pharma",
    batchNo: "ABCD",
    mfgDate: "01/15/2024",
    expDate: "01/15/2026",
    serialNumber: "ABC123456",
    authenticityVerified: true,
    doses: [
      { strength: "250mg", form: "Tablet" },
      { strength: "500mg", form: "Tablet" },
      { strength: "750mg", form: "Tablet" }
    ],
    warnings: {
      children: "Ciprofloxacin should not be used in prepubertal patients. Experience in pubertal patients below 18 years of age is limited.",
      pregnancy: "Ciprofloxacin should not be used in pregnant women unless the likely benefits outweigh the possible risk to the fetus.",
      renalImpairment: "Ciprofloxacin should be used with caution and at a reduced dosage in patients with impaired renal function.",
      storage: "Store at controlled room temperature between 15°C and 25°C."
    },
    authenticityNote: "Scan the QR code, batch number on the package. Use only if the seal is intact.",
    indications: [
      "Respiratory tract infections",
      "Urinary tract infections",
      "Skin and soft tissue infection",
      "Chronic bacterial prostatitis",
      "Bone and joint infection",
      "Infectious diarrhea",
      "Meningococcal carriers",
      "Typhoid fever",
      "Uncomplicated gonorrhea"
    ],
    regimen: {
      general: "The average treatment period should be approximately 7 to 14 days. Generally, treatment should last 3 days beyond the disappearance of clinical symptoms or until cultures are sterile.",
      specific: [
        { condition: "Osteomyelitis", duration: "6 to 8 weeks, up to 3 months" },
        { condition: "Acute cystitis (females)", duration: "3 to 5 days" },
        { condition: "Infectious diarrhea", duration: "5 days" },
        { condition: "Typhoid fever", duration: "14 days" },
        { condition: "Acute sinusitis", duration: "10 days with 500mg q 12h" },
        { condition: "Chronic bacterial prostatitis", duration: "28 days with 500mg q 12h" }
      ]
    },
    foodInteractions: [
      { item: "Milk and dairy products", effect: "Avoid - decreases absorption of ciprofloxacin" },
      { item: "Calcium fortified juices", effect: "Avoid - decreases absorption" },
      { item: "Caffeine", effect: "Limit intake" },
      { item: "Food in general", effect: "Can be taken with or without food - absorption not significantly affected" }
    ],
    drugInteractions: [
      { drug: "Probenecid", useful: "Useful", description: "May increase ciprofloxacin levels" },
      { drug: "Glyburide", useful: "Useful (but risky)", description: "Monitor blood glucose closely" },
      { drug: "Theophylline", useful: "Not useful", description: "Increased risk of toxicity" },
      { drug: "Cyclosporine", useful: "Not useful", description: "Increased nephrotoxicity risk" },
      { drug: "Warfarin", useful: "Not useful", description: "Enhanced anticoagulant effect" }
    ]
  },
  {
    id: "amlodipine-besylate",
    name: "Amlodipine Besylate",
    genericName: "Amlodipine Besylate",
    category: "Anti Hypertensive",
    manufacturer: "MediScan Pharma",
    batchNo: "ABCD",
    mfgDate: "02/20/2024",
    expDate: "02/20/2026",
    serialNumber: "DEF456789",
    authenticityVerified: true,
    doses: [
      { strength: "2.5mg", form: "Tablet" },
      { strength: "5mg", form: "Tablet" },
      { strength: "10mg", form: "Tablet" }
    ],
    warnings: {
      betaBlockerWithdrawal: "Increased Angina or Myocardial Infarction may occur after abrupt discontinuation of beta-blockers.",
      congestiveHeartFailure: "Use with caution in patients with Congestive Heart Failure.",
      hypotension: "Hypotension may occur, especially in patients with severe aortic stenosis.",
      peripheralEdema: "Peripheral edema may occur, particularly in elderly patients.",
      hepaticImpairment: "Use with caution in patients with severe hepatic function or impairment.",
      nursingMothers: "Use with caution in nursing mothers.",
      pediatrics: "Safety and effectiveness in pediatric patients (0-17 years of age) have not been established.",
      geriatrics: "Use with caution in geriatric patients (>65 years of age).",
      storage: "Store between 15°C and 30°C. Protect from light."
    },
    authenticityNote: "Scan the QR code, batch number on the package. Use only if the seal is intact.",
    indications: [
      "Hypertension",
      "Chronic Stable Angina"
    ],
    regimen: {
      general: "For both hypertension and angina, the recommended initial dose of amlodipine besylate is 5 mg once daily. If necessary, dose can be increased after 1 – 2 weeks to a maximum dose of 10 mg once daily.",
      specific: [
        { condition: "Elderly or Impaired Renal Function", duration: "Recommended initial dose is 5 mg once daily. If required, increasing in the dose should be done gradually and with caution." },
        { condition: "Impaired Hepatic Function", duration: "Dosage requirements have not been established. Dosage should be carefully and gradually adjusted depending on patient's tolerance and response. A lower starting dose of 2.5 mg once daily should be considered." },
        { condition: "Pediatric Patients (6-17 years)", duration: "Effective antihypertensive oral dose is 2.5 mg to 5 mg once daily." }
      ]
    },
    foodInteractions: [
      { item: "Grapefruit / Grapefruit juice", effect: "Avoid - may increase amlodipine levels" },
      { item: "Regular food", effect: "Can be taken with or without food" },
      { item: "St. John's Wort (Herb)", effect: "Avoid - may decrease amlodipine levels" }
    ],
    drugInteractions: [
      { drug: "Diltiazem", useful: "Not useful", description: "Increases amlodipine levels" },
      { drug: "Erythromycin", useful: "Not useful", description: "Increases amlodipine levels" },
      { drug: "Ketoconazole / Itraconazole", useful: "Not useful", description: "Strong CYP3A4 inhibitors" },
      { drug: "Ritonavir", useful: "Not useful", description: "May increase amlodipine levels" },
      { drug: "Clarithromycin", useful: "Not useful", description: "Increases risk of kidney injury" },
      { drug: "Phenobarbital", useful: "Not useful", description: "Decreases amlodipine effect" },
      { drug: "Phenytoin", useful: "Not useful", description: "May decrease amlodipine levels" },
      { drug: "Rifampin", useful: "Not useful", description: "May decrease amlodipine levels" },
      { drug: "Cimetidine", useful: "Useful", description: "No interaction" },
      { drug: "Antacids (Mg/Al)", useful: "Useful", description: "No interaction" },
      { drug: "Beta-blockers", useful: "Useful (but risky)", description: "Increases BP-lowering effect" },
      { drug: "Sildenafil", useful: "Useful (but risky)", description: "Extra BP drop" },
      { drug: "Atorvastatin", useful: "Useful", description: "Minor increase in atorvastatin levels" },
      { drug: "Simvastatin", useful: "Not useful", description: "Increases simvastatin levels; keep ≤20 mg" },
      { drug: "Cyclosporine", useful: "Not useful", description: "Increases cyclosporine levels" },
      { drug: "Tacrolimus", useful: "Not useful", description: "Increases tacrolimus levels" },
      { drug: "mTOR inhibitors (sirolimus, everolimus)", useful: "Not useful", description: "Increases drug levels" },
      { drug: "Dantrolene", useful: "Not useful", description: "Risk of hyperkalemia" }
    ]
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "Anti Inflammatory (NSAID)",
    manufacturer: "MediScan Pharma",
    batchNo: "IJKL",
    mfgDate: "03/10/2024",
    expDate: "03/10/2027",
    serialNumber: "GHI789012",
    authenticityVerified: true,
    doses: [
      { strength: "200mg", form: "Tablet" },
      { strength: "400mg", form: "Tablet" },
      { strength: "600mg", form: "Tablet" }
    ],
    warnings: {
      cardiovascular: "May increase risk of heart attack or stroke, especially with long-term use.",
      gastrointestinal: "May cause stomach bleeding or ulcers. Risk increases with age, alcohol use, or concurrent corticosteroids.",
      pregnancy: "Avoid in third trimester. May cause premature closure of ductus arteriosus.",
      storage: "Store at room temperature 20°C to 25°C. Protect from light and moisture."
    },
    authenticityNote: "Scan QR code to verify product authenticity.",
    indications: [
      "Mild to moderate pain",
      "Fever reduction",
      "Inflammatory conditions",
      "Arthritis (osteoarthritis, rheumatoid)",
      "Menstrual cramps",
      "Headache and migraine"
    ],
    regimen: {
      general: "Use lowest effective dose for shortest duration. Maximum daily dose: 3200mg for prescription, 1200mg for OTC.",
      specific: [
        { condition: "Mild pain/fever", duration: "200-400mg every 4-6 hours as needed" },
        { condition: "Arthritis", duration: "400-800mg 3-4 times daily" },
        { condition: "Dysmenorrhea", duration: "400mg every 4 hours as needed" }
      ]
    },
    foodInteractions: [
      { item: "Food", effect: "Take with food or milk to reduce stomach upset" },
      { item: "Alcohol", effect: "Avoid - increases risk of stomach bleeding" }
    ],
    drugInteractions: [
      { drug: "Aspirin", useful: "Not useful", description: "Reduces cardioprotective effect of aspirin" },
      { drug: "Warfarin", useful: "Not useful", description: "Increased bleeding risk" },
      { drug: "ACE inhibitors", useful: "Not useful", description: "May reduce antihypertensive effect" },
      { drug: "Lithium", useful: "Not useful", description: "Increases lithium levels" },
      { drug: "Methotrexate", useful: "Not useful", description: "Increased methotrexate toxicity" }
    ]
  }
];

export const getDrugById = (id) => {
  return drugs.find(drug => drug.id === id);
};

export const getAllDrugs = () => {
  return drugs;
};
