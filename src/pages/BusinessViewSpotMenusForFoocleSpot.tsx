
import { useValidator } from "@/utils/validationHelper";
import { useEffect, useState} from "react";
import API from "@/api";
import {useAuth} from "../hooks/AuthContext";
import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";
import {useLocation} from "react-router-dom";
import newSpotMenu, {initialNewSpotMenu} from "@/types/entities/newSpotMenu";
import CustomMap from "@/components/CustomMap";
import CustomMarker from "@/components/CustomMarker";
import {Button} from "@/components";


const viewSpotMenus = () => {
	const foocleSpotInfo = useLocation();
	const [alert, setAlert] = useState("");
	const { isOk, getErrorMsg } = useValidator([
		// {
		// 	expression: formData.cvr.trim().length == 0,
		// 	inputName: "cvr",
		// 	msg: "This field is required",
		// },
	]);
	const [spotMenus, setSpotMenus] = useState<newSpotMenu[]>([]);


	useEffect(() => {
		console.log(foocleSpotInfo);
		const load = async () => {
			const data = await API.spot.businessGetSpotMenusForSpot(Number.parseInt(foocleSpotInfo.state.id));
			setSpotMenus(data);
		};

		load();
	}, [foocleSpotInfo]);


	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">List of FoocleSpots</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
					)}
					<h3 className="">
						Here's the list of all SpotMenus and Requests for this FoocleSpot<br/>
					</h3>

					{
						spotMenus.map(menu => {
							return (
								<div className="flex flex-row p-2 shadow-lg gap-0 justify-center bg-white rounded-lg">
									<h3 className="">
										{menu.description} {menu.foodPreferences} {menu.pickupTimeFrom} {menu.pickupTimeTo}
									</h3>
								</div>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

export default viewSpotMenus;
