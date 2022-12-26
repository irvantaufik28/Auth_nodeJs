module.exports = {
    verifyMsisdn : (msisdn) =>{
      let newMsisdn = "";
      let msisdnValue = msisdn.split("");
      if (msisdnValue[0] === "0") {
        let msidnSplit = msisdn.split("");
        msidnSplit.splice(0, 1, "62");
        newMsisdn = msidnSplit.join("");
      } else if (msisdnValue[0] !== "6" && msisdnValue[1] !== "2") {
        let msidnSplit = msisdn.split("");
        msidnSplit.splice(0, 0, "62");
        newMsisdn = msidnSplit.join("");
      } else {
        newMsisdn = msisdn;
      }
      return newMsisdn;
    }

}

