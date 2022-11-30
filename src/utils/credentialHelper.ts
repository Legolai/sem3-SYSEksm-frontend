import Token from "@/types/entities/token";
import facade from "../api/apiFacade";
import Role from "../types/entities/permission";


function decodeJwt() {
  const token = facade.getToken();
  if (!token) return undefined;
  const jwtData = token.split(".")[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData;
}

function getEmail(jwt: { email: string; }) {
  return jwt && jwt.email;
}

function getPermission(jwt: { pms: string; }) {
  if (!jwt || !jwt.pms) return false;
  return jwt.pms as Token["pms"];
}

function getFname(jwt: { fname: string; }) {
  return jwt && jwt.fname;
}

function getLname(jwt: { lname: string; }) {
  return jwt && jwt.lname;
}


function getUserInfo(): Token {
  const jwtData = decodeJwt();
  return {
    email: getEmail(jwtData),
    fname: getFname(jwtData),
    lname: getLname(jwtData),
    pms: getPermission(jwtData) || undefined
  };
}

export {
  getUserInfo
};
