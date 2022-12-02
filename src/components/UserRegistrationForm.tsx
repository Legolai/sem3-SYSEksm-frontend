import InputField from "./InputField";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import NewUser, { initialNewUser } from "../types/entities/newScoutAccount";

interface UserRegistrationFromProps {
	afterSubmit?: () => void;
}

const UserRegistrationForm = ({ afterSubmit }: UserRegistrationFromProps) => {
	const [formData, setFormData] = useState(initialNewUser);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(curr => {
			return { ...curr, [e.target.name]: e.target.value };
		});
	};

	const onReset = () => {
		setFormData(initialNewUser);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formData.userPass !== formData.confirmPass) {
			alert("Repeated Password must be the same!");
			return;
		}

		// api todo

		onReset();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="flex gap-5">
				<InputField
					value={formData.userName}
					onChange={onChange}
					label="Name"
					name="name"
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
			<div className="flex gap-5 pt-2">
				<Button onClick={onReset} outline type="reset">
					Reset
				</Button>
				<Button type="submit">Create</Button>
			</div>
		</form>
	);
};

export default UserRegistrationForm;
