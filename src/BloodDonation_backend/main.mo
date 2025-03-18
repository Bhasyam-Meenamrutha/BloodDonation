import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Int "mo:base/Int";

actor {
      var id:Int = 0;

    public type DonorRegistrations = {
    name:Text;
    age:Nat64;
    bloodGroup:Text;
    weight:Text;
    lastDonationDate : Text;
    contact:Text;
    medicalHistory:Text;
    prin:Principal;
  };
 
public type DonorRegistration = {
     name:Text;
    age:Nat64;
    bloodGroup:Text;
    weight:Text;
    lastDonationDate : Text;
    contact:Text;
    medicalHistory:Text;
    prin:Principal;
    don_id:Int;
  };


  var DonorReg = HashMap.HashMap<Int , DonorRegistration>(0 , Int.equal , Int.hash);

  public func set_Donor_registration(details:DonorRegistrations):async Text{
     var newDonorRegistration = {
        name  = details.name;
        age = details.age;
        bloodGroup = details.bloodGroup;
        weight = details.weight;
        lastDonationDate = details.lastDonationDate;
        contact = details.contact;
        medicalHistory = details.medicalHistory;
        prin = details.prin;
        don_id = id;
     };
    DonorReg.put(id , newDonorRegistration);
    id:= id+1;
    return "successfully registered";
    };

    public shared query func get_Donor_Registrations(prin: Principal) : async [DonorRegistration] {
      var donors: [DonorRegistration] = []; 
    
      for ((_, donor) in DonorReg.entries()) {
          if (donor.prin == prin) {
              donors := Array.append<DonorRegistration>(donors, [donor]);
          };
      };
    
    return donors;
};

public shared query func get_Donors_size(): async Nat {
    return DonorReg.size(); 
};

public shared query func get_all_Donors(): async [DonorRegistration] {
    return Iter.toArray(DonorReg.vals());
};


  
public type RecipientRegistrations = {
    name:Text;
    age:Nat64;
    reqbloodGroup:Text;
    units:Nat64;
    urgencyLevel:Text;
    hospitalName:Text;
    contact:Text;
    reasonForReq:Text;
    prin:Principal;

  };
public type RecipientRegistration = {
    name:Text;
    age:Nat64;
    reqbloodGroup:Text;
    units:Nat64;
    urgencyLevel:Text;
    hospitalName:Text;
    contact:Text;
    reasonForReq:Text;
    prin:Principal;
    rep_id:Int;
  };

    var RecipientReg = HashMap.HashMap<Int , RecipientRegistration>(0 , Int.equal , Int.hash);

    public func set_Recipient_registration(details:RecipientRegistrations):async Text{
        var newRecipientRegistration ={
            name = details.name;
            age= details.age;
            reqbloodGroup=details.reqbloodGroup;
            units= details.units;
            urgencyLevel= details.urgencyLevel;
            hospitalName= details.hospitalName;
            contact= details.contact;
            reasonForReq= details.reasonForReq;
            prin= details.prin;
            rep_id=id;
        };
        RecipientReg.put(id , newRecipientRegistration);
    id:= id+1;
    return "successfully registered";
    };

public shared query func get_Recipient_Registration(prin:Principal) : async [RecipientRegistration] {
        var Recipients: [RecipientRegistration] = []; 
    
    for ((_, Recipient) in RecipientReg.entries()) {
        if (Recipient.prin == prin) {
            Recipients := Array.append<RecipientRegistration>(Recipients, [Recipient]);
        };
    };
    
    return Recipients;
};

public shared query func get_Recipient_size(): async Nat {
    return RecipientReg.size(); 
};

public shared query func get_all_Recipient(): async [RecipientRegistration] {
    return Iter.toArray(RecipientReg.vals());
};

}