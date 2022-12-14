

interface NewFoocleSpot {
  businessAccountID?: number;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

const initialNewFoocleSpot: NewFoocleSpot = {
  address: '',
  city: '',
  zipCode: '',
  country: ''
};

export { initialNewFoocleSpot };
export default NewFoocleSpot;
