import NewScoutAccount from "@/types/entities/newScoutAccount";
import Role from "@/types/entities/role";
import { BASE_API_URL } from "../../settings";
import WeatherNCat from "../types/entities/weatherNCat";
import { makeOptions } from "./apibase";


function handleHttpErrors(res: Response) {
  if (!res.ok) {
    return Promise.reject<{ status: string, fullError: {}; }>({ status: res.status, fullError: res.json() });
  }
  return Promise.resolve(res.json() as { [key: string]: any; });
}


function apiScoutFacade() {

  const createScoutAccount = async ({ ...props }: Omit<NewScoutAccount, "confirmPassword">) => {
    const options = makeOptions("POST", true, { ...props });
    const res = await fetch(`${BASE_API_URL}/scout`, options);
    const data = await handleHttpErrors(res);
    return data;
  };



  return {
    createScoutAccount

  };
}

const facade = apiScoutFacade();
export default facade;
