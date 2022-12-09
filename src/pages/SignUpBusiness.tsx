import facade from "@/api/apiCVR";
import { Button, InputField } from "@/components";
import { useValidator } from "@/utils/validationHelper";
import { FocusEvent, ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NewBusiness, { initialNewBusiness } from "../types/entities/newBusiness";

interface SignUpProps {
	afterSubmit?: () => void;
}

const SignUpBusiness = ({ afterSubmit }: SignUpProps) => {
	const businessFromLocation = useLocation();
	const [formData, setFormData] = useState(initialNewBusiness);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const cvrInputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const { validationState, isOk, doValidation, getErrorMsg } = useValidator([
		// {
		// 	expression: formData.cvr.trim().length == 0,
		// 	inputName: "cvr",
		// 	msg: "This field is required",
		// },
	]);
	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
		if (e.currentTarget.name === "cvr") {
			const cvr: string | null =
				e.currentTarget.value.length == 8 && Number(e.currentTarget.value)
					? e.currentTarget.value
					: null;
			if (cvr) {
				await fetchCVR(cvr);
			} else {
			}
		}
	};

	const onReset = () => {
		setFormData(initialNewBusiness);
		setAlert("");
		const inputs = document.querySelectorAll(`input`);
		inputs.forEach(input => (input.disabled = false));
		navigate("/signup/business", { replace: true });
	};

	useEffect(() => {
		if (businessFromLocation.state && businessFromLocation.state.cvr.length > 0) {
			const cvr = businessFromLocation.state.cvr;
			if (cvrInputRef.current) {
				cvrInputRef.current.focus();
				cvrInputRef.current.value = cvr;
				cvrInputRef.current.blur();
			}
		}
	}, [businessFromLocation]);

	async function fetchCVR(cvr: string) {
		const business = await facade.fetchBizz(cvr);
		let form = formRef.current?.getElementsByTagName("input")!;
		for (const key in business) {
			let input = form.namedItem(key) as HTMLInputElement;
			if (input && key !== "cvr") {
				input.value = business[key];
				input.disabled = true;
			}
		}
		setFormData(business);
	}

	const onBlur = async (e: FocusEvent<HTMLInputElement>) => {
		const cvr =
			e.currentTarget.value.length == 8 && Number(e.currentTarget.value)
				? e.currentTarget.value
				: undefined;

		if (cvr) {
			await fetchCVR(cvr);
		}
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full pt-32">
			<div className="flex flex-col items-center p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">Create BusinessAccount</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">
							{alert}
						</div>
					)}
					<h3 className="">First we'll handle the business registration</h3>
					<form
						noValidate
						className="flex flex-col justify-center items-center w-full gap-5"
						ref={formRef}
					>
						<div className="flex flex-col w-full gap-5">
							<InputField
								ref={cvrInputRef}
								onChange={onChange}
								onBlur={onBlur}
								label="CVR"
								type="text"
								name="cvr"
								min={7}
								max={9}
								required
								errorMsg={getErrorMsg("cvr")}
								infoMsg="type in the CVR, and we'll fetch the information"
							/>
							<InputField
								onChange={onChange}
								label="Name of the Business"
								type="text"
								name="name"
								required
								errorMsg={getErrorMsg("name")}
							/>
							<InputField
								onChange={onChange}
								label="Contact Email"
								type="email"
								name="businessEmail"
								required
								errorMsg={getErrorMsg("businessEmail")}
							/>
							<InputField
								onChange={onChange}
								label="Contact Phone"
								type="tel"
								name="businessPhone"
								required
								errorMsg={getErrorMsg("businessPhone")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="Address"
								name="address"
								required
								errorMsg={getErrorMsg("address")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="City"
								name="city"
								required
								errorMsg={getErrorMsg("city")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="ZipCode"
								name="zipCode"
								required
								errorMsg={getErrorMsg("zipCode")}
							/>
							<InputField
								onChange={onChange}
								type="text"
								label="Country"
								name="country"
								required
								errorMsg={getErrorMsg("country")}
							/>
						</div>
						<div className="flex w-3/4 gap-5 pt-2">
							<Button
								onClick={onReset}
								className="hover:bg-primary-500 hover:text-white"
								type="reset"
								outline
							>
								Reset
							</Button>
							<Button
								onClick={() => {
									navigate("/signup/business/account", { state: formData });
								}}
							>
								Next
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUpBusiness;
