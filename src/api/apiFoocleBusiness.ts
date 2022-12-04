
import { BASE_API_URL } from "../../settings";
import { getToken, handleHttpErrors, makeOptions, setToken } from "./util.api";
import newBusinessAccount from "@/types/entities/newBusinessAccount";
import newFoocleSpot from "@/types/entities/newFoocleSpot";


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

  const createBusinessAdminAccount = async ({...props}: Omit<newBusinessAccount, "password">) => {
    const options = makeOptions("POST", true, {...props});
    const res = await fetch(`${BASE_API_URL}/business`, options);
    const data = await handleHttpErrors(res);
    return data;
  };

  const createFoocleSpot = async ({...props}: newFoocleSpot) => {
    const options = makeOptions("POST", true, {...props});
    const res = await fetch(`${BASE_API_URL}/business/foocleSpot`, options);
    const data = await handleHttpErrors(res);
    return data;
  }




  return {
    login,
    createBusinessAdminAccount,
    createFoocleSpot
  };
}

const businessAPI = getBusinessAPI();
export default businessAPI;
