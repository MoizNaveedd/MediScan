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
    id: "amoxicillin",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    category: "Anti Bacterial",
    manufacturer: "MediScan Pharma",
    batchNo: "EFGH",
    mfgDate: "02/20/2024",
    expDate: "02/20/2026",
    authenticityVerified: true,
    doses: [
      { strength: "250mg", form: "Capsule" },
      { strength: "500mg", form: "Capsule" },
      { strength: "875mg", form: "Tablet" }
    ],
    warnings: {
      allergies: "Do not use if allergic to penicillin or cephalosporin antibiotics.",
      pregnancy: "Generally considered safe during pregnancy, but consult healthcare provider.",
      renalImpairment: "Dose adjustment may be required in patients with severe renal impairment.",
      storage: "Store at room temperature 20°C to 25°C. Keep away from moisture."
    },
    authenticityNote: "Verify authenticity by scanning QR code and checking batch number.",
    indications: [
      "Upper respiratory tract infections",
      "Lower respiratory tract infections",
      "Skin and skin structure infections",
      "Urinary tract infections",
      "H. pylori eradication",
      "Dental infections"
    ],
    regimen: {
      general: "Treatment duration typically 7-10 days. Continue for 48-72 hours after symptoms resolve.",
      specific: [
        { condition: "Mild to moderate infections", duration: "250-500mg every 8 hours" },
        { condition: "Severe infections", duration: "875mg every 12 hours" },
        { condition: "H. pylori", duration: "14 days as part of combination therapy" }
      ]
    },
    foodInteractions: [
      { item: "Food", effect: "Can be taken with or without food" },
      { item: "Antacids", effect: "May reduce absorption - take 2 hours apart" }
    ],
    drugInteractions: [
      { drug: "Methotrexate", useful: "Not useful", description: "Increased methotrexate toxicity" },
      { drug: "Warfarin", useful: "Not useful", description: "May enhance anticoagulant effect" },
      { drug: "Probenecid", useful: "Useful", description: "Increases amoxicillin levels" },
      { drug: "Allopurinol", useful: "Not useful", description: "Increased risk of skin rash" }
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
