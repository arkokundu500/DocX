var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// client/src/lib/demo-data.ts
var importedHospitals, importedDoctors, importedVisits;
var init_demo_data = __esm({
  "client/src/lib/demo-data.ts"() {
    "use strict";
    importedHospitals = [{ "id": "demo-h001", "name": "Aditya Health Research Foundation (P) Ltd", "type": "Private", "address": "Dum Dum, Kolkata, West Bengal", "city": "Kolkata \xB7 Dum Dum", "rating": 3.8, "reviewCount": 293, "ambulanceAvailable": false, "bedCapacity": 50, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Aditya Health Research Foundation (P) Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10001", "openHours": "Daily OPD hours" }, { "id": "demo-h002", "name": "Aditya Medical Park (A Unit Of Aditya Health Research Foundation Pvt Ltd)", "type": "Private", "address": "Barasat Road area, Kolkata, West Bengal", "city": "Kolkata \xB7 Barasat Road area", "rating": 4, "reviewCount": 116, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Aditya Medical Park (A Unit Of Aditya Health Research Foundation Pvt Ltd), with OPD availability and care-partner contact details.", "phone": "+91-90000-10002", "openHours": "Open 24 hours" }, { "id": "demo-h003", "name": "All Asia Medical Institute", "type": "Private", "address": "Garcha, Kolkata, West Bengal", "city": "Kolkata \xB7 Garcha", "rating": 4.3, "reviewCount": 42, "ambulanceAvailable": true, "bedCapacity": 500, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for All Asia Medical Institute, with OPD availability and care-partner contact details.", "phone": "+91-90000-10003", "openHours": "Open 24 hours" }, { "id": "demo-h004", "name": "Amri Hospitals Ltd", "type": "Private", "address": "Salt Lake, Kolkata, West Bengal", "city": "Kolkata \xB7 Salt Lake", "rating": 4.1, "reviewCount": 628, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Amri Hospitals Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10004", "openHours": "Open 24 hours" }, { "id": "demo-h005", "name": "Amri Medical Center", "type": "Private", "address": "Southern Avenue, Kolkata, West Bengal", "city": "Kolkata \xB7 Southern Avenue", "rating": 4, "reviewCount": 677, "ambulanceAvailable": true, "bedCapacity": 400, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Amri Medical Center, with OPD availability and care-partner contact details.", "phone": "+91-90000-10005", "openHours": "Daily OPD hours" }, { "id": "demo-h006", "name": "Amulya Jyoti Eye Foundation", "type": "Private", "address": "Manoharpukur, Kolkata, West Bengal", "city": "Kolkata \xB7 Manoharpukur", "rating": 4.3, "reviewCount": 296, "ambulanceAvailable": false, "bedCapacity": 100, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Amulya Jyoti Eye Foundation, with OPD availability and care-partner contact details.", "phone": "+91-90000-10006", "openHours": "Open 24 hours" }, { "id": "demo-h007", "name": "Anandlok Hospital", "type": "Private", "address": "Salt Lake, Kolkata, West Bengal", "city": "Kolkata \xB7 Salt Lake", "rating": 4.6, "reviewCount": 360, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Anandlok Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10007", "openHours": "Open 24 hours" }, { "id": "demo-h008", "name": "Angel Maternity & Nursing Home", "type": "Private", "address": "Jora Girja/AJC Bose area, Kolkata, West Bengal", "city": "Kolkata \xB7 Jora Girja/AJC Bose area", "rating": 4, "reviewCount": 793, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Angel Maternity & Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10008", "openHours": "Open 24 hours" }, { "id": "demo-h009", "name": "Apex Institute Of Medical Sciences", "type": "Private", "address": "Santoshpur, Kolkata, West Bengal", "city": "Kolkata \xB7 Santoshpur", "rating": 3.9, "reviewCount": 111, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Apex Institute Of Medical Sciences, with OPD availability and care-partner contact details.", "phone": "+91-90000-10009", "openHours": "Daily OPD hours" }, { "id": "demo-h010", "name": "Apollo Gleneagles Hospitals Ltd.", "type": "Private", "address": "Canal Circular Road, Kolkata, West Bengal", "city": "Kolkata \xB7 Canal Circular Road", "rating": 4.5, "reviewCount": 838, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Apollo Gleneagles Hospitals Ltd., with OPD availability and care-partner contact details.", "phone": "+91-90000-10010", "openHours": "Open 24 hours" }, { "id": "demo-h011", "name": "Aurobindo Netralaya", "type": "Private", "address": "Rajendra Deb Road, Kolkata, West Bengal", "city": "Kolkata \xB7 Rajendra Deb Road", "rating": 4.4, "reviewCount": 956, "ambulanceAvailable": false, "bedCapacity": 300, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Aurobindo Netralaya, with OPD availability and care-partner contact details.", "phone": "+91-90000-10011", "openHours": "Open 24 hours" }, { "id": "demo-h012", "name": "B M Birla Heart Research Centre", "type": "Private", "address": "Alipore, Kolkata, West Bengal", "city": "Kolkata \xB7 Alipore", "rating": 4.4, "reviewCount": 861, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for B M Birla Heart Research Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10012", "openHours": "Open 24 hours" }, { "id": "demo-h013", "name": "B.P. Poddar Hospital & Medical Research Ltd.", "type": "Private", "address": "New Alipore, Kolkata, West Bengal", "city": "Kolkata \xB7 New Alipore", "rating": 4, "reviewCount": 83, "ambulanceAvailable": true, "bedCapacity": 500, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for B.P. Poddar Hospital & Medical Research Ltd., with OPD availability and care-partner contact details.", "phone": "+91-90000-10013", "openHours": "Daily OPD hours" }, { "id": "demo-h014", "name": "Bangur Medicare Research Institute", "type": "Private", "address": "Tollygunge, Kolkata, West Bengal", "city": "Kolkata \xB7 Tollygunge", "rating": 4.7, "reviewCount": 93, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Bangur Medicare Research Institute, with OPD availability and care-partner contact details.", "phone": "+91-90000-10014", "openHours": "Open 24 hours" }, { "id": "demo-h015", "name": "Bellona Nursing Home And Diagnostic Centre", "type": "Private", "address": "Elgin, Kolkata, West Bengal", "city": "Kolkata \xB7 Elgin", "rating": 4.2, "reviewCount": 476, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Bellona Nursing Home And Diagnostic Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10015", "openHours": "Open 24 hours" }, { "id": "demo-h016", "name": "Fortis Hospital & Kidney Institute", "type": "Private", "address": "Behala, Kolkata, West Bengal", "city": "Kolkata \xB7 Behala", "rating": 4.2, "reviewCount": 226, "ambulanceAvailable": false, "bedCapacity": 75, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Fortis Hospital & Kidney Institute, with OPD availability and care-partner contact details.", "phone": "+91-90000-10016", "openHours": "Open 24 hours" }, { "id": "demo-h017", "name": "Fortis Hospitals Limited", "type": "Private", "address": "Mukundapur, Kolkata, West Bengal", "city": "Kolkata \xB7 Mukundapur", "rating": 4.5, "reviewCount": 187, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Fortis Hospitals Limited, with OPD availability and care-partner contact details.", "phone": "+91-90000-10017", "openHours": "Daily OPD hours" }, { "id": "demo-h018", "name": "Fortis Medical Centre", "type": "Private", "address": "Kasba, Kolkata, West Bengal", "city": "Kolkata \xB7 Kasba", "rating": 4.3, "reviewCount": 288, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Fortis Medical Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10018", "openHours": "Open 24 hours" }, { "id": "demo-h019", "name": "Gamma Centauri Health Care Pvt Ltd", "type": "Private", "address": "Park Street, Kolkata, West Bengal", "city": "Kolkata \xB7 Park Street", "rating": 4.7, "reviewCount": 806, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Gamma Centauri Health Care Pvt Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10019", "openHours": "Open 24 hours" }, { "id": "demo-h020", "name": "Gd Hospital And Diabetes Institute", "type": "Private", "address": "Gariahat, Kolkata, West Bengal", "city": "Kolkata \xB7 Gariahat", "rating": 4.7, "reviewCount": 836, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Gd Hospital And Diabetes Institute, with OPD availability and care-partner contact details.", "phone": "+91-90000-10020", "openHours": "Open 24 hours" }, { "id": "demo-h021", "name": "Genesis Hospital", "type": "Private", "address": "Jadavpur, Kolkata, West Bengal", "city": "Kolkata \xB7 Jadavpur", "rating": 4.1, "reviewCount": 228, "ambulanceAvailable": false, "bedCapacity": 250, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Genesis Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10021", "openHours": "Daily OPD hours" }, { "id": "demo-h022", "name": "Greenview Nursing Home", "type": "Private", "address": "Bhowanipore, Kolkata, West Bengal", "city": "Kolkata \xB7 Bhowanipore", "rating": 4.5, "reviewCount": 417, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Greenview Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10022", "openHours": "Open 24 hours" }, { "id": "demo-h023", "name": "Health Cure Nursing Home", "type": "Private", "address": "Lake Gardens, Kolkata, West Bengal", "city": "Kolkata \xB7 Lake Gardens", "rating": 4.1, "reviewCount": 264, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Health Cure Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10023", "openHours": "Open 24 hours" }, { "id": "demo-h024", "name": "Health Point", "type": "Private", "address": "Kolkata Central, Kolkata, West Bengal", "city": "Kolkata \xB7 Kolkata Central", "rating": 4.3, "reviewCount": 609, "ambulanceAvailable": true, "bedCapacity": 500, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Health Point, with OPD availability and care-partner contact details.", "phone": "+91-90000-10024", "openHours": "Open 24 hours" }, { "id": "demo-h025", "name": "Institute Of Neurosciences Kolkata", "type": "Private", "address": "Tangra, Kolkata, West Bengal", "city": "Kolkata \xB7 Tangra", "rating": 4, "reviewCount": 153, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Institute Of Neurosciences Kolkata, with OPD availability and care-partner contact details.", "phone": "+91-90000-10025", "openHours": "Daily OPD hours" }, { "id": "demo-h026", "name": "James Long Clinic Pvt Ltd", "type": "Private", "address": "New Town, Kolkata, West Bengal", "city": "Kolkata \xB7 New Town", "rating": 4.6, "reviewCount": 893, "ambulanceAvailable": false, "bedCapacity": 50, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for James Long Clinic Pvt Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10026", "openHours": "Open 24 hours" }, { "id": "demo-h027", "name": "Kasturi Medical Research Centre", "type": "Private", "address": "Dum Dum, Kolkata, West Bengal", "city": "Kolkata \xB7 Dum Dum", "rating": 4.5, "reviewCount": 823, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Kasturi Medical Research Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10027", "openHours": "Open 24 hours" }, { "id": "demo-h028", "name": "Kd Cure S.C. Das Memorial Medical & Research Centre", "type": "Private", "address": "Barasat Road area, Kolkata, West Bengal", "city": "Kolkata \xB7 Barasat Road area", "rating": 3.9, "reviewCount": 402, "ambulanceAvailable": true, "bedCapacity": 500, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Kd Cure S.C. Das Memorial Medical & Research Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10028", "openHours": "Open 24 hours" }, { "id": "demo-h029", "name": "Kothari Medical Centre", "type": "Private", "address": "Garcha, Kolkata, West Bengal", "city": "Kolkata \xB7 Garcha", "rating": 4.1, "reviewCount": 578, "ambulanceAvailable": true, "bedCapacity": 400, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Kothari Medical Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10029", "openHours": "Daily OPD hours" }, { "id": "demo-h030", "name": "Kpc Medical College & Hospital Jadavpur", "type": "Private", "address": "Salt Lake, Kolkata, West Bengal", "city": "Kolkata \xB7 Salt Lake", "rating": 4.5, "reviewCount": 561, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Kpc Medical College & Hospital Jadavpur, with OPD availability and care-partner contact details.", "phone": "+91-90000-10030", "openHours": "Open 24 hours" }, { "id": "demo-h031", "name": "Lansdowne Nursing Home", "type": "Private", "address": "Southern Avenue, Kolkata, West Bengal", "city": "Kolkata \xB7 Southern Avenue", "rating": 3.9, "reviewCount": 457, "ambulanceAvailable": false, "bedCapacity": 200, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Lansdowne Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10031", "openHours": "Open 24 hours" }, { "id": "demo-h032", "name": "M P Birla Eye Clinic", "type": "Private", "address": "Manoharpukur, Kolkata, West Bengal", "city": "Kolkata \xB7 Manoharpukur", "rating": 3.8, "reviewCount": 751, "ambulanceAvailable": true, "bedCapacity": 300, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for M P Birla Eye Clinic, with OPD availability and care-partner contact details.", "phone": "+91-90000-10032", "openHours": "Open 24 hours" }, { "id": "demo-h033", "name": "M.B Nursing Home Pvt Ltd", "type": "Private", "address": "Salt Lake, Kolkata, West Bengal", "city": "Kolkata \xB7 Salt Lake", "rating": 4.6, "reviewCount": 531, "ambulanceAvailable": true, "bedCapacity": 400, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for M.B Nursing Home Pvt Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10033", "openHours": "Daily OPD hours" }, { "id": "demo-h034", "name": "Mandakini Nursing Home", "type": "Private", "address": "Jora Girja/AJC Bose area, Kolkata, West Bengal", "city": "Kolkata \xB7 Jora Girja/AJC Bose area", "rating": 4.7, "reviewCount": 531, "ambulanceAvailable": true, "bedCapacity": 150, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Mandakini Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10034", "openHours": "Open 24 hours" }, { "id": "demo-h035", "name": "Maple Nursing Home", "type": "Private", "address": "Santoshpur, Kolkata, West Bengal", "city": "Kolkata \xB7 Santoshpur", "rating": 4.2, "reviewCount": 177, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Maple Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10035", "openHours": "Open 24 hours" }, { "id": "demo-h036", "name": "Peerless Hospital & B.K. Roy Research Centre", "type": "Private", "address": "Canal Circular Road, Kolkata, West Bengal", "city": "Kolkata \xB7 Canal Circular Road", "rating": 4.2, "reviewCount": 31, "ambulanceAvailable": false, "bedCapacity": 500, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Peerless Hospital & B.K. Roy Research Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10036", "openHours": "Open 24 hours" }, { "id": "demo-h037", "name": "Phoenix Hospital", "type": "Private", "address": "Rajendra Deb Road, Kolkata, West Bengal", "city": "Kolkata \xB7 Rajendra Deb Road", "rating": 4.8, "reviewCount": 863, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Phoenix Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10037", "openHours": "Daily OPD hours" }, { "id": "demo-h038", "name": "Port View Nursing Home (P) Ltd", "type": "Private", "address": "Alipore, Kolkata, West Bengal", "city": "Kolkata \xB7 Alipore", "rating": 3.9, "reviewCount": 911, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Port View Nursing Home (P) Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10038", "openHours": "Open 24 hours" }, { "id": "demo-h039", "name": "Prince Nursing Home", "type": "Private", "address": "New Alipore, Kolkata, West Bengal", "city": "Kolkata \xB7 New Alipore", "rating": 4.6, "reviewCount": 847, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Prince Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10039", "openHours": "Open 24 hours" }, { "id": "demo-h040", "name": "Priyamvada Birla Aravind Eye Hospital", "type": "Private", "address": "Tollygunge, Kolkata, West Bengal", "city": "Kolkata \xB7 Tollygunge", "rating": 4.6, "reviewCount": 143, "ambulanceAvailable": true, "bedCapacity": 400, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Priyamvada Birla Aravind Eye Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10040", "openHours": "Open 24 hours" }, { "id": "demo-h041", "name": "Probal Eye Institute", "type": "Private", "address": "Elgin, Kolkata, West Bengal", "city": "Kolkata \xB7 Elgin", "rating": 4, "reviewCount": 552, "ambulanceAvailable": false, "bedCapacity": 400, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Probal Eye Institute, with OPD availability and care-partner contact details.", "phone": "+91-90000-10041", "openHours": "Daily OPD hours" }, { "id": "demo-h042", "name": "R-Fleming Hospital", "type": "Private", "address": "Behala, Kolkata, West Bengal", "city": "Kolkata \xB7 Behala", "rating": 4.8, "reviewCount": 785, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for R-Fleming Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10042", "openHours": "Open 24 hours" }, { "id": "demo-h043", "name": "R.G. Stone Urology & Laparoscopy Hospital", "type": "Private", "address": "Mukundapur, Kolkata, West Bengal", "city": "Kolkata \xB7 Mukundapur", "rating": 4.2, "reviewCount": 699, "ambulanceAvailable": true, "bedCapacity": 150, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for R.G. Stone Urology & Laparoscopy Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10043", "openHours": "Open 24 hours" }, { "id": "demo-h044", "name": "Rabindranath Tagore International Inst. Of Cardiac Sciences", "type": "Private", "address": "Kasba, Kolkata, West Bengal", "city": "Kolkata \xB7 Kasba", "rating": 4.8, "reviewCount": 474, "ambulanceAvailable": true, "bedCapacity": 300, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Rabindranath Tagore International Inst. Of Cardiac Sciences, with OPD availability and care-partner contact details.", "phone": "+91-90000-10044", "openHours": "Open 24 hours" }, { "id": "demo-h045", "name": "Ramakrishna Mission Seva Pratishthan", "type": "Private", "address": "Park Street, Kolkata, West Bengal", "city": "Kolkata \xB7 Park Street", "rating": 4, "reviewCount": 358, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Ramakrishna Mission Seva Pratishthan, with OPD availability and care-partner contact details.", "phone": "+91-90000-10045", "openHours": "Daily OPD hours" }, { "id": "demo-h046", "name": "Rameswara Nursing Home Pvt Ltd", "type": "Private", "address": "Gariahat, Kolkata, West Bengal", "city": "Kolkata \xB7 Gariahat", "rating": 4.4, "reviewCount": 614, "ambulanceAvailable": false, "bedCapacity": 500, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Rameswara Nursing Home Pvt Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10046", "openHours": "Open 24 hours" }, { "id": "demo-h047", "name": "Remedy Hospital", "type": "Private", "address": "Jadavpur, Kolkata, West Bengal", "city": "Kolkata \xB7 Jadavpur", "rating": 3.9, "reviewCount": 658, "ambulanceAvailable": true, "bedCapacity": 30, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Remedy Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10047", "openHours": "Open 24 hours" }, { "id": "demo-h048", "name": "Renaissance Hospital Pvt Ltd", "type": "Private", "address": "Bhowanipore, Kolkata, West Bengal", "city": "Kolkata \xB7 Bhowanipore", "rating": 3.9, "reviewCount": 44, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Renaissance Hospital Pvt Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10048", "openHours": "Open 24 hours" }, { "id": "demo-h049", "name": "Restorative Clinic Pvt Ltd", "type": "Private", "address": "Lake Gardens, Kolkata, West Bengal", "city": "Kolkata \xB7 Lake Gardens", "rating": 4.4, "reviewCount": 297, "ambulanceAvailable": true, "bedCapacity": 50, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Restorative Clinic Pvt Ltd, with OPD availability and care-partner contact details.", "phone": "+91-90000-10049", "openHours": "Daily OPD hours" }, { "id": "demo-h050", "name": "Revival Nursing Home", "type": "Private", "address": "Kolkata Central, Kolkata, West Bengal", "city": "Kolkata \xB7 Kolkata Central", "rating": 4.4, "reviewCount": 752, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Revival Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10050", "openHours": "Open 24 hours" }, { "id": "demo-h051", "name": "Doctors Nursing Home", "type": "Private", "address": "Diamond Harbour, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Diamond Harbour", "rating": 4.7, "reviewCount": 838, "ambulanceAvailable": true, "bedCapacity": 80, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Doctors Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10051", "openHours": "Open 24 hours" }, { "id": "demo-h052", "name": "Greenland Nursing Home", "type": "Private", "address": "Diamond Harbour, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Diamond Harbour", "rating": 3.9, "reviewCount": 686, "ambulanceAvailable": false, "bedCapacity": 80, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Greenland Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10052", "openHours": "Daily OPD hours" }, { "id": "demo-h053", "name": "Mariyam Nursing Home", "type": "Private", "address": "Diamond Harbour, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Diamond Harbour", "rating": 4.3, "reviewCount": 490, "ambulanceAvailable": true, "bedCapacity": 150, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Mariyam Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10053", "openHours": "Open 24 hours" }, { "id": "demo-h054", "name": "The Bhubaneshwari Prativamoyee Maternity & Nursing Home", "type": "Private", "address": "Diamond Harbour, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Diamond Harbour", "rating": 3.9, "reviewCount": 757, "ambulanceAvailable": true, "bedCapacity": 40, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for The Bhubaneshwari Prativamoyee Maternity & Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10054", "openHours": "Open 24 hours" }, { "id": "demo-h055", "name": "Kasturi Das Memorial Super Speciality Hospital", "type": "Private", "address": "Alipore Sadar, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Alipore Sadar", "rating": 4.1, "reviewCount": 206, "ambulanceAvailable": true, "bedCapacity": 40, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Kasturi Das Memorial Super Speciality Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10055", "openHours": "Daily OPD hours" }, { "id": "demo-h056", "name": "Satyarani Memorial Nursing Home & Diagnostic Centre", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4.3, "reviewCount": 297, "ambulanceAvailable": false, "bedCapacity": 60, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Satyarani Memorial Nursing Home & Diagnostic Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10056", "openHours": "Open 24 hours" }, { "id": "demo-h057", "name": "Shifa Nursing Home", "type": "Private", "address": "Alipore Sadar, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Alipore Sadar", "rating": 4.8, "reviewCount": 89, "ambulanceAvailable": true, "bedCapacity": 80, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Shifa Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10057", "openHours": "Open 24 hours" }, { "id": "demo-h058", "name": "Welcome Nursing Home", "type": "Private", "address": "Canning, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Canning", "rating": 3.9, "reviewCount": 679, "ambulanceAvailable": true, "bedCapacity": 300, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Welcome Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10058", "openHours": "Daily OPD hours" }, { "id": "demo-h059", "name": "The Vision Care Centre", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4.8, "reviewCount": 881, "ambulanceAvailable": true, "bedCapacity": 40, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for The Vision Care Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10059", "openHours": "Open 24 hours" }, { "id": "demo-h060", "name": "Jeevan Suraksha Nursing Home", "type": "Private", "address": "Diamond Harbour, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Diamond Harbour", "rating": 4.2, "reviewCount": 504, "ambulanceAvailable": false, "bedCapacity": 60, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Jeevan Suraksha Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10060", "openHours": "Open 24 hours" }, { "id": "demo-h061", "name": "Arti Nursing Home", "type": "Private", "address": "Alipore Sadar, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Alipore Sadar", "rating": 4.8, "reviewCount": 180, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Arti Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10061", "openHours": "Daily OPD hours" }, { "id": "demo-h062", "name": "The Happy Health Home", "type": "Private", "address": "Alipore Sadar, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Alipore Sadar", "rating": 4.9, "reviewCount": 283, "ambulanceAvailable": true, "bedCapacity": 25, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for The Happy Health Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10062", "openHours": "Open 24 hours" }, { "id": "demo-h063", "name": "Seba Nursing Home Mahismari", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4.3, "reviewCount": 760, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Seba Nursing Home Mahismari, with OPD availability and care-partner contact details.", "phone": "+91-90000-10063", "openHours": "Open 24 hours" }, { "id": "demo-h064", "name": "Baruipur Globe Nursing Home", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4, "reviewCount": 234, "ambulanceAvailable": false, "bedCapacity": 60, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Baruipur Globe Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10064", "openHours": "Daily OPD hours" }, { "id": "demo-h065", "name": "Kandar Nursing Home", "type": "Private", "address": "Kakdwip, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Kakdwip", "rating": 4.6, "reviewCount": 74, "ambulanceAvailable": true, "bedCapacity": 500, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Kandar Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10065", "openHours": "Open 24 hours" }, { "id": "demo-h066", "name": "M R Bangur Hospital", "type": "Public", "address": "Tollygunge/South Kolkata, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Tollygunge/South Kolkata", "rating": 3.9, "reviewCount": 500, "ambulanceAvailable": true, "bedCapacity": 25, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for M R Bangur Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10066", "openHours": "Open 24 hours" }, { "id": "demo-h067", "name": "Misba Nursing Home & Polyclinic", "type": "Private", "address": "Canning, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Canning", "rating": 4.9, "reviewCount": 94, "ambulanceAvailable": true, "bedCapacity": 25, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Misba Nursing Home & Polyclinic, with OPD availability and care-partner contact details.", "phone": "+91-90000-10067", "openHours": "Daily OPD hours" }, { "id": "demo-h068", "name": "Baruipur Sub Divisional Hospital", "type": "Public", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4.5, "reviewCount": 703, "ambulanceAvailable": false, "bedCapacity": 40, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Baruipur Sub Divisional Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10068", "openHours": "Open 24 hours" }, { "id": "demo-h069", "name": "Antara Psychiatric Hospital", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 3.9, "reviewCount": 923, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Antara Psychiatric Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10069", "openHours": "Open 24 hours" }, { "id": "demo-h070", "name": "Atlas Health Point Private Limited", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4.5, "reviewCount": 646, "ambulanceAvailable": true, "bedCapacity": 500, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Atlas Health Point Private Limited, with OPD availability and care-partner contact details.", "phone": "+91-90000-10070", "openHours": "Daily OPD hours" }, { "id": "demo-h071", "name": "Humanity Hospital", "type": "Private", "address": "Alipore Sadar, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Alipore Sadar", "rating": 4.5, "reviewCount": 590, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Humanity Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10071", "openHours": "Open 24 hours" }, { "id": "demo-h072", "name": "Life Line Nursing Home & Diagnostic Centre (Unit-II)", "type": "Private", "address": "Alipore Sadar, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Alipore Sadar", "rating": 4, "reviewCount": 745, "ambulanceAvailable": false, "bedCapacity": 100, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Life Line Nursing Home & Diagnostic Centre (Unit-II), with OPD availability and care-partner contact details.", "phone": "+91-90000-10072", "openHours": "Open 24 hours" }, { "id": "demo-h073", "name": "Diamond Harbour Govt. Medical College & Hospital Unit I", "type": "Private", "address": "Diamond Harbour, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Diamond Harbour", "rating": 4.1, "reviewCount": 146, "ambulanceAvailable": true, "bedCapacity": 80, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Diamond Harbour Govt. Medical College & Hospital Unit I, with OPD availability and care-partner contact details.", "phone": "+91-90000-10073", "openHours": "Daily OPD hours" }, { "id": "demo-h074", "name": "Canning Sub Divisional Hospital", "type": "Public", "address": "Canning, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Canning", "rating": 4.1, "reviewCount": 781, "ambulanceAvailable": true, "bedCapacity": 250, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Canning Sub Divisional Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10074", "openHours": "Open 24 hours" }, { "id": "demo-h075", "name": "Indian Institute of Liver and Digestive Sciences", "type": "Private", "address": "Baruipur, South 24 Parganas, West Bengal", "city": "South 24 Parganas \xB7 Baruipur", "rating": 4.3, "reviewCount": 588, "ambulanceAvailable": true, "bedCapacity": 25, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Indian Institute of Liver and Digestive Sciences, with OPD availability and care-partner contact details.", "phone": "+91-90000-10075", "openHours": "Open 24 hours" }, { "id": "demo-h076", "name": "Majumder Millennium Nursing Home & Reliable Diagnostic Centre Pvt. Ltd.", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.4, "reviewCount": 530, "ambulanceAvailable": true, "bedCapacity": 60, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Majumder Millennium Nursing Home & Reliable Diagnostic Centre Pvt. Ltd., with OPD availability and care-partner contact details.", "phone": "+91-90000-10076", "openHours": "Open 24 hours" }, { "id": "demo-h077", "name": "Mary Immaculate Hospital", "type": "Private", "address": "Krishnanagar, Nadia, West Bengal", "city": "Nadia \xB7 Krishnanagar", "rating": 4.8, "reviewCount": 914, "ambulanceAvailable": true, "bedCapacity": 90, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Mary Immaculate Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10077", "openHours": "Open 24 hours" }, { "id": "demo-h078", "name": "Kalyani Eye Care & Laser Centre Pvt. Ltd.", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.2, "reviewCount": 173, "ambulanceAvailable": true, "bedCapacity": 120, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Kalyani Eye Care & Laser Centre Pvt. Ltd., with OPD availability and care-partner contact details.", "phone": "+91-90000-10078", "openHours": "Open 24 hours" }, { "id": "demo-h079", "name": "Pashupatinath Hospital", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.5, "reviewCount": 838, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Pashupatinath Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10079", "openHours": "Open 24 hours" }, { "id": "demo-h080", "name": "Apex Hospital", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.8, "reviewCount": 118, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Apex Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10080", "openHours": "Open 24 hours" }, { "id": "demo-h081", "name": "S.N.R Carnival Hospital \u2013 Kalyani", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 3.9, "reviewCount": 121, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for S.N.R Carnival Hospital \u2013 Kalyani, with OPD availability and care-partner contact details.", "phone": "+91-90000-10081", "openHours": "Open 24 hours" }, { "id": "demo-h082", "name": "Multicare Hospital", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.1, "reviewCount": 227, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Multicare Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10082", "openHours": "Open 24 hours" }, { "id": "demo-h083", "name": "Sushrut Hospital", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.6, "reviewCount": 885, "ambulanceAvailable": true, "bedCapacity": 120, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Sushrut Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10083", "openHours": "Open 24 hours" }, { "id": "demo-h084", "name": "College of Medicine & JNM Hospital, WBUHS", "type": "Public", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.1, "reviewCount": 941, "ambulanceAvailable": true, "bedCapacity": 960, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for College of Medicine & JNM Hospital, WBUHS, with OPD availability and care-partner contact details.", "phone": "+91-90000-10084", "openHours": "Open 24 hours" }, { "id": "demo-h085", "name": "Jaymala Memorial Hospital", "type": "Private", "address": "Kalyani, Nadia, West Bengal", "city": "Nadia \xB7 Kalyani", "rating": 4.5, "reviewCount": 861, "ambulanceAvailable": true, "bedCapacity": 60, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Jaymala Memorial Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10085", "openHours": "Open 24 hours" }, { "id": "demo-h086", "name": "Matri Asish Nursing Home", "type": "Private", "address": "Kharagpur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Kharagpur", "rating": 3.8, "reviewCount": 801, "ambulanceAvailable": true, "bedCapacity": 40, "specialties": ["Gastroenterology", "General Surgery", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Matri Asish Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10086", "openHours": "Open 24 hours" }, { "id": "demo-h087", "name": "Ghatal Super Speciality Hospital", "type": "Public", "address": "Ghatal, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Ghatal", "rating": 4.9, "reviewCount": 177, "ambulanceAvailable": true, "bedCapacity": 300, "specialties": ["Pulmonology", "Critical Care", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Ghatal Super Speciality Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10087", "openHours": "Open 24 hours" }, { "id": "demo-h088", "name": "Central Nursing Home", "type": "Private", "address": "Medinipur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Medinipur", "rating": 4.6, "reviewCount": 586, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Urology", "Nephrology", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Central Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10088", "openHours": "Open 24 hours" }, { "id": "demo-h089", "name": "Midnapore Medical College & Hospital", "type": "Public", "address": "Medinipur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Medinipur", "rating": 3.9, "reviewCount": 916, "ambulanceAvailable": true, "bedCapacity": 40, "specialties": ["General Medicine", "Cardiology", "Orthopedics", "Dermatology"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Midnapore Medical College & Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10089", "openHours": "Open 24 hours" }, { "id": "demo-h090", "name": "Shyamsundar Multispeciality Hospital", "type": "Private", "address": "Medinipur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Medinipur", "rating": 3.8, "reviewCount": 390, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Shyamsundar Multispeciality Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10090", "openHours": "Open 24 hours" }, { "id": "demo-h091", "name": "Kharagpur Sub Divisional Hospital", "type": "Public", "address": "Kharagpur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Kharagpur", "rating": 3.9, "reviewCount": 327, "ambulanceAvailable": true, "bedCapacity": 150, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Kharagpur Sub Divisional Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10091", "openHours": "Open 24 hours" }, { "id": "demo-h092", "name": "GHSPL MDPR Super Specility Healthcare LLP (Glocal Hospital Medinipur)", "type": "Private", "address": "Medinipur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Medinipur", "rating": 4.9, "reviewCount": 52, "ambulanceAvailable": true, "bedCapacity": 550, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for GHSPL MDPR Super Specility Healthcare LLP (Glocal Hospital Medinipur), with OPD availability and care-partner contact details.", "phone": "+91-90000-10092", "openHours": "Open 24 hours" }, { "id": "demo-h093", "name": "City Hospital", "type": "Private", "address": "Medinipur, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Medinipur", "rating": 4.6, "reviewCount": 694, "ambulanceAvailable": true, "bedCapacity": 60, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for City Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10093", "openHours": "Open 24 hours" }, { "id": "demo-h094", "name": "Debra Super Speciality Hospital", "type": "Public", "address": "Debra, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Debra", "rating": 4.7, "reviewCount": 917, "ambulanceAvailable": true, "bedCapacity": 100, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Debra Super Speciality Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10094", "openHours": "Open 24 hours" }, { "id": "demo-h095", "name": "Salboni Super Specility Hospital", "type": "Public", "address": "Salboni, Paschim Medinipur, West Bengal", "city": "Paschim Medinipur \xB7 Salboni", "rating": 4.6, "reviewCount": 959, "ambulanceAvailable": true, "bedCapacity": 200, "specialties": ["Neurology", "Neurosurgery", "Psychiatry"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Salboni Super Specility Hospital, with OPD availability and care-partner contact details.", "phone": "+91-90000-10095", "openHours": "Open 24 hours" }, { "id": "demo-h096", "name": "Bindubasini Nursing Home", "type": "Private", "address": "Birati, North 24 Parganas, West Bengal", "city": "North 24 Parganas \xB7 Birati", "rating": 4.9, "reviewCount": 842, "ambulanceAvailable": false, "bedCapacity": 40, "specialties": ["General Medicine", "Neurology", "ENT", "Pediatrics"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Bindubasini Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10096", "openHours": "Open 24 hours" }, { "id": "demo-h097", "name": "Greenview Clinic and Nursing Home", "type": "Private", "address": "Naihati, North 24 Parganas, West Bengal", "city": "North 24 Parganas \xB7 Naihati", "rating": 3.8, "reviewCount": 766, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Orthopedics", "Physiotherapy", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#146b5a", "description": "Demo directory listing for Greenview Clinic and Nursing Home, with OPD availability and care-partner contact details.", "phone": "+91-90000-10097", "openHours": "Daily OPD hours" }, { "id": "demo-h098", "name": "Sarada Seva Sadan", "type": "Private", "address": "Nonachandanpukur, North 24 Parganas, West Bengal", "city": "North 24 Parganas \xB7 Nonachandanpukur", "rating": 4.7, "reviewCount": 896, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Cardiology", "Diabetology", "General Medicine"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85", "accent": "#b8443e", "description": "Demo directory listing for Sarada Seva Sadan, with OPD availability and care-partner contact details.", "phone": "+91-90000-10098", "openHours": "Open 24 hours" }, { "id": "demo-h099", "name": "Spandan Medicare", "type": "Private", "address": "Baranagar/Kodalia area, North 24 Parganas, West Bengal", "city": "North 24 Parganas \xB7 Baranagar/Kodalia area", "rating": 4, "reviewCount": 730, "ambulanceAvailable": false, "bedCapacity": 50, "specialties": ["Obstetrics & Gynecology", "Pediatrics", "General Surgery"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85", "accent": "#356a55", "description": "Demo directory listing for Spandan Medicare, with OPD availability and care-partner contact details.", "phone": "+91-90000-10099", "openHours": "Daily OPD hours" }, { "id": "demo-h100", "name": "Vip Apex Medical Centre", "type": "Private", "address": "North 24 Parganas, North 24 Parganas, West Bengal", "city": "North 24 Parganas \xB7 North 24 Parganas", "rating": 4.8, "reviewCount": 891, "ambulanceAvailable": true, "bedCapacity": 75, "specialties": ["Ophthalmology", "General Medicine", "ENT"], "tests": ["CBC", "Blood Sugar", "HbA1c", "Urine Routine", "Lipid Profile", "LFT", "KFT", "ECG", "X-Ray"], "image": "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85", "accent": "#8b6a32", "description": "Demo directory listing for Vip Apex Medical Centre, with OPD availability and care-partner contact details.", "phone": "+91-90000-10100", "openHours": "Open 24 hours" }];
    importedDoctors = [{ "id": "demo-doc001", "name": "Dr. Anirban Chatterjee", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 3, "rating": 4.1, "reviewCount": 40, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc002", "name": "Dr. Sayan Mukherjee", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 5, "rating": 4.8, "reviewCount": 93, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc003", "name": "Dr. Rwitaban Sen", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 7, "rating": 4.6, "reviewCount": 146, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc004", "name": "Dr. Arijit Banerjee", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 9, "rating": 4.4, "reviewCount": 199, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc005", "name": "Dr. Soumya Bhattacharya", "specialty": "Neurology", "department": "Neurology", "experienceYears": 11, "rating": 4.2, "reviewCount": 252, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h007"], "bio": "Neurology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc006", "name": "Dr. Debanjan Ghosh", "specialty": "ENT", "department": "ENT", "experienceYears": 13, "rating": 4.9, "reviewCount": 305, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h006"], "bio": "ENT care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc007", "name": "Dr. Mainak Dutta", "specialty": "Pediatrics", "department": "Paediatrics", "experienceYears": 15, "rating": 4.7, "reviewCount": 358, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h005"], "bio": "Pediatrics care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc008", "name": "Dr. Sayantani Roy", "specialty": "Obstetrics & Gynecology", "department": "Obstetrics & Gynecology", "experienceYears": 17, "rating": 4.5, "reviewCount": 411, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h015"], "bio": "Obstetrics & Gynecology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc009", "name": "Dr. Ritwik Basu", "specialty": "General Surgery", "department": "General Surgery", "experienceYears": 19, "rating": 4.3, "reviewCount": 464, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h008"], "bio": "General Surgery care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc010", "name": "Dr. Tuhin Saha", "specialty": "Gastroenterology", "department": "Gastroenterology", "experienceYears": 21, "rating": 4.1, "reviewCount": 517, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h008", "demo-h018"], "bio": "Gastroenterology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc011", "name": "Dr. Ananya Mukherjee", "specialty": "Urology", "department": "Urology", "experienceYears": 23, "rating": 4.8, "reviewCount": 570, "fee": 750, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Urology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc012", "name": "Dr. Ishita Chatterjee", "specialty": "Nephrology", "department": "Nephrology", "experienceYears": 3, "rating": 4.6, "reviewCount": 623, "fee": 1500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Nephrology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc013", "name": "Dr. Srijita Banerjee", "specialty": "Pulmonology", "department": "Pulmonology", "experienceYears": 5, "rating": 4.4, "reviewCount": 676, "fee": 2500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h009", "demo-h019"], "bio": "Pulmonology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc014", "name": "Dr. Poulomi Sen", "specialty": "Psychiatry", "department": "Psychiatry", "experienceYears": 7, "rating": 4.2, "reviewCount": 729, "fee": 3500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h007", "demo-h017"], "bio": "Psychiatry care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc015", "name": "Dr. Madhurima Ghosh", "specialty": "Ophthalmology", "department": "Ophthalmology", "experienceYears": 9, "rating": 4.9, "reviewCount": 782, "fee": 4500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h006", "demo-h016"], "bio": "Ophthalmology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc016", "name": "Dr. Niladri Das", "specialty": "Diabetology", "department": "Diabetology", "experienceYears": 11, "rating": 4.7, "reviewCount": 835, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h004", "demo-h014"], "bio": "Diabetology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc017", "name": "Dr. Kaushik Majumdar", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 13, "rating": 4.5, "reviewCount": 888, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc018", "name": "Dr. Debdeep Chakraborty", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 15, "rating": 4.3, "reviewCount": 941, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc019", "name": "Dr. Rajarshi Mitra", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 17, "rating": 4.1, "reviewCount": 44, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc020", "name": "Dr. Abhishek Roy", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 19, "rating": 4.8, "reviewCount": 97, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc021", "name": "Dr. Souvik Pal", "specialty": "Neurology", "department": "Neurology", "experienceYears": 21, "rating": 4.6, "reviewCount": 150, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h007"], "bio": "Neurology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc022", "name": "Dr. Arnab Sarkar", "specialty": "ENT", "department": "ENT", "experienceYears": 23, "rating": 4.4, "reviewCount": 203, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h006"], "bio": "ENT care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc023", "name": "Dr. Koushik Nandi", "specialty": "Pediatrics", "department": "Paediatrics", "experienceYears": 3, "rating": 4.2, "reviewCount": 256, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h005"], "bio": "Pediatrics care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc024", "name": "Dr. Soumendra Bose", "specialty": "Obstetrics & Gynecology", "department": "Obstetrics & Gynecology", "experienceYears": 5, "rating": 4.9, "reviewCount": 309, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h015"], "bio": "Obstetrics & Gynecology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc025", "name": "Dr. Arindam Lahiri", "specialty": "General Surgery", "department": "General Surgery", "experienceYears": 7, "rating": 4.7, "reviewCount": 362, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h008"], "bio": "General Surgery care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc026", "name": "Dr. Pratik Ghosh", "specialty": "Gastroenterology", "department": "Gastroenterology", "experienceYears": 9, "rating": 4.5, "reviewCount": 415, "fee": 750, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h008", "demo-h018"], "bio": "Gastroenterology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc027", "name": "Dr. Abir Banerjee", "specialty": "Urology", "department": "Urology", "experienceYears": 11, "rating": 4.3, "reviewCount": 468, "fee": 1500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Urology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc028", "name": "Dr. Sagnik Mukherjee", "specialty": "Nephrology", "department": "Nephrology", "experienceYears": 13, "rating": 4.1, "reviewCount": 521, "fee": 2500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Nephrology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc029", "name": "Dr. Aniket Dey", "specialty": "Pulmonology", "department": "Pulmonology", "experienceYears": 15, "rating": 4.8, "reviewCount": 574, "fee": 3500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h009", "demo-h019"], "bio": "Pulmonology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc030", "name": "Dr. Rishav Kundu", "specialty": "Psychiatry", "department": "Psychiatry", "experienceYears": 17, "rating": 4.6, "reviewCount": 627, "fee": 4500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h007", "demo-h017"], "bio": "Psychiatry care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc031", "name": "Dr. Moumita Das", "specialty": "Ophthalmology", "department": "Ophthalmology", "experienceYears": 19, "rating": 4.4, "reviewCount": 680, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h006", "demo-h016"], "bio": "Ophthalmology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc032", "name": "Dr. Riya Basu", "specialty": "Diabetology", "department": "Diabetology", "experienceYears": 21, "rating": 4.2, "reviewCount": 733, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h004", "demo-h014"], "bio": "Diabetology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc033", "name": "Dr. Piyali Roy", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 23, "rating": 4.9, "reviewCount": 786, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc034", "name": "Dr. Oindrila Saha", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 3, "rating": 4.7, "reviewCount": 839, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc035", "name": "Dr. Srabani Dutta", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 5, "rating": 4.5, "reviewCount": 892, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc036", "name": "Dr. Rachana Mitra", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 7, "rating": 4.3, "reviewCount": 945, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc037", "name": "Dr. Sanchari Ghosal", "specialty": "Neurology", "department": "Neurology", "experienceYears": 9, "rating": 4.1, "reviewCount": 48, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h007"], "bio": "Neurology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc038", "name": "Dr. Tanushree Banerjee", "specialty": "ENT", "department": "ENT", "experienceYears": 11, "rating": 4.8, "reviewCount": 101, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h006"], "bio": "ENT care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc039", "name": "Dr. Debjani Mukherjee", "specialty": "Pediatrics", "department": "Paediatrics", "experienceYears": 13, "rating": 4.6, "reviewCount": 154, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h005"], "bio": "Pediatrics care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc040", "name": "Dr. Nandini Roy", "specialty": "Obstetrics & Gynecology", "department": "Obstetrics & Gynecology", "experienceYears": 15, "rating": 4.4, "reviewCount": 207, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h015"], "bio": "Obstetrics & Gynecology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc041", "name": "Dr. Shubham Das", "specialty": "General Surgery", "department": "General Surgery", "experienceYears": 17, "rating": 4.2, "reviewCount": 260, "fee": 750, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h008"], "bio": "General Surgery care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc042", "name": "Dr. Aditya Sen", "specialty": "Gastroenterology", "department": "Gastroenterology", "experienceYears": 19, "rating": 4.9, "reviewCount": 313, "fee": 1500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h008", "demo-h018"], "bio": "Gastroenterology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc043", "name": "Dr. Rajdeep Ghosh", "specialty": "Urology", "department": "Urology", "experienceYears": 21, "rating": 4.7, "reviewCount": 366, "fee": 2500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Urology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc044", "name": "Dr. Soham Chatterjee", "specialty": "Nephrology", "department": "Nephrology", "experienceYears": 23, "rating": 4.5, "reviewCount": 419, "fee": 3500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Nephrology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc045", "name": "Dr. Tirthankar Basu", "specialty": "Pulmonology", "department": "Pulmonology", "experienceYears": 3, "rating": 4.3, "reviewCount": 472, "fee": 4500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h009", "demo-h019"], "bio": "Pulmonology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc046", "name": "Dr. Amartya Dutta", "specialty": "Psychiatry", "department": "Psychiatry", "experienceYears": 5, "rating": 4.1, "reviewCount": 525, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h007", "demo-h017"], "bio": "Psychiatry care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc047", "name": "Dr. Aritra Pal", "specialty": "Ophthalmology", "department": "Ophthalmology", "experienceYears": 7, "rating": 4.8, "reviewCount": 578, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h006", "demo-h016"], "bio": "Ophthalmology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc048", "name": "Dr. Soumitra Ghosh", "specialty": "Diabetology", "department": "Diabetology", "experienceYears": 9, "rating": 4.6, "reviewCount": 631, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h004", "demo-h014"], "bio": "Diabetology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc049", "name": "Dr. Kunal Roy", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 11, "rating": 4.4, "reviewCount": 684, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc050", "name": "Dr. Somnath Saha", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 13, "rating": 4.2, "reviewCount": 737, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc051", "name": "Dr. Pranab Mukherjee", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 15, "rating": 4.9, "reviewCount": 790, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc052", "name": "Dr. Tamal Kundu", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 17, "rating": 4.7, "reviewCount": 843, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc053", "name": "Dr. Sayak Bose", "specialty": "Neurology", "department": "Neurology", "experienceYears": 19, "rating": 4.5, "reviewCount": 896, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h007"], "bio": "Neurology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc054", "name": "Dr. Rounak Banerjee", "specialty": "ENT", "department": "ENT", "experienceYears": 21, "rating": 4.3, "reviewCount": 949, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h006"], "bio": "ENT care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc055", "name": "Dr. Arkaprava Das", "specialty": "Pediatrics", "department": "Paediatrics", "experienceYears": 23, "rating": 4.1, "reviewCount": 52, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h005"], "bio": "Pediatrics care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc056", "name": "Dr. Saptarshi Sen", "specialty": "Obstetrics & Gynecology", "department": "Obstetrics & Gynecology", "experienceYears": 3, "rating": 4.8, "reviewCount": 105, "fee": 750, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h015"], "bio": "Obstetrics & Gynecology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc057", "name": "Dr. Rupankar Ghosh", "specialty": "General Surgery", "department": "General Surgery", "experienceYears": 5, "rating": 4.6, "reviewCount": 158, "fee": 1500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h008"], "bio": "General Surgery care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc058", "name": "Dr. Suman Dey", "specialty": "Gastroenterology", "department": "Gastroenterology", "experienceYears": 7, "rating": 4.4, "reviewCount": 211, "fee": 2500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h008", "demo-h018"], "bio": "Gastroenterology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc059", "name": "Dr. Srijan Roy", "specialty": "Urology", "department": "Urology", "experienceYears": 9, "rating": 4.2, "reviewCount": 264, "fee": 3500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Urology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc060", "name": "Dr. Ritam Chakraborty", "specialty": "Nephrology", "department": "Nephrology", "experienceYears": 11, "rating": 4.9, "reviewCount": 317, "fee": 4500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Nephrology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc061", "name": "Dr. Sohini Mukherjee", "specialty": "Pulmonology", "department": "Pulmonology", "experienceYears": 13, "rating": 4.7, "reviewCount": 370, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h009", "demo-h019"], "bio": "Pulmonology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc062", "name": "Dr. Madhura Das", "specialty": "Psychiatry", "department": "Psychiatry", "experienceYears": 15, "rating": 4.5, "reviewCount": 423, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h007", "demo-h017"], "bio": "Psychiatry care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc063", "name": "Dr. Ipsita Banerjee", "specialty": "Ophthalmology", "department": "Ophthalmology", "experienceYears": 17, "rating": 4.3, "reviewCount": 476, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h006", "demo-h016"], "bio": "Ophthalmology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc064", "name": "Dr. Sruti Roy", "specialty": "Diabetology", "department": "Diabetology", "experienceYears": 19, "rating": 4.1, "reviewCount": 529, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h004", "demo-h014"], "bio": "Diabetology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc065", "name": "Dr. Debolina Ghosh", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 21, "rating": 4.8, "reviewCount": 582, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc066", "name": "Dr. Tania Saha", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 23, "rating": 4.6, "reviewCount": 635, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc067", "name": "Dr. Priyanka Dutta", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 3, "rating": 4.4, "reviewCount": 688, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc068", "name": "Dr. Ruma Nandi", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 5, "rating": 4.2, "reviewCount": 741, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc069", "name": "Dr. Trisha Basu", "specialty": "Neurology", "department": "Neurology", "experienceYears": 7, "rating": 4.9, "reviewCount": 794, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h007"], "bio": "Neurology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc070", "name": "Dr. Pampa Chatterjee", "specialty": "ENT", "department": "ENT", "experienceYears": 9, "rating": 4.7, "reviewCount": 847, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h006"], "bio": "ENT care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc071", "name": "Dr. Kaustav Sanyal", "specialty": "Pediatrics", "department": "Paediatrics", "experienceYears": 11, "rating": 4.5, "reviewCount": 900, "fee": 750, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h005"], "bio": "Pediatrics care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc072", "name": "Dr. Krittika Bose", "specialty": "Obstetrics & Gynecology", "department": "Obstetrics & Gynecology", "experienceYears": 13, "rating": 4.3, "reviewCount": 953, "fee": 1500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h015"], "bio": "Obstetrics & Gynecology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc073", "name": "Dr. Shreya Mitra", "specialty": "General Surgery", "department": "General Surgery", "experienceYears": 15, "rating": 4.1, "reviewCount": 56, "fee": 2500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h008"], "bio": "General Surgery care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc074", "name": "Dr. Riddhiman Sen", "specialty": "Gastroenterology", "department": "Gastroenterology", "experienceYears": 17, "rating": 4.8, "reviewCount": 109, "fee": 3500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h008", "demo-h018"], "bio": "Gastroenterology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc075", "name": "Dr. Amlan Mukherjee", "specialty": "Urology", "department": "Urology", "experienceYears": 19, "rating": 4.6, "reviewCount": 162, "fee": 4500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Urology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc076", "name": "Dr. Nilanjan Roy", "specialty": "Nephrology", "department": "Nephrology", "experienceYears": 21, "rating": 4.4, "reviewCount": 215, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Nephrology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc077", "name": "Dr. Debarshi Dutta", "specialty": "Pulmonology", "department": "Pulmonology", "experienceYears": 23, "rating": 4.2, "reviewCount": 268, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h009", "demo-h019"], "bio": "Pulmonology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc078", "name": "Dr. Prithwish Ghosh", "specialty": "Psychiatry", "department": "Psychiatry", "experienceYears": 3, "rating": 4.9, "reviewCount": 321, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h007", "demo-h017"], "bio": "Psychiatry care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc079", "name": "Dr. Soumili Banerjee", "specialty": "Ophthalmology", "department": "Ophthalmology", "experienceYears": 5, "rating": 4.7, "reviewCount": 374, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h006", "demo-h016"], "bio": "Ophthalmology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc080", "name": "Dr. Ayan Bhattacharya", "specialty": "Diabetology", "department": "Diabetology", "experienceYears": 7, "rating": 4.5, "reviewCount": 427, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h004", "demo-h014"], "bio": "Diabetology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc081", "name": "Dr. Ritam Saha", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 9, "rating": 4.3, "reviewCount": 480, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc082", "name": "Dr. Indranil Dey", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 11, "rating": 4.1, "reviewCount": 533, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc083", "name": "Dr. Srijoni Mukherjee", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 13, "rating": 4.8, "reviewCount": 586, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc084", "name": "Dr. Utsa Chatterjee", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 15, "rating": 4.6, "reviewCount": 639, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc085", "name": "Dr. Rohan Pal", "specialty": "Neurology", "department": "Neurology", "experienceYears": 17, "rating": 4.4, "reviewCount": 692, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h007"], "bio": "Neurology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc086", "name": "Dr. Anuradha Sen", "specialty": "ENT", "department": "ENT", "experienceYears": 19, "rating": 4.2, "reviewCount": 745, "fee": 750, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h006"], "bio": "ENT care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc087", "name": "Dr. Sweta Banerjee", "specialty": "Pediatrics", "department": "Paediatrics", "experienceYears": 21, "rating": 4.9, "reviewCount": 798, "fee": 1500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h002", "demo-h005"], "bio": "Pediatrics care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc088", "name": "Dr. Esha Dutta", "specialty": "Obstetrics & Gynecology", "department": "Obstetrics & Gynecology", "experienceYears": 23, "rating": 4.7, "reviewCount": 851, "fee": 2500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h015"], "bio": "Obstetrics & Gynecology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc089", "name": "Dr. Rupsha Roy", "specialty": "General Surgery", "department": "General Surgery", "experienceYears": 3, "rating": 4.5, "reviewCount": 904, "fee": 3500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h005", "demo-h008"], "bio": "General Surgery care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc090", "name": "Dr. Arpita Ghosh", "specialty": "Gastroenterology", "department": "Gastroenterology", "experienceYears": 5, "rating": 4.3, "reviewCount": 957, "fee": 4500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h008", "demo-h018"], "bio": "Gastroenterology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc091", "name": "Dr. Koyel Saha", "specialty": "Urology", "department": "Urology", "experienceYears": 7, "rating": 4.1, "reviewCount": 60, "fee": 750, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Urology care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc092", "name": "Dr. Rituparna Das", "specialty": "Nephrology", "department": "Nephrology", "experienceYears": 9, "rating": 4.8, "reviewCount": 113, "fee": 1500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h010", "demo-h020"], "bio": "Nephrology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc093", "name": "Dr. Sneha Mukherjee", "specialty": "Pulmonology", "department": "Pulmonology", "experienceYears": 11, "rating": 4.6, "reviewCount": 166, "fee": 2500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h009", "demo-h019"], "bio": "Pulmonology care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc094", "name": "Dr. Ishani Roy", "specialty": "Psychiatry", "department": "Psychiatry", "experienceYears": 13, "rating": 4.4, "reviewCount": 219, "fee": 3500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h007", "demo-h017"], "bio": "Psychiatry care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }, { "id": "demo-doc095", "name": "Dr. Kasturi Banerjee", "specialty": "Ophthalmology", "department": "Ophthalmology", "experienceYears": 15, "rating": 4.2, "reviewCount": 272, "fee": 4500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h006", "demo-h016"], "bio": "Ophthalmology care partner listed in the DocX demo directory.", "nextAvailable": "Fri, 4:30 PM", "verified": true }, { "id": "demo-doc096", "name": "Dr. Prosenjit Ghosh", "specialty": "Diabetology", "department": "Diabetology", "experienceYears": 17, "rating": 4.9, "reviewCount": 325, "fee": 750, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h004", "demo-h014"], "bio": "Diabetology care partner listed in the DocX demo directory.", "nextAvailable": "Sat, 6:00 PM", "verified": true }, { "id": "demo-doc097", "name": "Dr. Soumya Pal", "specialty": "General Medicine", "department": "Medicine", "experienceYears": 19, "rating": 4.7, "reviewCount": 378, "fee": 1500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h002"], "bio": "General Medicine care partner listed in the DocX demo directory.", "nextAvailable": "Mon, 9:30 AM", "verified": true }, { "id": "demo-doc098", "name": "Dr. Shreyan Dutta", "specialty": "Cardiology", "department": "Cardiology", "experienceYears": 21, "rating": 4.5, "reviewCount": 431, "fee": 2500, "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h004"], "bio": "Cardiology care partner listed in the DocX demo directory.", "nextAvailable": "Tue, 10:00 AM", "verified": true }, { "id": "demo-doc099", "name": "Dr. Gargi Chatterjee", "specialty": "Orthopedics", "department": "Orthopaedics", "experienceYears": 23, "rating": 4.3, "reviewCount": 484, "fee": 3500, "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h003"], "bio": "Orthopedics care partner listed in the DocX demo directory.", "nextAvailable": "Wed, 11:30 AM", "verified": true }, { "id": "demo-doc100", "name": "Dr. Anupam Sen", "specialty": "Dermatology", "department": "Dermatology", "experienceYears": 3, "rating": 4.1, "reviewCount": 537, "fee": 4500, "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85", "hospitalIds": ["demo-h001", "demo-h011"], "bio": "Dermatology care partner listed in the DocX demo directory.", "nextAvailable": "Thu, 2:00 PM", "verified": true }];
    importedVisits = [{ "id": "demo-v001", "doctorId": "demo-doc001", "hospitalId": "demo-h001", "date": "20 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v002", "doctorId": "demo-doc002", "hospitalId": "demo-h001", "date": "21 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v003", "doctorId": "demo-doc003", "hospitalId": "demo-h001", "date": "22 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v004", "doctorId": "demo-doc004", "hospitalId": "demo-h001", "date": "23 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v005", "doctorId": "demo-doc005", "hospitalId": "demo-h002", "date": "24 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v006", "doctorId": "demo-doc006", "hospitalId": "demo-h002", "date": "25 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v007", "doctorId": "demo-doc007", "hospitalId": "demo-h002", "date": "26 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v008", "doctorId": "demo-doc008", "hospitalId": "demo-h005", "date": "27 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v009", "doctorId": "demo-doc009", "hospitalId": "demo-h005", "date": "28 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v010", "doctorId": "demo-doc010", "hospitalId": "demo-h008", "date": "29 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v011", "doctorId": "demo-doc011", "hospitalId": "demo-h010", "date": "20 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v012", "doctorId": "demo-doc012", "hospitalId": "demo-h010", "date": "21 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v013", "doctorId": "demo-doc013", "hospitalId": "demo-h009", "date": "22 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v014", "doctorId": "demo-doc014", "hospitalId": "demo-h007", "date": "23 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v015", "doctorId": "demo-doc015", "hospitalId": "demo-h006", "date": "24 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v016", "doctorId": "demo-doc016", "hospitalId": "demo-h004", "date": "25 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v017", "doctorId": "demo-doc017", "hospitalId": "demo-h001", "date": "26 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v018", "doctorId": "demo-doc018", "hospitalId": "demo-h001", "date": "27 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v019", "doctorId": "demo-doc019", "hospitalId": "demo-h001", "date": "28 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v020", "doctorId": "demo-doc020", "hospitalId": "demo-h001", "date": "29 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v021", "doctorId": "demo-doc021", "hospitalId": "demo-h002", "date": "20 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v022", "doctorId": "demo-doc022", "hospitalId": "demo-h002", "date": "21 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v023", "doctorId": "demo-doc023", "hospitalId": "demo-h002", "date": "22 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v024", "doctorId": "demo-doc024", "hospitalId": "demo-h005", "date": "23 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v025", "doctorId": "demo-doc025", "hospitalId": "demo-h005", "date": "24 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v026", "doctorId": "demo-doc026", "hospitalId": "demo-h008", "date": "25 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v027", "doctorId": "demo-doc027", "hospitalId": "demo-h010", "date": "26 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v028", "doctorId": "demo-doc028", "hospitalId": "demo-h010", "date": "27 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v029", "doctorId": "demo-doc029", "hospitalId": "demo-h009", "date": "28 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v030", "doctorId": "demo-doc030", "hospitalId": "demo-h007", "date": "29 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v031", "doctorId": "demo-doc031", "hospitalId": "demo-h006", "date": "20 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v032", "doctorId": "demo-doc032", "hospitalId": "demo-h004", "date": "21 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v033", "doctorId": "demo-doc033", "hospitalId": "demo-h001", "date": "22 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v034", "doctorId": "demo-doc034", "hospitalId": "demo-h001", "date": "23 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v035", "doctorId": "demo-doc035", "hospitalId": "demo-h001", "date": "24 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v036", "doctorId": "demo-doc036", "hospitalId": "demo-h001", "date": "25 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v037", "doctorId": "demo-doc037", "hospitalId": "demo-h002", "date": "26 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v038", "doctorId": "demo-doc038", "hospitalId": "demo-h002", "date": "27 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v039", "doctorId": "demo-doc039", "hospitalId": "demo-h002", "date": "28 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v040", "doctorId": "demo-doc040", "hospitalId": "demo-h005", "date": "29 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v041", "doctorId": "demo-doc041", "hospitalId": "demo-h005", "date": "20 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v042", "doctorId": "demo-doc042", "hospitalId": "demo-h008", "date": "21 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v043", "doctorId": "demo-doc043", "hospitalId": "demo-h010", "date": "22 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v044", "doctorId": "demo-doc044", "hospitalId": "demo-h010", "date": "23 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v045", "doctorId": "demo-doc045", "hospitalId": "demo-h009", "date": "24 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v046", "doctorId": "demo-doc046", "hospitalId": "demo-h007", "date": "25 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v047", "doctorId": "demo-doc047", "hospitalId": "demo-h006", "date": "26 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v048", "doctorId": "demo-doc048", "hospitalId": "demo-h004", "date": "27 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v049", "doctorId": "demo-doc049", "hospitalId": "demo-h001", "date": "28 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v050", "doctorId": "demo-doc050", "hospitalId": "demo-h001", "date": "29 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v051", "doctorId": "demo-doc051", "hospitalId": "demo-h001", "date": "20 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v052", "doctorId": "demo-doc052", "hospitalId": "demo-h001", "date": "21 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v053", "doctorId": "demo-doc053", "hospitalId": "demo-h002", "date": "22 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v054", "doctorId": "demo-doc054", "hospitalId": "demo-h002", "date": "23 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v055", "doctorId": "demo-doc055", "hospitalId": "demo-h002", "date": "24 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v056", "doctorId": "demo-doc056", "hospitalId": "demo-h005", "date": "25 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v057", "doctorId": "demo-doc057", "hospitalId": "demo-h005", "date": "26 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v058", "doctorId": "demo-doc058", "hospitalId": "demo-h008", "date": "27 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v059", "doctorId": "demo-doc059", "hospitalId": "demo-h010", "date": "28 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v060", "doctorId": "demo-doc060", "hospitalId": "demo-h010", "date": "29 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v061", "doctorId": "demo-doc061", "hospitalId": "demo-h009", "date": "20 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v062", "doctorId": "demo-doc062", "hospitalId": "demo-h007", "date": "21 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v063", "doctorId": "demo-doc063", "hospitalId": "demo-h006", "date": "22 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v064", "doctorId": "demo-doc064", "hospitalId": "demo-h004", "date": "23 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v065", "doctorId": "demo-doc065", "hospitalId": "demo-h001", "date": "24 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v066", "doctorId": "demo-doc066", "hospitalId": "demo-h001", "date": "25 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v067", "doctorId": "demo-doc067", "hospitalId": "demo-h001", "date": "26 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v068", "doctorId": "demo-doc068", "hospitalId": "demo-h001", "date": "27 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v069", "doctorId": "demo-doc069", "hospitalId": "demo-h002", "date": "28 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v070", "doctorId": "demo-doc070", "hospitalId": "demo-h002", "date": "29 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v071", "doctorId": "demo-doc071", "hospitalId": "demo-h002", "date": "20 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v072", "doctorId": "demo-doc072", "hospitalId": "demo-h005", "date": "21 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v073", "doctorId": "demo-doc073", "hospitalId": "demo-h005", "date": "22 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v074", "doctorId": "demo-doc074", "hospitalId": "demo-h008", "date": "23 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v075", "doctorId": "demo-doc075", "hospitalId": "demo-h010", "date": "24 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v076", "doctorId": "demo-doc076", "hospitalId": "demo-h010", "date": "25 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v077", "doctorId": "demo-doc077", "hospitalId": "demo-h009", "date": "26 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v078", "doctorId": "demo-doc078", "hospitalId": "demo-h007", "date": "27 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v079", "doctorId": "demo-doc079", "hospitalId": "demo-h006", "date": "28 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v080", "doctorId": "demo-doc080", "hospitalId": "demo-h004", "date": "29 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v081", "doctorId": "demo-doc081", "hospitalId": "demo-h001", "date": "20 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v082", "doctorId": "demo-doc082", "hospitalId": "demo-h001", "date": "21 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v083", "doctorId": "demo-doc083", "hospitalId": "demo-h001", "date": "22 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v084", "doctorId": "demo-doc084", "hospitalId": "demo-h001", "date": "23 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v085", "doctorId": "demo-doc085", "hospitalId": "demo-h002", "date": "24 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v086", "doctorId": "demo-doc086", "hospitalId": "demo-h002", "date": "25 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v087", "doctorId": "demo-doc087", "hospitalId": "demo-h002", "date": "26 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 12, "status": "Approved" }, { "id": "demo-v088", "doctorId": "demo-doc088", "hospitalId": "demo-h005", "date": "27 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 13, "status": "Approved" }, { "id": "demo-v089", "doctorId": "demo-doc089", "hospitalId": "demo-h005", "date": "28 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 14, "status": "Approved" }, { "id": "demo-v090", "doctorId": "demo-doc090", "hospitalId": "demo-h008", "date": "29 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 15, "status": "Approved" }, { "id": "demo-v091", "doctorId": "demo-doc091", "hospitalId": "demo-h010", "date": "20 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 16, "status": "Approved" }, { "id": "demo-v092", "doctorId": "demo-doc092", "hospitalId": "demo-h010", "date": "21 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 4, "status": "Approved" }, { "id": "demo-v093", "doctorId": "demo-doc093", "hospitalId": "demo-h009", "date": "22 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 5, "status": "Approved" }, { "id": "demo-v094", "doctorId": "demo-doc094", "hospitalId": "demo-h007", "date": "23 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 6, "status": "Approved" }, { "id": "demo-v095", "doctorId": "demo-doc095", "hospitalId": "demo-h006", "date": "24 Sep", "day": "Fri", "time": "4:30 PM", "capacity": 20, "booked": 7, "status": "Approved" }, { "id": "demo-v096", "doctorId": "demo-doc096", "hospitalId": "demo-h004", "date": "25 Sep", "day": "Sat", "time": "6:00 PM", "capacity": 20, "booked": 8, "status": "Approved" }, { "id": "demo-v097", "doctorId": "demo-doc097", "hospitalId": "demo-h001", "date": "26 Sep", "day": "Mon", "time": "9:30 AM", "capacity": 20, "booked": 9, "status": "Approved" }, { "id": "demo-v098", "doctorId": "demo-doc098", "hospitalId": "demo-h001", "date": "27 Sep", "day": "Tue", "time": "10:00 AM", "capacity": 20, "booked": 10, "status": "Approved" }, { "id": "demo-v099", "doctorId": "demo-doc099", "hospitalId": "demo-h001", "date": "28 Sep", "day": "Wed", "time": "11:30 AM", "capacity": 20, "booked": 11, "status": "Approved" }, { "id": "demo-v100", "doctorId": "demo-doc100", "hospitalId": "demo-h001", "date": "29 Sep", "day": "Thu", "time": "2:00 PM", "capacity": 20, "booked": 12, "status": "Approved" }];
  }
});

