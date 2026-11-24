import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_discom_report(filename="DISCOM_REPORT.xlsx"):
    wb = openpyxl.Workbook()
    
    # Border styles
    thin_border = Border(
        left=Side(style='thin', color='000000'),
        right=Side(style='thin', color='000000'),
        top=Side(style='thin', color='000000'),
        bottom=Side(style='thin', color='000000')
    )
    thick_bottom = Border(bottom=Side(style='medium', color='000000'))
    header_fill = PatternFill(start_color="1E3A8A", end_color="1E3A8A", fill_type="solid")
    section_fill = PatternFill(start_color="E0E7FF", end_color="E0E7FF", fill_type="solid")
    cert_fill = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
    
    # ==========================================
    # SHEET 1: ANNEXURE-V(b)
    # ==========================================
    ws1 = wb.active
    ws1.title = "ANNEXURE-V(b)"
    ws1.views.sheetView[0].showGridLines = True
    
    # Title
    ws1.merge_cells("A1:D1")
    ws1["A1"] = "ANNEXURE-V(b)  LT NET METER Solar Rooftop PV system Synchronization Report / Test Report"
    ws1["A1"].font = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    ws1["A1"].fill = header_fill
    ws1["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws1.row_dimensions[1].height = 28
    
    rows_v = [
        ("A", "Applicant Details", "", "", True, section_fill),
        ("1", "Net Meter Registration Number", "TS-NPDCL-NM-2026-8491", ""),
        ("2", "Registration Date", "22-NOV-2026", ""),
        ("3", "Name of the applicant", "GURRAM ANITHA", ""),
        ("4", "Service Number /USC Number", "NP-TSNPD26-10416694", ""),
        ("5", "Category", "LT-I Domestic", ""),
        ("6", "Load", "3 kW", ""),
        ("7", "Distribution/Section", "Khammam Rural / Auto Nagar", ""),
        ("8", "Pole number", "KHM-TR-42/08", ""),
        ("9", "Address", "HNO 5-1-4, BALAPETA, Khammam - 507003", ""),
        ("10", "Mobile No", "9848163232", ""),
        ("B", "Old Meter Details", "", "", True, section_fill),
        ("1", "Meter make", "L&T / Secure", ""),
        ("2", "Serial number", "LT-8941204", ""),
        ("3", "Capacity", "10-40 A, 240V", ""),
        ("4", "MF", "1.0", ""),
        ("5", "Final reading", "", ""),
        ("", "i) kWh", "14820", ""),
        ("", "ii) kVAh", "15110", ""),
        ("6", "Date of replacement", "22-NOV-2026", ""),
        ("C", "New Net Meter Details", "", "", True, section_fill),
        ("1", "Meter make", "Schneider / Secure Bi-Directional", ""),
        ("2", "Serial number", "SNM-2026-99214", ""),
        ("3", "Capacity", "3-Phase / 1-Phase 10-60A", ""),
        ("4", "Meter constant", "3200 imp/kWh", ""),
        ("5", "Initial reading (Tri vector parameters)", "", ""),
        ("", "i) Import (kWh/kVAh)", "00000.0 kWh", "00000.0 kVAh"),
        ("", "ii) Export (kWh/kVAh)", "00000.0 kWh", "00000.0 kVAh"),
        ("D", "Details of protective system available\n(Commissioning shall be done only on availability of the protective equipment)", "YES", "", True, section_fill)
    ]
    
    r_idx = 2
    for item in rows_v:
        col1 = item[0]
        col2 = item[1]
        col3 = item[2]
        col4 = item[3]
        is_sec = len(item) > 4 and item[4]
        fill = item[5] if len(item) > 5 else None
        
        ws1.cell(r_idx, 1, col1)
        ws1.cell(r_idx, 2, col2)
        ws1.cell(r_idx, 3, col3)
        ws1.cell(r_idx, 4, col4)
        
        for c in range(1, 5):
            cell = ws1.cell(r_idx, c)
            cell.border = thin_border
            cell.alignment = Alignment(vertical="center", wrap_text=True)
            if is_sec:
                cell.font = Font(name="Arial", size=10, bold=True)
                if fill:
                    cell.fill = fill
            else:
                cell.font = Font(name="Arial", size=9, bold=(c <= 2 and col1 != ""))
        
        ws1.row_dimensions[r_idx].height = 24 if is_sec else 20
        r_idx += 1
        
    # Certificate Box
    cert_row = r_idx
    ws1.merge_cells(start_row=cert_row, start_column=1, end_row=cert_row+3, end_column=4)
    cert_text = (
        "C E R T I F I C A T E\n"
        "It is certified that there is no return voltage from the inverter to the meter when incoming grid supply is switched off.\n"
        "It is further certified that the protective equipment is installed and functioning as prescribed.\n"
        "The above Solar Rooftop PV system was synchronized as per DISCOM guidelines and the performance of the above plant is satisfactory. "
        "The date of synchronization of the plant is   22-NOV-2026."
    )
    ws1.cell(cert_row, 1, cert_text)
    ws1.cell(cert_row, 1).font = Font(name="Arial", size=9, bold=True, italic=True)
    ws1.cell(cert_row, 1).alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws1.cell(cert_row, 1).fill = cert_fill
    for r in range(cert_row, cert_row+4):
        for c in range(1, 5):
            ws1.cell(r, c).border = thin_border
            
    # Signatures
    sig_row = cert_row + 4
    ws1.merge_cells(start_row=sig_row, start_column=1, end_row=sig_row+1, end_column=1)
    ws1.merge_cells(start_row=sig_row, start_column=2, end_row=sig_row+1, end_column=2)
    ws1.merge_cells(start_row=sig_row, start_column=3, end_row=sig_row+1, end_column=3)
    ws1.merge_cells(start_row=sig_row, start_column=4, end_row=sig_row+1, end_column=4)
    
    ws1.cell(sig_row, 1, "Vendor Signature\n(with stamp)\nSRIMAAN SOLAR SOLUTIONS")
    ws1.cell(sig_row, 2, "Eligible Consumer\n\nGURRAM ANITHA")
    ws1.cell(sig_row, 3, "ADE / M&P\n(Meters & Protection)\nTSNPDCL")
    ws1.cell(sig_row, 4, "ADE / Op\n(Operations & Maintenance)\n(with stamp)")
    
    for c in range(1, 5):
        cell = ws1.cell(sig_row, c)
        cell.font = Font(name="Arial", size=9, bold=True)
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        for r in range(sig_row, sig_row+2):
            ws1.cell(r, c).border = thin_border
    ws1.row_dimensions[sig_row].height = 25
    ws1.row_dimensions[sig_row+1].height = 25

    # Column widths
    ws1.column_dimensions['A'].width = 8
    ws1.column_dimensions['B'].width = 38
    ws1.column_dimensions['C'].width = 28
    ws1.column_dimensions['D'].width = 25

    # ==========================================
    # SHEET 2: PART B
    # ==========================================
    ws2 = wb.create_sheet("PART B")
    ws2.views.sheetView[0].showGridLines = True
    
    ws2.merge_cells("A1:D1")
    ws2["A1"] = "PART B\n(Project Completion Report for Grid-Connected Rooftop) Installation Details"
    ws2["A1"].font = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    ws2["A1"].fill = header_fill
    ws2["A1"].alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws2.row_dimensions[1].height = 36
    
    rows_part_b = [
        ("Category of the customer:", "Domestic (LT-I)", "Sub Category of the Customer :", "Individual Residential"),
        ("Name of the plant owner:", "GURRAM ANITHA", "", ""),
        ("Mobile :", "9848163232", "Email :", "Ramanareddy1632@gmail.com"),
        ("Address of Installation :", "HNO 5-1-4, BALAPETA", "PIN Code of Installation Address :", "507003"),
        ("State of Installation Address :", "TELANGANA", "District of Installation Address:", "Khammam"),
        ("Project Model (CAPEX/RESCO):", "CAPEX", "", ""),
        ("Date of Commissioning of the plant:", "22-NOV-2026", "Total Cost of Installation (Rs.):", "220000"),
        ("Whether installation is (Rooftop only/ Rooftop plus ground)", "ROOFTOP ONLY", "", ""),
        ("Plant Capacity (kWp) (Rooftop only)", "3.3 kWp", "Plant Capacity(kWp) (Ground only)", "0"),
        ("Total plant capacity(kWp)", "3.3 kWp", "", ""),
        ("Installed Project Latitude –Longitude Info", "", "", ""),
        ("Latitude:", "17.2472° N", "Longitude:", "80.1514° E"),
        ("Upload Documents:\n1) Photo of Installed plant (JPG, JPEG, PNG <= 2Mb)\n2) Electricity DisCom Bill (PDF <= 1Mb)", "DOCUMENTS ATTACHED & VERIFIED", "", "")
    ]
    
    r_idx = 2
    for item in rows_part_b:
        c1, c2, c3, c4 = item[0], item[1], item[2], item[3]
        ws2.cell(r_idx, 1, c1)
        ws2.cell(r_idx, 2, c2)
        ws2.cell(r_idx, 3, c3)
        ws2.cell(r_idx, 4, c4)
        
        is_hdr = "Latitude –Longitude" in c1 or "Upload Documents" in c1
        for c in range(1, 5):
            cell = ws2.cell(r_idx, c)
            cell.border = thin_border
            cell.alignment = Alignment(vertical="center", wrap_text=True)
            if is_hdr:
                cell.fill = section_fill
                cell.font = Font(name="Arial", size=9, bold=True)
            else:
                cell.font = Font(name="Arial", size=9, bold=(c % 2 == 1))
        
        ws2.row_dimensions[r_idx].height = 28 if "Upload Documents" in c1 else 22
        r_idx += 1
        
    # Certificate Box
    cert_row2 = r_idx
    ws2.merge_cells(start_row=cert_row2, start_column=1, end_row=cert_row2+3, end_column=4)
    ws2.cell(cert_row2, 1, cert_text)
    ws2.cell(cert_row2, 1).font = Font(name="Arial", size=9, bold=True, italic=True)
    ws2.cell(cert_row2, 1).alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws2.cell(cert_row2, 1).fill = cert_fill
    for r in range(cert_row2, cert_row2+4):
        for c in range(1, 5):
            ws2.cell(r, c).border = thin_border
            
    # Signatures
    sig_row2 = cert_row2 + 4
    ws2.merge_cells(start_row=sig_row2, start_column=1, end_row=sig_row2+1, end_column=1)
    ws2.merge_cells(start_row=sig_row2, start_column=2, end_row=sig_row2+1, end_column=2)
    ws2.merge_cells(start_row=sig_row2, start_column=3, end_row=sig_row2+1, end_column=3)
    ws2.merge_cells(start_row=sig_row2, start_column=4, end_row=sig_row2+1, end_column=4)
    
    ws2.cell(sig_row2, 1, "Vendor Signature\n(with stamp)\nSRIMAAN SOLAR SOLUTIONS")
    ws2.cell(sig_row2, 2, "Eligible Consumer\n\nGURRAM ANITHA")
    ws2.cell(sig_row2, 3, "ADE / M&P\n(Meters & Protection)\nTSNPDCL")
    ws2.cell(sig_row2, 4, "ADE / Op\n(Operations & Maintenance)\n(with stamp)")
    
    for c in range(1, 5):
        cell = ws2.cell(sig_row2, c)
        cell.font = Font(name="Arial", size=9, bold=True)
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        for r in range(sig_row2, sig_row2+2):
            ws2.cell(r, c).border = thin_border
    ws2.row_dimensions[sig_row2].height = 25
    ws2.row_dimensions[sig_row2+1].height = 25

    ws2.column_dimensions['A'].width = 30
    ws2.column_dimensions['B'].width = 28
    ws2.column_dimensions['C'].width = 30
    ws2.column_dimensions['D'].width = 28

    # ==========================================
    # SHEET 3: ANNEXURE-IV
    # ==========================================
    ws3 = wb.create_sheet("ANNEXURE-IV")
    ws3.views.sheetView[0].showGridLines = True
    
    ws3.merge_cells("A1:C1")
    ws3["A1"] = "ANNEXURE-IV\nWork Completion Report for Synchronization of Rooftop Solar PV System\n(To be submitted by Eligible Consumer/Applicant)"
    ws3["A1"].font = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    ws3["A1"].fill = header_fill
    ws3["A1"].alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws3.row_dimensions[1].height = 40
    
    rows_iv = [
        ("A", "Applicant/Consumer Details", "", True, section_fill),
        ("1", "Net Meter  Registration  Number", "TS-NPDCL-NM-2026-8491"),
        ("2", "Registration  Date", "22-NOV-2026"),
        ("3", "Name of the  applicant", "GURRAM ANITHA"),
        ("4", "Service  Number /USC NUMBER", "NP-TSNPD26-10416694"),
        ("5", "Category", "LT-I Domestic"),
        ("6", "Load in  kW", "3 kW"),
        ("B", "Vendor of the  Rooftop Solar PV System  Details:", "", True, section_fill),
        ("1", "Name of Vendor", "SRIMAAN SOLAR SOLUTIONS"),
        ("", "Address:", ""),
        ("2", "Door.No.", "# 6-210,SRIRAM NAGAR,"),
        ("3", "Street", "BEHIND AUTO NAGAR"),
        ("4", "City/Village", "WARANGAL X ROAD ,KHAMMAM"),
        ("5", "Mandal", "KHAMMAM RURAL"),
        ("6", "Pin Code", "507003"),
        ("7", "Phone", "08742-295140"),
        ("8", "Mobile", "9347416140"),
        ("9", "Email ID", "Ravindrachary1972@gmail.com"),
        ("C", "Solar PV Module  Details:", "", True, section_fill),
        ("1", "Make", "Waaree Energies Ltd (Tier-1 ALMM Approved)"),
        ("2", "Module Numbers (Serial Nos):", "SLOT 1: WAA-550-26-8801\nSLOT 2: WAA-550-26-8802\nSLOT 3: WAA-550-26-8803\nSLOT 4: WAA-550-26-8804\nSLOT 5: WAA-550-26-8805\nSLOT 6: WAA-550-26-8806"),
        ("3", "Type of module", "Mono PERC / N-Type TOPCon Bi-facial"),
        ("4", "Capacity of each module", "550 Wp"),
        ("5", "Number of modules", "6 Nos"),
        ("6", "Total capacity", "3.3 kWp"),
        ("D", "Grid Tie  Inverter  /  Connecter", "", True, section_fill),
        ("1", "Make", "Sungrow / Growatt Smart Grid-Tied Inverter"),
        ("2", "Serial number", "SG-2026-INV-94021"),
        ("3", "Capacity", "550 VDC (3.3 kW)"),
        ("4", "Input voltage", "160V - 550V DC"),
        ("5", "Output voltage", "240 V (Single Phase AC)"),
        ("6", "If grid supply fails,  no return supply to the grid(Yes or  No)", "YES"),
        ("E", "Details of protective System available\n(Commission shall be done only on availability of the above)", "YES", True, section_fill),
        ("F", "CEIG Approval  Ref  Number  (Rooftop Solar PV System having the capacity in excess of 75  kW)", "N/A (Exempted - Capacity <= 75 kW)"),
        ("Encl:- Connected SPV generator Single line diagram,   CEIG Approval copy", "ATTACHED", "", True, cert_fill)
    ]
    
    r_idx = 2
    for item in rows_iv:
        c1, c2, c3 = item[0], item[1], item[2]
        is_sec = len(item) > 3 and item[3]
        fill = item[4] if len(item) > 4 else None
        
        ws3.cell(r_idx, 1, c1)
        ws3.cell(r_idx, 2, c2)
        ws3.cell(r_idx, 3, c3)
        
        for c in range(1, 4):
            cell = ws3.cell(r_idx, c)
            cell.border = thin_border
            cell.alignment = Alignment(vertical="center", wrap_text=True)
            if is_sec:
                cell.font = Font(name="Arial", size=10, bold=True)
                if fill:
                    cell.fill = fill
            else:
                cell.font = Font(name="Arial", size=9, bold=(c == 2 and c1 != ""))
        
        ws3.row_dimensions[r_idx].height = 50 if "Module Numbers" in c2 else (25 if is_sec else 20)
        r_idx += 1
        
    # Signatures
    sig_row3 = r_idx
    ws3.merge_cells(start_row=sig_row3, start_column=1, end_row=sig_row3+1, end_column=2)
    ws3.merge_cells(start_row=sig_row3, start_column=3, end_row=sig_row3+1, end_column=3)
    
    ws3.cell(sig_row3, 1, "Vendor Signature(with Stamp)\n\nFOR : SRIMAAN SOLAR SOLUTIONS\n(T. Ravindra Chary - Managing Director)")
    ws3.cell(sig_row3, 3, "Eligible Consumer Signature\n\n\nGURRAM ANITHA")
    
    for c in [1, 3]:
        cell = ws3.cell(sig_row3, c)
        cell.font = Font(name="Arial", size=9, bold=True)
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        for r in range(sig_row3, sig_row3+2):
            ws3.cell(r, c).border = thin_border
            if c == 1:
                ws3.cell(r, 2).border = thin_border
    ws3.row_dimensions[sig_row3].height = 30
    ws3.row_dimensions[sig_row3+1].height = 30
    
    ws3.column_dimensions['A'].width = 8
    ws3.column_dimensions['B'].width = 45
    ws3.column_dimensions['C'].width = 45

    wb.save(filename)
    print(f"Successfully generated {filename} with 3 sheets: {wb.sheetnames}")

if __name__ == "__main__":
    build_discom_report("DISCOM_REPORT.xlsx")
