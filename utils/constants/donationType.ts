export const donationPerson = (donationRatio: number) => {
  if (donationRatio <= 0.5) {
    return "Troop Taker";
  } else if (donationRatio > 0.5 && donationRatio < 1) {
    return "Gifted Reciver";
  } else if (donationRatio >= 1 && donationRatio < 1.5) {
    return "Generous Guardian";
  } else if (donationRatio >= 1.5) {
    return "Donation Dynamo";
  } else {
    return "No data";
  }
};
