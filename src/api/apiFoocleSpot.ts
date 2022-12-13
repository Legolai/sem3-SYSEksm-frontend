import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";
import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";
import newFoocleSpot from "@/types/entities/newFoocleSpot";
import newSpotMenu from "@/types/entities/newSpotMenu";


function getFoocleSpotAPI() {

  const base_endpoint = `${BASE_API_URL}/spot`;

  const fetchAvailableSpots = async () => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(base_endpoint, options);
      const data = await handleHttpErrors(res);
      return data as FoocleSpotAvailable[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };
  const fetchMenusForAvailableSpot = async (id: number) => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/${id}/menu`, options);
      const data = await handleHttpErrors(res);
      return data as newSpotMenu[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };

  const createFoocleSpot = async ({...props}: newFoocleSpot) => {
    const options = makeOptions("POST", true, {...props});
    const res = await fetch(`${base_endpoint}`, options);
    const data = await handleHttpErrors(res);
    return data;
  }
  const createSpotMenu = async ({...props}: newSpotMenu) => {
    const options = makeOptions("POST", true, {...props});
    const res = await fetch(`${base_endpoint}/spotMenu`, options);
    const data = await handleHttpErrors(res);
    return data;
  }

  const businessGetFoocleSpots = async (businessAccountID: number) => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(`${base_endpoint}/${businessAccountID}/getFoocleSpot`, options);
      const data = await handleHttpErrors(res);
      return data as FoocleSpotAvailable[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }



  return {
    fetchAvailableSpots,
    fetchMenusForAvailableSpot,
    createFoocleSpot,
    createSpotMenu,
    businessGetFoocleSpots
  };
}

const fSpotAPI = getFoocleSpotAPI();
export default fSpotAPI;
