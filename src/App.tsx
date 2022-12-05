import { useEffect } from "react";
import { redirect, Route, Routes, useNavigate } from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpScout from "./pages/SignUpScout";
import User from "./pages/User";
import { useAuth } from "./stores/AuthContext";
import SignUpBusiness from "./pages/SignUpBusiness";
import SignUpBusinessAccount from "./pages/SignUpBusinessAccount";
import CreateFoocleSpot from "@/pages/CreateFoocleSpot";
import BusinessViewFoocleSpots from "@/pages/BusinessViewFoocleSpots";
function App() {
	const { autoLogin, state: authState } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		autoLogin();
	}, []);

	return (
		<div className="w-screen h-screen bg-gray-100">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/viewFoocleSpots" element={<BusinessViewFoocleSpots />} />
				<Route path="/createFoocleSpot" element={<CreateFoocleSpot />} />
				<Route
					path="/persons"
					element={<GuardedRoute permissionRequired={"BUSINESSACCOUNT"} />}
				>
					<Route index element={<User />} />
				</Route>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signup/scout" element={<SignUpScout />}/>
				<Route path="/signup/business" element={<SignUpBusiness />} />
				<Route path="/signup/business/account" element={<SignUpBusinessAccount />} />

				<Route path="*" element={<h1>404 Page Not Found !!!!</h1>} />
			</Routes>
		</div>
	);
}

export default App;
