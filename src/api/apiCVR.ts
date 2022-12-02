import {BASE_CVR_URL} from "../../settings";
import NewBusiness from "../types/entities/newBusiness";
import {getToken, handleHttpErrors, makeOptions, setToken} from "./util.api";

function apiCVR() {

  const fetchBizz = async (cvr:string): Promise<any> => {
    const options = makeOptions("GET", false);
    const res = await fetch(BASE_CVR_URL + cvr, options);
    const data = await handleHttpErrors(res);
    const {
        name,
        email,
        phone,
        description,
        address,
        city,
        zipcode,
        country = 'Denmark'
    } = data;

    return {
        cvr: cvr,
        name: name,
        businessEmail: email,
        businessPhone: phone,
        description: description,
        address: address,
        city: city,
        zipCode: zipcode,
        country: country
    } as NewBusiness;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    fetchBizz
  };
}

const facade = apiCVR();
export default facade;
