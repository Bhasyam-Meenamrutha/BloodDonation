import React from 'react';
import { Droplet, Menu, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

function Navbar({ view, setView }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [principal, setPrincipal] = useState(null); // Store principal

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function handleConnect() {
    const authClient = await AuthClient.create();
    authClient.login({
       maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
       identityProvider: "https://identity.ic0.app/#authorize",
       onSuccess: async () => {
          const identity = await authClient.getIdentity();
          const principal = identity.getPrincipal(); // Extract principal as text
          localStorage.setItem("principal",principal);
          setPrincipal(principal);
          window.location.reload();
       },
    });
 }

 useEffect(() => {
  async function init() {
     const authClient = await AuthClient.create();
     if (await authClient.isAuthenticated()) {
        const identity = await authClient.getIdentity();
        const principal = identity.getPrincipal().toText(); // Extract principal as text
        setPrincipal(principal);
     }
  }
  init();
}, []);

async function handleLogout() {
  const authClient = await AuthClient.create();
  authClient.logout(); 
  setPrincipal("");
  localStorage.removeItem("principal") 
}

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Droplet size={32} className="nav-logo" />
        <h1>LifeStream</h1>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <button 
          className={`nav-link ${view === 'dashboard' ? 'active' : ''}`}
          onClick={() => {
            setView('dashboard');
            setIsMenuOpen(false);
          }}
        >
          Dashboard
        </button>
        <button 
          className={`nav-link ${view === 'donor' ? 'active' : ''}`}
          onClick={() => {
            setView('donor');
            setIsMenuOpen(false);
          }}
        >
          Donate Blood
        </button>
        <button 
          className={`nav-link ${view === 'recipient' ? 'active' : ''}`}
          onClick={() => {
            setView('recipient');
            setIsMenuOpen(false);
          }}
        >
          Request Blood
        </button>
        <button 
          className={`nav-link ${view === 'matches' ? 'active' : ''}`}
          onClick={() => {
            setView('matches');
            setIsMenuOpen(false);
          }}
        >
          View Matches
        </button>
        <div>
            {principal ? (
                <button onClick={handleLogout}>Disconnect</button>
            ) : (
                <button
                id="ConnectBtn"
                onClick={handleConnect}
                
             >
                Connect
             </button>
            )}
         </div>
      </div>
    </nav>
  );
}

export default Navbar