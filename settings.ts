const loc = document.location;
let api_loc = "https://paperrolle.site/sem3-syseksm-backend/api";
if (loc.href.includes("localhost") || loc.href.includes("127.0.0.1")) api_loc = "http://localhost:8080/api";

const BASE_CVR_URL = "https://cvrapi.dk/api?country=dk&vat=" as const;
const BASE_API_URL = api_loc;
// const BASE_API_URL = "http://localhost:8080/api";
export {
  BASE_API_URL, BASE_CVR_URL
};
