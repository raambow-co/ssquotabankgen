# Srimaan Solar Solutions - Professional Quotation Generator

A high-fidelity, interactive **Solar Rooftop Quotation & Purchase Order Generator** built in **React.js**, meticulously designed to match and reproduce the exact 7-page proposal from `PO_N VENUGOPAL.pdf`.

---

## 🚀 Quick Start

### Method 1: Run with Vite Dev Server (Recommended for Development)
```bash
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### Method 2: Double-Click Standalone File (No Terminal / Node Needed!)
Simply double-click:
📁 `Srimaan_Solar_Quotation_Generator.html`  
It will open instantly in Chrome, Safari, Edge, or Brave with full functionality, offline capability, and zero external server dependencies!

### Method 3: Build for Production
```bash
npm run build
```
Generates optimized files in `dist/` and updates `Srimaan_Solar_Quotation_Generator.html`.

---

## 📄 Exact 7-Page Document Reproduction

The generator produces a pixel-accurate, 7-page quotation identical to `PO_N VENUGOPAL.pdf`:

| Page | Title / Section | Contents |
|------|-----------------|----------|
| **Page 1** | **Cover & Techno Offer** | Company top banner, Solar hero banner ("Solar Energy for every home"), green bold italic proposal title, Cyan Ref No (`REF: SRIMAAN SOLAR SOLUTIONS-10/07-2025-2026`), Date, red-underlined Customer Details, blue-underlined Offer Submitted By box with GST/PAN, Vendor Reg No (`TSRE250511`), and purple footer. |
| **Page 2** | **About Grid System** | Technical description of Solar Grid Connected/Tied system, MPPT charge controller, inverter functions, and the full-color schematic diagram (Panels ➔ Inverter ➔ Meter/Grid/Home). |
| **Page 3** | **Benefits of Solar PV** | Dynamic capacity intro, 9 comprehensive benefits of rooftop solar installation with circular bullet indicators. |
| **Page 4** | **Key Specifications** | Key components, Energy output (Daily, Monthly, Annual kWh), Shade-free area required table, and side-by-side **BASIC** and **HEIGHT** mounting structure photographs. |
| **Page 5** | **Cost & Bill of Materials** | "RESPECTED.SIR/MADAM" proposal note, 12-item BOM table with light-green header (`#B7D7A8`), Amount to be paid, double separator rows, red `+Sub Total`, and `After Subsidy Cost`. |
| **Page 6** | **Payback & Bank Details** | Subsidy amount credited callout, Payback Analysis table, National Portal registration & claiming note, GST included note, PO favorite clause, and red-highlighted NEFT/RTGS bank account details (HDFC Bank). |
| **Page 7** | **Terms & Conditions** | 13-clause bordered table covering offer validity, payment terms (80/20), delivery, commissioning, civil work, water/electricity scope, warranty (25yr PV / 7yr inverter), order placement, etc. |

---

## ✨ Features & Automation

### 1. Fixed vs. Dynamic Data Fields
- **Fixed by Default**:
  - Company legal details: `M/s. SRIMAAN SOLAR SOLUTIONS`
  - Vendor Registration Number: `TSRE250511`
  - GSTIN: `36ADPPT2441N1ZW` & PAN: `ADPPT2441N`
  - Contact Phones: `9347416140`, `9912416140`
  - Email: `srimaansolarsolutions@gmail.com`
  - Bank Account: `HDFC BANK` (A/C: `50200095253784`, IFSC: `HDFC0001631`)
  - Office Address: `#6-210, Sriramnagar, Behind Autonagar, Warangal X Road, Khammam Rural, KHAMMAM DIST-507003`
  *(All company info can still be edited in the "Company & Bank" tab if ever needed)*

