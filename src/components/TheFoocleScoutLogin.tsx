import { useAuth } from "@/stores/AuthContext";
import PerformLoginAction from "@/types/entities/peformLoginAction";
import TheLoginForm from "./TheLoginForm";

function TheFoocleScoutLogin() {
	const { login, state: authState } = useAuth();

	const performLogin: PerformLoginAction = async (evt, credentials, setAlert) => {
		evt.preventDefault();
		try {
			await login(credentials.email.toLowerCase(), credentials.password, "foocleScout");
		} catch (error: any) {
			const errMsgFull = await error.fullError;
			console.log(errMsgFull.message);

			setAlert(errMsgFull.message);
		}
	};

	return <TheLoginForm performLoginAction={performLogin} />;
}

export default TheFoocleScoutLogin;
