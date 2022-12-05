interface FoocleSpotAvailable {
  id: number,
  contact_id: number,
  email: string,
  phoneNumber: string,
  firstname: string,
  lastname: string,
  cvr: string,
  businessName: string,
  location: {
    id: number,
    address: string,
    city: string,
    zipCode: string,
    country: string,
    longitude: string,
    latitude: string;
  };
}

export default FoocleSpotAvailable;