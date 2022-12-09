import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/css/main.css";
import { AuthProvider } from "./hooks/AuthContext";
import { NotificationProvider } from "./hooks/NotificationContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter basename="foocle">
			<AuthProvider>
				<NotificationProvider>
					<App />
				</NotificationProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
