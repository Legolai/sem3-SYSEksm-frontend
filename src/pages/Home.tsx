import React, { useEffect, useState } from "react";
import { useAuth } from "../stores/AuthContext";

function Home() {
	const { state: authState } = useAuth();
	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const getGreeting = async () => {
			let newGreeting = "Welcome!";
			setGreeting(newGreeting);
		};
		getGreeting();
	}, [authState.loggedIn]);

	return <div className="bg-white p-5 rounded-lg w-fit m-5">{greeting}</div>;
}

export default Home;
