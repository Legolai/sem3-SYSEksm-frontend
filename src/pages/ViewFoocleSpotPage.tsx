import API from "@/api";
import CustomMap from "@/components/CustomMap";
import CustomMarker from "@/components/CustomMarker";
import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";
import {MouseEvent, MouseEventHandler, useEffect, useState} from "react";
import {
	faLocationDot,
	faEnvelope,
	faPhone,
	faUserTie,
	faClose,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components";
import newSpotMenu from "@/types/entities/newSpotMenu";
import {useAuth} from "../hooks/AuthContext";

function ViewFoocleSpotPage() {
	const [foocleSpots, setFoocleSpots] = useState<FoocleSpotAvailable[]>([]);
	const [currentSpot, setCurrentSpot] = useState<
		(FoocleSpotAvailable & { menus?: newSpotMenu[] }) | undefined
	>();
	const {state} = useAuth();
	const [currentCenter, setCurrentCenter] = useState<[number, number]>([55.65, 12.55]);

	useEffect(() => {
		const load = async () => {
			const data = await API.spot.fetchAvailableSpots();
			setFoocleSpots(data);
		};

		navigator.geolocation.getCurrentPosition(
			p => setCurrentCenter([p.coords.latitude, p.coords.longitude]),
			e => {}
		);

		load();

		return () => {};
	}, []);

	const selectSpot = async ({
		payload,
	}: {
		payload?: FoocleSpotAvailable & { menus?: newSpotMenu[] };
	}) => {
		const newSpot = payload;
		if (newSpot && newSpot.id) {
			const menus = await API.spot.fetchMenusForAvailableSpot(newSpot.id);
			newSpot.menus = menus;
		}
		setCurrentSpot(newSpot);
	};

	const requestMenu: MouseEventHandler<HTMLButtonElement> = async ( event) => {
		const menuID = currentSpot!.id;
		const scoutID = state.ID;
		const businessAccountID = currentSpot!.contact_id;

		if (menuID && scoutID){
		event.currentTarget.disabled = true;
		event.currentTarget.innerHTML = "Requested";
		await API.scout.RequestMenu(menuID, scoutID, businessAccountID);
		}
	}

	return (
		<div className="relative w-full h-[92%] ">
			<CustomMap
				key={"" + currentCenter[0] + currentCenter[1]}
				newStartCenter={currentCenter}
			>
				{foocleSpots.map(spot => {
					const geo: [number, number] = [
						Number.parseFloat(spot.location.latitude),
						Number.parseFloat(spot.location.longitude),
					];
					return (
						<CustomMarker
							key={"map-" + spot.id}
							hover={spot == currentSpot ? true : undefined}
							onClick={selectSpot}
							foocleSpot={spot}
							width={50}
							anchor={geo}
							color={"#00b295"}
						/>
					);
				})}
			</CustomMap>

			<div
				className={`absolute h-full w-1/2 lg:w-1/4 z-50 left-0 top-0 p-5 bg-transparent pointer-events-none ease-in-out duration-300 ${
					currentSpot ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="bg-white w-full rounded-lg h-full pointer-events-auto p-6 flex flex-col gap-5">
					{currentSpot && (
						<>
							<div className="absolute top-5 right-5 p-4">
								<button
									className="hover:scale-125 active:scale-95 transition-al"
									onClick={() => selectSpot({ payload: undefined })}
								>
									<FontAwesomeIcon icon={faClose} />
								</button>
							</div>
							<h2 className="font-header text-xl border-primary-500 border-b-2">
								{currentSpot.businessName.toUpperCase().charAt(0) +
									currentSpot.businessName.substring(1)}
							</h2>
							<div>
								<h3 className="font-sub-header mb-2 text-lg">Location</h3>
								<p className="text-sm flex gap-4 items-center">
									<FontAwesomeIcon icon={faLocationDot} />
									{currentSpot.location.address +
										", " +
										currentSpot.location.city +
										" " +
										currentSpot.location.zipCode +
										", " +
										currentSpot.location.country}
								</p>
							</div>
							<div>
								<h3 className="font-sub-header mb-2  text-lg">Contact</h3>
								<p className="text-sm flex gap-4 items-center">
									<FontAwesomeIcon icon={faUserTie} />
									{currentSpot.firstname} {currentSpot.lastname}
								</p>
								<p className="text-sm flex gap-4 items-center">
									<FontAwesomeIcon icon={faEnvelope} /> {currentSpot.email}
								</p>
								<p className="text-sm flex gap-4 items-center ">
									<FontAwesomeIcon icon={faPhone} />
									{currentSpot.phoneNumber}
								</p>
							</div>
							<h3 className="font-sub-header text-lg">Menus</h3>
							<div className="flex flex-col gap-4 overflow-y-auto scroll-m-0">
								{currentSpot.menus &&
									currentSpot.menus.map(m => {
										const dateFrom = new Date(m.pickupTimeFrom);
										const dateTo = new Date(m.pickupTimeTo);

										return (
											<div
												key={"menu-" + m.id}
												className="max-h-20 flex rounded-md shadow-md items-center m-1"
											>
												<img
													src={m.pictures}
													className="max-h-20 rounded-l-md"
												/>
												<div className="flex flex-col w-full p-2 gap-2 rounded-r-md">
													<div className="flex gap-4 items-center">
														<FontAwesomeIcon icon={faClock} />
														{dateFrom.getUTCHours() +
															":" +
															dateFrom.getUTCMinutes()}
														-
														{dateTo.getUTCHours() +
															":" +
															dateTo.getUTCMinutes()}
													</div>
													<Button onClick={requestMenu} className="py-1">Request this menu</Button>
												</div>
											</div>
										);
									})}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ViewFoocleSpotPage;
