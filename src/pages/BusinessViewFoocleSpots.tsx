
import { Button, InputField } from "@/components";
import { useValidator } from "@/utils/validationHelper";
import { FocusEvent ,ChangeEvent, FormEvent, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import {useAuth} from "../stores/AuthContext";

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

	useEffect( () => {
		console.log(2);
	}, [])

	const fetchFoocleSpots = async () => {
		console.log(formData)
		// doValidation();

		if (isOk()) {
			try {
				const getFoocleSpots = await API.business.businessGetFoocleSpots(2);
				console.log(getFoocleSpots)
				navigate("/viewFoocleSpots")
			} catch (error: any) {
				const errMsgFull = await error.fullError;
				console.log(errMsgFull.message);
			}
		}
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
						Here's the list of all FoocleSpots for your business,<br/>
						click any of them to see SpotMenus and Requests for that FoocleSpot!
					</h3>

					<div className="flex flex-col border-rose-500 p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
						<h3 className="">
							Supposed to be container with google maps picture
						</h3>
					</div>



				</div>
			</div>
		</div>
	);
};

export default SignUpBusiness;
