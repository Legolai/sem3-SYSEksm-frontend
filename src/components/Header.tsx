import { Link, Outlet } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NavItem from "./NavItem";
import { useAuth } from "../stores/AuthContext.js";
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
					allowedRoles={["admin"]}
					route={"/persons"}
					icon={"users"}
					label={"Persons"}
				/>
				<NavItem route={"/example-page"} icon={"book"} label={"Example"} />

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
										{state.username.charAt(0).toUpperCase() +
											state.username.substring(1)}
									</p>
								</p>
								<p className="px-4 flex gap-1 justify-center items-center">
									<i className="fa fa-address-card-o"></i>
									<p>
										{"[ " +
											state.roles.map(
												(r, i) =>
													(i > 0 ? " " : "") +
													r.charAt(0).toUpperCase() +
													r.substring(1)
											) +
											" ]"}
									</p>
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
