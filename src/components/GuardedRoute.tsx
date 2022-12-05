import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";
import { useAuth } from "../hooks/AuthContext";
import Permission from "../types/entities/permission";

interface GuardedRouteProps {
	permissionRequired: Permission;
	refresh?: any;
}

function GuardedRoute({ permissionRequired, refresh }: GuardedRouteProps) {
	const [auth, setAuth] = useState(false);
	const { state, hasAccessRightsWithRevalidate } = useAuth();

	useEffect(() => {
		const validate = async () => {
			const allowed = await hasAccessRightsWithRevalidate(permissionRequired);
			setAuth(allowed);
		};
		validate();
		return () => {};
	}, [state.loggedIn, refresh]);

	return auth ? <Outlet /> : <Unauthorized />;
}

export default GuardedRoute;
