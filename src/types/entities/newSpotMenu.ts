

interface NewSpotMenu {
  id?: number;
  foocleSpotID?: number;
  description: string;
  pictures: string;
  foodPreferences: string;
  pickupTimeFrom: string;
  pickupTimeTo: string;
}

const initialNewSpotMenu: NewSpotMenu = {
  id: 0, foocleSpotID: 0, description: '', pictures: '', foodPreferences: '', pickupTimeFrom: '', pickupTimeTo: ''
}
const initialNewSpotMenuWithID: NewSpotMenu = {
  id: undefined, foocleSpotID: 0, description: '', pictures: '', foodPreferences: '', pickupTimeFrom: '', pickupTimeTo: ''
}

export {initialNewSpotMenu};
export default NewSpotMenu;
