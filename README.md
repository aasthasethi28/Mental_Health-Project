# Mental_Health-Project
A machine-learning based web application that estimates a student mental health score from 0–10 using lifestyle, academic, social-media usage, sleep, physical activity, and perceived stress information.

The project combines a trained machine-learning model with a FastAPI backend and a responsive HTML/CSS/JavaScript frontend. The application is designed as an informational wellness tool and is not a clinical or medical assessment.

📌 Project Overview

Students' mental well-being can be influenced by factors such as:

Daily social-media/screen usage

Number of phone unlocks

Study hours

Sleep duration

Physical activity

Perceived stress

Academic level

Social-media platform usage

Purpose of social-media use

Demographic information

This project accepts these inputs through a web interface and sends them to a FastAPI prediction API. A pre-trained machine-learning model then returns a predicted mental health score.

Prediction scale

Score

Signal

Meaning

< 4

Strained

The provided responses indicate elevated strain and may suggest a need for healthier routines or recovery.

4 – < 7

Balanced

The provided habits indicate a relatively steady pattern with room for improvement and recovery.

≥ 7

Strong

The provided habits indicate a comparatively well-supported baseline.

Important: The score is an ML-generated signal for informational purposes only. It is not a diagnosis, medical assessment, or substitute for professional mental-health support.

✨ Features

📊 ML-based mental health score prediction

🌐 Interactive web-based interface

⚡ FastAPI REST API

🧪 Pydantic input validation

🤖 Serialized trained model using Joblib

📱 Responsive frontend

🎯 0–10 animated score gauge

🧩 Client-side form validation

🔄 Reset and retry functionality

🚨 API error handling

🌍 Country grouping for supported countries

🔐 CORS support for frontend/backend communication

🏗️ System Architecture

                ┌───────────────────────────┐
                │      User / Student       │
                └─────────────┬─────────────┘
                              │
                              ▼
                ┌───────────────────────────┐
                │   HTML / CSS / JavaScript │
                │       Web Interface       │
                └─────────────┬─────────────┘
                              │
                         POST /predict
                              │
                              ▼
                ┌───────────────────────────┐
                │       FastAPI Backend     │
                │   Pydantic Validation     │
                └─────────────┬─────────────┘
                              │
                              ▼
                ┌───────────────────────────┐
                │   Pre-trained ML Model    │
                │ Mental_Health_Model.pkl   │
                └─────────────┬─────────────┘
                              │
                       Predicted Score
                              │
                              ▼
                ┌───────────────────────────┐
                │   Score + Wellness Signal │
                │       0 – 10 Gauge        │
                └───────────────────────────┘

🛠️ Tech Stack

Backend

Python

FastAPI

Uvicorn

Pydantic

Pandas

Joblib

Scikit-learn

Frontend

HTML5

CSS3

Vanilla JavaScript

SVG-based score gauge

Google Fonts

Machine Learning

Pre-trained scikit-learn-compatible model

Model serialization with Joblib

Tabular feature-based prediction

📂 Project Structure

Mental_Health-Project/
│
├── Mental_Health_Model.pkl
├── Student Social Media And Mental Health Impact.csv
│
├── main.py
├── requirements.txt
│
├── index.html
├── style.css
├── script.js
│
├── README.md
└── __pycache__/

File Description

File

Purpose

main.py

FastAPI application, validation, feature preparation, and model inference

Mental_Health_Model.pkl

Serialized trained machine-learning model

Student Social Media And Mental Health Impact.csv

Dataset used by the project

index.html

Frontend structure and prediction form

style.css

Frontend styling and responsive UI

script.js

Form handling, validation, API communication, and score visualization

requirements.txt

Python dependencies

📥 Input Features

The prediction API accepts the following information:

Profile

Age

Gender

Country

Academic & Digital Habits

Academic level

Most-used social-media platform

Primary purpose of social-media use

Average daily screen time

Daily phone unlocks

Lifestyle & Stress

Study hours per day

Physical activity hours per day

Sleep hours per night

Perceived stress level

Supported stress levels:

Low
Medium
High
Very High

🔌 API

Base Endpoint

The frontend is currently configured to communicate with:

https://mental-health-project-86uo.onrender.com

Health / Welcome Endpoint

GET /

Example response:

{
  "message": "Welcome to Aastha Sethi"
}

Prediction Endpoint

POST /predict

Example request:

