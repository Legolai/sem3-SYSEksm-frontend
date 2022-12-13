
import { useValidator } from "@/utils/validationHelper";
import { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import {useAuth} from "../hooks/AuthContext";
import newScoutRequest, {newScoutRequestMenu} from "@/types/entities/newScoutRequest";
import {Button} from "@/components";


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


	useEffect(() => {
		const load = async () => {
			const data = await API.business.getScoutRequests(Number.parseInt(state.ID));
			setRequests(data);
		};

		load();

		return () => {};
	}, []);

	const Accept = async (request:newScoutRequestMenu) => {
		request.status = "ACCEPTED";
		requests.map((item) => { return item.id == request.id ? request : item})
		await API.business.updateScoutRequestStatus(request.id, "ACCEPTED", request.fooclescoutsID);
	};
	const Reject = async (request:newScoutRequestMenu) => {
		request.status = "DENIED";
		requests.map((item) => { return item.id == request.id ? request : item})
		await API.business.updateScoutRequestStatus(request.id, "DENIED", request.fooclescoutsID);
	};

	return (
		<div className="flex flex-col gap-6 h-full p-8">
			<div className="flex flex-col p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">List of FoocleSpots</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
					)}
					<h3 className="">
						Here's the list of all pending Requests for your business.
					</h3>

					{
						requests.map(request => {
							return (
								<div className="flex flex-row rounded-md shadow-md items-center m-1 gap-8">
									<div>
										{request.id}, {request.message}, {request.status}, {request.spotMenuID}, {request.fooclescoutsID}, {request.createdAt}, {request.updatedAt}
									</div>
									<div className="flex flex-row gap-2">
										<Button onClick={() => {Accept(request)}} >
											Accept
										</Button>
										<Button onClick={() => {Reject(request)}} >
											Reject
										</Button>
									</div>
								</div>
							);
						})
					}

				</div>
			</div>
		</div>
	);
};

export default viewRequests;
