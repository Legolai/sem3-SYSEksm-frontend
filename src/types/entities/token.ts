interface Token {
  email: string;
  fname: string;
  lname: string;
  pms?: "FOOCLESCOUT" | "FOOCLEBUSINESS" | "BUSINESSADMIN";
}

export default Token;