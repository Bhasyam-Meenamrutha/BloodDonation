import React from 'react';

function MatchResults({ matches }) {
  if (matches.length === 0) {
    return (
      <div className="form-container">
        <h2>Blood Donation Matches</h2>
        <p>No matches found yet.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Blood Donation Matches</h2>
      <div className="results">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <h3>Match Found!</h3>
            <div className="match-details">
              <div className="recipient-details">
                <h4>Recipient Details:</h4>
                <p>Patient: {match.recipient.name}</p>
                <p>Blood Group Needed: {match.recipient.reqbloodGroup}</p>
                <p>Units Required: {match.recipient.units.toString()}</p>
                <p>Urgency: {match.recipient.urgencyLevel}</p>
                <p>Hospital: {match.recipient.hospitalName}</p>
              </div>
              <div className="donor-list">
                <h4>Compatible Donors:</h4>
                {match.compatibleDonors.map((donor, idx) => (
                  <div key={idx} className="donor-details">
                    <p>Name: {donor.name}</p>
                    <p>Blood Group: {donor.bloodGroup}</p>
                    <p>Contact: {donor.contact}</p>
                    <p>Last Donation: {donor.lastDonationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MatchResults;