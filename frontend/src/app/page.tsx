'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    distance_km: 300,
    transport_type: 'petrol_car',
    electricity_kwh: 150,
    grid_intensity_factor: 0.71,
    diet_type: 'balanced',
    waste_kg: 25,
    recycling_habits: 'partial'
  });

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://eco-track-backend.onrender.com/api/v1/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Data processing pipeline exception:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#0b1329', color: '#f1f5f9', minHeight: '100vh', padding: '3rem 2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .animate-fade-in { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .interactive-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }
        .interactive-card:hover { transform: translateY(-5px); border-color: #10b981 !important; box-shadow: 0 20px 30px -10px rgba(16, 185, 129, 0.15) !important; }
        .results-card:hover { transform: translateY(-5px); border-color: #3b82f6 !important; box-shadow: 0 20px 30px -10px rgba(59, 130, 246, 0.2) !important; }
        .pulse-indicator { animation: pulseGlow 2s infinite; }
        .form-input-element:focus { border-color: #10b981 !important; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); background-color: #111c44 !important; }
        .submit-btn { transition: all 0.2s ease !important; }
        .submit-btn:hover { filter: brightness(1.1); box-shadow: 0 6px 20px 0 rgba(16, 185, 129, 0.4) !important; }
        .submit-btn:active { transform: scale(0.98); }
      `}} />

      <header className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto 3.5rem auto', borderBottom: '1px solid #1e293b', paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ background: 'linear-gradient(to right, #34d399, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', fontWeight: '900', margin: 0, letterSpacing: '-0.05em' }}>EcoTrack Pro</h1>
          <p style={{ color: '#cbd5e1', marginTop: '0.5rem', fontSize: '1.15rem', fontWeight: '500' }}>Contextual Carbon Diagnostics & Multi-Tier Analytics Engine</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#1e293b', padding: '0.6rem 1.2rem', borderRadius: '2rem', border: '1px solid #334155', fontSize: '0.875rem', fontWeight: '600', color: '#10b981' }}>
          <span className="pulse-indicator" style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }} aria-hidden="true"></span>
          Engine Core v2.0 Operational
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
        
        <section className="animate-fade-in interactive-card" aria-labelledby="config-heading" style={{ backgroundColor: '#111c44', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #1e293b', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
          <h2 id="config-heading" style={{ color: '#34d399', fontSize: '1.6rem', fontWeight: '800', marginTop: 0, marginBottom: '2rem' }}>Diagnostics Configuration</h2>
          
          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>1. Mobility Framework</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="distance_km" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Monthly Logged Distance (km)</label>
                  <input
                    id="distance_km"
                    type="number"
                    className="form-input-element"
                    value={formData.distance_km}
                    onChange={(e) => setFormData({...formData, distance_km: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="transport_type" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Transport Vector Profile</label>
                  <select
                    id="transport_type"
                    className="form-input-element"
                    value={formData.transport_type}
                    onChange={(e) => setFormData({...formData, transport_type: e.target.value})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="petrol_car">Internal Combustion Engine (Petrol/Diesel)</option>
                    <option value="hybrid_car">Hybrid Powertrain System</option>
                    <option value="ev">Battery Electric Vehicle (BEV)</option>
                    <option value="public_transit">Mass Transit Fleet (Bus/Metro)</option>
                    <option value="flight">Aviation / Long-Haul Flight</option>
                    <option value="eco_active">Active Mobility (Cycling/Walking)</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>2. Resource Energy Grid</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="electricity_kwh" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Grid Infrastructure Power (kWh)</label>
                  <input
                    id="electricity_kwh"
                    type="number"
                    className="form-input-element"
                    value={formData.electricity_kwh}
                    onChange={(e) => setFormData({...formData, electricity_kwh: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="grid_intensity_factor" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Regional Carbon Intensity Index</label>
                  <input
                    id="grid_intensity_factor"
                    type="number"
                    step="0.01"
                    className="form-input-element"
                    value={formData.grid_intensity_factor}
                    onChange={(e) => setFormData({...formData, grid_intensity_factor: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>3. Dietary Lifecycle</h3>
              <div>
                <label htmlFor="diet_type" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Nutritional Consumption Protocol</label>
                <select
                  id="diet_type"
                  className="form-input-element"
                  value={formData.diet_type}
                  onChange={(e) => setFormData({...formData, diet_type: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="heavy_meat">High-Intensity Meat Profile (Daily Red Meat)</option>
                  <option value="balanced">Balanced Omnivore Profile (Standard Baseline)</option>
                  <option value="flexitarian">Flexitarian Profile (Conscious Low-Meat)</option>
                  <option value="vegetarian">Ovo-Lacto Vegetarian Profile</option>
                  <option value="vegan">Total Plant-Based Framework</option>
                </select>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #ec4899', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ec4899', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>4. Circular Economy & Waste Outputs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="waste_kg" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Monthly Solid Waste Output (kg)</label>
                  <input
                    id="waste_kg"
                    type="number"
                    className="form-input-element"
                    value={formData.waste_kg}
                    onChange={(e) => setFormData({...formData, waste_kg: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="recycling_habits" style={{ display: 'block', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: '600', marginBottom: '0.5rem' }}>Recycling Diversion Strategy</label>
                  <select
                    id="recycling_habits"
                    className="form-input-element"
                    value={formData.recycling_habits}
                    onChange={(e) => setFormData({...formData, recycling_habits: e.target.value})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #475569', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="none">Zero Structural Sorting (Total Landfill)</option>
                    <option value="partial">Basic Materials Sorting (Standard Diversion)</option>
                    <option value="high">Advanced Circular Divergence</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn" style={{ width: '100%', background: 'linear-gradient(to right, #10b981, #059669)', color: '#0b1329', fontWeight: '800', fontSize: '1.1rem', padding: '1rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)' }}>
              {loading ? 'Compiling Environmental Matrices...' : 'Execute Full Carbon Audit'}
            </button>
          </form>
        </section>

        {/* Dynamic Live Assertive Feedback Zone */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} aria-live="polite">
          {results && results.metrics ? (
            <>
              <div className="animate-fade-in results-card" style={{ background: 'radial-gradient(circle at top left, #1a234a, #111a3a)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #233166', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#cbd5e1', margin: 0 }}>Computed Annual Projection Baseline</h3>
                <p style={{ fontSize: '5rem', fontWeight: '900', color: results.metrics.annual_projection_tons > 2.0 ? '#ef4444' : '#34d399', margin: '1rem 0' }}>
                  {results.metrics.annual_projection_tons} <span style={{ fontSize: '1.5rem', fontWeight: '500', color: '#cbd5e1' }}>MT CO₂e</span>
                </p>
                <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', display: 'inline-block', border: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Target Stabilization Variable: </span>
                  <span style={{ color: '#34d399', fontWeight: '700' }}>&le; 2.00 MT</span>
                </div>
              </div>

              <div className="animate-fade-in interactive-card" style={{ backgroundColor: '#111c44', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #1e293b' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginTop: 0, marginBottom: '1.5rem' }}>Isolated Diagnostics Vector Output</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: '700' }}>MOBILITY SECTOR</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.mobility_kg} <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>kg</span></div>
                  </div>
                  <div style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '700' }}>GRID ENERGY SECTOR</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.energy_kg} <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>kg</span></div>
                  </div>
                  <div style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: '700' }}>NUTRITIONAL LIFE-STAGE</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.diet_kg} <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>kg</span></div>
                  </div>
                  <div style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.85rem', color: '#ec4899', fontWeight: '700' }}>CIRCULAR WASTE LOOP</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.waste_kg} <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>kg</span></div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in interactive-card" style={{ backgroundColor: '#111c44', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #1e293b' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#34d399', marginTop: 0, marginBottom: '1.25rem' }}>Mitigation Intelligence Optimization Routing</h3>
                <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
                  {results.insights.map((insight: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'start', backgroundColor: '#0b1329', padding: '1rem', borderRadius: '1rem', border: '1px solid #1e293b', fontSize: '0.95rem', color: '#ffffff', lineHeight: '1.4' }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontWeight: '900' }}>✓</span>{insight}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #1e293b', borderRadius: '1.5rem', padding: '4rem 2rem', textAlign: 'center', color: '#64748b', minHeight: '400px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#cbd5e1', margin: 0 }}>Analytics Matrix Standby</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#64748b' }}>Provide operational vectors within the configuration matrix and compile.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}