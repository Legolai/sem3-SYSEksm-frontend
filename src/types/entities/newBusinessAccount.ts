

interface NewBusinessAccount {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const initialNewBusinessAccount: NewBusinessAccount = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
}

export {initialNewBusinessAccount};
export default NewBusinessAccount;
