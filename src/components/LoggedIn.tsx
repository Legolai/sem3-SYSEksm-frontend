import React, { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import facade from "../api/apiFacade.js";
import { useAuth } from "../stores/AuthContext.js";
import Button from "./Button.js";

function LoggedIn() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const onLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<div>
			<Button outline onClick={onLogout}>Log Out</Button>
		</div>
	);
}

export default LoggedIn;
