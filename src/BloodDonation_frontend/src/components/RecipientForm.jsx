import React, { useState } from 'react';
import { Principal } from '@dfinity/principal';
import { BloodDonation_backend } from '../../../declarations/BloodDonation_backend';


  const RecipientForm = () => {
    const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [reqbloodGroup, setreqbloodGroup] = useState("");
    const [units, setunits] = useState("");
    const [hospitalName, sethospitalName]= useState("");
    const [urgencyLevel, seturgencyLevel] = useState("");
    const [contact, setcontact] = useState("");
    const [reasonForReq, setreasonForReq] = useState("");
    var principal =  localStorage.getItem("principal");
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if(principal){
        var RecipientRegistration = {
          name: name,
          age: BigInt(age),
          reqbloodGroup: reqbloodGroup,
          units: BigInt(units),
          hospitalName:hospitalName,
          urgencyLevel : urgencyLevel,
          contact: contact,
          reasonForReq: reasonForReq,
          prin: Principal.fromText(localStorage.getItem("principal")),
        };
        console.log("before register", RecipientRegistration);
        var result = await BloodDonation_backend.set_Recipient_registration(RecipientRegistration);
        console.log("result", result);
      } else{
        alert("connect to Internet Identity");
      };
    }
      catch (error) {
        console.log(error);
    };
     window.location.reload();
  }

  return (
    <div className="form-container">
      <h2>Request Blood</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Patient Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Patient Age</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={(e) => setage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Required Blood Group</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            onChange={(e) => setreqbloodGroup(e.target.value)}
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
          <label htmlFor="units">Units Required</label>
          <input
            type="number"
            id="units"
            name="units"
            onChange={(e) => setunits(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            name="urgency"
            onChange={(e) => seturgencyLevel(e.target.value)}
            required
          >
            <option value="">Select Urgency</option>
            <option value="immediate">Immediate</option>
            <option value="urgent">Urgent (Within 24 hours)</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hospital">Hospital Name</label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            onChange={(e) => sethospitalName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            onChange={(e) => setcontact(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Requirement</label>
          <textarea
            id="reason"
            name="reason"
            onChange={(e) => setreasonForReq(e.target.value)}
            rows="4"
            required
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default RecipientForm;