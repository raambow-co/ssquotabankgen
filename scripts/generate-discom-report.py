import openpyxl
import shutil
import os

SOURCE_TEMPLATE = "/Users/a.s.naidu/.gemini/antigravity/brain/23e4199f-329c-465a-8fc8-101b762dcca9/.user_uploaded/media_1795529576095_41d42fd4.xlsx"

def build_discom_report(filename="DISCOM_REPORT.xlsx"):
    """
    Ensures DISCOM_REPORT.xlsx is 100% identical to the user uploaded and modified workbook:
    Sheets: ['VB', 'PARTB', 'IV', 'Sheet1']
    """
    if os.path.exists(SOURCE_TEMPLATE):
        shutil.copyfile(SOURCE_TEMPLATE, filename)
        # Also copy to public directory for direct download in browser
        public_dest = os.path.join("public", filename)
        if os.path.exists("public"):
            shutil.copyfile(SOURCE_TEMPLATE, public_dest)
        print(f"Successfully synchronized {filename} directly from authentic modified template!")
    else:
        print(f"Warning: Source template {SOURCE_TEMPLATE} not found, checking existing file.")

    if os.path.exists(filename):
        wb = openpyxl.load_workbook(filename)
        print(f"Verified {filename} sheets: {wb.sheetnames}")

if __name__ == "__main__":
    build_discom_report("DISCOM_REPORT.xlsx")
