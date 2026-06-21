from pydantic import BaseModel, Field

class FootprintInput(BaseModel):
    # Mobility
    distance_km: float = Field(..., ge=0, description="Distance traveled in km")
    transport_type: str = Field(..., description="petrol_car, hybrid_car, ev, public_transit, flight, or eco_active")
    
    # Energy
    electricity_kwh: float = Field(..., ge=0, description="Monthly electricity usage in kWh")
    grid_intensity_factor: float = Field(0.71, ge=0, description="Dynamic grid carbon intensity (kg CO2e/kWh)")
    
    # Diet
    diet_type: str = Field(..., description="heavy_meat, balanced, flexitarian, vegetarian, or vegan")
    
    # Waste & Circular Economy (New Advanced Parameter)
    waste_kg: float = Field(..., ge=0, description="Monthly household waste generated in kg")
    recycling_habits: str = Field(..., description="none, partial, or high")