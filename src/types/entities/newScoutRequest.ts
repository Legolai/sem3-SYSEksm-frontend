

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

export {initialnewScoutRequest};
export default newScoutRequest;
