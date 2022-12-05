import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";
import NewScoutAccount from "@/types/entities/newScoutAccount";;
import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";


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


  return {
    fetchAvailableSpots
  };
}

const fSpotAPI = getFoocleSpotAPI();
export default fSpotAPI;
