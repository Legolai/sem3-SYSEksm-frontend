import PerformLoginAction from "@/types/entities/performLoginAction";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

interface TheLoginFormProps {
	performLoginAction: PerformLoginAction;
}

function TheLoginForm({ performLoginAction }: TheLoginFormProps) {
	const init = { email: "", password: "" };
	const [loginCredentials, setLoginCredentials] = useState(init);
	const [doesLogin, setDoesLogin] = useState(false);
	const [alert, setAlert] = useState("");

	const performLogin = async (evt: FormEvent<HTMLFormElement>) => {
		setDoesLogin(true);
		evt.preventDefault();
		await performLoginAction(evt, loginCredentials, setAlert);
		setDoesLogin(false);
	};

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setLoginCredentials(curr => ({ ...curr, [evt.target.name]: evt.target.value }));
	};

	return (
		<>
			{alert.length > 0 && (
				<div className="w-full bg-red-400 text-white text-center rounded-md p-2 px-3">
					{alert}
				</div>
			)}
			<form
				onSubmit={performLogin}
				className="flex flex-col justify-center p-2 items-center gap-3"
			>
				<InputField onChange={onChange} label="Email" type="email" name="email" required />
				<InputField
					onChange={onChange}
					type="password"
					label="Password"
					name="password"
					required
				/>
				<Button disabled={doesLogin} className="w-3/4 mt-10" type="submit">
					Sign In
				</Button>
			</form>
		</>
	);
}

export default TheLoginForm;
