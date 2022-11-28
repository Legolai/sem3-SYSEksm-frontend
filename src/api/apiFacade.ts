import Role from "@/types/entities/role";
import { BASE_API_URL } from "../../settings";
import WeatherNCat from "../types/entities/weatherNCat";
import { getToken, handleHttpErrors, makeOptions, setToken } from "./apibase";

function apiFacade() {

  const validateToken = async () => {
    const token = getToken();
    if (!token) return false;

    const options = makeOptions("HEAD", true);
    const res = await fetch(`${BASE_API_URL}/login/validate`, options);
    return res.ok;
  };

  const loggedIn = () => {
    return getToken() != undefined;
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
  };

  const login = async (user: string, password: string) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    const res = await fetch(BASE_API_URL + "/login", options);
    const data = await handleHttpErrors(res);
    setToken(data.token);
    return data;
  };

  const createUser = async (username: string, password: string, roles: Role[]) => {
    const options = makeOptions("POST", true, { username, password, roles });
    const res = await fetch(`${BASE_API_URL}/user`, options);
    const data = await handleHttpErrors(res);
    return data;
  };

  const fetchUserGreeting = async () => {
    const options = makeOptions("GET", true);
    const res = await fetch(BASE_API_URL + "/info/user", options);
    const data = await handleHttpErrors(res);
    return data.msg;
  };

  const fetchAdminGreeting = async () => {
    const options = makeOptions("GET", true);
    const res = await fetch(BASE_API_URL + "/info/admin", options);
    const data = await handleHttpErrors(res);
    return data.msg;
  };

  const fetchWeatherNCat = async (): Promise<WeatherNCat> => {
    const options = makeOptions("GET", true);
    const res = await fetch(BASE_API_URL + "/weatherNcat", options);
    const data = await handleHttpErrors(res);
    return data as WeatherNCat;
  };

  return {
    createUser,
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchUserGreeting,
    fetchAdminGreeting,
    fetchWeatherNCat,
    validateToken,
  };
}

const facade = apiFacade();
export default facade;
