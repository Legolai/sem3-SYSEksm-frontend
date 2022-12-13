import { useEffect } from "react";
import { redirect, Route, Routes, useNavigate } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpScout from "./pages/SignUpScout";
import SignUpBusiness from "./pages/SignUpBusiness";
import SignUpBusinessAccount from "./pages/SignUpBusinessAccount";
import CreateFoocleSpot from "@/pages/CreateFoocleSpot";
import User from "./pages/User";
import { useAuth } from "./hooks/AuthContext";
import ViewFoocleSpotPage from "./pages/ViewFoocleSpotPage";
import BusinessViewFoocleSpots from "@/pages/BusinessViewFoocleSpots";
import BusinessViewSpotMenusForFoocleSpot from "@/pages/BusinessViewSpotMenusForFoocleSpot";
import CreateSpotMenu from "./pages/CreateSpotMenu";
import BusinessViewRequests from "@/pages/BusinessViewRequests";
import ScoutHomePage from "./pages/ScoutHomePage";

function App() {
	const { autoLogin, state: authState } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<div className="w-screen h-screen bg-gray-100">
			<Routes>
				<Route path="/" element={<Header />}>
					<Route path="/" element={authState.pms == "FOOCLESCOUT" ? <ScoutHomePage/> : <Home />} />
					<Route
						path="/scout"
						element={<GuardedRoute permissionRequired={"FOOCLESCOUT"} />}
					>
						<Route path="fooclespots" element={<ViewFoocleSpotPage />} />
					</Route>
					<Route
						path="/business"
						element={<GuardedRoute permissionRequired={"BUSINESSACCOUNT"} />}
					>
						<Route path="viewFoocleSpots" element={<BusinessViewFoocleSpots />} />
						<Route
							path="viewSpotMenusForFoocleSpotBA"
							element={<BusinessViewSpotMenusForFoocleSpot />}
						/>
						<Route path="viewRequests" element={<BusinessViewRequests />} />
					</Route>

					<Route path="/createFoocleSpot" element={<CreateFoocleSpot />} />
					<Route
						path="/persons"
						element={<GuardedRoute permissionRequired={"BUSINESSACCOUNT"} />}
					>
						<Route index element={<User />} />
					</Route>
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signup/scout" element={<SignUpScout />} />
					<Route path="/signup/business" element={<SignUpBusiness />} />
					<Route path="/signup/business/account" element={<SignUpBusinessAccount />} />
					<Route path="/business/spotmenu/" element={<CreateSpotMenu />} />

					<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
