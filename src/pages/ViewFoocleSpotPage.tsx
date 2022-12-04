import API from "@/api";
import CustomMap from "@/components/CustomMap";
import CustomMarker from "@/components/CustomMarker";
import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable";
import { useEffect, useState } from "react";
import {
	faLocationDot,
	faEnvelope,
	faPhone,
	faUserTie,
	faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewFoocleSpotPage() {
	const [foocleSpots, setFoocleSpots] = useState<FoocleSpotAvailable[]>([]);
	const [currentSpot, setCurrentSpot] = useState<FoocleSpotAvailable>();

	useEffect(() => {
		const load = async () => {
			const data = await API.spot.fetchAvailableSpots();
			setFoocleSpots(data);
		};

		load();

		return () => {};
	}, []);

	const selectSpot = ({ payload }: { payload?: FoocleSpotAvailable }) => {
		setCurrentSpot(payload);
	};

	return (
		<div className="relative w-full h-[92%] ">
			<CustomMap>
				{foocleSpots.map(spot => {
					const geo: [number, number] = [
						Number.parseFloat(spot.location.latitude),
						Number.parseFloat(spot.location.longitude),
					];
					return (
						<CustomMarker
							hover={spot == currentSpot ? true : undefined}
							onClick={selectSpot}
							foocleSpot={spot}
							key={spot.id}
							width={50}
							anchor={geo}
							color={"#00b295"}
						/>
					);
				})}
			</CustomMap>
			{currentSpot && (
				<div className="absolute h-full w-2/5 lg:w-1/4 z-50 left-0 top-0 bg-transparent pointer-events-none">
					<div className="bg-white w-full h-full pointer-events-auto p-6 flex flex-col gap-5">
						<div className="absolute top-0 right-0 p-4">
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
							<h3 className="font-header mb-2 text-lg">Location</h3>
							<p className="text-sm flex gap-4 items-center">
								<FontAwesomeIcon icon={faLocationDot} />
								{currentSpot.location.address}, {currentSpot.location.city}
								{currentSpot.location.zipCode}, {currentSpot.location.country}
							</p>
						</div>
						<div>
							<h3 className="font-header  mb-2  text-lg">Contact</h3>
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
					</div>
				</div>
			)}
		</div>
	);
}

export default ViewFoocleSpotPage;
