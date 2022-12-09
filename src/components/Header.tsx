import { Link } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NavItem from "./NavItem";
import { useAuth } from "../hooks/AuthContext.js";
import Logo from "./Logo";
import { useNotification } from "@/hooks/NotificationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import useToggle from "@/hooks/useToggle";

interface HeaderProps {
	setErrorMsg?: () => void;
}

function Header({ setErrorMsg }: HeaderProps) {
	const { state } = useAuth();
	const { state: notifyState } = useNotification();
	const [show, toggle] = useToggle({});
	return (
		<>
			<nav className="w-full flex shadow-lg p-2  bg-white h-[60px] gap-2">
				<Logo />
				<NavItem route={"/"} icon={"home"} label={"Home"} end />
				<NavItem
					permissionRequired={"BUSINESSADMIN"}
					route={"/createFoocleSpot"}
					icon={"map-location-dot"}
					label={"Create a FoocleSpot"}
				/>
				<NavItem
					permissionRequired={"BUSINESSACCOUNT"}
					route={"/persons"}
					icon={"users"}
					label={"Persons"}
				/>
				<NavItem
					permissionRequired={"BUSINESSACCOUNT"}
					route={"/business/spotmenu/"}
					icon={"cutlery"}
					label={"Add Spotmenu"}
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
							<div className="flex items-center ">
								<div className="relative">
									<div
										onClick={toggle}
										className="p-2 hover:shadow-lg transition-shadow rounded-md active:scale-95"
									>
										<div className="relative">
											<FontAwesomeIcon icon={faEnvelope} size="xl" />
											<div className="absolute -top-1 -right-2">
												<span className="flex h-4 w-4">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
													<span className="relative inline-flex text-[0.625rem] rounded-full h-4 w-4 bg-danger justify-center items-end text-white">
														{notifyState.notifications.length}
													</span>
												</span>
											</div>
										</div>
									</div>
									<div
										className={`max-h-16 w-max absolute ease-in-out duration-300 p-1 -bottom-14 -left-28 overflow-y-scroll rounded-md bg-primary-500 shadow-lg ${
											show
												? "translate-y-0 visible opacity-100"
												: "opacity-0 invisible"
										}`}
									>
										<div>
											{notifyState.notifications.map(n => {
												return (
													<div
														key={n.id}
														className="bg-white flex gap-2 items-center text-sm p-2 rounded-md"
													>
														<p className="font-semibold text-sm text-primary-500 font-header">
															NEW
														</p>
														{n.message}
													</div>
												);
											})}
										</div>
									</div>
								</div>
								<div>
									<div className="px-4 flex gap-1 justify-center items-center">
										<i className="fa fa-fw fa-user"></i>
										<p>
											{state.fname.charAt(0).toUpperCase() +
												state.fname.substring(1) +
												" " +
												state.lname}
										</p>
									</div>
									<div className="px-4 flex gap-1 justify-center items-center">
										<i className="fa fa-address-card-o"></i>
										<p>{state.pms}</p>
									</div>
								</div>
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
