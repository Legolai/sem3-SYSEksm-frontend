import { handleHttpErrors, makeOptions } from "@/api/util.api";
import NotificationType from "@/types/entities/notificationType";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { BASE_API_URL } from "../../settings";
import { useAuth } from "./AuthContext";
type Dispatch = (action: Action) => void;
type Action = {
	type: "update";
	[key: string]: any;
};

type State = {
	notifications: NotificationType[];
};

type ProviderProps = { children: React.ReactNode };

interface NotificationContextProps {
	state: State;
	dispatch: Dispatch;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

function notificationReducer(state: State, action: Action): State {
	switch (action.type) {
		case "update": {
			const newState = { notifications: action["notifications"] };

			return { ...state, ...newState };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function NotificationProvider({ children }: ProviderProps) {
	const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

function useNotification() {
	const context = useContext(NotificationContext);

	if (context === undefined) {
		throw new Error("useNotification must be used within a NotificationProvider");
	}

	const { state: authState, revalidate } = useAuth();

	const pollingRate = 60_000;

	useEffect(() => {
		const controller = new AbortController();

		const fetchNotifications = async () => {
			try {
				const options = makeOptions("GET", true);
				const res = await fetch(`${BASE_API_URL}/notification`, {
					...options,
					signal: controller.signal,
				});
				const data = await handleHttpErrors(res);
				context.dispatch({ type: "update", notifications: data });
			} catch (error: any) {
				console.log(error, "Notifications");
			}
		};

		const poolingTimer = setInterval(async () => {
			if (await revalidate()) {
				fetchNotifications();
			}
		}, pollingRate);

		if (authState.loggedIn) {
			fetchNotifications();
		}

		return () => {
			controller.abort();
			clearInterval(poolingTimer);
		};
	}, [authState.loggedIn]);

	const state = context.state;

	return {
		state,
	};
}

export { NotificationProvider, useNotification };
