import Permission from "./permission";

interface Token {
  email: string;
  fname: string;
  lname: string;
  pms?: Permission;
}

export default Token;