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
            src="/bd2.avif" 
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
                    src="/bd1.avif" 
                    alt="Blood donation process"
                    className="info-image"
                  />
                  <h3>Why Donate Blood?</h3>
                  <p>Every two seconds someone needs blood. Your donation can make a difference.</p>
                </div>
                <div className="info-card">
                  <img 
                    src="/bd3.avif" 
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