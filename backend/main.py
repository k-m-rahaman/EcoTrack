from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import FootprintInput

app = FastAPI(
    title="EcoTrack Pro Advanced Analytics Engine",
    description="High-performance backend engine computing multi-tier carbon indices.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Comprehensive Emission Factors Matrix (kg CO2e per unit)
EMISSION_FACTORS = {
    "transport": {
        "petrol_car": 0.17,
        "hybrid_car": 0.10,
        "ev": 0.05,
        "public_transit": 0.03,
        "flight": 0.15,
        "eco_active": 0.00  # Walking / Cycling
    },
    "diet": {
        "heavy_meat": 2.9,
        "balanced": 2.0,      # Standard omnivore baseline
        "flexitarian": 1.5,   # Conscious low-meat reduction
        "vegetarian": 1.4,
        "vegan": 0.9
    },
    "waste_base_per_kg": 0.45,  # Base carbon cost of unmanaged landfilled waste
    "recycling_offsets": {
        "none": 1.0,
        "partial": 0.7,        # 30% reduction in footprint impact
        "high": 0.45           # 55% reduction via composting/recycling loops
    }
}

@app.post("/api/v1/calculate")
async def calculate_footprint(data: FootprintInput):
    try:
        # 1. Mobility Core Math
        transport_ef = EMISSION_FACTORS["transport"].get(data.transport_type)
        if transport_ef is None:
            raise HTTPException(status_code=400, detail="Invalid transport type vector.")
        mobility_emissions = data.distance_km * transport_ef

        # 2. Energy Grid Core Math
        energy_emissions = data.electricity_kwh * data.grid_intensity_factor

        # 3. Dietary Core Math
        diet_ef = EMISSION_FACTORS["diet"].get(data.diet_type)
        if diet_ef is None:
            raise HTTPException(status_code=400, detail="Invalid dietary framework variable.")
        diet_emissions = diet_ef * 30 

        # 4. Waste & Circular Economy Optimization Math (Advanced Metric Addition)
        recycling_modifier = EMISSION_FACTORS["recycling_offsets"].get(data.recycling_habits, 1.0)
        waste_emissions = data.waste_kg * EMISSION_FACTORS["waste_base_per_kg"] * recycling_modifier

        # Aggregation Pipelines
        total_monthly_kg = mobility_emissions + energy_emissions + diet_emissions + waste_emissions
        annual_projection_tons = (total_monthly_kg * 12) / 1000

        # Specialized Recommendation Micro-Engine
        recommendations = []
        if data.transport_type in ["petrol_car", "flight"] and data.distance_km > 150:
            recommendations.append("High mobility baseline identified. Moving 25% of journeys to rail or hybrid options scales down transit friction significantly.")
        if data.electricity_kwh > 200:
            recommendations.append("Energy grid consumption exceeds standard optimization limits. Consider smart-meter automation or LED hardware upgrades.")
        if data.diet_type in ["heavy_meat", "balanced"]:
            recommendations.append("Transitioning toward a flexitarian framework twice weekly offsets your dietary footprint by up to 400 kg CO₂e annually.")
        if data.waste_kg > 40 or data.recycling_habits == "none":
            recommendations.append("Solid waste management inefficiency detected. Implementing zero-waste composting protocols can maximize circular offsets.")

        return {
            "status": "success",
            "metrics": {
                "mobility_kg": round(mobility_emissions, 2),
                "energy_kg": round(energy_emissions, 2),
                "diet_kg": round(diet_emissions, 2),
                "waste_kg": round(waste_emissions, 2),
                "total_monthly_kg": round(total_monthly_kg, 2),
                "annual_projection_tons": round(annual_projection_tons, 2)
            },
            "insights": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Processing Failure: {str(e)}")