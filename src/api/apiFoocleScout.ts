import NewScoutAccount from "@/types/entities/newScoutAccount";;
import { BASE_API_URL } from "../../settings";
import { handleHttpErrors, makeOptions, setToken } from "./util.api";


function getScoutAPI() {

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

const scoutAPI = getScoutAPI();
export default scoutAPI;
