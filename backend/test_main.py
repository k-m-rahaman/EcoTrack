from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_calculate_footprint_standard_omnivore():
    payload = {
        "distance_km": 300,
        "transport_type": "petrol_car",
        "electricity_kwh": 150,
        "grid_intensity_factor": 0.71,
        "diet_type": "balanced",
        "waste_kg": 25,
        "recycling_habits": "partial"
    }
    response = client.post("/api/v1/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "metrics" in data
    assert data["metrics"]["annual_projection_tons"] > 0

def test_calculate_footprint_low_carbon_vegan():
    payload = {
        "distance_km": 40,
        "transport_type": "eco_active",
        "electricity_kwh": 50,
        "grid_intensity_factor": 0.35,
        "diet_type": "vegan",
        "waste_kg": 5,
        "recycling_habits": "high"
    }
    response = client.post("/api/v1/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["metrics"]["annual_projection_tons"] <= 2.0

def test_invalid_transport_vector_throws_error():
    payload = {
        "distance_km": 100,
        "transport_type": "invalid_system_vector_value",
        "electricity_kwh": 100,
        "grid_intensity_factor": 0.5,
        "diet_type": "balanced",
        "waste_kg": 10,
        "recycling_habits": "none"
    }
    response = client.post("/api/v1/calculate", json=payload)
    assert response.status_code == 400