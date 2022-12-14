import { useValidator } from "@/utils/validationHelper";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import { useAuth } from "../hooks/AuthContext";
import newScoutRequest, { newScoutRequestMenu } from "@/types/entities/newScoutRequest";
import { Button } from "@/components";
import TheFoocleScoutLogin from "@/components/TheFoocleScoutLogin";
import TheFoocleBusinessLogin from "@/components/TheFoocleBusinessLogin";
import Tabs from "@/components/Tabs";
import BViewRequestDisplay from "@/components/BViewRequestDisplay";

const viewRequests = () => {
	const { state } = useAuth();
	const [alert, setAlert] = useState("");
	const { isOk, getErrorMsg } = useValidator([
		// {
		// 	expression: formData.cvr.trim().length == 0,
		// 	inputName: "cvr",
		// 	msg: "This field is required",
		// },
	]);
	const [requests, setRequests] = useState<newScoutRequestMenu[]>([]);
	const [allRequests, setAllRequests] = useState<newScoutRequestMenu[]>([]);

	const load = async () => {
		const data = await API.business.getScoutRequests(state.ID!, "relevantRequest");
		setRequests(data);
		const data2 = await API.business.getScoutRequests(state.ID!, "request");
		setAllRequests(data2);
	};
	useEffect(() => {
		load();
		return () => {};
	}, []);

	const Accept = async (request: newScoutRequestMenu) => {
		request.status = "ACCEPTED";
		requests.map(item => {
			return item.id == request.id ? request : item;
		});
		await API.business.updateScoutRequestStatus(request.id, "ACCEPTED", request.fooclescoutsID);
	};
	const Reject = async (request: newScoutRequestMenu) => {
		request.status = "DENIED";
		requests.map(item => {
			return item.id == request.id ? request : item;
		});
		await API.business.updateScoutRequestStatus(request.id, "DENIED", request.fooclescoutsID);
	};

	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">List of FoocleSpots</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">
							{alert}
						</div>
					)}
					<h3 className="">Here's the list of all pending Requests for your business.</h3>
				</div>

				<Tabs
					tabs={[
						{
							name: "Current",
							content: (
								<BViewRequestDisplay
									requests={requests}
									buttonsTrue={true}
									Accept={Accept}
									Reject={Reject}
								/>
							),
						},
						{
							name: "All",
							content: (
								<BViewRequestDisplay
									requests={allRequests}
									buttonsTrue={false}
									Accept={Accept}
									Reject={Reject}
								/>
							),
						},
					]}
				/>
			</div>
		</div>
	);
};

export default viewRequests;
