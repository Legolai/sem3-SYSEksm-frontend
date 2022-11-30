import { BASE_API_URL } from "../../settings";
import businessAPI from "./apiFoocleBusiness";
import scoutAPI from "./apiFoocleScout";
import { getToken, makeOptions, loggedIn } from "./util.api";

async function validateToken() {
  const token = getToken();
  if (!token) return false;

  const options = makeOptions("HEAD", true);
  const res = await fetch(`${BASE_API_URL}/login/validate`, options);
  return res.ok;
};

function logout() {
  sessionStorage.removeItem("jwtToken");
};

const API = {
  business: businessAPI,
  scout: scoutAPI,
  helpers: {
    validateToken,
    logout,
    getToken,
    loggedIn
  }
};

export default API;