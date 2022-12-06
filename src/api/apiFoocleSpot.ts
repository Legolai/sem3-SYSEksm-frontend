import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";
import NewScoutAccount from "@/types/entities/newScoutAccount";;
import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";
import newFoocleSpot from "@/types/entities/newFoocleSpot";


function getFoocleSpotAPI() {

  const base_endpoint = `${BASE_API_URL}/spot`;

  const fetchAvailableSpots = async () => {
    try {
      const options = makeOptions("GET", true);
      const res = await fetch(base_endpoint, options);
      const data = await handleHttpErrors(res);
      console.log("data:")
      console.log(data)
      return data as FoocleSpotAvailable[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };

  const createFoocleSpot = async ({...props}: newFoocleSpot) => {
    const options = makeOptions("POST", true, {...props});
    const res = await fetch(`${base_endpoint}/foocleSpot`, options);
    const data = await handleHttpErrors(res);
    return data;
  }

  const businessGetFoocleSpots = async (businessAccountID: number) => {
    try {
      const options = makeOptions("POST", true, {businessAccountID});
      const res = await fetch(`${base_endpoint}/getFoocleSpot`, options);
      const data = await handleHttpErrors(res);
      console.log("data:")
      console.log(data)
      return data as FoocleSpotAvailable[];
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  }


  return {
    fetchAvailableSpots,
    createFoocleSpot,
    businessGetFoocleSpots
  };
}

const fSpotAPI = getFoocleSpotAPI();
export default fSpotAPI;
