import React, {ChangeEvent, useEffect, useState} from "react";
import { useAuth } from "../hooks/AuthContext";
import {Button, InputField} from "@/components";
import Modal from "@/components/Modal";
import CreateSpotMenu from "@/pages/CreateSpotMenu";
import useToggle from "@/hooks/useToggle";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");
	const [formData, setFormData] = useState("");
	const [show, toggle] = useToggle({});

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

	return (
		<>
			<div className="bg-white p-5 rounded-lg w-fit m-5">{greeting}</div>

			<br/>
			<h3>Test area for stuff, for now</h3>
			<br/><br/>

			<div className="bg-white p-5 rounded-lg w-fit m-5">Test for modal
				<Button onClick={toggle}>Open Modal</Button>
				<Modal isOpen={show} toggle={toggle}>
					<CreateSpotMenu/>
				</Modal>
			</div>
		</>

	);
}

export default Home;