- **Dynamic / Dropdown Driven**:
  - **Quick Capacity Presets**: `1 kW`, `2 kW`, `3 kW`, `4 kW`, `5 kW`, `6 kW`, `8 kW`, `10 kW`, `15 kW`, `20 kW`, and custom capacities.
  - **Auto-Calculated Energy Metrics**:
    - Daily kWh: `Capacity × 4 units`
    - Monthly kWh: `Daily × 30`
    - Annual kWh: `Capacity × 1200 units`
  - **Auto-Calculated Subsidy (PM Surya Ghar: Muft Bijli Yojana)**:
    - 1 kW: ₹30,000
    - 2 kW: ₹60,000
    - 3 kW and above: ₹78,000 (standard max cap)
  - **Auto-Calculated Area**: `80 to 100 sq ft per kW`
  - **Auto-Calculated Payback & Annual Savings**: Based on local Discom tariff rate (default ₹8/unit)
  - **Auto-Synced BOM**: Selecting a new capacity automatically updates the ACDB, DCDB, and Inverter line items in the Bill of Materials table.
  - **Customer Details**:
    - Full Name, Street/Landmark, PIN Code, Mobile
    - District dropdown with all 33 Telangana districts + Andhra Pradesh districts
    - State dropdown
    - Connection Category (Domestic / Commercial)
  - **Equipment Brand Selectors**:
    - Solar PV Modules: Monoperc halfcut (Adani, RenewSys, DCR), Tata Power Solar, Waaree Bifacial, Vikram Solar, Goldi Solar, Premier Energies.
    - Solar Inverters: Polycab Solar, Growatt, Havells Enviro, Sungrow, Solis, Deye, Luminous.
    - Mounting Structures: 7FT/6FT Hotdip Legs 180Kmph Wind Load Resistance, Standard HDG Basic, Elevated 6-8FT Super Structure.

### 2. Interactive Bill of Materials (BOM) Editor
- Add custom items, cables, or hardware.
- Modify item descriptions or quantities (e.g. `1SET`, `1`, `2`, `ASREQ`, `LS`).
- Delete items with a single click.

### 3. One-Click Print & High-Res PDF Export
- Dedicated CSS print rules (`@page { size: A4 portrait; margin: 0; }`).
- Fits each page onto exactly 1 physical sheet of A4 paper.
- Hides the dashboard editor automatically when printing.
- Ensures background colors (`#B7D7A8`), red texts, banners, and diagrams print at 300+ DPI.

### 4. Local Storage & History
- Save completed quotes with custom labels (e.g. "Venugopal 5kW Nizamabad").
- Reload previous quotes anytime from the "Saved Quotes" dialog.
- "Reset Sample" button resets back to the original `PO_N VENUGOPAL.pdf` data.

### 5. Instant WhatsApp Summary
- Generates and copies a formatted WhatsApp message with key customer, capacity, price, subsidy, savings, and bank details for immediate client communication.

---

## 📁 Project Structure

```
├── PO_N VENUGOPAL.pdf                # Original reference document
├── Srimaan_Solar_Quotation_Generator.html # Standalone single-file version
├── index.html                        # Vite entry HTML
├── package.json                      # Dependencies & scripts
├── vite.config.js                    # Vite bundler config
├── scripts/
│   └── bundle-standalone.js          # Standalone HTML packager
├── public/
│   └── assets/                       # Image assets
├── src/
│   ├── main.jsx                      # React mounting root
│   ├── App.jsx                       # Main application state & responsive layout
│   ├── index.css                     # Accurate A4 typography & print stylesheet
│   ├── assets/
│   │   └── assetsData.js             # Base64 embedded high-res assets
│   ├── data/
│   │   └── defaultData.js            # Initial Venugopal data, presets & districts
│   ├── utils/
│   │   └── calculations.js           # Math formulas, subsidy & currency formatters
│   └── components/
│       ├── Dashboard.jsx             # Left editor sidebar with tabs & dropdowns
│       ├── QuotationViewer.jsx       # Right 7-page live preview & zoom canvas
│       ├── PageHeader.jsx            # Standardized top header banner
│       ├── PageFooter.jsx            # Standardized purple footer
│       ├── Page1.jsx                 # Page 1: Cover & Customer / Vendor Box
│       ├── Page2.jsx                 # Page 2: Grid Connected System & Diagram
│       ├── Page3.jsx                 # Page 3: Benefits of Solar PV Installation
│       ├── Page4.jsx                 # Page 4: Technical Specs & Mounting Photos
│       ├── Page5.jsx                 # Page 5: BOM Table & Estimations
│       ├── Page6.jsx                 # Page 6: Payback Analysis & Bank Details
│       └── Page7.jsx                 # Page 7: Terms & Conditions Table
```
