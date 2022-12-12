
import { BASE_API_URL } from "../../settings";
import { getToken, handleHttpErrors, makeOptions, setToken } from "./util.api";
import newBusinessAccount from "@/types/entities/newBusinessAccount";
import newFoocleSpot from "@/types/entities/newFoocleSpot";
import newScoutRequest from "@/types/entities/newScoutRequest";


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

  const getScoutRequests = async (id: number) => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${BASE_API_URL}/business/${id}/requests`, options);
      const data = await handleHttpErrors(res);
      console.log("Data from endpoint")
      console.log(data)
      return data as newScoutRequest[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }

  const updateScoutRequestStatus = async (id: number, status: string) => {
    try {
      const options = makeOptions("POST", true, {id, status});
      const res = await fetch(`${BASE_API_URL}/business/request`, options);
      await handleHttpErrors(res);
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }


  return {
    login,
    createBusinessAdminAccount,
    createFoocleSpot,
    getScoutRequests,
    updateScoutRequestStatus
  };
}

const businessAPI = getBusinessAPI();
export default businessAPI;