{
  "age": 21,
  "gender": "Female",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 5.5,
  "daily_unlocks": 60,
  "study_hours": 6,
  "physical_activity_hours": 1,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}

Example response:

{
  "predicted_mental_health_score": 6.42
}

🚀 Installation

1. Clone the repository

git clone https://github.com/aasthasethi28/Mental_Health-Project.git
cd Mental_Health-Project

2. Create a virtual environment

python -m venv venv

Activate it on Windows:

venv\Scripts\activate

On macOS/Linux:

source venv/bin/activate

3. Install dependencies

pip install -r requirements.txt

▶️ Run the Backend

Start the FastAPI server:

uvicorn main:app --reload

The API will normally be available at:

http://127.0.0.1:8000

FastAPI also provides interactive API documentation at:

http://127.0.0.1:8000/docs

🌐 Run the Frontend

The frontend consists of:

index.html
style.css
script.js

For local development, serve the project directory with a simple HTTP server:

python -m http.server 5500

Then open:

http://127.0.0.1:5500

If you are running the backend locally, update the API_BASE value in script.js from the deployed backend URL to:

const API_BASE = "http://127.0.0.1:8000";

🔄 How It Works

The user opens the Mental Health Signal web interface.

The user enters demographic, academic, digital-habit, lifestyle, and stress information.

JavaScript validates the submitted fields.

The frontend sends the data to the FastAPI /predict endpoint.

Pydantic validates the API request.

The backend converts the request into a Pandas DataFrame matching the model's expected feature structure.

The country is mapped to a supported country group or "Other".

Mental_Health_Model.pkl performs the prediction.

The predicted value is rounded to two decimal places.

The frontend displays the result using an animated 0–10 gauge.

The score is classified as strained, balanced, or strong.

🧪 Validation

The backend validates:

Age: 10–100

Screen time: 0–24 hours

Study hours: 0–24 hours

Physical activity: 0–24 hours

Sleep: 0–24 hours

Daily unlocks: 0+

Gender: Male / Female

Academic level: High School / Undergraduate / Graduate

Stress level: Low / Medium / High / Very High

The frontend also performs validation before sending the request to the backend.

🌍 Country Handling

The backend recognizes a predefined group of countries:

India
USA
Canada
Australia
UK
Germany
Mexico
Turkey
France
Other

If a country outside the predefined list is entered, it is assigned to the "Other" country group for the additional grouped-country feature.

📊 Dataset

The repository includes:

Student Social Media And Mental Health Impact.csv

The application uses student-related social-media and lifestyle attributes to support mental-health score prediction.

The deployed application uses the already-trained model stored in:

Mental_Health_Model.pkl

The current repository does not include a separate model-training script, so model training/retraining is outside the prediction API workflow.

🔒 Privacy & Safety

This project should be treated as an educational and informational ML application.

It should not be used to:

Diagnose mental-health disorders

Replace a psychologist, psychiatrist, counselor, or other qualified professional

Make medical decisions

Label or discriminate against students based on their predicted score

For a production deployment, additional privacy protections should be considered, including secure transport, authentication, data minimization, logging policies, and appropriate handling of sensitive user information.

⚠️ Limitations

The prediction quality depends on the training data and trained model.

A predicted score does not represent a clinical diagnosis.

Self-reported lifestyle and stress information can be subjective.

The model may not generalize equally well across different populations.

The current application is intended primarily for educational/informational use.

The repository contains the trained model but not the original training pipeline.

🔮 Future Improvements

Potential improvements include:

Add model-training and evaluation notebooks

Add model performance metrics such as MAE, RMSE, and R²

Add explainable AI using SHAP or feature importance

Display the factors that most influenced an individual prediction

Add authentication and user accounts

Store historical predictions securely

Add personalized, non-clinical wellness recommendations

Add automated model monitoring

Add unit and API tests

Containerize the application with Docker

Add CI/CD deployment

Improve privacy and security controls

Add a dedicated model-card documenting training data, limitations, and evaluation results

👩‍💻 Author

Aastha Sethi

B.Tech — Artificial Intelligence & Machine Learning

📜 Disclaimer

This application is built for educational and informational purposes only.

The generated mental-health score is an algorithmic estimate based on the information provided by the user. It is not a medical diagnosis, psychological assessment, or professional recommendation.

If someone is experiencing significant emotional distress or mental-health concerns, they should seek help from a qualified professional or a trusted person.
