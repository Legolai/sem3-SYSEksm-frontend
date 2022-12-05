
import { Button, InputField } from "@/components";
import { useValidator } from "@/utils/validationHelper";
import { FocusEvent ,ChangeEvent, FormEvent, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import {useAuth} from "../stores/AuthContext";

interface SignUpProps {
	afterSubmit?: () => void;
}

const createFoocleSpot = ({ afterSubmit }: SignUpProps) => {
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


	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((curr: any) => ({...curr, [e.target.name]: e.target.value}));
	};

	const onReset = () => {
		setFormData(init);
		setAlert("");
		const inputs = document.querySelectorAll(`input`);
		inputs.forEach(input => input.disabled = false)
		navigate("/createFoocleSpot", {replace: true});
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		console.log(formData)
		e.preventDefault();
		// doValidation();

		if (isOk()) {
			try {
				const createFoocleSpot = await API.business.createFoocleSpot(formData);
				console.log(createFoocleSpot)
				navigate("/createFoocleSpot")
			} catch (error: any) {
				const errMsgFull = await error.fullError;
				console.log(errMsgFull.message);
			}
			onReset();
		}
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full pt-32">
			<div className="flex flex-col items-center p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">Create a FoocleSpot</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
					)}
					<h3 className="">
						Enter the location of your FoocleSpot!
					</h3>
					<form
						noValidate
						onSubmit={onSubmit}
						className="flex flex-col justify-center items-center w-full gap-5"
					>
						<div className="flex flex-col w-full gap-5">
							<InputField
								onChange={onChange}
								type="text"
								label="Address"
								name="address"
								required
								errorMsg={getErrorMsg("address")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="City"
								name="city"
								required
								errorMsg={getErrorMsg("city")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="ZipCode"
								name="zipCode"
								required
								errorMsg={getErrorMsg("zipCode")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="Country"
								name="country"
								required
								errorMsg={getErrorMsg("country")}
							/>
						</div>
						<div className="flex w-3/4 gap-5 pt-2">
							<Button
								onClick={onReset}
								className="hover:bg-primary-500 hover:text-white"
								type="reset"
								outline
							>
								Reset
							</Button>
							<Button type="submit">Create</Button>
							{/*<Button type="submit">Create</Button>*/}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default createFoocleSpot;
