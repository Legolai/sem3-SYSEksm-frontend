interface SignUpProps {}

import { Button, InputField } from "@/components";
import { useValidator } from "@/utils/validationHelper";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialNewBusinessAccount } from "../types/entities/newBusinessAccount";
import NewBusiness from "../types/entities/newBusiness";
import {useLocation} from "react-router-dom";
import businessFacade from "../api/apiFoocleBusiness";

interface SignUpProps {
	afterSubmit?: () => void;
}

const SignUpBusinessAccount = ({ afterSubmit }: SignUpProps) => {
	const [formData, setFormData] = useState(initialNewBusinessAccount);
	const businessFromLocation = useLocation();
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const { validationState, isOk, doValidation, getErrorMsg } = useValidator([
		// {
		// 	expression: formData.firstname.trim().length == 0,
		// 	inputName: "firstname",
		// 	msg: "This field is required",
		// },
	]);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(curr => ({ ...curr, [e.target.name]: e.target.value }));
	};

	const onReset = () => {
		setFormData(initialNewBusinessAccount);
		setAlert("");
	};

	useEffect( () => {
		const bizz:NewBusiness = businessFromLocation.state;
		for (const keyName in bizz) {
			setFormData(curr => ({ ...curr, [keyName]: bizz[keyName] }));
		}
	}, [businessFromLocation])

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		console.log(formData)
		e.preventDefault();
		// doValidation();

		if (isOk()) {
			try {
				const createBusiness = await businessFacade.createBusinessAdminAccount(formData);
				navigate("/signin")
			} catch (error: any) {
				const errMsgFull = await error.fullError;
				console.log(errMsgFull.message);
			}
			onReset();
		}
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-10 mt-[-50px] shadow-lg gap-5 justify-center bg-white rounded-lg">
				<h2 className="text-2xl font-bold">Create FoocleBusiness</h2>
				{alert.length > 0 && (
					<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
				)}
				<h3 className="">
					Now we’ll create an associated admin account
				</h3>
				<form
					noValidate
					onSubmit={onSubmit}
					className="flex flex-col justify-center items-center w-full gap-5"
				>
					<div className="flex flex-col w-full gap-5">
						<InputField
							onChange={onChange}
							label="Firstname"
							type="text"
							name="firstname"
							required
							errorMsg={getErrorMsg("firstname")}
						/>
						<InputField
							onChange={onChange}
							label="Lastname"
							type="text"
							name="lastname"
							required
							errorMsg={getErrorMsg("lastname")}
						/>
						<InputField
							onChange={onChange}
							label="Email"
							type="email"
							name="email"
							required
							autoComplete="username"
							errorMsg={getErrorMsg("email")}
						/>
						<InputField
							onChange={onChange}
							label="Phone"
							type="tel"
							name="phone"
							required
							errorMsg={getErrorMsg("phone")}
						/>
						<InputField
							onChange={onChange}
							type="password"
							label="New Password"
							name="password"
							autoComplete="new-password"
							required
							errorMsg={getErrorMsg("confirmPassword")}
						/>
						<InputField
							onChange={onChange}
							type="text"
							label="Description"
							name="description"
							required
							errorMsg={getErrorMsg("description")}
						/>

						{businessFromLocation.state.cvr && <input type="hidden" value={businessFromLocation.state.cvr}/>}
						{businessFromLocation.state.name && <input type="hidden" value={businessFromLocation.state.name}/>}
						{businessFromLocation.state.businessEmail && <input type="hidden" value={businessFromLocation.state.businessEmail}/>}
						{businessFromLocation.state.businessPhone && <input type="hidden" value={businessFromLocation.state.businessPhone}/>}
						{businessFromLocation.state.address && <input type="hidden" value={businessFromLocation.state.address}/>}
						{businessFromLocation.state.city && <input type="hidden" value={businessFromLocation.state.city}/>}
						{businessFromLocation.state.zipCode && <input type="hidden" value={businessFromLocation.state.zipCode}/>}
						{businessFromLocation.state.country && <input type="hidden" value={businessFromLocation.state.country}/>}

					</div>
					<div className="flex w-3/4 gap-5 pt-2">
						<Button outline onClick={ () => { navigate("/signup/business", {state: businessFromLocation.state}) } }> Back </Button>
						<Button type="submit">Create</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpBusinessAccount;
