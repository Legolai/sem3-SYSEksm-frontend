import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Permission from "../types/entities/permission";

interface NavItemProps {
	label: string;
	icon: string;
	route: string;
	end?: boolean;
	permissionRequired?: Permission;
}

function NavItem({ label, icon, route, end, permissionRequired }: NavItemProps) {
	const { hasAccessRights } = useAuth();
	const auth = !permissionRequired || hasAccessRights(permissionRequired);
	return auth ? (
		<NavLink
			end={end}
			className={active =>
				`${
					active.isActive
						? "border-primary-500"
						: " border-white hover:scale-105 active:scale-95"
				} transition-all border-b-[3px] px-4 flex gap-2 m-1 justify-center items-center`
			}
			to={route}
		>
			<i className={`fa fa-fw fa-${icon}`} />
			<p>{label}</p>
		</NavLink>
	) : (
		<></>
	);
}

export type { NavItemProps };
export default NavItem;
