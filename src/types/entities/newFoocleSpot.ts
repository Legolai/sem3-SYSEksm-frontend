

interface NewFoocleSpot {
  businessAccountID: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

const initialNewFoocleSpot: NewFoocleSpot = {
  businessAccountID: '',
  address: '',
  city: '',
  zipCode: '',
  country: ''
}

export {initialNewFoocleSpot};
export default NewFoocleSpot;
