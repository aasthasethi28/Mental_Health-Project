<div align="center">

# Mental Health Signal

### A student wellness score estimator powered by machine learning

A web application that estimates an informational mental-health score from students’ lifestyle, academic, sleep, physical-activity, stress, and social-media-use inputs.

[![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Scikit-learn](https://img.shields.io/badge/ML-scikit--learn-F7931E?logo=scikitlearn&logoColor=white)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-Not%20specified-lightgrey)]()

</div>

---

## About the project

**Mental Health Signal** is an educational machine-learning application that estimates a student mental-health score on a **0–10 scale** from user-provided information.

The project combines a trained model with a **FastAPI** backend and a responsive **HTML, CSS, and JavaScript** frontend. Users enter information about their routines and habits; the frontend sends it to the prediction API, which validates the request and returns a score for display.

> **Important:** This is an informational wellness tool—not a clinical assessment, diagnosis, or substitute for professional support.

## At a glance

| | |
|---|---|
| **Input** | Student profile, academic and digital habits, lifestyle, and perceived stress |
| **Output** | Predicted mental-health score from 0 to 10 |
| **Backend** | FastAPI, Pydantic, Uvicorn |
| **Model** | Serialized scikit-learn-compatible model loaded with Joblib |
| **Frontend** | HTML, CSS, vanilla JavaScript |
| **API endpoint** | `POST /predict` |

## Features

- Machine-learning-based score prediction
- Responsive web interface with client-side form validation
- FastAPI REST endpoint with Pydantic request validation
- Serialized model inference using Joblib
- Animated 0–10 score gauge
- Score signal labels: **Strained**, **Balanced**, and **Strong**
- Reset and retry functionality
- API error handling and CORS support
- Country grouping for supported countries

## How it works

```mermaid
flowchart TD
    A[Student enters information] --> B[Web interface]
    B --> C[Client-side validation]
    C --> D[FastAPI POST /predict]
    D --> E[Pydantic request validation]
    E --> F[Prepare model features]
    F --> G[Joblib model inference]
    G --> H[Predicted score from 0 to 10]
    H --> I[Frontend score gauge and signal]
