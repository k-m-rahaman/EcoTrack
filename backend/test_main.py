from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_calculate_footprint_valid_payload():
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
    assert "insights" in data
    assert data["metrics"]["annual_projection_tons"] > 0