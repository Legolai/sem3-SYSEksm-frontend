
interface newScoutRequest {
  id: number;
  message?: string;
  status: string;
  spotmenuID: number;
  fooclescoutsID: number;
  createdAt: string;
  updatedAt: string;
}
const initialnewScoutRequest: newScoutRequest = {
  id: 0,
  message: "",
  status: "",
  spotmenuID: 0,
  fooclescoutsID: 0,
  createdAt: "",
  updatedAt: ""
}

interface newScoutRequestMenu {
  id: number;
  message?: string;
  status: string;
  fooclescoutsID: number;
  createdAt: string;
  updatedAt: string;

  spotMenuID: number;
  description: string;
  pictures: string;
  foodPreferences: string;
  pickupTimeFrom: string;
  pickupTimeTo: string;
  foocleSpotID: number;
}
const initialnewScoutRequestMenu: newScoutRequestMenu = {
  id: 0,
  message: "",
  status: "",
  fooclescoutsID: 0,
  createdAt: "",
  updatedAt: "",

  spotMenuID: 0,
  description: "",
  pictures: "",
  foodPreferences: "",
  pickupTimeFrom: "",
  pickupTimeTo: "",
  foocleSpotID: 0
}

export {initialnewScoutRequest, initialnewScoutRequestMenu};
export type {newScoutRequestMenu};
export default newScoutRequest;
