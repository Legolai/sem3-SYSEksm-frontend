
interface SpotMenu {
  id?: number;
  description: string;
  // pictures?: File;
  pictures?: string;
  foodPreferences: string;
  pickupTimeFrom: string;
  pickupTimeTo: string;
  foocleSpotID: number | undefined;
}

export default SpotMenu;
