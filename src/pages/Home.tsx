import React, {ChangeEvent, useEffect, useState} from "react";
import { useAuth } from "../hooks/AuthContext";
import {Button, InputField} from "@/components";
import Modal from "@/components/Modal";
import CreateSpotMenu from "@/pages/CreateSpotMenu";
import useToggle from "@/hooks/useToggle";
import Lottie from "lottie-react";
import animation from "../assets/location.json"

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
	};

	return (
		<div className="flex justify-center items-center flex-col relative">
			<h1 className="bg-white p-5 rounded-lg w-fit m-5 mt-28 text-6xl antialiased font-bold animated fadeInDown ">{greeting}</h1>
			<div className="text-center animated delay-2s fadeIn">
				<p className="bg-white p-5 my-5 antialiased font-bold rounded-lg text-3xl animated delay-2s fadeInUp">Save the Food, prolong the Cycle of life - join Foocle</p>
				<p className="bg-white p-5 my-5 antialiased font-bold rounded-lg text-3xl animated delay-3s fadeInUp">At Foocle we aim to reduce food wasted by offering exquisite food</p>
				<p className="bg-white p-5 my-5 antialiased font-bold rounded-lg text-3xl animated delay-4s fadeInUp">Get free food - Save $$ on your bills - help saving the planet </p>
			</div>
			<Lottie className="absolute top-1/2 w-full h-full animated delay-2s zoomOutUp" animationData={animation} loop={false}/>

		</div>

	);
}

export default Home;
