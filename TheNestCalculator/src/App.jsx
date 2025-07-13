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
  };

  const handleWhatsApp = () => {
    const message = `Hello ${name},\n\nYour estimate from The Nest Interior Hub:\n\nType: ${type}\nArea: ${area} sqft\nQuality: ${quality}\nEstimated Cost: ₹${cost.toLocaleString("en-IN")}`;
    const whatsappURL = `https://wa.me/919676444998?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '1rem' }}>Interior Cost Calculator</h2>

      <input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
      <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />

      <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}>
        <option value="1BHK">1BHK</option>
        <option value="2BHK">2BHK</option>
        <option value="3BHK">3BHK</option>
        <option value="Villa">Villa</option>
      </select>

      <input type="number" placeholder="Total Area (sqft)" value={area} onChange={(e) => setArea(+e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />

      <select value={quality} onChange={(e) => setQuality(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}>
        <option value="basic">Basic</option>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
      </select>

      <button onClick={handleCalculate} style={{ width: '100%', marginTop: '10px' }}>Calculate Cost</button>

      {cost !== null && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{ fontWeight: 'bold' }}>Estimated Cost: ₹{cost.toLocaleString("en-IN")}</div>
          <button onClick={handleWhatsApp} style={{ marginTop: '10px' }}>Send via WhatsApp</button>
        </div>
      )}
    </div>
  );
}

export default App;