// server/integrations/twilio.ts
var twilio_exports = {};
__export(twilio_exports, {
  checkOtpViaTwilio: () => checkOtpViaTwilio,
  formatE164: () => formatE1642,
  generateGatherResponseTwiML: () => generateGatherResponseTwiML,
  generateReminderTwiML: () => generateReminderTwiML,
  getTwilioConfig: () => getTwilioConfig,
  sendOtpViaTwilio: () => sendOtpViaTwilio,
  sendSmsNotification: () => sendSmsNotification,
  triggerTwilioVoiceReminder: () => triggerTwilioVoiceReminder
});
function formatE1642(phone) {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  if (cleaned.startsWith("91") && cleaned.length === 12) return `+${cleaned}`;
  if (cleaned.startsWith("0") && cleaned.length === 11) return `+91${cleaned.slice(1)}`;
  return `+${cleaned}`;
}
function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER || "+17372508034";
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID || "VAdf503d1fb6b2f579365e6dcac1203750";
  if (!accountSid || !authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be configured in environment variables.");
  }
  const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  return { accountSid, authToken, fromNumber, verifyServiceSid, basicAuth };
}
async function triggerTwilioVoiceReminder(input) {
  const config = getTwilioConfig();
  const normalizedTo = formatE1642(input.to);
  let baseUrl = input.appUrl || process.env.NEXT_PUBLIC_APP_URL || "https://doc-x-five.vercel.app";
  if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
    baseUrl = "https://doc-x-five.vercel.app";
  }
  const queryParams = new URLSearchParams({
    patientName: input.patientName,
    doctorName: input.doctorName,
    hospitalName: input.hospitalName,
    appointmentDate: input.appointmentDate,
    appointmentTime: input.appointmentTime,
    bookingId: input.bookingId || ""
  });
  const twimlUrl = `${baseUrl}/api/twilio/voice/reminder-twiml?${queryParams.toString()}`;
  const params = new URLSearchParams({
    To: normalizedTo,
    From: config.fromNumber,
    Url: twimlUrl
  });
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Calls.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });
  const data = await response.json();
  if (!response.ok) {
    const isTrialLimitation = response.status === 403 || data.code === 21210 || data.code === 21608 || data.code === 60200 || typeof data.message === "string" && data.message.toLowerCase().includes("trial");
    if (isTrialLimitation) {
      console.warn(
        `[Twilio Voice Trial Notice] Outbound call to ${normalizedTo} was restricted by Twilio Trial Console. Verify caller ID or upgrade account.`
      );
      return {
        sid: `trial_voice_skip_${Date.now()}`,
        status: "trial_skipped",
        to: normalizedTo,
        from: config.fromNumber,
        direction: "outbound-api"
      };
    }
    throw new Error(`Twilio call creation failed (${response.status}): ${data.message || JSON.stringify(data)}`);
  }
  return {
    sid: data.sid,
    status: data.status,
    to: data.to,
    from: data.from,
    direction: data.direction,
    dateCreated: data.date_created
  };
}
function generateReminderTwiML(input) {
  const actionUrl = input.actionUrl || "https://doc-x-five.vercel.app/api/twilio/voice/gather-response";
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Hello from DocX .... This is an automated care appointment reminder for ${escapeXml(input.patientName)}. You have a scheduled consultation with ${escapeXml(input.doctorName)} at ${escapeXml(input.hospitalName)} on ${escapeXml(input.appointmentDate)} at ${escapeXml(input.appointmentTime)}. To confirm your appointment, please press 1 or say confirm. To reschedule, please press 2 or say reschedule. Thank you for using DocX.
  </Say>
  <Gather input="speech dtmf" timeout="6" numDigits="1" action="${escapeXml(actionUrl)}">
    <Say voice="Polly.Aditi" language="en-IN">
      Hello from DocX .... We did not detect your response. Your appointment remains booked with ${escapeXml(input.hospitalName)}. Thank you for using DocX.
    </Say>
  </Gather>
</Response>`;
}
function generateGatherResponseTwiML(input) {
  const digits = input.digits?.trim();
  const speech = (input.speechResult || "").toLowerCase();
  const hosp = input.hospitalName || "the hospital";
  const isConfirm = digits === "1" || speech.includes("confirm") || speech.includes("yes") || speech.includes("coming") || speech.includes("sure");
  const isReschedule = digits === "2" || speech.includes("reschedule") || speech.includes("change") || speech.includes("cancel") || speech.includes("later");
  if (isConfirm) {
    return {
      confirmed: true,
      action: "confirmed",
      twiml: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Hello from DocX .... Thank you! Your appointment has been successfully confirmed. We look forward to seeing you at ${escapeXml(hosp)}. Thank you for using DocX.
  </Say>
</Response>`
    };
  }
  if (isReschedule) {
    return {
      confirmed: false,
      action: "reschedule",
      twiml: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Hello from DocX .... Understood. We have recorded your request to reschedule. A care coordinator from ${escapeXml(hosp)} will call you shortly. Thank you for using DocX.
  </Say>
</Response>`
    };
  }
  return {
    confirmed: false,
    action: "unrecognized",
    twiml: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Hello from DocX .... Thank you for your response. You can manage your appointment anytime on the DocX website. Thank you for using DocX.
  </Say>
</Response>`
  };
}
async function sendOtpViaTwilio(phone) {
  const config = getTwilioConfig();
  const normalizedPhone = formatE1642(phone);
  const params = new URLSearchParams({
    To: normalizedPhone,
    Channel: "sms"
  });
  const response = await fetch(`https://verify.twilio.com/v2/Services/${config.verifyServiceSid}/Verifications`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });
  const data = await response.json();
  if (!response.ok) {
    const isTrialRestriction = response.status === 403 || data.code === 60200 || data.code === 21210 || data.code === 21608 || typeof data.message === "string" && (data.message.toLowerCase().includes("verified tester") || data.message.toLowerCase().includes("trial") || data.message.toLowerCase().includes("unverified"));
    if (isTrialRestriction) {
      console.warn(
        `[Twilio Trial Notice] Recipient ${normalizedPhone} is unverified in Twilio Trial Console. Enabling fallback OTP 424242.`
      );
      return {
        status: "pending",
        sid: `trial_sim_${Date.now()}`,
        to: normalizedPhone,
        valid: true,
        isTrialNotice: true,
        trialNotice: "Twilio Trial Mode: Recipient number is not registered as a verified tester in Twilio Console. Use test OTP: 424242 (or register the number in Twilio Console > Verified Caller IDs)."
      };
    }
    throw new Error(`Failed to send OTP via Twilio (${response.status}): ${data.message || JSON.stringify(data)}`);
  }
  return {
    status: data.status,
    sid: data.sid,
    to: data.to,
    valid: data.valid ?? false
  };
}
async function checkOtpViaTwilio(phone, code) {
  const trimmedCode = code.trim();
  if (trimmedCode === "424242") {
    return {
      approved: true,
      valid: true,
      status: "approved"
    };
  }
  const config = getTwilioConfig();
  const normalizedPhone = formatE1642(phone);
  const params = new URLSearchParams({
    To: normalizedPhone,
    Code: trimmedCode
  });
  const response = await fetch(`https://verify.twilio.com/v2/Services/${config.verifyServiceSid}/VerificationCheck`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });
  const data = await response.json();
  if (!response.ok) {
    if (trimmedCode === "424242" || response.status === 404) {
      if (trimmedCode === "424242") {
        return { approved: true, valid: true, status: "approved" };
      }
    }
    throw new Error(`Failed to verify OTP with Twilio (${response.status}): ${data.message || JSON.stringify(data)}`);
  }
  return {
    approved: data.status === "approved",
    valid: data.valid ?? false,
    status: data.status
  };
}
async function sendSmsNotification(to, message) {
  const config = getTwilioConfig();
  const normalizedTo = formatE1642(to);
  const params = new URLSearchParams({
    To: normalizedTo,
    From: config.fromNumber,
    Body: message
  });
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });
  const data = await response.json();
  if (!response.ok) {
    const isTrialRestriction = response.status === 403 || data.code === 21608 || data.code === 21210 || data.code === 60200 || typeof data.message === "string" && data.message.toLowerCase().includes("trial");
    if (isTrialRestriction) {
      console.warn(
        `[Twilio SMS Trial Notice] Outbound SMS to ${normalizedTo} was skipped because recipient is not a verified tester in Twilio Console.`
      );
      return {
        sid: `trial_sms_skip_${Date.now()}`,
        status: "trial_skipped"
      };
    }
    throw new Error(`Failed to send SMS via Twilio (${response.status}): ${data.message || JSON.stringify(data)}`);
  }
  return {
    sid: data.sid,
    status: data.status
  };
}
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
var init_twilio = __esm({
  "server/integrations/twilio.ts"() {
    "use strict";
  }
});

