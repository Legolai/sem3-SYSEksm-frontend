import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../stores/AuthContext.js";
import { Button, InputField } from "@/components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tabs from "@/components/Tabs.js";
import TheFoocleScoutLogin from "@/components/TheFoocleScoutLogin.js";
import TheFoocleBusinessLogin from "../components/TheFoocleBusinessLogin";

interface SignInProps {
	setErrorMsg?: () => void;
}

function SignIn({ setErrorMsg }: SignInProps) {
	const { login, state: authState } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		authState.loggedIn && navigate("/");
	}, [authState.loggedIn]);

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-16 py-10 mt-[-50px] shadow-lg justify-center bg-white rounded-lg">
				<h2 className="text-2xl font-bold">Welcome back</h2>
				<Tabs
					tabs={[
						{
							name: "FoocleScout",
							content: TheFoocleScoutLogin(),
						},
						{
							name: "FoocleBusiness",
							content: TheFoocleBusinessLogin(),
						},
					]}
				/>

				<p className="mt-6">
					New here?
					<Link
						to={"/signup"}
						className={
							"underline m-1 text-primary-500 hover:text-primary-400 active:scale-95"
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
