import User from "./user";

interface NewBusiness {
  cvr: string;
  name: string;
  businessEmail: string;
  businessPhone: string;
  description: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

const initialNewBusiness: NewBusiness = {
  cvr: '',
  name: '',
  businessEmail: '',
  businessPhone: '',
  description: '',
  address: '',
  city: '',
  zipCode: '',
  country: ''
};


export {initialNewBusiness};
export default NewBusiness;
