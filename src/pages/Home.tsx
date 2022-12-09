import React, {ChangeEvent, useEffect, useState} from "react";
import { useAuth } from "../hooks/AuthContext";
import {Button, InputField} from "@/components";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");

	const [formData, setFormData] = useState("");

	useEffect(() => {
		const getGreeting = async () => {
			let newGreeting = "Welcome!";
			setGreeting(newGreeting);
		};
		getGreeting();
	}, [authState.loggedIn]);

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData(e.target.value );
		console.log(JSON.stringify(formData))
	};
	const onClick = () => {
	};

	return (
		<>
			<div className="bg-white p-5 rounded-lg w-fit m-5">{greeting}</div>

			<br/>
			<h3>Test area for stuff, for now</h3>
			<br/><br/>

			<textarea onChange={onChange}/>
		</>

	);
}

export default Home;
