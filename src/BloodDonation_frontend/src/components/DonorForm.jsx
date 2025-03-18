import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { BloodDonation_backend } from '../../../declarations/BloodDonation_backend';

function DonorForm({ onSubmit }) {
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [bloodGroup, setbloodGroup] = useState("");
    const [weight, setweight] = useState("");
    const [lastDonationDate , setlastDonationDate] = useState("");
    const [contact, setcontact] = useState("");
    const [medicalHistory, setmedicalHistory] = useState("");
    var principal =  localStorage.getItem("principal");
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(principal){
        try {
          var DonorRegistration = {
            name: name,
            age: BigInt(age),
            bloodGroup: bloodGroup,
            weight: weight,
            lastDonationDate: lastDonationDate,
            contact: contact,
            medicalHistory: medicalHistory,
            prin: Principal.fromText(localStorage.getItem("principal")),
          };
          console.log("before register", DonorRegistration);
          var result = await BloodDonation_backend.set_Donor_registration(DonorRegistration);
          console.log("result", result);
        } catch (error) {
          console.log(error);
        }
      }else{
        alert("connect to Internet Identity");
      }
       window.location.reload();
      };


  return (
    <div className="form-container">
      <h2>Register as Blood Donor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={(e) => setage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            id="bloodGroup"
            min="18"
            name="bloodGroup"
            onChange={(e) => setbloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="A+">A+</option>
            <option value="B-">B-</option>
            <option value="B+">B+</option>
            <option value="AB-">AB-</option>
            <option value="AB+">AB+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            onChange={(e) => setweight(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastDonation">Last Donation Date</label>
          <input
            type="date"
            id="lastDonation"
            name="lastDonation"
            onChange={(e) => setlastDonationDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            pattern="[0-9]{10}"
            onChange={(e) => setcontact(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            onChange={(e) => setmedicalHistory(e.target.value)}
            rows="4"
          />
        </div>

        <button type="submit">Register as Donor</button>
      </form>
    </div>
  );
}

export default DonorForm;