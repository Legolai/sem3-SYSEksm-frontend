import Role from "@/types/entities/role";
import { BASE_API_URL } from "../../settings";
import WeatherNCat from "../types/entities/weatherNCat";


function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject<{ status: string, fullError: {}; }>({ status: res.status, fullError: res.json() });
  }
  return Promise.resolve(res.json() as { [key: string]: any; });
}


function apiFacade() {
  const setToken = (token: string) => {
    sessionStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    const value = sessionStorage.getItem("jwtToken");
    if (value == null) return undefined;
    return value;
  };

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

  function makeOptions<T>(method: string, addToken: boolean, body?: T) {
    method = method ? method : "GET";
    const opts: {
      method: string,
      headers: {
        "Content-type"?: string;
        Accept: string;
        "x-access-token"?: string;
      },
      body?: string;
    } = {
      method: method,
      headers: {
        ...(["PUT", "POST"].includes(method) && {
          "Content-type": "application/json",
        }),
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }


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
