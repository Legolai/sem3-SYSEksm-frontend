import { Link, Outlet } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NavItem from "./NavItem";
import { useAuth } from "../hooks/AuthContext.js";
import Logo from "./Logo";

interface HeaderProps {
	setErrorMsg?: () => void;
}

function Header({ setErrorMsg }: HeaderProps) {
	const { state } = useAuth();

	return (
		<>
			<nav className="w-full flex shadow-lg p-2  bg-white h-[60px] gap-2">
				<Logo />
				<NavItem route={"/"} icon={"home"} label={"Home"} end />
				<NavItem
					// permissionRequired={"BUSINESSACCOUNT"}
					route={"/viewFoocleSpots"}
					icon={"fa-solid fa-location-pin"}
					label={"View FoocleSpots"}
				/>
				<NavItem
					permissionRequired={"BUSINESSADMIN"}
					route={"/createFoocleSpot"}
					icon={"location-plus"}
					label={"Create a FoocleSpot"}
				/>
				<NavItem
					permissionRequired={"BUSINESSACCOUNT"}
					route={"/persons"}
					icon={"users"}
					label={"Persons"}
				/>
				<NavItem
					permissionRequired={"FOOCLESCOUT"}
					route={"/scout/fooclespots"}
					icon={"map"}
					label={"Map"}
				/>

				<div className="ml-auto mr-2 flex items-center gap-2 justify-center">
					{!state.loggedIn ? (
						<>
							<Link
								to={"/signin"}
								className="px-4 py-2 text-green-400 rounded-lg hover:scale-105 active:scale-95"
							>
								Sign In
							</Link>
							<Link
								to={"/signup"}
								className="text-white px-4 py-2 bg-green-400 rounded-lg hover:scale-105 active:scale-95"
							>
								Sign Up
							</Link>
						</>
					) : (
						<>
							<div>
								<p className="px-4 flex gap-1 justify-center items-center">
									<i className="fa fa-fw fa-user"></i>
									<p>
										{state.fname.charAt(0).toUpperCase() +
											state.fname.substring(1) +
											" " +
											state.lname}
									</p>
								</p>
								<p className="px-4 flex gap-1 justify-center items-center">
									<i className="fa fa-address-card-o"></i>
									<p>{state.pms}</p>
								</p>
							</div>
							<LoggedIn />
						</>
					)}
				</div>
			</nav>
		</>
	);
}

export default Header;
