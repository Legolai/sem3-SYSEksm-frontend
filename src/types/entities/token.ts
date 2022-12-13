import Permission from "./permission";

interface Token {
  ID: number;
  email: string;
  fname: string;
  lname: string;
  pms?: Permission;
}

export default Token;