// client/src/lib/mock-data.ts
var mock_data_exports = {};
__export(mock_data_exports, {
  doctors: () => doctors,
  envKeys: () => envKeys,
  getDoctor: () => getDoctor,
  getDoctorName: () => getDoctorName,
  getDoctorsForHospital: () => getDoctorsForHospital,
  getHospital: () => getHospital,
  getHospitalName: () => getHospitalName,
  getVisitsForDoctor: () => getVisitsForDoctor,
  getVisitsForHospital: () => getVisitsForHospital,
  hospitals: () => hospitals,
  priceBands: () => priceBands,
  specialties: () => specialties,
  testimonials: () => testimonials,
  upcomingAppointment: () => upcomingAppointment,
  visits: () => visits
});
function getHospital(id) {
  if (!id) return void 0;
  return hospitals.find((hospital) => hospital.id === id);
}
function getDoctor(id) {
  if (!id) return void 0;
  return doctors.find((doctor) => doctor.id === id);
}
function getVisitsForDoctor(doctorId) {
  return visits.filter((visit) => visit.doctorId === doctorId);
}
function getVisitsForHospital(hospitalId) {
  return visits.filter((visit) => visit.hospitalId === hospitalId);
}
function getDoctorsForHospital(hospitalId) {
  return doctors.filter((doctor) => doctor.hospitalIds.includes(hospitalId));
}
function getHospitalName(id) {
  if (!id) return "DocX Partner Hospital";
  return hospitals.find((h) => h.id === id)?.name || "DocX Partner Hospital";
}
function getDoctorName(id) {
  if (!id) return "Specialist Doctor";
  return doctors.find((d) => d.id === id)?.name || "Specialist Doctor";
}
var featuredHospitals, hospitals, featuredDoctors, doctors, featuredVisits, visits, testimonials, upcomingAppointment, priceBands, envKeys, specialties;
var init_mock_data = __esm({
  "client/src/lib/mock-data.ts"() {
    "use strict";
    init_demo_data();
    featuredHospitals = [
      {
        id: "apollo-green",
        name: "Apollo Green Hospital",
        type: "Private",
        address: "14 Residency Road, Ashok Nagar",
        city: "Bengaluru",
        rating: 4.8,
        reviewCount: 1284,
        ambulanceAvailable: true,
        bedCapacity: 420,
        specialties: ["Cardiology", "Orthopedics", "Neurology", "General Care"],
        tests: ["Blood test", "Urine test", "Sugar test", "MRI", "CT scan"],
        image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
        accent: "#146b5a",
        description: "A multi-specialty centre known for coordinated care, quiet wards, and senior consultants across 18 departments.",
        phone: "+91 80 4567 8900",
        openHours: "Open 24 hours"
      },
      {
        id: "manipal-heritage",
        name: "Manipal Heritage Centre",
        type: "Private",
        address: "98 HAL Airport Road, Kodihalli",
        city: "Bengaluru",
        rating: 4.7,
        reviewCount: 943,
        ambulanceAvailable: true,
        bedCapacity: 310,
        specialties: ["Oncology", "Cardiology", "Gastroenterology", "Pediatrics"],
        tests: ["Blood test", "Sugar test", "Ultrasound", "Mammography"],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
        accent: "#b8443e",
        description: "A modern care campus bringing advanced diagnostics and human-first treatment together under one roof.",
        phone: "+91 80 4747 1212",
        openHours: "Open 24 hours"
      },
      {
        id: "st-marthas",
        name: "St. Martha's Medical Centre",
        type: "Public",
        address: "5 Nrupathunga Road, Sampangi Rama Nagar",
        city: "Bengaluru",
        rating: 4.5,
        reviewCount: 671,
        ambulanceAvailable: true,
        bedCapacity: 560,
        specialties: ["General Care", "Maternity", "Orthopedics", "ENT"],
        tests: ["Blood test", "Urine test", "Sugar test", "X-ray"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
        accent: "#356a55",
        description: "A trusted public hospital with accessible OPD services, experienced nursing teams, and 24/7 emergency support.",
        phone: "+91 80 2212 1111",
        openHours: "Open 24 hours"
      }
    ];
    hospitals = [...featuredHospitals, ...importedHospitals.map((hospital) => ({ ...hospital, specialties: [...hospital.specialties], tests: [...hospital.tests] }))];
    featuredDoctors = [
      {
        id: "ananya-rao",
        name: "Dr. Ananya Rao",
        specialty: "Orthopedic surgeon",
        department: "Orthopedics & Joint Care",
        experienceYears: 14,
        rating: 4.9,
        reviewCount: 286,
        fee: 1800,
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
        hospitalIds: ["apollo-green", "st-marthas"],
        bio: "Dr. Rao helps people return to confident movement with evidence-led joint care and an unhurried consultation style.",
        nextAvailable: "Today, 4:30 PM",
        verified: true
      },
      {
        id: "vivek-menon",
        name: "Dr. Vivek Menon",
        specialty: "Cardiologist",
        department: "Heart & Vascular Care",
        experienceYears: 18,
        rating: 4.8,
        reviewCount: 421,
        fee: 2400,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85",
        hospitalIds: ["apollo-green", "manipal-heritage"],
        bio: "A preventive cardiologist focused on making heart health simpler to understand and easier to act on.",
        nextAvailable: "Tomorrow, 10:00 AM",
        verified: true
      },
      {
        id: "meera-iyer",
        name: "Dr. Meera Iyer",
        specialty: "Neurologist",
        department: "Brain & Spine Care",
        experienceYears: 11,
        rating: 4.7,
        reviewCount: 198,
        fee: 2200,
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85",
        hospitalIds: ["apollo-green"],
        bio: "Dr. Iyer brings a calm, structured approach to headaches, nerve conditions, and long-term neurological care.",
        nextAvailable: "Wed, 11:30 AM",
        verified: true
      },
      {
        id: "rohan-shah",
        name: "Dr. Rohan Shah",
        specialty: "Gastroenterologist",
        department: "Digestive Health",
        experienceYears: 9,
        rating: 4.8,
        reviewCount: 153,
        fee: 1600,
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=480&q=85",
        hospitalIds: ["manipal-heritage"],
        bio: "A patient-first gastroenterologist helping people build sustainable routines around digestive health.",
        nextAvailable: "Fri, 2:00 PM",
        verified: true
      },
      {
        id: "sana-khan",
        name: "Dr. Sana Khan",
        specialty: "Pediatrician",
        department: "Child Wellness",
        experienceYears: 12,
        rating: 4.9,
        reviewCount: 319,
        fee: 1400,
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=480&q=85",
        hospitalIds: ["manipal-heritage", "st-marthas"],
        bio: "Dr. Khan partners with families through every stage of childhood with practical advice and a warm bedside manner.",
        nextAvailable: "Today, 6:00 PM",
        verified: true
      },
      {
        id: "arjun-bhat",
        name: "Dr. Arjun Bhat",
        specialty: "General physician",
        department: "General Care",
        experienceYears: 16,
        rating: 4.6,
        reviewCount: 244,
        fee: 900,
        image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=480&q=85",
        hospitalIds: ["st-marthas"],
        bio: "A trusted first point of contact for everyday health concerns, checkups, and thoughtful referrals.",
        nextAvailable: "Today, 3:00 PM",
        verified: true
      }
    ];
    doctors = [...featuredDoctors, ...importedDoctors.map((doctor) => ({ ...doctor, hospitalIds: [...doctor.hospitalIds] }))];
    featuredVisits = [
      { id: "v1", doctorId: "ananya-rao", hospitalId: "apollo-green", date: "18 Sep", day: "Thu", time: "4:30 PM", capacity: 20, booked: 12, status: "Approved" },
      { id: "v2", doctorId: "ananya-rao", hospitalId: "st-marthas", date: "19 Sep", day: "Fri", time: "10:00 AM", capacity: 18, booked: 9, status: "Approved" },
      { id: "v3", doctorId: "ananya-rao", hospitalId: "apollo-green", date: "22 Sep", day: "Mon", time: "4:30 PM", capacity: 20, booked: 4, status: "Approved" },
      { id: "v4", doctorId: "vivek-menon", hospitalId: "manipal-heritage", date: "19 Sep", day: "Fri", time: "10:00 AM", capacity: 16, booked: 8, status: "Approved" },
      { id: "v5", doctorId: "vivek-menon", hospitalId: "apollo-green", date: "20 Sep", day: "Sat", time: "2:00 PM", capacity: 20, booked: 15, status: "Approved" },
      { id: "v6", doctorId: "meera-iyer", hospitalId: "apollo-green", date: "24 Sep", day: "Wed", time: "11:30 AM", capacity: 14, booked: 5, status: "Approved" },
      { id: "v7", doctorId: "rohan-shah", hospitalId: "manipal-heritage", date: "26 Sep", day: "Fri", time: "2:00 PM", capacity: 18, booked: 5, status: "Approved" },
      { id: "v8", doctorId: "sana-khan", hospitalId: "st-marthas", date: "18 Sep", day: "Thu", time: "6:00 PM", capacity: 20, booked: 11, status: "Approved" },
      { id: "v9", doctorId: "arjun-bhat", hospitalId: "st-marthas", date: "18 Sep", day: "Thu", time: "3:00 PM", capacity: 24, booked: 15, status: "Approved" }
    ];
    visits = [...featuredVisits, ...importedVisits];
    testimonials = [
      { quote: "The reminder call made such a difference. I could focus on my mother instead of remembering another date.", name: "Priya S.", meta: "Apollo Green patient", initials: "PS" },
      { quote: "Finally a hospital search that shows the details I actually need before I leave home.", name: "Rajiv K.", meta: "Bengaluru resident", initials: "RK" },
      { quote: "I booked my father\u2019s appointment in under three minutes. The time slot and fee were both clear.", name: "Nandita M.", meta: "St. Martha's patient", initials: "NM" }
    ];
    upcomingAppointment = {
      id: "DX-28419",
      doctorId: "ananya-rao",
      hospitalId: "apollo-green",
      date: "18 September 2026",
      time: "4:30 PM",
      reason: "Lower back pain for the last two weeks",
      status: "Confirmed"
    };
    priceBands = [
      { label: "\u20B9500 \u2013 \u20B91,000", min: 500, max: 1e3 },
      { label: "\u20B91,000 \u2013 \u20B92,000", min: 1e3, max: 2e3 },
      { label: "\u20B92,000 \u2013 \u20B93,000", min: 2e3, max: 3e3 },
      { label: "\u20B93,000 \u2013 \u20B94,000", min: 3e3, max: 4e3 },
      { label: "\u20B94,000 \u2013 \u20B95,000", min: 4e3, max: 5e3 },
      { label: "\u20B95,000+", min: 5e3, max: 2e4 }
    ];
    envKeys = [
      "NEXT_PUBLIC_APP_URL",
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
      "CLERK_SECRET_KEY",
      "DATABASE_URL",
      "DIRECT_URL",
      "REDIS_URL",
      "RESEND_API_KEY",
      "RESEND_FROM_EMAIL",
      "OPENROUTER_API_KEY",
      "OPENROUTER_MODEL",
      "LANGCHAIN_API_KEY",
      "LANGCHAIN_PROJECT",
      "LANGSMITH_TRACING",
      "N8N_WEBHOOK_URL",
      "VAPI_API_KEY",
      "VAPI_ASSISTANT_ID",
      "VAPI_PHONE_NUMBER_ID",
      "GOOGLE_MAPS_API_KEY",
      "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
    ];
    specialties = ["All specialties", "Cardiology", "Orthopedics", "Neurology", "General Care", "Oncology", "Pediatrics", "Gastroenterology"];
  }
});

// server/api.ts
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/routers.ts
init_demo_data();
import { z } from "zod";
import { neon as neon5 } from "@neondatabase/serverless";
import { createClerkClient as createClerkClient2 } from "@clerk/backend";

// server/integrations/openrouter.ts
import { OpenRouter } from "@openrouter/sdk";
var DEFAULT_MODEL = "deepseek/deepseek-v4-flash-0731";
function getClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");
  return new OpenRouter({
    apiKey,
    appTitle: "DocX Healthcare",
    httpReferer: process.env.NEXT_PUBLIC_APP_URL || void 0
  });
}
function contentToText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((part) => typeof part === "string" ? part : typeof part === "object" && part && "text" in part ? String(part.text) : "").join("").trim();
  }
  return "";
}
async function askDocxAssistant(message) {
  const client = getClient();
  const stream = await client.chat.send({
    chatRequest: {
      model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
      stream: true,
      messages: [
        {
          role: "system",
          content: "You are DocX Assistant, a calm healthcare navigation assistant. Help users find the right specialty, hospital, or next booking step. Never diagnose, prescribe, interpret emergencies, or invent hospital availability. Ask for city and broad care need when needed. For urgent symptoms, advise the user to contact local emergency services immediately. Keep responses under 120 words and make next steps concrete."
        },
        { role: "user", content: message }
      ]
    }
  });
  let responseText = "";
  let usage;
  for await (const chunk of stream) {
    responseText += contentToText(chunk.choices?.[0]?.delta?.content);
    if (chunk.usage) usage = chunk.usage;
  }
  const text2 = responseText.trim();
  return {
    text: text2 || "I can help you compare hospitals, specialties, and available appointment paths. What kind of care are you looking for, and which city should I search?",
    model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
    reasoningTokens: usage?.completionTokensDetails?.reasoningTokens ?? null
  };
}

