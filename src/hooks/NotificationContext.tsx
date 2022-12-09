import { handleHttpErrors, makeOptions } from "@/api/util.api";
import NotificationType from "@/types/entities/notificationType";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { BASE_API_URL } from "../../settings";
import { useAuth } from "./AuthContext";
type Dispatch = (action: Action) => void;
type Action = {
	type: "update" | "fetched" | "dismiss";
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
		case "fetched": {
			const newState = { notifications: action["notifications"] };
			return { ...state, ...newState };
		}
		case "dismiss": {
			const notifications = state.notifications;
			const newState = {
				notifications: [...notifications.filter(n => n.id != action.id)],
			};
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

	const pollingRate = 10_000;

	useEffect(() => {
		const controller = new AbortController();

		const fetchNotifications = async () => {
			try {
				const options = makeOptions("GET", true);
				const res = await fetch(`${BASE_API_URL}/notification/new`, {
					...options,
					signal: controller.signal,
				});
				const data = await handleHttpErrors(res);
				context.dispatch({ type: "fetched", notifications: data });
			} catch (error: any) {
				console.log("Stopped polling notifications");
			}
		};

		const pollingTimer = setInterval(async () => {
			if (await revalidate()) {
				fetchNotifications();
			}
		}, pollingRate);

		if (authState.loggedIn) {
			fetchNotifications();
		}

		return () => {
			controller.abort();
			clearInterval(pollingTimer);
		};
	}, [authState.loggedIn]);

	const dismissNotification = async (id: number) => {
		context.dispatch({ type: "dismiss", id: id });
		const options = makeOptions("PUT", true);
		await fetch(`${BASE_API_URL}/notification/${id}/seen`, options);
	};

	const state = context.state;

	return {
		state,
		dismissNotification,
	};
}

export { NotificationProvider, useNotification };
