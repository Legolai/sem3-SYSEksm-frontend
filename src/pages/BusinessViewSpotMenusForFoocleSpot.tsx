
import { useValidator } from "@/utils/validationHelper";
import React, { useEffect, useState} from "react";
import API from "@/api";
import {useLocation, useNavigate} from "react-router-dom";
import newSpotMenu, {initialNewSpotMenu} from "@/types/entities/newSpotMenu";
import {Button} from "@/components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faLocationDot, faCalendar} from "@fortawesome/free-solid-svg-icons";
import useToggle from "@/hooks/useToggle";
import Modal from "@/components/Modal";
import CreateSpotMenu from "@/pages/CreateSpotMenu";

function NewlineText(textIn:string) {
	const text = textIn;
	const newText = text.split('\\n').map(str => <p>{str}</p>);
	return newText;
}
function checkEmptyImg(imgUrl:string) {
	if (imgUrl != "" && imgUrl != undefined) {
		return imgUrl;
	} else {
		return "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
	}
}

const viewSpotMenus = () => {
	const foocleSpotInfo = useLocation();
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const { isOk, getErrorMsg } = useValidator([
		// {
		// 	expression: formData.cvr.trim().length == 0,
		// 	inputName: "cvr",
		// 	msg: "This field is required",
		// },
	]);
	const [spotMenus, setSpotMenus] = useState<newSpotMenu[]>([]);
	const [show, toggle] = useToggle({});

	const load = async () => {
		const data = await API.spot.fetchRelevantMenusForAvailableSpot(Number.parseInt(foocleSpotInfo.state.id));
		setSpotMenus(data);
	};
	useEffect(() => {
		load();
	}, [foocleSpotInfo]);

	const afterSubmit = () => {
		toggle();
		load();
	}

	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<Button outline onClick={() => {navigate("/business/viewFoocleSpots");}}>
						{" "}Back{" "}
					</Button>

					<br/><br/>
					<h2 className="font-header text-3xl">
						{foocleSpotInfo.state.businessName.toUpperCase().charAt(0) +
							foocleSpotInfo.state.businessName.substring(1)}
					</h2>
					<br/>


					<div>
						<h3 className="font-sub-header mb-2 text-2xl">Location</h3>
						<p className="text-xl flex gap-4 items-center">
							<FontAwesomeIcon icon={faLocationDot} />
							{foocleSpotInfo.state.location.address +
								", " +
								foocleSpotInfo.state.location.city +
								" " +
								foocleSpotInfo.state.location.zipCode +
								", " +
								foocleSpotInfo.state.location.country}
						</p>
					</div>
					<br/>

					<div className={`w-1/6`}>
						<Button onClick={toggle}>Create a SpotMenu</Button>
						<Modal isOpen={show} toggle={toggle}>
							<CreateSpotMenu id={foocleSpotInfo.state.id} afterSubmit={afterSubmit}/>
						</Modal>
					</div>

					<h3 className="font-sub-header mb-2 text-2xl">
						List of all SpotMenus for this FoocleSpot:<br/>
					</h3>

					<div className={`flex flex-col p-10 gap-4 grid grid-cols-3 grid-rows-3 justify-center bg-white rounded-lg`}>
						{
							spotMenus.map(menu => {
								const dateFrom = new Date(menu.pickupTimeFrom);
								const dateTo = new Date(menu.pickupTimeTo);
								return (
									<div className="flex flex-col rounded-md shadow-md items-center m-1">
										<div className="flex gap-4">
											<img
												src={checkEmptyImg(menu.pictures)}
												className="w-1/2 rounded-l-md"
											/>
											<div className="flex flex-col self-center gap-4">

												<div className="flex gap-4 items-center">
													<FontAwesomeIcon icon={faCalendar} />
													Date of pickup: {dateTo.getFullYear()}/{dateTo.getUTCMonth()}/{dateTo.getUTCDate()}
												</div>
												<div className="flex gap-4 items-center">
													<FontAwesomeIcon icon={faClock} />
													Time: {dateFrom.getUTCHours() + ":" +
														dateFrom.getUTCMinutes()} - {dateTo.getUTCHours() + ":" + dateTo.getUTCMinutes()}
												</div>
											</div>
										</div>
										<div className="flex flex-col w-full p-2 gap-2 rounded-r-md">
											<div className="flex gap-4 items-center">
												<h3 className="font-sub-header mb-2 text-xl">Description:</h3>
											</div>
											<div className="flex gap-4 items-center">
												<h3 className="font-light mb-2 text-lg">{NewlineText(menu.description)}</h3>
											</div>
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default viewSpotMenus;