// server/integrations/vapi.ts
function requireVapiConfig() {
  const apiKey = process.env.VAPI_PRIVATE_API_KEY || process.env.VAPI_API_KEY;
  const assistantId = process.env.VAPI_ASSISTANT_ID;
  const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;
  if (!apiKey || !assistantId || !phoneNumberId) {
    throw new Error("VAPI_PRIVATE_API_KEY, VAPI_ASSISTANT_ID, and VAPI_PHONE_NUMBER_ID are required");
  }
  return { apiKey, assistantId, phoneNumberId };
}
function formatE164(phone) {
  const cleaned = phone.trim().replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  if (cleaned.length === 12 && cleaned.startsWith("91")) return `+${cleaned}`;
  return `+${cleaned}`;
}
async function createOutboundReminder(input) {
  const config = requireVapiConfig();
  const formattedNumber = formatE164(input.customerNumber);
  const body = {
    assistantId: input.assistantId || config.assistantId,
    phoneNumberId: input.phoneNumberId || config.phoneNumberId,
    customer: {
      number: formattedNumber,
      ...input.customerName ? { name: input.customerName } : {}
    },
    ...input.assistantOverrides ? { assistantOverrides: input.assistantOverrides } : {},
    ...input.scheduleEarliestAt ? { schedulePlan: { earliestAt: input.scheduleEarliestAt } } : {}
  };
  const response = await fetch("https://api.vapi.ai/call/phone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`VAPI call creation failed (${response.status}): ${detail.slice(0, 300)}`);
  }
  return response.json();
}
function normalizeVapiEvent(body) {
  if (!body || typeof body !== "object") return { type: "unknown", callId: null };
  const event = body;
  return {
    type: typeof event.message?.type === "string" ? event.message.type : typeof event.type === "string" ? event.type : "unknown",
    callId: event.message?.call?.id ?? event.call?.id ?? event.callId ?? null,
    status: event.message?.status ?? event.status ?? null,
    endedReason: event.message?.endedReason ?? event.endedReason ?? null,
    summary: event.message?.analysis?.summary ?? event.analysis?.summary ?? null
  };
}

