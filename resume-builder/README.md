# ResumeCraft — Modern ATS-Friendly Resume Builder

A modern, high-performance, responsive Single-Page Resume Builder web application built with clean modular JavaScript (ES Modules), Tailwind CSS, and print-ready CSS.

---

## 🌟 Key Features

1. **Split-Screen Interactive Editor & Live A4 Preview**
   - Real-time instant rendering as you type.
   - Exact A4 paper aspect ratio simulation with page-break indicators.
   - Smooth zoom controls (50% to 140%, plus one-click "Fit Width").
   - Seamless mobile responsiveness (toggle between "Editor Form" and "Live Preview").

2. **5 Handcrafted Designer Resume Templates**
   - **Modern Tech**: Crisp typography, accent line dividers, rounded badges, tech-focused layout.
   - **Classic Executive**: Elegant traditional serif/sans-serif header, formal divider rules, corporate ATS standard.
   - **Minimalist Nordic**: High scannability, airy whitespace, European minimalist aesthetics.
   - **Creative Sidebar (2-Column)**: Standout dark/accent sidebar with badges, photo, and skills.
   - **Ivy League / Academic**: Single-column academic and research layout emphasizing publications and education.

3. **Dynamic Customization Engine**
   - **10+ Curated Color Palettes** + Native Hex Color Picker for unlimited custom colors.
   - **6 Curated Typography Pairings**: Inter, Roboto, Poppins, Merriweather, Playfair Display, Montserrat.
   - **Font Scaling & Layout Spacing Density**: Compact (easy 1-page fit), Balanced, or Spacious.
   - **Profile Photo Support**: Upload custom photo, toggle visibility on/off, or remove.

4. **Real-time ATS (Applicant Tracking System) Audit & Optimizer**
   - Algorithmic 100-point score evaluating contact completeness, action verbs, quantified metrics, keyword density, and section structure.
   - Interactive modal with actionable suggestions to maximize interview callback rates.
   - One-click action verb inserters ("Architected", "Spearheaded", "Optimized", "Scaled", etc.).
   - Pre-crafted domain summary templates for Software Engineers, Product Managers, Designers, and New Grads.

5. **Instant Export & Import**
   - **Direct PDF Download**: Pixel-perfect vector/canvas export using `html2pdf.js`.
   - **Native Print Dialog**: Dedicated `@media print` CSS optimized for borderless A4 printing.
   - **JSON Save & Import**: Export your resume data to a `.json` backup and restore anytime.
   - **Auto-Save**: Changes persist automatically in browser `localStorage`.

6. **Instant Pre-filled Demo Presets**
   - Senior Software Engineer
   - Principal Product Manager
   - Senior UI/UX Designer
   - AI / Data Scientist
   - Blank Slate / Start from Scratch

---

## 🚀 How to Run

### Method 1: Instant Launch (Zero Installation)
Simply double-click `index.html` in your file explorer, or right-click and choose **Open with Google Chrome** / **Microsoft Edge** / **Firefox**.

### Method 2: Local Python Server (Recommended)
Run the included lightweight server script from this directory:
```bash
python start_server.py
```
This automatically starts a local HTTP server at `http://localhost:8000` and opens your browser.

---

## 📁 Project Structure

```
resume-builder/
├── index.html            # Main HTML5 application shell & modals
├── start_server.py       # Python local web server launcher
├── README.md             # Documentation & guide
├── css/
│   └── styles.css        # A4 paper simulation, themes, print queries
├── js/
│   ├── app.js            # Main reactive store & event orchestrator
│   ├── data.js           # Presets, color palettes, fonts, action verbs
│   ├── ats.js            # ATS scoring algorithm & recommendation engine
│   └── templates.js      # Template renderers (Modern, Classic, Minimal, Creative, Academic)
└── assets/               # Local icons and media assets
```

---

## 💡 Setting as Active Workspace
To set this project as your active workspace in Antigravity or VS Code:
1. Go to **File** > **Open Folder...**
2. Select: `C:\Users\mikhi\.gemini\antigravity\scratch\resume-builder`
