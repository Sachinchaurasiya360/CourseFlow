function GenerateOtp() {
  const currentOtp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000); //Can be imporved by doing min max
  console.log(`Otp has been generated ${currentOtp}`);
  return currentOtp;
}
module.exports = { GenerateOtp };
