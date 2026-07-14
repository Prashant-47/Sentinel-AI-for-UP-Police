# 🛡️ Sentinel AI - Smart Police Station Assistant

> AI-Powered Digital Policing Platform for Uttar Pradesh Police

Sentinel AI is an intelligent policing platform developed to assist police officers in handling citizen complaints, generating FIR drafts, digitizing handwritten complaints using OCR, and providing AI-powered investigation support.

The goal of this project is to reduce manual work, improve investigation efficiency, and help officers make faster and more informed decisions using Artificial Intelligence.

---

# 🚀 Features

## ✅ AI Complaint Intelligence

Analyze any complaint using Google Gemini AI.

The system automatically:

- Generates complaint summary
- Identifies complainant details
- Extracts incident information
- Detects crime category
- Assigns case priority
- Suggests Bharatiya Nyaya Sanhita (BNS) sections
- Identifies missing information
- Generates investigation questions
- Creates investigation checklist
- Drafts complete FIR
- Calculates confidence score

---

## ✅ AI FIR Generator

Generate professionally formatted FIR drafts within seconds.

Features:

- Police Station Details
- District Details
- Complainant Information
- Incident Narrative
- Suggested BNS Sections
- Printable FIR Format
- Copy FIR
- Download FIR (Upcoming)
- Save Draft (Upcoming)

---

## ✅ OCR Complaint Scanner

Upload a complaint image and Sentinel AI will:

- Extract complaint text
- Digitize handwritten/printed complaints
- Send extracted text to AI Complaint Intelligence
- Generate complete investigation assistance

Supported Images:

- JPG
- PNG
- JPEG

---

## ✅ Smart Dashboard

Interactive dashboard showing:

- Total Complaints
- Active Investigations
- AI Generated FIRs
- Crime Analytics
- AI Status
- Quick Navigation

---

## ✨ Modern UI

- Glassmorphism Design
- Fully Responsive
- Animated Dashboard
- Smooth Transitions
- Dark Theme
- Police Inspired Interface

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome
- GSAP Animations
- Chart.js

---

## Backend

- Python
- Flask

---

## Artificial Intelligence

- Google Gemini API

Used for:

- Complaint Analysis
- FIR Generation
- Crime Classification
- Investigation Suggestions

---

## OCR

Current Version

- EasyOCR

Future Version

- PaddleOCR
- Gemini Vision OCR

---

## Database

- SQLite

---

# 📂 Project Structure

```
Sentinel-AI/

│
├── app/
│   ├── ai/
│   ├── routes/
│   ├── database/
│   ├── static/
│   │     ├── css/
│   │     ├── js/
│   │
│   └── templates/
│
├── uploads/
├── config.py
├── app.py
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## Step 1

Clone the repository

```bash
git clone https://github.com/Prashant-47/Sentinel-AI-for-UP-Police.git
```

---

## Step 2

Move inside the project

```bash
cd Sentinel-AI-for-UP-Police
```

---

## Step 3

Create Virtual Environment

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## Step 4

Install dependencies

```bash
pip install -r requirements.txt
```

---

## Step 5

Create a `.env` file

Example

```env
GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
```

Get Gemini API Key from

https://aistudio.google.com/app/apikey

---

## Step 6

Run the project

```bash
python app.py
```

Open

```
http://127.0.0.1:5000
```

---

# 📸 Modules

## Dashboard

Provides complete overview of AI system.

---

## Complaint Intelligence

Paste any complaint.

Sentinel AI will analyze it and generate:

- Summary
- Crime Category
- Priority
- Investigation Checklist
- FIR Draft
- Missing Information
- Questions for Investigation

---

## OCR Scanner

Upload complaint image.

AI extracts text and performs automatic complaint analysis.

---

## AI FIR Generator

Fill incident details.

Generate complete FIR draft within seconds.

---

# 📋 Current Working Features

- Dashboard
- Complaint Intelligence
- OCR Complaint Scanner
- AI FIR Generator
- Responsive Design
- AI Investigation Assistance

---

# 🚧 Upcoming Features

The following features are under development.

## AI Face Recognition

Identify suspects using facial recognition.

---

## Criminal Record Search

Search previous criminal history instantly.

---

## Missing Person Matching

Compare missing persons with available records.

---

## Vehicle Detection

Automatic number plate recognition.

---

## CCTV Intelligence

Analyze CCTV footage using AI.

---

## Voice Complaint Analysis

Convert voice complaint into structured FIR.

---

## Crime Heatmaps

Visualize crime hotspots using GIS.

---

## Predictive Crime Analytics

Predict crime-prone locations using AI.

---

## AI Chat Assistant

Police Knowledge Assistant.

Ask questions related to:

- BNS
- Police Procedures
- Investigation
- Evidence Collection

---

## Multi-language Support

- English
- Hindi
- Urdu

---

## PDF FIR Download

Generate printable FIR.

---

## Email Notifications

Send FIR to complainant automatically.

---

## Cloud Database

Migration from SQLite to PostgreSQL.

---

## Authentication

Officer Login

Admin Dashboard

Role Based Access

---

# 🎯 Vision

The vision of Sentinel AI is to transform traditional police stations into AI-assisted Smart Police Stations by reducing paperwork, improving investigation efficiency, and enabling data-driven policing.

---

# 👨‍💻 Developed By

**Prashant Mathur**

Software Development Engineer


---
Screenshots:
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/c9311846-8271-403e-8e07-32e5c6989637" />


<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/c2a38009-9f03-46d8-99bf-d4b23d8d801f" />


<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/11a534c8-2282-460b-bb9b-665d0c67b343" />


<img width="1919" height="876" alt="image" src="https://github.com/user-attachments/assets/f975ab10-f44e-448d-88ea-8f63b7342ce5" />


<img width="1919" height="879" alt="image" src="https://github.com/user-attachments/assets/122051a8-03ed-4991-9ae4-baf7346e7aaa" />


<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/5e5d0ea2-c74e-47b4-a4a0-52223c858dbc" />


<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/c0aeb77b-9983-4863-9a3d-f09455782e4d" />


# 📜 License

This project is developed for educational, research, and demonstration purposes.

---

# ⭐ Support

If you like this project,

Please consider giving it a ⭐ on GitHub.

It motivates future development.

---

# 🤝 Contributions

Contributions are welcome.

You can:

- Fork this repository
- Create a new branch
- Commit your changes
- Submit a Pull Request

---

# 📬 Contact

GitHub

https://github.com/Prashant-47

---

## Thank You ❤️

Together, let's build smarter and safer policing with Artificial Intelligence.
