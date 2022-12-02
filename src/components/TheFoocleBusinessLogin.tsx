import { useAuth } from "@/stores/AuthContext";
import PerformLoginAction from "@/types/entities/performLoginAction";
import TheLoginForm from "./TheLoginForm";

function TheFoocleBusinessLogin() {
	const { login, state: authState } = useAuth();

	const performLogin: PerformLoginAction = async (evt, credentials, setAlert) => {
		evt.preventDefault();
		try {
			await login(credentials.email.toLowerCase(), credentials.password, "foocleBusiness");
		} catch (error: any) {
			const errMsgFull = await error.fullError;
			console.log(errMsgFull.message);

			setAlert(errMsgFull.message);
		}
	};

	return <TheLoginForm performLoginAction={performLogin} />;
}

export default TheFoocleBusinessLogin;
