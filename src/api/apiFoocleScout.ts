import NewScoutAccount from "@/types/entities/newScoutAccount";
import Role from "@/types/entities/permission";
import { BASE_API_URL } from "../../settings";
import {makeOptions, setToken} from "./apibase";


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

  const login = async (email: string, password: string) => {
    try {
      const options = makeOptions("POST", true, { email, password });
      const res = await fetch(BASE_API_URL + "/login/scout", options);
      const data = await handleHttpErrors(res);
      setToken(data.token);
      return data;
    } catch (error: any) {
      return Promise.reject({ ...error });
    }
  };

  return {
    createScoutAccount,
    login
  };
}

const scoutFacade = apiScoutFacade();
export default scoutFacade;
