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
      const response = await fetch('http://localhost:8000/api/v1/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Pipeline link failure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#0b1329', color: '#f1f5f9', minHeight: '100vh', padding: '3rem 2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Dynamic Animation Stylesheet Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .interactive-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .interactive-card:hover {
          transform: translateY(-5px);
          border-color: #10b981 !important;
          box-shadow: 0 20px 30px -10px rgba(16, 185, 129, 0.15) !important;
        }
        .results-card:hover {
          transform: translateY(-5px);
          border-color: #3b82f6 !important;
          box-shadow: 0 20px 30px -10px rgba(59, 130, 246, 0.2) !important;
        }
        .pulse-indicator {
          animation: pulseGlow 2s infinite;
        }
        .form-input-element {
          transition: all 0.2s ease;
        }
        .form-input-element:focus {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
          background-color: #111c44 !important;
        }
        .submit-btn {
          transition: all 0.2s ease !important;
        }
        .submit-btn:hover {
          filter: brightness(1.1);
          box-shadow: 0 6px 20px 0 rgba(16, 185, 129, 0.4) !important;
        }
        .submit-btn:active {
          transform: scale(0.98);
        }
        .vector-badge {
          transition: all 0.2s ease;
        }
        .vector-badge:hover {
          background-color: #1e293b !important;
          border-color: #475569 !important;
        }
      `}} />

      {/* Premium Header Layout */}
      <header className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto 3.5rem auto', borderBottom: '1px solid #1e293b', paddingBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <h1 style={{ background: 'linear-gradient(to right, #34d399, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3rem', fontWeight: '900', margin: 0, letterSpacing: '-0.05em' }}>EcoTrack Pro</h1>
          <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '1.15rem', fontWeight: '500' }}>Contextual Carbon Diagnostics & Multi-Tier Analytics Engine</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#1e293b', padding: '0.6rem 1.2rem', borderRadius: '2rem', border: '1px solid #334155', fontSize: '0.875rem', fontWeight: '600', color: '#10b981' }}>
          <span className="pulse-indicator" style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
          Engine Core v2.0 Operational
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
        
        {/* Advanced Inputs Diagnostics Panel */}
        <section className="animate-fade-in interactive-card" style={{ backgroundColor: '#111c44', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #1e293b', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
          <h2 style={{ color: '#34d399', fontSize: '1.6rem', fontWeight: '800', marginTop: 0, marginBottom: '2rem' }}>
            Diagnostics Configuration
          </h2>
          
          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            
            {/* Mobility */}
            <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>1. Mobility Framework</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Monthly Logged Distance (km)</label>
                  <input
                    type="number"
                    className="form-input-element"
                    value={formData.distance_km}
                    onChange={(e) => setFormData({...formData, distance_km: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Transport Vector Profile</label>
                  <select
                    className="form-input-element"
                    value={formData.transport_type}
                    onChange={(e) => setFormData({...formData, transport_type: e.target.value})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
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

            {/* Energy */}
            <div style={{ borderLeft: '3px solid #10b981', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>2. Resource Energy Grid</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Grid Infrastructure Power (kWh)</label>
                  <input
                    type="number"
                    className="form-input-element"
                    value={formData.electricity_kwh}
                    onChange={(e) => setFormData({...formData, electricity_kwh: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Regional Carbon Intensity Index</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input-element"
                    value={formData.grid_intensity_factor}
                    onChange={(e) => setFormData({...formData, grid_intensity_factor: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Diet Framework */}
            <div style={{ borderLeft: '3px solid #f59e0b', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>3. Dietary Lifecycle</h3>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Nutritional Consumption Protocol</label>
                <select
                  className="form-input-element"
                  value={formData.diet_type}
                  onChange={(e) => setFormData({...formData, diet_type: e.target.value})}
                  style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="heavy_meat">High-Intensity Meat Profile (Daily Red Meat/Poultry)</option>
                  <option value="balanced">Balanced Omnivore Profile (Standard Mixed Baseline)</option>
                  <option value="flexitarian">Flexitarian Profile (Conscious Low-Meat / Plant-Forward)</option>
                  <option value="vegetarian">Ovo-Lacto Vegetarian Profile (Zero Meat Meat-Alternative)</option>
                  <option value="vegan">Total Plant-Based Framework (Vegan Infrastructure)</option>
                </select>
              </div>
            </div>

            {/* Waste and Materials */}
            <div style={{ borderLeft: '3px solid #ec4899', paddingLeft: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ec4899', textTransform: 'uppercase', margin: '0 0 1rem 0' }}>4. Circular Economy & Waste Outputs</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Monthly Solid Waste Output (kg)</label>
                  <input
                    type="number"
                    className="form-input-element"
                    value={formData.waste_kg}
                    onChange={(e) => setFormData({...formData, waste_kg: Number(e.target.value)})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>Recycling Diversion Strategy</label>
                  <select
                    className="form-input-element"
                    value={formData.recycling_habits}
                    onChange={(e) => setFormData({...formData, recycling_habits: e.target.value})}
                    style={{ width: '100%', backgroundColor: '#0b1329', border: '1px solid #334155', borderRadius: '0.75rem', padding: '0.85rem', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="none">Zero Structural Sorting (Total Landfill Output)</option>
                    <option value="partial">Basic Materials Sorting (Standard Plastic/Paper Diversion)</option>
                    <option value="high">Advanced Circular Divergence (Composting + Pure Recycling)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              style={{ width: '100%', background: 'linear-gradient(to right, #10b981, #059669)', color: '#0b1329', fontWeight: '800', fontSize: '1.1rem', padding: '1rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)' }}
            >
              {loading ? 'Compiling Environmental Matrices...' : 'Execute Full Carbon Audit'}
            </button>
          </form>
        </section>

        {/* Predictive Dashboard Visualization Panel */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {results && results.metrics ? (
            <>
              {/* Comprehensive Macro Score Display Card */}
              <div className="animate-fade-in results-card" style={{ background: 'radial-gradient(circle at top left, #1a234a, #111a3a)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #233166', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#94a3b8', margin: 0, letterSpacing: '0.05em' }}>Computed Annual Projection Baseline</h3>
                <p style={{ fontSize: '5rem', fontWeight: '900', color: results.metrics.annual_projection_tons > 2.0 ? '#ef4444' : '#34d399', margin: '1rem 0' }}>
                  {results.metrics.annual_projection_tons} <span style={{ fontSize: '1.5rem', fontWeight: '500', color: '#64748b' }}>MT CO₂e</span>
                </p>
                <div style={{ backgroundColor: '#0b1329', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', display: 'inline-block', border: '1px solid #1e293b' }}>
                  <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Target Hole Variable: </span>
                  <span style={{ color: '#34d399', fontWeight: '700' }}>≤ 2.00 MT</span>
                </div>
              </div>

              {/* Data Density Matrix Granular Category Grid */}
              <div className="animate-fade-in interactive-card" style={{ backgroundColor: '#111c44', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #1e293b', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#f8fafc', marginTop: 0, marginBottom: '1.5rem' }}>Isolated Diagnostics Vector Output</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className="vector-badge" style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: '700' }}>% MOBILITY SECTOR</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.mobility_kg} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>kg</span></div>
                  </div>
                  <div className="vector-badge" style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '700' }}>⚡ GRID ENERGY SECTOR</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.energy_kg} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>kg</span></div>
                  </div>
                  <div className="vector-badge" style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '700' }}>🥗 NUTRITIONAL LIFE-STAGE</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.diet_kg} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>kg</span></div>
                  </div>
                  <div className="vector-badge" style={{ backgroundColor: '#0b1329', padding: '1rem 1.25rem', borderRadius: '1rem', border: '1px solid #1e293b' }}>
                    <div style={{ fontSize: '0.8rem', color: '#ec4899', fontWeight: '700' }}>♻ CIRCULAR WASTE LOOP</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '0.25rem' }}>{results.metrics.waste_kg} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>kg</span></div>
                  </div>
                </div>
              </div>

              {/* Strategic Optimizations Panel */}
              <div className="animate-fade-in interactive-card" style={{ backgroundColor: '#111c44', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #1e293b', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#34d399', marginTop: 0, marginBottom: '1.25rem' }}>Mitigation Intelligence Optimization Routing</h3>
                <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {results.insights.map((insight: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'start', backgroundColor: '#0b1329', padding: '1rem', borderRadius: '1rem', border: '1px solid #1e293b', fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                      <span style={{ color: '#10b981', marginRight: '0.75rem', fontWeight: '900', fontSize: '1.1rem' }}>✓</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : results && results.detail ? (
            <div className="animate-fade-in" style={{ backgroundColor: '#111c44', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid #ef4444', color: '#ef4444' }}>
              <h3 style={{ marginTop: 0, fontSize: '1.3rem' }}>Execution Exception Received</h3>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: '#94a3b8' }}>The processing engine rejected the configuration vector parameters:</p>
              <code style={{ backgroundColor: '#0b1329', padding: '0.75rem', borderRadius: '0.5rem', display: 'block', color: '#fca5a5', border: '1px solid #7f1d1d' }}>{results.detail}</code>
            </div>
          ) : (
            <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #1e293b', borderRadius: '1.5rem', padding: '4rem 2rem', textAlign: 'center', color: '#475569', minHeight: '400px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#64748b', margin: 0 }}>Analytics Matrix Standby</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#475569', maxWidth: '350px' }}>Provide operational vectors within the configuration matrix and compile.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}