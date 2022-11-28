interface SignUpProps {}

import facade from "@/api/apiFoocleScout";
import { Button, InputField } from "@/components";
import { useValidator } from "@/utils/validationHelper";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialNewScoutAccount } from "../types/entities/newScoutAccount";

interface SignUpProps {
	afterSubmit?: () => void;
}

const SignUp = ({ afterSubmit }: SignUpProps) => {
	const [formData, setFormData] = useState(initialNewScoutAccount);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const { validationState, isOk, doValidation, getErrorMsg } = useValidator([
		{
			expression: formData.firstname.trim().length == 0,
			inputName: "firstname",
			msg: "This field is required",
		},
	]);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(curr => ({ ...curr, [e.target.name]: e.target.value }));
	};

	const onReset = () => {
		// setFormData(initialNewScoutAccount);
		setAlert("");
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// doValidation();

		if (isOk()) {
			setFormData(curr => ({ ...curr, areaCode: "+45" }));
			await facade.createScoutAccount(formData);
			onReset();
		}
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-10 mt-[-50px] shadow-lg gap-5 justify-center bg-white rounded-lg">
				<h2 className="text-2xl font-bold">Become a FoocleScout</h2>
				{alert.length > 0 && (
					<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
				)}
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
							label="Password"
							name="password"
							required
							errorMsg={getErrorMsg("password")}
						/>
						<InputField
							onChange={onChange}
							type="password"
							label="Confirm Password"
							name="confirmPassword"
							required
							errorMsg={getErrorMsg("confirmPassword")}
						/>
					</div>
					<div className="flex w-3/4 gap-5 pt-2">
						<Button onClick={onReset} outline type="reset">
							Reset
						</Button>
						<Button type="submit">Create</Button>
					</div>
				</form>
				<p>
					Already have a account?
					<Link
						to={"/signin"}
						className={
							"underline m-1 text-green-400 hover:text-green-300 active:scale-95"
						}
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
