import { BASE_API_URL } from "../../settings";
import { getToken, handleHttpErrors, makeOptions, setToken } from "./util.api";

function getBusinessAPI() {


  const login = async (email: string, password: string) => {
    try {
      const options = makeOptions("POST", true, { email, password });
      const res = await fetch(BASE_API_URL + "/login/business", options);
      const data = await handleHttpErrors(res);
      setToken(data.token);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };




  return {
    login,
  };
}

const businessAPI = getBusinessAPI();
export default businessAPI;
