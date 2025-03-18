import React from 'react';
import { Activity, Users, Droplet, UserCheck } from 'lucide-react';
import { BloodDonation_backend } from '../../../declarations/BloodDonation_backend';
import  { useState, useEffect } from 'react';

function Dashboard({ donors, recipients, matches }) {
  const [donorsize, setdonorsize]= useState("");
  const [receptsize, setreceptsize]= useState("");
 

  useEffect(() => {

    
       get_Donors_size();
       get_Recipient_size();
      
    
  }, []);

  async function get_Donors_size() {
      var donor_size=await BloodDonation_backend.get_Donors_size();
      setdonorsize(donor_size);
      console.log("donor_size",donor_size);
  }

  async function get_Recipient_size(){
    var recept_size = await BloodDonation_backend.get_Recipient_size();
    setreceptsize(recept_size);
    console.log("recept_size",recept_size);
  };

  
  return (
    <div className="dashboard">
      <div className="stat-card">
        <Activity size={24} />
        <h3>Active Donors</h3>
        <p className="stat-number">{Number(donorsize)}</p>
      </div>

      <div className="stat-card">
        <Users size={24} />
        <h3>Blood Requests</h3>
        <p className="stat-number">{Number(receptsize)}</p>
      </div>

      <div className="stat-card">
        <Droplet size={24} />
        <h3>Successful Matches</h3>
        <p className="stat-number">{matches.length}</p>
      </div>

      <div className="stat-card">
        <UserCheck size={24} />
        <h3>Available Blood Groups</h3>
        <div className="blood-groups">
          {Object.entries(
            donors.reduce((acc, donor) => {
              acc[donor.bloodGroup] = (acc[donor.bloodGroup] || 0) + 1;
              return acc;
            }, {})
          ).map(([group, count]) => (
            <p key={group} className="blood-group-stat">
              {group}: {count} donor{count !== 1 ? 's' : ''}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;