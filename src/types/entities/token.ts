import Permission from "./permission";

interface Token {
  ID: string;
  email: string;
  fname: string;
  lname: string;
  pms?: Permission;
}

export default Token;