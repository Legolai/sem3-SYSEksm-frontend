import { BASE_API_URL } from "../../settings";
import businessAPI from "./apiFoocleBusiness";
import scoutAPI from "./apiFoocleScout";
import fSpotAPI from "./apiFoocleSpot";
import { getToken, makeOptions, loggedIn } from "./util.api";

async function validateToken() {
  const token = getToken();
  if (!token) return false;

  const options = makeOptions("HEAD", true);
  const res = await fetch(`${BASE_API_URL}/login/validate`, options);
  return res.ok;
};

function logout() {
  localStorage.removeItem("jwtToken");
};

const API = {
  business: businessAPI,
  scout: scoutAPI,
  spot: fSpotAPI,
  helpers: {
    validateToken,
    logout,
    getToken,
    loggedIn
  }
};

export default API;