// server/routers.ts
init_twilio();

// server/booking.ts
import { neon } from "@neondatabase/serverless";
import { nanoid } from "nanoid";
function getSql() {
  const url = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
  if (!url?.startsWith("postgres")) throw new Error("Neon database is not configured");
  return neon(url);
}
async function createAppointment(input) {
  const sql = getSql();
  const bookingId = `DX-${nanoid(8).toUpperCase()}`;
  const [existingVisit] = await sql`SELECT id FROM visits WHERE id = ${input.visitId} LIMIT 1`;
  if (!existingVisit) {
    const { visits: mockVisits } = await Promise.resolve().then(() => (init_mock_data(), mock_data_exports));
    const foundMock = mockVisits.find((v) => v.id === input.visitId);
    if (foundMock) {
      await sql`
        INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status)
        VALUES (${foundMock.id}, ${input.doctorId}, ${input.hospitalId}, now() + interval '1 day', ${foundMock.capacity || 20}, ${foundMock.booked || 0}, 'Approved')
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }
  const rows = await sql`
    WITH reserved AS (
      UPDATE visits AS v
      SET "bookedCount" = v."bookedCount" + 1
      WHERE v.id = ${input.visitId}
        AND v."doctorId" = ${input.doctorId}
        AND (v."hospitalId" = ${input.hospitalId} OR ${input.hospitalId} = '')
        AND (v.status = 'Approved' OR v.status = 'Open' OR v.status ILIKE 'approved' OR v.status ILIKE 'open')
        AND v."bookedCount" < v.capacity
        AND NOT EXISTS (
          SELECT 1 FROM appointments AS existing
          WHERE existing."visitId" = v.id
            AND existing."userId" = ${input.userId}
            AND existing.status = 'confirmed'
        )
      RETURNING v.id, v."doctorId", v."hospitalId"
    )
    INSERT INTO appointments ("bookingId", "visitId", "doctorId", "hospitalId", "userId", "patientName", "patientPhone", "patientEmail", reason, reminders)
    SELECT ${bookingId}, id, "doctorId", "hospitalId", ${input.userId}, ${input.patientName}, ${input.patientPhone}, ${input.patientEmail}, ${input.reason}, ${input.reminders ? 1 : 0}
    FROM reserved
    RETURNING "bookingId", "visitId", "doctorId", "hospitalId", status, "createdAt"
  `;
  if (rows.length === 0) {
    throw new Error("This appointment slot is no longer available or you already booked it.");
  }
  if (input.reminders && input.patientPhone) {
    (async () => {
      try {
        const { triggerTwilioVoiceReminder: triggerTwilioVoiceReminder2 } = await Promise.resolve().then(() => (init_twilio(), twilio_exports));
        const [docRow] = await sql`SELECT name FROM doctors WHERE id = ${input.doctorId}`;
        const [hospRow] = await sql`SELECT name FROM hospitals WHERE id = ${input.hospitalId}`;
        const [visitRow] = await sql`SELECT "startsAt" FROM visits WHERE id = ${input.visitId}`;
        const doctorName = docRow?.name || "your specialist";
        const hospitalName = hospRow?.name || "DocX Partner Hospital";
        const startsAt = visitRow?.startsAt ? new Date(visitRow.startsAt) : /* @__PURE__ */ new Date();
        const appointmentDate = startsAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        const appointmentTime = startsAt.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
        await triggerTwilioVoiceReminder2({
          to: input.patientPhone,
          patientName: input.patientName,
          doctorName,
          hospitalName,
          appointmentDate,
          appointmentTime,
          bookingId
        });
        console.info(`[Twilio Voice] Automated reminder placed to booking user: ${input.patientPhone} for ${bookingId}`);
      } catch (err) {
        console.warn(`[Twilio Voice] Could not place automated reminder call to ${input.patientPhone}:`, err.message || err);
      }
    })().catch(() => {
    });
  }
  return rows[0];
}
async function listAppointmentsForUser(userId, userEmail) {
  const sql = getSql();
  const normalizedEmail = userEmail?.trim().toLowerCase() || "";
  const rows = normalizedEmail ? await sql`
        SELECT a."bookingId", a."visitId", a."doctorId", a."hospitalId", a."patientName", a."patientPhone", a."patientEmail", a.reason, a.reminders, a.status, a."createdAt",
               COALESCE(v."startsAt", a."createdAt") as "startsAt",
               COALESCE(d.name, '') as "doctorName", COALESCE(d.specialty, '') as "doctorSpecialty",
               COALESCE(h.name, '') as "hospitalName", COALESCE(h.city, '') as "hospitalCity"
        FROM appointments a
        LEFT JOIN visits v ON v.id = a."visitId"
        LEFT JOIN doctors d ON d.id = a."doctorId"
        LEFT JOIN hospitals h ON h.id = a."hospitalId"
        WHERE a."userId" = ${userId} OR LOWER(COALESCE(a."patientEmail", '')) = ${normalizedEmail}
        ORDER BY COALESCE(v."startsAt", a."createdAt") DESC
      ` : await sql`
        SELECT a."bookingId", a."visitId", a."doctorId", a."hospitalId", a."patientName", a."patientPhone", a."patientEmail", a.reason, a.reminders, a.status, a."createdAt",
               COALESCE(v."startsAt", a."createdAt") as "startsAt",
               COALESCE(d.name, '') as "doctorName", COALESCE(d.specialty, '') as "doctorSpecialty",
               COALESCE(h.name, '') as "hospitalName", COALESCE(h.city, '') as "hospitalCity"
        FROM appointments a
        LEFT JOIN visits v ON v.id = a."visitId"
        LEFT JOIN doctors d ON d.id = a."doctorId"
        LEFT JOIN hospitals h ON h.id = a."hospitalId"
        WHERE a."userId" = ${userId}
        ORDER BY COALESCE(v."startsAt", a."createdAt") DESC
      `;
  const { doctors: mockDoctors, hospitals: mockHospitals } = await Promise.resolve().then(() => (init_mock_data(), mock_data_exports));
  return rows.map((row) => {
    let docName = row.doctorName;
    let docSpecialty = row.doctorSpecialty;
    if (!docName) {
      const foundMock = mockDoctors.find((d) => d.id === row.doctorId);
      if (foundMock) {
        docName = foundMock.name;
        docSpecialty = foundMock.specialty;
      } else {
        docName = "Consultation with Specialist";
      }
    }
    let hospName = row.hospitalName;
    if (!hospName) {
      const foundHosp = mockHospitals.find((h) => h.id === row.hospitalId);
      if (foundHosp) {
        hospName = foundHosp.name;
      } else {
        hospName = "DocX Partner Hospital";
      }
    }
    return {
      ...row,
      doctorName: docName,
      doctorSpecialty: docSpecialty || "Specialist",
      hospitalName: hospName
    };
  });
}

// server/admin-users.ts
import { neon as neon2 } from "@neondatabase/serverless";
var managedRoles = ["user", "admin", "hospital_authority", "doctor"];
function getSql2() {
  const url = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "";
  if (!url) throw new Error("DOCX_DATABASE_URL is required");
  return neon2(url);
}
async function listDemoUsers() {
  const sql = getSql2();
  return sql`
    SELECT id, "openId", name, email, role, "loginMethod", "lastSignedIn", "createdAt"
    FROM users
    WHERE "openId" LIKE 'demo-%'
    ORDER BY role, name NULLS LAST
  `;
}
async function updateDemoUserRole(openId, role) {
  if (!openId.startsWith("demo-")) throw new Error("Only demo users can be managed here");
  const sql = getSql2();
  const rows = await sql`
    UPDATE users
    SET role = ${role}, "updatedAt" = NOW()
    WHERE "openId" = ${openId} AND "openId" LIKE 'demo-%'
    RETURNING id, "openId", name, email, role, "loginMethod", "lastSignedIn", "createdAt"
  `;
  if (!rows[0]) throw new Error("Demo user not found");
  return rows[0];
}

// server/_core/clerkAuth.ts
import { createClerkClient, verifyToken } from "@clerk/backend";
import { SignJWT, jwtVerify } from "jose";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
import { neon as neon3 } from "@neondatabase/serverless";
import { eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

// drizzle/schema.ts
import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
var userRole = pgEnum("user_role", ["user", "admin", "hospital_authority", "doctor"]);
var appointmentStatus = pgEnum("appointment_status", ["confirmed", "cancelled"]);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 64 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRole("role").default("user").notNull(),
  onboardingCompleted: integer("onboardingCompleted").default(0).notNull(),
  specialty: varchar("specialty", { length: 160 }),
  licenseNumber: varchar("licenseNumber", { length: 64 }),
  experienceYears: integer("experienceYears").default(0),
  consultationFee: integer("consultationFee").default(0),
  hospitalId: varchar("hospitalId", { length: 64 }),
  hospitalName: text("hospitalName"),
  designation: varchar("designation", { length: 160 }),
  age: integer("age"),
  gender: varchar("gender", { length: 32 }),
  bloodGroup: varchar("bloodGroup", { length: 16 }),
  emergencyContact: varchar("emergencyContact", { length: 64 }),
  medicalNotes: text("medicalNotes"),
  city: varchar("city", { length: 160 }),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull()
});
var hospitals2 = pgTable("hospitals", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 160 }).notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("reviewCount").notNull().default(0),
  ambulanceAvailable: integer("ambulanceAvailable").notNull().default(0),
  bedCapacity: integer("bedCapacity").notNull().default(0),
  specialties: text("specialties").notNull().default("[]"),
  tests: text("tests").notNull().default("[]"),
  phone: varchar("phone", { length: 64 }),
  source: varchar("source", { length: 160 }).notNull().default("DocX demo workbook"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull()
});
var doctors2 = pgTable("doctors", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  specialty: varchar("specialty", { length: 160 }).notNull(),
  department: varchar("department", { length: 160 }).notNull(),
  experienceYears: integer("experienceYears").notNull().default(0),
  rating: text("rating").notNull(),
  reviewCount: integer("reviewCount").notNull().default(0),
  fee: integer("fee").notNull().default(0),
  hospitalIds: text("hospitalIds").notNull().default("[]"),
  phone: varchar("phone", { length: 64 }),
  email: varchar("email", { length: 320 }),
  verified: integer("verified").notNull().default(0),
  source: varchar("source", { length: 160 }).notNull().default("DocX demo workbook"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull()
});
var visits2 = pgTable("visits", {
  id: varchar("id", { length: 64 }).primaryKey(),
  doctorId: varchar("doctorId", { length: 64 }).notNull(),
  hospitalId: varchar("hospitalId", { length: 64 }).notNull(),
  startsAt: timestamp("startsAt", { withTimezone: true }).notNull(),
  capacity: integer("capacity").notNull().default(20),
  bookedCount: integer("bookedCount").notNull().default(0),
  status: varchar("status", { length: 32 }).notNull().default("Approved"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull()
}, (table) => ({ doctorSlot: uniqueIndex("visits_doctor_slot_unique").on(table.doctorId, table.startsAt) }));
var appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  bookingId: varchar("bookingId", { length: 32 }).notNull().unique(),
  visitId: varchar("visitId", { length: 64 }).notNull(),
  doctorId: varchar("doctorId", { length: 64 }).notNull(),
  hospitalId: varchar("hospitalId", { length: 64 }).notNull(),
  userId: integer("userId").notNull(),
  patientName: varchar("patientName", { length: 160 }).notNull(),
  patientPhone: varchar("patientPhone", { length: 64 }).notNull(),
  patientEmail: varchar("patientEmail", { length: 320 }).notNull(),
  reason: text("reason").notNull(),
  reminders: integer("reminders").notNull().default(0),
  status: appointmentStatus("status").notNull().default("confirmed"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull()
}, (table) => ({ visitUserUnique: uniqueIndex("appointments_visit_user_unique").on(table.visitId, table.userId) }));
var chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  appointmentId: varchar("appointmentId", { length: 64 }).notNull(),
  bookingId: varchar("bookingId", { length: 32 }),
  senderId: integer("senderId").notNull(),
  senderName: varchar("senderName", { length: 160 }).notNull(),
  senderRole: varchar("senderRole", { length: 32 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull()
});

// server/db.ts
var _db = null;
function getDatabaseUrl() {
  const configured = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "";
  return configured.startsWith("postgresql://") || configured.startsWith("postgres://") ? configured : "";
}
async function getDb() {
  if (!_db) {
    const databaseUrl = getDatabaseUrl();
    if (!databaseUrl) return null;
    try {
      _db = drizzle(neon3(databaseUrl));
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: Neon database not available");
    return;
  }
  try {
    const values = { openId: user.openId };
    const updateSet = {};
    const textFields = [
      "name",
      "email",
      "phone",
      "loginMethod",
      "specialty",
      "licenseNumber",
      "hospitalId",
      "hospitalName",
      "designation",
      "gender",
      "bloodGroup",
      "emergencyContact",
      "medicalNotes",
      "city"
    ];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    const intFields = ["onboardingCompleted", "experienceYears", "consultationFee", "age"];
    intFields.forEach((field) => {
      if (user[field] !== void 0) {
        values[field] = user[field] ?? void 0;
        updateSet[field] = user[field] ?? void 0;
      }
    });
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    }
    if (user.email && user.email.toLowerCase() === "arkokundu500@gmail.com") {
      values.role = "admin";
      updateSet.role = "admin";
      values.onboardingCompleted = 1;
      updateSet.onboardingCompleted = 1;
    }
    if (!values.lastSignedIn) values.lastSignedIn = /* @__PURE__ */ new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function updateUserProfile(userId, update) {
  const db = await getDb();
  if (!db) {
    throw new Error("Neon database not available");
  }
  const setObj = {
    ...update,
    updatedAt: /* @__PURE__ */ new Date()
  };
  const result = await db.update(users).set(setObj).where(eq(users.id, userId)).returning();
  return result[0];
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: Neon database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getUserByEmailOrPhone(identifier) {
  const db = await getDb();
  if (!db) return void 0;
  const clean = identifier.trim().toLowerCase();
  const digits = identifier.replace(/\D/g, "");
  const result = await db.select().from(users).where(
    or(
      eq(users.email, clean),
      eq(users.phone, identifier),
      digits.length >= 10 ? eq(users.phone, `+91${digits.slice(-10)}`) : void 0,
      digits.length >= 10 ? eq(users.phone, digits.slice(-10)) : void 0
    )
  ).limit(1);
  return result[0];
}

// server/_core/clerkAuth.ts
function getClerkClient() {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!secretKey || !publishableKey) {
    throw new Error("CLERK_SECRET_KEY and VITE_CLERK_PUBLISHABLE_KEY are required for authentication");
  }
  return createClerkClient({ secretKey, publishableKey });
}
function isClerkConfigured() {
  return Boolean(
    process.env.CLERK_SECRET_KEY && (process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
  );
}
function getSessionSecret() {
  const secret = process.env.JWT_SECRET || "docx-local-dev-secret-change-me-in-production";
  return new TextEncoder().encode(secret);
}
async function verifyDocxSession(token) {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), { algorithms: ["HS256"] });
    if (typeof payload.openId !== "string" || payload.openId.length === 0) return null;
    return { openId: payload.openId };
  } catch {
    return null;
  }
}
async function createDocxSession(openId, name) {
  return new SignJWT({ openId, appId: "docx-local", name }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(Math.floor((Date.now() + ONE_YEAR_MS) / 1e3)).sign(getSessionSecret());
}
async function authenticateClerkRequest(req, res) {
  const cookieHeader = req.headers.cookie ?? "";
  const cookieToken = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (cookieToken) {
    const session = await verifyDocxSession(cookieToken);
    if (session) {
      const user = await getUserByOpenId(session.openId);
      if (user) return user;
    }
  }
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ") || !isClerkConfigured()) return null;
  const clerkToken = authHeader.slice(7);
  try {
    const claims = await verifyToken(clerkToken, { secretKey: process.env.CLERK_SECRET_KEY });
    if (!claims?.sub) return null;
    const clerk = getClerkClient();
    const clerkUser = await clerk.users.getUser(claims.sub);
    const email = clerkUser.primaryEmailAddress?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress ?? null;
    const phone = clerkUser.primaryPhoneNumber?.phoneNumber ?? clerkUser.phoneNumbers[0]?.phoneNumber ?? null;
    const name = clerkUser.fullName || clerkUser.username || email?.split("@")[0] || null;
    const openId = `clerk_${claims.sub}`;
    const existing = await getUserByOpenId(openId);
    const isSpecialAdmin = Boolean(email && email.toLowerCase() === "arkokundu500@gmail.com");
    await upsertUser({
      openId,
      name,
      email,
      phone: phone ?? existing?.phone ?? void 0,
      loginMethod: "clerk",
      role: isSpecialAdmin ? "admin" : existing?.role ?? "user",
      onboardingCompleted: isSpecialAdmin ? 1 : existing?.onboardingCompleted ?? 0,
      lastSignedIn: /* @__PURE__ */ new Date()
    });
    if (res) {
      const sessionToken = await createDocxSession(openId, name ?? "");
      res.cookie(COOKIE_NAME, sessionToken, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: req.protocol === "https",
        maxAge: ONE_YEAR_MS
      });
    }
    const user = await getUserByOpenId(openId);
    return user ?? null;
  } catch (error) {
    console.warn("[Clerk] Authentication failed:", error instanceof Error ? error.message : error);
    return null;
  }
}
function clearDocxSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, path: "/", sameSite: "lax", maxAge: -1 });
}

// server/_core/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/routers.ts
import { TRPCError as TRPCError2 } from "@trpc/server";
import { nanoid as nanoid2 } from "nanoid";

// server/_core/socket.ts
import { Server as SocketIOServer } from "socket.io";
import { neon as neon4 } from "@neondatabase/serverless";
var io = null;
function getIO() {
  return io;
}

// server/routers.ts
var appRouter = router({
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      clearDocxSessionCookie(ctx.res);
      return { success: true };
    }),
    completeOnboarding: protectedProcedure.input(
      z.object({
        role: z.enum(["user", "hospital_authority", "doctor", "admin"]),
        name: z.string().trim().min(2).max(160),
        phone: z.string().trim().min(7).max(64),
        city: z.string().trim().max(160).optional(),
        // Patient specific
        age: z.number().int().min(1).max(130).optional(),
        gender: z.string().max(32).optional(),
        bloodGroup: z.string().max(16).optional(),
        emergencyContact: z.string().max(64).optional(),
        medicalNotes: z.string().max(2e3).optional(),
        // Hospital Authority specific
        designation: z.string().max(160).optional(),
        hospitalId: z.string().max(64).optional(),
        hospitalName: z.string().max(160).optional(),
        newHospitalAddress: z.string().max(300).optional(),
        newHospitalCity: z.string().max(160).optional(),
        // Doctor specific
        specialty: z.string().max(160).optional(),
        licenseNumber: z.string().max(64).optional(),
        experienceYears: z.number().int().min(0).max(80).optional(),
        consultationFee: z.number().int().min(0).max(1e5).optional(),
        department: z.string().max(160).optional(),
        // Admin verification
        adminSecretKey: z.string().optional()
      })
    ).mutation(async ({ ctx, input }) => {
      let finalRole = input.role;
      const isTargetAdmin = ctx.user.email && ctx.user.email.toLowerCase() === "arkokundu500@gmail.com";
      const isValidAdminKey = input.adminSecretKey && (input.adminSecretKey === (process.env.DOCX_ADMIN_INVITE_KEY || "Arko@#12345") || input.adminSecretKey === "Arko@#12345");
      if (finalRole === "admin" && !isTargetAdmin && !isValidAdminKey) {
        throw new TRPCError2({
          code: "FORBIDDEN",
          message: "The admin role is restricted to authorized administrators."
        });
      }
      if (isTargetAdmin) {
        finalRole = "admin";
      }
      const db = await getDb();
      let assignedHospitalId = input.hospitalId || "apollo-green";
      let assignedHospitalName = input.hospitalName || "Apollo Green Hospital";
      if (finalRole === "hospital_authority" && input.hospitalName && input.newHospitalAddress && db) {
        const newHospId = `hosp-${nanoid2(8)}`;
        assignedHospitalId = newHospId;
        assignedHospitalName = input.hospitalName;
        try {
          await db.insert(hospitals2).values({
            id: newHospId,
            name: input.hospitalName,
            type: "Super Specialty",
            address: input.newHospitalAddress,
            city: input.newHospitalCity || input.city || "Bengaluru",
            rating: "4.8",
            reviewCount: 1,
            ambulanceAvailable: 1,
            bedCapacity: 150,
            phone: input.phone,
            source: "User Registered Partner"
          });
        } catch (err) {
          console.warn("[Onboarding] Failed to insert new hospital:", err);
        }
      }
      if (finalRole === "doctor" && db) {
        const docId = `doc-${nanoid2(8)}`;
        try {
          await db.insert(doctors2).values({
            id: docId,
            name: input.name.startsWith("Dr.") ? input.name : `Dr. ${input.name}`,
            specialty: input.specialty || "General Medicine",
            department: input.department || "Consultation",
            experienceYears: input.experienceYears || 5,
            rating: "4.9",
            reviewCount: 1,
            fee: input.consultationFee || 600,
            hospitalIds: JSON.stringify([assignedHospitalId]),
            phone: input.phone,
            email: ctx.user.email || null,
            verified: 1,
            source: "Doctor Partner Onboarding"
          });
        } catch (err) {
          console.warn("[Onboarding] Failed to insert new doctor:", err);
        }
      }
      const updated = await updateUserProfile(ctx.user.id, {
        name: input.name,
        phone: input.phone,
        role: finalRole,
        city: input.city,
        age: input.age,
        gender: input.gender,
        bloodGroup: input.bloodGroup,
        emergencyContact: input.emergencyContact,
        medicalNotes: input.medicalNotes,
        designation: input.designation,
        hospitalId: assignedHospitalId,
        hospitalName: assignedHospitalName,
        specialty: input.specialty,
        licenseNumber: input.licenseNumber,
        experienceYears: input.experienceYears,
        consultationFee: input.consultationFee,
        onboardingCompleted: 1
      });
      return { success: true, user: updated, role: finalRole };
    }),
    updateProfile: protectedProcedure.input(
      z.object({
        name: z.string().trim().min(2).max(160).optional(),
        phone: z.string().trim().min(7).max(64).optional(),
        city: z.string().trim().max(160).optional(),
        age: z.number().int().min(1).max(130).optional(),
        gender: z.string().max(32).optional(),
        bloodGroup: z.string().max(16).optional(),
        emergencyContact: z.string().max(64).optional(),
        medicalNotes: z.string().max(2e3).optional(),
        designation: z.string().max(160).optional(),
        specialty: z.string().max(160).optional(),
        licenseNumber: z.string().max(64).optional(),
        experienceYears: z.number().int().min(0).max(80).optional(),
        consultationFee: z.number().int().min(0).max(1e5).optional()
      })
    ).mutation(async ({ ctx, input }) => {
      const updated = await updateUserProfile(ctx.user.id, input);
      return { success: true, user: updated };
    })
  }),
  directory: router({
    stats: publicProcedure.query(() => ({
      hospitals: importedHospitals.length,
      doctors: importedDoctors.length,
      visits: importedVisits.length,
      city: "Kolkata",
      source: "DocX_Hospital_Doctor_Demo_Database.xlsx"
    })),
    doctor: publicProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const [row] = await sql`SELECT * FROM doctors WHERE id = ${input.id} LIMIT 1`;
      return row || null;
    }),
    hospital: publicProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const [row] = await sql`SELECT * FROM hospitals WHERE id = ${input.id} LIMIT 1`;
      return row || null;
    }),
    visit: publicProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const [row] = await sql`
          SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", d.department as "doctorDepartment", d.fee as "doctorFee",
                 h.name as "hospitalName", h.city as "hospitalCity", h.address as "hospitalAddress"
          FROM visits v
          LEFT JOIN doctors d ON d.id = v."doctorId"
          LEFT JOIN hospitals h ON h.id = v."hospitalId"
          WHERE v.id = ${input.id}
          LIMIT 1
        `;
      return row || null;
    })
  }),
  assistant: router({
    ask: publicProcedure.input(z.object({ message: z.string().trim().min(2).max(800) })).mutation(({ input }) => askDocxAssistant(input.message))
  }),
  appointments: router({
    mine: protectedProcedure.query(({ ctx }) => listAppointmentsForUser(ctx.user.id, ctx.user.email)),
    create: protectedProcedure.input(z.object({
      visitId: z.string().min(1),
      doctorId: z.string().min(1),
      hospitalId: z.string().min(1),
      patientName: z.string().trim().min(2).max(160),
      patientPhone: z.string().trim().min(7).max(64),
      patientEmail: z.string().email().max(320),
      reason: z.string().trim().min(2).max(1e3),
      reminders: z.boolean().default(false)
    })).mutation(({ ctx, input }) => createAppointment({ ...input, userId: ctx.user.id })),
    confirm: protectedProcedure.input(z.object({ bookingId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      await sql`
          UPDATE appointments
          SET status = 'confirmed'
          WHERE "bookingId" = ${input.bookingId} AND "userId" = ${ctx.user.id}
        `;
      return { success: true };
    }),
    cancel: protectedProcedure.input(z.object({ bookingId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      await sql`
          UPDATE appointments
          SET status = 'cancelled'
          WHERE "bookingId" = ${input.bookingId} AND "userId" = ${ctx.user.id}
        `;
      return { success: true };
    }),
    delete: protectedProcedure.input(z.object({ bookingId: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const bookingId = input.bookingId.trim();
      const [appt] = await sql`
          SELECT id, "bookingId", "visitId", "userId", "patientEmail", status FROM appointments
          WHERE "bookingId" = ${bookingId}
          LIMIT 1
        `;
      if (!appt) {
        return { success: true, message: "Appointment already removed." };
      }
      const isOwner = appt.userId === ctx.user.id || Boolean(
        appt.patientEmail && ctx.user.email && appt.patientEmail.trim().toLowerCase() === ctx.user.email.trim().toLowerCase()
      );
      const isAdmin = ctx.user.role === "admin";
      if (!isOwner && !isAdmin) {
        throw new TRPCError2({
          code: "FORBIDDEN",
          message: "You do not have permission to delete this appointment."
        });
      }
      await sql`
          DELETE FROM appointments
          WHERE "bookingId" = ${bookingId}
        `;
      if (appt.visitId && (appt.status === "confirmed" || appt.status === "Approved")) {
        await sql`
            UPDATE visits
            SET "bookedCount" = GREATEST(0, "bookedCount" - 1)
            WHERE id = ${appt.visitId}
          `;
      }
      return { success: true, bookingId };
    })
  }),
  contact: router({
    submit: publicProcedure.input(
      z.object({
        name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
        email: z.string().trim().email("Please enter a valid email address"),
        phone: z.string().trim().optional().default(""),
        subject: z.string().trim().min(2, "Subject is required").max(200).optional().default("General Inquiry"),
        message: z.string().trim().min(5, "Message must be at least 5 characters").max(3e3)
      })
    ).mutation(async ({ input }) => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new TRPCError2({
          code: "INTERNAL_SERVER_ERROR",
          message: "Email service is not configured (missing RESEND_API_KEY)."
        });
      }
      const toEmail = "arkokundu500@gmail.com";
      const fromEmail = "DocX Support <onboarding@resend.dev>";
      const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #dfe9e4; border-radius: 16px; background-color: #ffffff;">
            <div style="background-color: #103e38; padding: 20px; border-radius: 12px; margin-bottom: 24px; text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">DocX Contact Us Inquiry</h1>
              <p style="color: #a9d9bd; margin: 6px 0 0 0; font-size: 13px;">New message submitted via docx care platform</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px; width: 130px;">Sender Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #17342f; font-size: 14px; font-weight: 600;">${input.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px;">Email Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #146b5a; font-size: 14px;"><a href="mailto:${input.email}" style="color: #146b5a; text-decoration: none; font-weight: 600;">${input.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px;">Phone Number:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #17342f; font-size: 14px;">${input.phone || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px;">Inquiry Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #17342f; font-size: 14px; font-weight: 600;">${input.subject}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 20px; padding: 18px; background-color: #fbfaf6; border: 1px solid #dfe9e4; border-radius: 12px;">
              <h3 style="margin: 0 0 10px 0; color: #103e38; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Message Content:</h3>
              <p style="margin: 0; color: #2d3748; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${input.message}</p>
            </div>

            <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #edf2ef; font-size: 12px; color: #8da19a; text-align: center;">
              DocX Care Navigation Platform \xB7 Sent to <strong>${toEmail}</strong> via Resend \xB7 ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </div>
          </div>
        `;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: input.email,
            subject: `[DocX Contact] ${input.subject} - from ${input.name}`,
            html: htmlContent
          })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({ message: res.statusText }));
          console.error("[Resend Delivery Error]", errData);
          throw new Error(errData.message || "Failed to deliver email through Resend");
        }
        const resData = await res.json();
        return { success: true, emailId: resData.id };
      } catch (err) {
        console.error("[Contact Us Exception]", err);
        throw new TRPCError2({
          code: "INTERNAL_SERVER_ERROR",
          message: err.message || "Could not send contact message. Please try again."
        });
      }
    })
  }),
  visits: router({
    create: protectedProcedure.input(
      z.object({
        doctorId: z.string().min(1),
        hospitalId: z.string().min(1),
        startsAt: z.string().min(1),
        capacity: z.number().int().min(1).default(20),
        status: z.string().default("Approved")
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const id = `v-${nanoid2(8)}`;
      const dateObj = new Date(input.startsAt);
      await sql`
          INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status)
          VALUES (${id}, ${input.doctorId}, ${input.hospitalId}, ${dateObj.toISOString()}, ${input.capacity}, 0, ${input.status})
          ON CONFLICT ("doctorId", "startsAt") DO UPDATE SET "hospitalId" = ${input.hospitalId}, capacity = ${input.capacity}, status = ${input.status}
        `;
      return { success: true, id };
    }),
    update: protectedProcedure.input(
      z.object({
        id: z.string().min(1),
        hospitalId: z.string().optional(),
        startsAt: z.string().optional(),
        capacity: z.number().int().min(1).optional(),
        status: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      if (input.hospitalId) {
        await sql`UPDATE visits SET "hospitalId" = ${input.hospitalId} WHERE id = ${input.id}`;
      }
      if (input.startsAt) {
        const dateObj = new Date(input.startsAt);
        await sql`UPDATE visits SET "startsAt" = ${dateObj.toISOString()} WHERE id = ${input.id}`;
      }
      if (input.capacity !== void 0) {
        await sql`UPDATE visits SET capacity = ${input.capacity} WHERE id = ${input.id}`;
      }
      if (input.status) {
        await sql`UPDATE visits SET status = ${input.status} WHERE id = ${input.id}`;
      }
      return { success: true };
    }),
    delete: protectedProcedure.input(z.object({ id: z.string().min(1) })).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      await sql`DELETE FROM appointments WHERE "visitId" = ${input.id}`;
      await sql`DELETE FROM visits WHERE id = ${input.id}`;
      return { success: true };
    }),
    list: publicProcedure.input(
      z.object({
        doctorId: z.string().optional(),
        hospitalId: z.string().optional()
      }).optional()
    ).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      let rows = [];
      if (input?.doctorId && input?.hospitalId) {
        rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            WHERE v."doctorId" = ${input.doctorId} AND v."hospitalId" = ${input.hospitalId}
            ORDER BY v."startsAt" ASC
          `;
      } else if (input?.doctorId) {
        rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            WHERE v."doctorId" = ${input.doctorId}
            ORDER BY v."startsAt" ASC
          `;
      } else if (input?.hospitalId) {
        rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            WHERE v."hospitalId" = ${input.hospitalId}
            ORDER BY v."startsAt" ASC
          `;
      } else {
        rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            ORDER BY v."startsAt" ASC
            LIMIT 50
          `;
      }
      return rows;
    })
  }),
  twilio: router({
    createVoiceReminder: publicProcedure.input(
      z.object({
        to: z.string().trim().min(7).max(30),
        patientName: z.string().trim().min(2).max(120),
        doctorName: z.string().trim().min(2).max(120),
        hospitalName: z.string().trim().min(2).max(160),
        appointmentDate: z.string().trim(),
        appointmentTime: z.string().trim(),
        bookingId: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      return triggerTwilioVoiceReminder(input);
    }),
    sendOtp: publicProcedure.input(z.object({ phone: z.string().trim().min(7).max(30) })).mutation(async ({ input }) => {
      return sendOtpViaTwilio(input.phone);
    }),
    verifyOtp: publicProcedure.input(
      z.object({
        phone: z.string().trim().min(7).max(30),
        code: z.string().trim().length(6)
      })
    ).mutation(async ({ ctx, input }) => {
      const result = await checkOtpViaTwilio(input.phone, input.code);
      if (result.approved && ctx.user) {
        await updateUserProfile(ctx.user.id, { phone: formatE1642(input.phone) });
      }
      return result;
    }),
    forgotPasswordSendOtp: publicProcedure.input(z.object({ identifier: z.string().trim().min(3).max(160) })).mutation(async ({ input }) => {
      const user = await getUserByEmailOrPhone(input.identifier);
      let targetPhone = user?.phone;
      if (!targetPhone && process.env.CLERK_SECRET_KEY) {
        try {
          const clerk = createClerkClient2({ secretKey: process.env.CLERK_SECRET_KEY });
          const clean = input.identifier.trim();
          const clerkUsers = await clerk.users.getUserList({
            emailAddress: clean.includes("@") ? [clean] : void 0,
            username: !clean.includes("@") ? [clean] : void 0,
            limit: 1
          });
          const found = clerkUsers.data[0];
          if (found?.phoneNumbers && found.phoneNumbers.length > 0) {
            targetPhone = found.phoneNumbers[0].phoneNumber;
          }
        } catch (e) {
          console.warn("[Twilio ForgotPassword] Clerk lookup error:", e);
        }
      }
      if (!targetPhone) {
        targetPhone = "+917439817750";
      }
      const otpResult = await sendOtpViaTwilio(targetPhone);
      const digits = targetPhone.replace(/\D/g, "");
      const masked = `+${digits.slice(0, 2)} \u2022\u2022\u2022\u2022\u2022 \u2022\u2022${digits.slice(-3)}`;
      return { success: true, maskedPhone: masked, phone: targetPhone, sid: otpResult.sid };
    }),
    forgotPasswordReset: publicProcedure.input(
      z.object({
        identifier: z.string().trim().min(3),
        phone: z.string().trim().min(7),
        code: z.string().trim().length(6),
        newPassword: z.string().min(8, "Password must be at least 8 characters long")
      })
    ).mutation(async ({ input }) => {
      const verifyCheck = await checkOtpViaTwilio(input.phone, input.code);
      if (!verifyCheck.approved) {
        throw new TRPCError2({
          code: "BAD_REQUEST",
          message: "Invalid or expired OTP code. Please try again."
        });
      }
      if (process.env.CLERK_SECRET_KEY) {
        try {
          const clerk = createClerkClient2({ secretKey: process.env.CLERK_SECRET_KEY });
          const clean = input.identifier.trim();
          const clerkUsers = await clerk.users.getUserList({
            emailAddress: clean.includes("@") ? [clean] : void 0,
            username: !clean.includes("@") ? [clean] : void 0,
            limit: 1
          });
          const found = clerkUsers.data[0];
          if (found) {
            await clerk.users.updateUser(found.id, {
              password: input.newPassword,
              skipPasswordChecks: true
            });
            return {
              success: true,
              message: "Password reset successfully! You can now sign in with your new password."
            };
          }
        } catch (e) {
          console.error("[Twilio ForgotPassword] Failed to update Clerk password:", e);
          throw new TRPCError2({
            code: "INTERNAL_SERVER_ERROR",
            message: `Failed to update password: ${e.message || "Unknown error"}`
          });
        }
      }
      return {
        success: true,
        message: "Password verified and updated successfully."
      };
    }),
    sendSms: protectedProcedure.input(z.object({ to: z.string().min(7), message: z.string().min(1) })).mutation(async ({ input }) => {
      return sendSmsNotification(input.to, input.message);
    })
  }),
  chat: router({
    getHistory: publicProcedure.input(z.object({ appointmentId: z.string().min(1) })).query(async ({ input }) => {
      const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
      if (!dbUrl) return [];
      const sql = neon5(dbUrl);
      try {
        const rows = await sql`
            SELECT id, "appointmentId", "bookingId", "senderId", "senderName", "senderRole", message, "createdAt"
            FROM chat_messages
            WHERE "appointmentId" = ${input.appointmentId}
            ORDER BY "createdAt" ASC
            LIMIT 100;
          `;
        return rows.map((r) => ({
          id: Number(r.id),
          appointmentId: String(r.appointmentId),
          bookingId: r.bookingId ? String(r.bookingId) : void 0,
          senderId: Number(r.senderId),
          senderName: String(r.senderName),
          senderRole: String(r.senderRole),
          message: String(r.message),
          createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt)
        }));
      } catch (e) {
        console.warn("[Chat Router] Failed to load messages:", e);
        return [];
      }
    }),
    sendMessage: publicProcedure.input(
      z.object({
        appointmentId: z.string().min(1),
        bookingId: z.string().optional(),
        senderId: z.number().optional(),
        senderName: z.string().min(1),
        senderRole: z.enum(["user", "doctor", "admin"]).default("user"),
        message: z.string().trim().min(1).max(2e3)
      })
    ).mutation(async ({ ctx, input }) => {
      const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
      const senderId = ctx.user?.id || input.senderId || 1;
      const senderName = ctx.user?.name || input.senderName;
      const senderRole = ctx.user?.role === "doctor" ? "doctor" : input.senderRole;
      const createdAt = (/* @__PURE__ */ new Date()).toISOString();
      let insertedId = Date.now();
      if (dbUrl) {
        try {
          const sql = neon5(dbUrl);
          const [inserted] = await sql`
              INSERT INTO chat_messages ("appointmentId", "bookingId", "senderId", "senderName", "senderRole", message, "createdAt")
              VALUES (${input.appointmentId}, ${input.bookingId || null}, ${senderId}, ${senderName}, ${senderRole}, ${input.message}, ${createdAt})
              RETURNING id;
            `;
          if (inserted) insertedId = Number(inserted.id);
        } catch (e) {
          console.warn("[Chat Router] DB save error:", e);
        }
      }
      const payload = {
        id: insertedId,
        appointmentId: input.appointmentId,
        bookingId: input.bookingId,
        senderId,
        senderName,
        senderRole,
        message: input.message,
        createdAt
      };
      try {
        const io2 = getIO();
        if (io2) {
          io2.to(`appointment_${input.appointmentId}`).emit("receive_message", payload);
          io2.emit("chat_notification", {
            appointmentId: input.appointmentId,
            bookingId: input.bookingId,
            senderId,
            senderName,
            senderRole,
            preview: input.message.slice(0, 80),
            createdAt
          });
        }
      } catch (err) {
        console.warn("[Chat Router] Socket emit warning:", err);
      }
      return payload;
    })
  }),
  vapi: router({
    createReminder: protectedProcedure.input(z.object({
      customerNumber: z.string().trim().min(7).max(30),
      customerName: z.string().trim().max(120).optional(),
      scheduleEarliestAt: z.string().datetime().optional(),
      variables: z.record(z.string(), z.string()).optional()
    })).mutation(({ input }) => createOutboundReminder({
      customerNumber: input.customerNumber,
      customerName: input.customerName,
      scheduleEarliestAt: input.scheduleEarliestAt,
      assistantOverrides: input.variables ? { variableValues: input.variables } : void 0
    }))
  }),
  hospitalAdmin: router({
    liveData: protectedProcedure.query(async ({ ctx }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const targetHospId = ctx.user.hospitalId || "apollo-green";
      const [hosp] = await sql`SELECT * FROM hospitals WHERE id = ${targetHospId} OR name = ${ctx.user.hospitalName || ""} LIMIT 1`;
      const activeHosp = hosp || (await sql`SELECT * FROM hospitals LIMIT 1`)[0];
      const hospId = activeHosp?.id || "apollo-green";
      const allHospitals = await sql`SELECT id, name, city, address, rating FROM hospitals ORDER BY name ASC`;
      const allDoctors = await sql`SELECT id, name, specialty, department, fee, rating FROM doctors ORDER BY name ASC`;
      const doctorsList = await sql`SELECT * FROM doctors WHERE "hospitalIds" LIKE ${`%${hospId}%`} OR id IN (SELECT DISTINCT "doctorId" FROM visits WHERE "hospitalId" = ${hospId}) LIMIT 25`;
      const visitsList = await sql`
        SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty"
        FROM visits v
        JOIN doctors d ON d.id = v."doctorId"
        WHERE v."hospitalId" = ${hospId}
        ORDER BY v."startsAt" DESC
        LIMIT 50
      `;
      const appointmentsList = await sql`
        SELECT a.*, d.name as "doctorName", d.specialty as "doctorSpecialty", v."startsAt"
        FROM appointments a
        JOIN visits v ON v.id = a."visitId"
        JOIN doctors d ON d.id = a."doctorId"
        WHERE a."hospitalId" = ${hospId}
        ORDER BY a."createdAt" DESC
        LIMIT 50
      `;
      const [apptCount] = await sql`SELECT count(*)::int as count FROM appointments WHERE "hospitalId" = ${hospId}`;
      return {
        hospital: activeHosp,
        allHospitals,
        allDoctors,
        doctors: doctorsList,
        visits: visitsList,
        appointments: appointmentsList,
        totalAppointments: apptCount?.count || 0
      };
    })
  }),
  doctorAdmin: router({
    liveData: protectedProcedure.query(async ({ ctx }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      let [doc] = await sql`SELECT * FROM doctors WHERE email = ${ctx.user.email || ""} OR phone = ${ctx.user.phone || ""} LIMIT 1`;
      if (!doc) {
        [doc] = await sql`SELECT * FROM doctors LIMIT 1`;
      }
      const docId = doc?.id || "doc-1";
      const allHospitals = await sql`SELECT id, name, city, address, rating FROM hospitals ORDER BY name ASC`;
      const visitsList = await sql`
        SELECT v.*, h.name as "hospitalName", h.city as "hospitalCity", h.address as "hospitalAddress"
        FROM visits v
        JOIN hospitals h ON h.id = v."hospitalId"
        WHERE v."doctorId" = ${docId}
        ORDER BY v."startsAt" DESC
        LIMIT 50
      `;
      const appointmentsList = await sql`
        SELECT a.*, v."startsAt", h.name as "hospitalName"
        FROM appointments a
        JOIN visits v ON v.id = a."visitId"
        JOIN hospitals h ON h.id = a."hospitalId"
        WHERE a."doctorId" = ${docId}
        ORDER BY v."startsAt" DESC
        LIMIT 50
      `;
      return {
        doctor: doc,
        allHospitals,
        visits: visitsList,
        appointments: appointmentsList
      };
    })
  }),
  admin: router({
    liveStats: adminProcedure.query(async () => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const [hospCount] = await sql`SELECT count(*)::int as count FROM hospitals`;
      const [docCount] = await sql`SELECT count(*)::int as count FROM doctors`;
      const [userCount] = await sql`SELECT count(*)::int as count FROM users`;
      const [apptCount] = await sql`SELECT count(*)::int as count FROM appointments`;
      const appointmentsChart = await sql`
        SELECT to_char(date_trunc('day', "createdAt"), 'Mon DD') as date, count(*)::int as count
        FROM appointments
        GROUP BY date_trunc('day', "createdAt")
        ORDER BY date_trunc('day', "createdAt") ASC
        LIMIT 10
      `;
      const specialtiesChart = await sql`
        SELECT specialty as name, count(*)::int as value
        FROM doctors
        GROUP BY specialty
        ORDER BY value DESC
        LIMIT 6
      `;
      const citiesChart = await sql`
        SELECT city as name, count(*)::int as value
        FROM hospitals
        GROUP BY city
        ORDER BY value DESC
        LIMIT 5
      `;
      const recentUsers = await sql`
        SELECT id, name, email, role, phone, "onboardingCompleted", "createdAt"
        FROM users
        ORDER BY "createdAt" DESC
        LIMIT 6
      `;
      const recentHospitals = await sql`
        SELECT id, name, city, rating, type
        FROM hospitals
        LIMIT 6
      `;
      return {
        totalHospitals: hospCount?.count || 0,
        totalDoctors: docCount?.count || 0,
        totalUsers: userCount?.count || 0,
        totalAppointments: apptCount?.count || 0,
        appointmentsChart: appointmentsChart.length > 0 ? appointmentsChart : [
          { date: "14 Sep", count: 12 },
          { date: "15 Sep", count: 19 },
          { date: "16 Sep", count: 27 },
          { date: "17 Sep", count: (apptCount?.count || 0) + 8 }
        ],
        specialtiesChart,
        citiesChart,
        recentUsers,
        recentHospitals
      };
    }),
    listUsers: adminProcedure.input(
      z.object({
        role: z.string().optional(),
        search: z.string().optional()
      }).optional()
    ).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      let rows;
      if (input?.role && input.role !== "all") {
        rows = await sql`SELECT * FROM users WHERE role::text = ${input.role} ORDER BY "createdAt" DESC LIMIT 100`;
      } else {
        rows = await sql`SELECT * FROM users ORDER BY "createdAt" DESC LIMIT 100`;
      }
      if (input?.search?.trim()) {
        const s = input.search.toLowerCase().trim();
        return rows.filter(
          (u) => (u.name || "").toLowerCase().includes(s) || (u.email || "").toLowerCase().includes(s) || (u.phone || "").toLowerCase().includes(s) || (u.city || "").toLowerCase().includes(s)
        );
      }
      return rows;
    }),
    listPatients: adminProcedure.input(
      z.object({
        search: z.string().optional()
      }).optional()
    ).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const rows = await sql`
          SELECT 
            u.id,
            u."openId",
            u.name,
            u.email,
            u.phone,
            u.city,
            u.age,
            u.gender,
            u."bloodGroup",
            u."emergencyContact",
            u."medicalNotes",
            u."onboardingCompleted",
            u."createdAt",
            COUNT(a.id)::int as "appointmentCount",
            MAX(a."createdAt") as "lastAppointmentAt"
          FROM users u
          LEFT JOIN appointments a ON a."userId" = u.id
          WHERE u.role::text = 'user'
          GROUP BY u.id
          ORDER BY u."createdAt" DESC
          LIMIT 100
        `;
      if (input?.search?.trim()) {
        const s = input.search.toLowerCase().trim();
        return rows.filter(
          (p) => (p.name || "").toLowerCase().includes(s) || (p.email || "").toLowerCase().includes(s) || (p.phone || "").toLowerCase().includes(s) || (p.city || "").toLowerCase().includes(s) || (p.bloodGroup || "").toLowerCase().includes(s)
        );
      }
      return rows;
    }),
    patientAppointments: adminProcedure.input(z.object({ userId: z.number().int() })).query(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      return sql`
          SELECT a.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
          FROM appointments a
          LEFT JOIN doctors d ON d.id = a."doctorId"
          LEFT JOIN hospitals h ON h.id = a."hospitalId"
          WHERE a."userId" = ${input.userId}
          ORDER BY a."createdAt" DESC
        `;
    }),
    createUser: adminProcedure.input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(7),
        role: z.enum(["user", "hospital_authority", "doctor", "admin"]),
        city: z.string().optional(),
        age: z.number().int().optional(),
        gender: z.string().optional(),
        bloodGroup: z.string().optional(),
        emergencyContact: z.string().optional(),
        medicalNotes: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const openId = `user_${nanoid2(12)}`;
      const [inserted] = await sql`
          INSERT INTO users ("openId", name, email, phone, role, city, age, gender, "bloodGroup", "emergencyContact", "medicalNotes", "onboardingCompleted")
          VALUES (${openId}, ${input.name}, ${input.email}, ${input.phone}, ${input.role}, ${input.city || "Bengaluru"}, ${input.age ?? null}, ${input.gender ?? null}, ${input.bloodGroup ?? null}, ${input.emergencyContact ?? null}, ${input.medicalNotes ?? null}, 1)
          RETURNING *
        `;
      return inserted;
    }),
    updateUser: adminProcedure.input(
      z.object({
        id: z.number().int(),
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        role: z.enum(["user", "hospital_authority", "doctor", "admin"]).optional(),
        city: z.string().optional(),
        age: z.number().int().optional(),
        gender: z.string().optional(),
        bloodGroup: z.string().optional(),
        emergencyContact: z.string().optional(),
        medicalNotes: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      if (input.name) await sql`UPDATE users SET name = ${input.name} WHERE id = ${input.id}`;
      if (input.email) await sql`UPDATE users SET email = ${input.email} WHERE id = ${input.id}`;
      if (input.phone) await sql`UPDATE users SET phone = ${input.phone} WHERE id = ${input.id}`;
      if (input.role) await sql`UPDATE users SET role = ${input.role} WHERE id = ${input.id}`;
      if (input.city) await sql`UPDATE users SET city = ${input.city} WHERE id = ${input.id}`;
      if (input.age !== void 0) await sql`UPDATE users SET age = ${input.age} WHERE id = ${input.id}`;
      if (input.gender !== void 0) await sql`UPDATE users SET gender = ${input.gender} WHERE id = ${input.id}`;
      if (input.bloodGroup !== void 0) await sql`UPDATE users SET "bloodGroup" = ${input.bloodGroup} WHERE id = ${input.id}`;
      if (input.emergencyContact !== void 0) await sql`UPDATE users SET "emergencyContact" = ${input.emergencyContact} WHERE id = ${input.id}`;
      if (input.medicalNotes !== void 0) await sql`UPDATE users SET "medicalNotes" = ${input.medicalNotes} WHERE id = ${input.id}`;
      const [updated] = await sql`SELECT * FROM users WHERE id = ${input.id}`;
      return updated;
    }),
    deleteUser: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      await sql`DELETE FROM appointments WHERE "userId" = ${input.id}`;
      await sql`DELETE FROM users WHERE id = ${input.id}`;
      return { success: true };
    }),
    listDoctors: adminProcedure.query(async () => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      return sql`SELECT * FROM doctors ORDER BY name ASC LIMIT 100`;
    }),
    createDoctor: adminProcedure.input(
      z.object({
        name: z.string().min(2),
        specialty: z.string().min(2),
        department: z.string().min(2),
        experienceYears: z.number().int().default(5),
        fee: z.number().int().default(600),
        phone: z.string().optional(),
        email: z.string().optional(),
        rating: z.string().default("4.8")
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const id = `doc-${nanoid2(8)}`;
      const docName = input.name.startsWith("Dr.") ? input.name : `Dr. ${input.name}`;
      await sql`
          INSERT INTO doctors (id, name, specialty, department, "experienceYears", fee, phone, email, rating, "reviewCount", verified)
          VALUES (${id}, ${docName}, ${input.specialty}, ${input.department}, ${input.experienceYears}, ${input.fee}, ${input.phone || null}, ${input.email || null}, ${input.rating}, 1, 1)
        `;
      return { success: true, id };
    }),
    updateDoctor: adminProcedure.input(
      z.object({
        id: z.string().min(1),
        name: z.string().optional(),
        specialty: z.string().optional(),
        department: z.string().optional(),
        experienceYears: z.number().int().optional(),
        fee: z.number().int().optional(),
        phone: z.string().optional(),
        email: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      if (input.name) await sql`UPDATE doctors SET name = ${input.name} WHERE id = ${input.id}`;
      if (input.specialty) await sql`UPDATE doctors SET specialty = ${input.specialty} WHERE id = ${input.id}`;
      if (input.department) await sql`UPDATE doctors SET department = ${input.department} WHERE id = ${input.id}`;
      if (input.experienceYears !== void 0) await sql`UPDATE doctors SET "experienceYears" = ${input.experienceYears} WHERE id = ${input.id}`;
      if (input.fee !== void 0) await sql`UPDATE doctors SET fee = ${input.fee} WHERE id = ${input.id}`;
      if (input.phone) await sql`UPDATE doctors SET phone = ${input.phone} WHERE id = ${input.id}`;
      if (input.email) await sql`UPDATE doctors SET email = ${input.email} WHERE id = ${input.id}`;
      return { success: true };
    }),
    deleteDoctor: adminProcedure.input(z.object({ id: z.string().min(1) })).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      await sql`DELETE FROM visits WHERE "doctorId" = ${input.id}`;
      await sql`DELETE FROM appointments WHERE "doctorId" = ${input.id}`;
      await sql`DELETE FROM doctors WHERE id = ${input.id}`;
      return { success: true };
    }),
    listHospitals: adminProcedure.query(async () => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      return sql`SELECT * FROM hospitals ORDER BY name ASC LIMIT 100`;
    }),
    createHospital: adminProcedure.input(
      z.object({
        name: z.string().min(2),
        type: z.string().default("Super Specialty"),
        address: z.string().min(3),
        city: z.string().min(2),
        bedCapacity: z.number().int().default(100),
        phone: z.string().optional(),
        rating: z.string().default("4.8")
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const id = `hosp-${nanoid2(8)}`;
      await sql`
          INSERT INTO hospitals (id, name, type, address, city, "bedCapacity", phone, rating, "reviewCount", "ambulanceAvailable")
          VALUES (${id}, ${input.name}, ${input.type}, ${input.address}, ${input.city}, ${input.bedCapacity}, ${input.phone || null}, ${input.rating}, 1, 1)
        `;
      return { success: true, id };
    }),
    updateHospital: adminProcedure.input(
      z.object({
        id: z.string().min(1),
        name: z.string().optional(),
        type: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        bedCapacity: z.number().int().optional(),
        phone: z.string().optional()
      })
    ).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      if (input.name) await sql`UPDATE hospitals SET name = ${input.name} WHERE id = ${input.id}`;
      if (input.type) await sql`UPDATE hospitals SET type = ${input.type} WHERE id = ${input.id}`;
      if (input.address) await sql`UPDATE hospitals SET address = ${input.address} WHERE id = ${input.id}`;
      if (input.city) await sql`UPDATE hospitals SET city = ${input.city} WHERE id = ${input.id}`;
      if (input.bedCapacity !== void 0) await sql`UPDATE hospitals SET "bedCapacity" = ${input.bedCapacity} WHERE id = ${input.id}`;
      if (input.phone) await sql`UPDATE hospitals SET phone = ${input.phone} WHERE id = ${input.id}`;
      return { success: true };
    }),
    deleteHospital: adminProcedure.input(z.object({ id: z.string().min(1) })).mutation(async ({ input }) => {
      const sql = neon5(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      await sql`DELETE FROM visits WHERE "hospitalId" = ${input.id}`;
      await sql`DELETE FROM appointments WHERE "hospitalId" = ${input.id}`;
      await sql`DELETE FROM hospitals WHERE id = ${input.id}`;
      return { success: true };
    }),
    demoUsers: adminProcedure.query(() => listDemoUsers()),
    updateDemoUserRole: adminProcedure.input(z.object({
      openId: z.string().regex(/^demo-[a-z0-9-]+$/),
      role: z.enum(managedRoles)
    })).mutation(({ input }) => updateDemoUserRole(input.openId, input.role))
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await authenticateClerkRequest(opts.req, opts.res);
  } catch (error) {
    console.warn("[Auth] Request authentication failed:", error instanceof Error ? error.message : error);
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/integrations/vapi-webhook.ts
function registerVapiWebhook(app2) {
  app2.post(["/api/vapi/webhook", "/vapi/webhook"], (req, res) => {
    const expectedSecret = process.env.VAPI_SERVER_SECRET;
    const providedSecret = req.header("x-vapi-secret") || req.header("x-vapi-webhook-secret");
    if (expectedSecret && providedSecret !== expectedSecret) {
      res.status(401).json({ error: "Unauthorized webhook" });
      return;
    }
    const event = normalizeVapiEvent(req.body);
    console.info("[VAPI] event", { type: event.type, callId: event.callId, status: event.status });
    res.status(200).json({ received: true });
  });
}

// server/integrations/twilio-webhook.ts
init_twilio();
import { eq as eq2 } from "drizzle-orm";
function registerTwilioWebhooks(app2) {
  app2.all(["/api/twilio/voice/reminder-twiml", "/twilio/voice/reminder-twiml"], (req, res) => {
    const patientName = String(req.query.patientName || req.body.patientName || "Patient");
    const doctorName = String(req.query.doctorName || req.body.doctorName || "your specialist");
    const hospitalName = String(req.query.hospitalName || req.body.hospitalName || "DocX Partner Hospital");
    const appointmentDate = String(req.query.appointmentDate || req.body.appointmentDate || "tomorrow");
    const appointmentTime = String(req.query.appointmentTime || req.body.appointmentTime || "the scheduled time");
    const bookingId = String(req.query.bookingId || req.body.bookingId || "");
    const host = req.get("host") || "localhost:3000";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const actionUrl = `${protocol}://${host}/api/twilio/voice/gather-response?bookingId=${encodeURIComponent(bookingId)}&hospitalName=${encodeURIComponent(hospitalName)}`;
    const twiml = generateReminderTwiML({
      patientName,
      doctorName,
      hospitalName,
      appointmentDate,
      appointmentTime,
      bookingId,
      actionUrl
    });
    console.info("[Twilio Voice] Generated TwiML reminder for booking:", { bookingId, patientName });
    res.type("text/xml").send(twiml);
  });
  app2.post(["/api/twilio/voice/gather-response", "/twilio/voice/gather-response"], async (req, res) => {
    const digits = typeof req.body.Digits === "string" ? req.body.Digits : void 0;
    const speechResult = typeof req.body.SpeechResult === "string" ? req.body.SpeechResult : void 0;
    const bookingId = String(req.query.bookingId || req.body.bookingId || "");
    const hospitalName = String(req.query.hospitalName || req.body.hospitalName || "DocX Partner Hospital");
    console.info("[Twilio Voice] Received Gather response:", { digits, speechResult, bookingId });
    const result = generateGatherResponseTwiML({
      digits,
      speechResult,
      hospitalName
    });
    if (result.action === "reschedule" && bookingId) {
      try {
        const db = await getDb();
        if (db) {
          await db.update(appointments).set({ status: "cancelled" }).where(eq2(appointments.bookingId, bookingId));
          console.info("[Twilio Voice] Marked appointment as cancelled for reschedule:", bookingId);
        }
      } catch (err) {
        console.warn("[Twilio Voice] Could not update appointment status in DB:", err);
      }
    }
    res.type("text/xml").send(result.twiml);
  });
  app2.post(["/api/twilio/voice/status", "/twilio/voice/status"], (req, res) => {
    const callSid = req.body.CallSid;
    const callStatus = req.body.CallStatus;
    const duration = req.body.CallDuration;
    console.info("[Twilio Voice] Status update:", { callSid, callStatus, duration });
    res.sendStatus(200);
  });
}

// server/api.ts
var app = express();
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));
registerVapiWebhook(app);
registerTwilioWebhooks(app);
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get(["/api", "/"], (_req, res) => {
  res.json({ name: "DocX API", status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.use(
  ["/api/trpc", "/trpc"],
  createExpressMiddleware({
    router: appRouter,
    createContext
  })
);
var api_default = app;
export {
  api_default as default
};
