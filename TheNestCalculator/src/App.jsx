import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [type, setType] = useState("2BHK");
  const [area, setArea] = useState(1000);
  const [quality, setQuality] = useState("standard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cost, setCost] = useState(null);

  const rates = {
    basic: 1200,
    standard: 1800,
    premium: 2500,
  };

  const handleCalculate = () => {
    const rate = rates[quality];
    const estimate = area * rate;
    setCost(estimate);

    const templateParams = {
      to_name: name,
      to_email: email,
      home_type: type,
      area: area,
      quality: quality,
      estimated_cost: `₹${estimate.toLocaleString("en-IN")}`,
    };

    emailjs.send(
      "service_gk2kbhv",
      "template_1gk2p6k",
      templateParams,
      "KyEK44oIdVfz1UTxB"
    );

    const message = `Hello ${name},%0A%0AYour interior estimate from The Nest Interior Hub:%0AType: ${type}%0AArea: ${area} sqft%0AQuality: ${quality}%0AEstimated Cost: ₹${estimate.toLocaleString("en-IN")}`;
    const whatsappURL = `https://wa.me/919676444998?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '3rem auto',
      padding: '2rem',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{ marginBottom: '1rem', color: '#4f46e5', textAlign: 'center' }}>
        Interior Cost Calculator
      </h2>

      <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} 
        style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} 
        style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
      <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} 
        style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />

      <select value={type} onChange={(e) => setType(e.target.value)} 
        style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
        <option value="Villa">Villa</option>
      </select>

      <input type="number" placeholder="Total Area (sqft)" value={area} onChange={(e) => setArea(+e.target.value)} 
        style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }} />

      <select value={quality} onChange={(e) => setQuality(e.target.value)} 
        style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
        <option value="basic">Basic</option>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
      </select>

      <button onClick={handleCalculate} 
        style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: '#fff', borderRadius: '8px', border: 'none', marginTop: '10px', cursor: 'pointer' }}>
        Calculate & Send via WhatsApp
      </button>
    </div>
  );
}

export default App;