
import { Button, InputField } from "@/components";
import { useValidator } from "@/utils/validationHelper";
import { FocusEvent ,ChangeEvent, FormEvent, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import {useAuth} from "../hooks/AuthContext";
import CustomMarker from "@/components/CustomMarker";
import CustomMap from "@/components/CustomMap";
import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";

interface SignUpProps {
	afterSubmit?: () => void;
}

const SignUpBusiness = ({ afterSubmit }: SignUpProps) => {
	const { state } = useAuth();
	const init = { businessAccountID: state.ID, address: "", city: "", zipCode: "", country: "" };
	const [formData, setFormData] = useState(init);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const { isOk, getErrorMsg } = useValidator([
		// {
		// 	expression: formData.cvr.trim().length == 0,
		// 	inputName: "cvr",
		// 	msg: "This field is required",
		// },
	]);
	const [foocleSpots, setFoocleSpots] = useState<FoocleSpotAvailable[]>([]);


	useEffect(() => {
		const load = async () => {
			const data = await API.spot.businessGetFoocleSpots(Number.parseInt(formData.businessAccountID));
			setFoocleSpots(data);
		};

		load();

		return () => {};
	}, []);


	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">List of FoocleSpots</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
					)}
					<h3 className="">
						Here's the list of all FoocleSpots for your business,<br/>
						click any of them to see SpotMenus and Requests for that FoocleSpot!
					</h3>

					{
						foocleSpots.map(spot => {
							const geo: [number, number] = [
								Number.parseFloat(spot.location.latitude),
								Number.parseFloat(spot.location.longitude),
							];
							return (
								<div className="flex flex-row p-2 shadow-lg gap-0 justify-center bg-white rounded-lg">
									<div className="flex w-3/4 p-2 shadow-lg gap-2 bg-white rounded-lg">
										<CustomMap
											newStartCenter={[Number.parseFloat(spot.location.latitude), Number.parseFloat(spot.location.longitude)]}
									   		newStartZoom={16}
										>
											{
												<CustomMarker
													foocleSpot={spot}
													key={spot.id}
													width={30}
													anchor={geo}
													color={"#00b295"}
												/>
											}
										</CustomMap>
									</div>
									<div className="flex w-full flex-col border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">
										<h3 className="">
											{spot.location.address} {spot.location.zipCode} {spot.location.city}
										</h3>
									</div>
								</div>
							);
						})
					}

					{/*<div className="flex flex-row border-rose-500 p-4 shadow-lg gap-5 justify-center bg-white rounded-lg">*/}
					{/*	<div className="flex border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">*/}
					{/*		<CustomMap>*/}
					{/*			{foocleSpots.map(spot => {*/}
					{/*				const geo: [number, number] = [*/}
					{/*					Number.parseFloat(spot.location.latitude),*/}
					{/*					Number.parseFloat(spot.location.longitude),*/}
					{/*				];*/}
					{/*				return (*/}
					{/*					<CustomMarker*/}
					{/*						hover={spot == currentSpot ? true : undefined}*/}
					{/*						onClick={selectSpot}*/}
					{/*						foocleSpot={spot}*/}
					{/*						key={spot.id}*/}
					{/*						width={50}*/}
					{/*						anchor={geo}*/}
					{/*						color={"#00b295"}*/}
					{/*					/>*/}
					{/*				);*/}
					{/*			})}*/}
					{/*		</CustomMap>*/}
					{/*	</div>*/}
					{/*	<div className="flex w-full flex-col border-rose-500 p-10 shadow-lg gap-5 bg-white rounded-lg">*/}
					{/*		<h3 className="">*/}
					{/*			Supposed to be FoocleSpot info*/}
					{/*		</h3>*/}
					{/*	</div>*/}
					{/*</div>*/}


				</div>
			</div>
		</div>
	);
};

export default SignUpBusiness;
