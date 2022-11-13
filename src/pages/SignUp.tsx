interface SignUpProps {}

import facade from "@/api/apiFacade";
import { Button, InputField } from "@/components";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initialNewUser } from "../types/entities/newUser";

interface SignUpProps {
	afterSubmit?: () => void;
}

const SignUp = ({ afterSubmit }: SignUpProps) => {
	const [formData, setFormData] = useState(initialNewUser);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(curr => ({ ...curr, [e.target.name]: e.target.value }));
	};

	const onReset = () => {
		setFormData(initialNewUser);
		setAlert("");
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formData.userPass !== formData.confirmPass) {
			setAlert("Repeated Password must be the same!");
			return;
		}

		if (!formData.roleList.includes("user")) formData.roleList.push("user");

		const res = await facade.createUser(
			formData.userName.toLowerCase(),
			formData.userPass,
			formData.roleList
		);

		if (res) navigate("/signin");
		onReset();
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-10 mt-[-50px] shadow-lg gap-5 justify-center bg-white rounded-lg">
				<h2 className="text-2xl font-bold">Create a New Account</h2>
				{alert.length > 0 && (
					<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
				)}
				<form
					onSubmit={onSubmit}
					className="flex flex-col justify-center items-center w-full gap-5"
				>
					<div className="flex flex-col w-full gap-5">
						<InputField
							value={formData.userName}
							onChange={onChange}
							label="Username"
							name="userName"
							type="text"
							required
						/>
						<InputField
							value={formData.userPass}
							onChange={onChange}
							label="Password"
							name="userPass"
							type="password"
							required
						/>
						<InputField
							value={formData.confirmPass}
							onChange={onChange}
							label="Confirm Password"
							name="confirmPass"
							type="password"
							required
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
