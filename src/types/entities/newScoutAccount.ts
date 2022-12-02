import User from "./user";

interface NewScoutAccount {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  areaCode: string;
  password: string;
  comfirmPassword: string;
}

const initialNewScoutAccount: NewScoutAccount = {
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  areaCode: '',
  password: '',
  comfirmPassword: ''
};


export { initialNewScoutAccount };
export default NewScoutAccount;