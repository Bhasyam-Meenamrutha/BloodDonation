import React, { useState, useEffect } from 'react';
import { Droplet } from 'lucide-react';
import DonorForm from './components/DonorForm';
import RecipientForm from './components/RecipientForm';
import MatchResults from './components/MatchResults';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BloodDonation_backend } from '../../declarations/BloodDonation_backend';

function App() {
  const [view, setView] = useState('dashboard');
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const donorData = await handleAddDonor();
      const recipientData = await handleAddRecipient();
      findMatches(donorData, recipientData);
      
    };

    fetchData();
  }, []);

  async function handleAddDonor() {
    const donorData = await BloodDonation_backend.get_all_Donors();
    setDonors(donorData);
    console.log("alldonors", donorData);
    return donorData;  
  }

  async function handleAddRecipient() {
    const recipientData = await BloodDonation_backend.get_all_Recipient();
    setRecipients(recipientData);
    console.log("allrecept", recipientData);
    return recipientData;  
  }

  const findMatches = (donorsList, recipientsList) => {
    const newMatches = [];

    recipientsList.forEach((recipient) => {
      const compatibleDonors = donorsList.filter((donor) =>
        donor.bloodGroup.trim() === recipient.reqbloodGroup.trim() 
      );

      if (compatibleDonors.length > 0) {
        newMatches.push({ recipient, compatibleDonors });
      }
    });

    if (newMatches.length > 0) {
      console.log("✅ Match found!");
    } else {
      console.log("❌ No match found.");
    }

    setMatches(newMatches); 
  };


  

  return (
    <div className="app-container">
      <Navbar view={view} setView={setView} />
      
      <main className="main-content">
        <div className="hero-section">
          <img 
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=2000" 
            alt="Blood Donation"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1>Save Lives Through Blood Donation</h1>
            <p>One donation can save up to three lives</p>
          </div>
        </div>

        <div className="container">
          {view === 'dashboard' && (
            <>
              <Dashboard donors={donors} recipients={recipients} matches={matches} />
              <div className="info-section">
                <div className="info-card">
                  <img 
                    src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=800" 
                    alt="Blood donation process"
                    className="info-image"
                  />
                  <h3>Why Donate Blood?</h3>
                  <p>Every two seconds someone needs blood. Your donation can make a difference.</p>
                </div>
                <div className="info-card">
                  <img 
                    src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800" 
                    alt="Medical research"
                    className="info-image"
                  />
                  <h3>The Process</h3>
                  <p>Simple, safe, and takes only about an hour of your time.</p>
                </div>
              </div>
            </>
          )}
          {view === 'donor' && <DonorForm onSubmit={handleAddDonor} />}
          {view === 'recipient' && <RecipientForm onSubmit={handleAddRecipient} />}
          {view === 'matches' && <MatchResults matches={matches} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;