import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../stores/AuthContext.js";
import { Button, InputField } from "@/components";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SignInProps {
	setErrorMsg?: () => void;
}

function SignIn({ setErrorMsg }: SignInProps) {
	const init = { username: "", password: "" };
	const [loginCredentials, setLoginCredentials] = useState(init);
	const navigate = useNavigate();
	const { login, state: authState } = useAuth();
	const [alert, setAlert] = useState("");

	useEffect(() => {
		authState.loggedIn && navigate("/");
	}, [authState.loggedIn]);

	const performLogin = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		try {
			await login(loginCredentials.username.toLowerCase(), loginCredentials.password);
		} catch (error: any) {
			console.log(error.fullError);
		}
	};

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setLoginCredentials(curr => ({ ...curr, [evt.target.name]: evt.target.value }));
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-10 mt-[-50px] shadow-lg gap-6 justify-center bg-white rounded-lg">
				<h2 className="text-2xl font-bold">Sign in</h2>
				{alert.length > 0 && (
					<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">{alert}</div>
				)}
				<form
					onSubmit={performLogin}
					className="flex flex-col justify-center p-2 items-center gap-3"
				>
					<InputField onChange={onChange} label="Username" type="text" name="username" />{" "}
					<InputField
						onChange={onChange}
						type="password"
						label="Password"
						name="password"
					/>
					<Button className="w-3/4 mt-2" type="submit">
						Sign In
					</Button>
				</form>
				<p>
					New here?
					<Link
						to={"/signup"}
						className={
							"underline m-1 text-green-400 hover:text-green-300 active:scale-95"
						}
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SignIn;
