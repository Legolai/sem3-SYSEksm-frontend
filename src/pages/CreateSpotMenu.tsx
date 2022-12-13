import { Button, InputField } from "@/components";
import {FocusEvent, ChangeEvent, FormEvent, useState} from "react";
import {useValidator} from "@/utils/validationHelper";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api";
import { useAuth } from "../hooks/AuthContext";
import newSpotMenu from "@/types/entities/newSpotMenu";

interface CreateSpotMenu {
	afterSubmit?: () => void;
	id?: number;
}

const CreateSpotMenu = ({ afterSubmit, id }: CreateSpotMenu) => {
	const { state } = useAuth();
	// const foodPrefValues: { label:string , value:string}[] = [
	// 	{label:'', value:''},
	// 	{label:'VEGETARIAN', value:'VEGETARIAN'},
	// 	{label:'PESCETAR', value:'PESCETAR'},
	// 	{label:'FLEXITAR', value:'FLEXITAR'},
	// 	{label:'POLLOTAR', value:'POLLOTAR'}
	// ]
	const dateTimeNow = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
	const init = {id: undefined, foocleSpotID: id, description: '', pictures: '', foodPreferences: '', pickupTimeFrom: '', pickupTimeTo: ''};
	const [formData, setFormData] = useState(init);
	const navigate = useNavigate();
	const [alert, setAlert] = useState("");
	const {validationState, isOk, doValidation, getErrorMsg} = useValidator([
		// {
		// 	expression: formData.firstname.trim().length == 0,
		// 	inputName: "firstname",
		// 	msg: "This field is required",
		// },
	]);

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.type)
		if (e.target.type == 'file') {
			//TODO: limit how many files user can upload
			setFormData((curr: any) => ({...curr, [e.target.name]: e.target.files}));
		} else {
			setFormData((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
		}
	};

	const onSelect = async (e: ChangeEvent<HTMLSelectElement>) => {
		setFormData((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
	};

	// const OnSelect = async (option: Option | null ) => {
	// 	console.log(option)
	// 	// setFormData((curr: any) => ({...curr, [e.target.name]: e.target.value}));
	// }

	const onReset = () => {
		setFormData(init);
		setAlert("");
		const inputs = document.querySelectorAll(`input`);
		inputs.forEach(input => (input.disabled = false));
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		if(formData.pictures == undefined) {
			setFormData((curr: any) => ({ ...curr, pictures: "" }));
		}
		e.preventDefault();
		// doValidation();

			try {
				const response = await API.spot.createSpotMenu(formData);
				if (afterSubmit != undefined) {
					afterSubmit();
				}
			} catch (error: any) {
				const errMsgFull = await error.fullError;
				console.log(errMsgFull.message);
			}
			onReset();
	};

	return (
		<div className="flex flex-col items-center gap-6 justify-center h-full">
			<div className="flex flex-col items-center p-10 shadow-lg gap-5 justify-center bg-white rounded-lg">
				<div className="h-">
					<h2 className="text-2xl font-bold">Create a SpotMenu</h2>
					{alert.length > 0 && (
						<div className="w-full bg-red-400 text-white rounded-md p-2 px-3">
							{alert}
						</div>
					)}
					<h3 className="">Fill out the information about the menu for your spot!</h3>
					<form
						name="createSpotMenu"
						noValidate
						onSubmit={onSubmit}
						className="flex flex-col justify-center items-center w-full gap-5"
					>
						<div className="flex flex-col w-full gap-5">
							<InputField
								onChange={onChange}
								type="text"
								label="Tell us whats on the menu"
								name="description"
								required
								errorMsg={getErrorMsg("description")}
							/>
							<label htmlFor="foodPreferences">
								Does this food fit within any type of foodpreference?
							<select
								value={formData.foodPreferences}
								onChange={onSelect}
								name="foodPreferences"
								className="disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white outline-none border-b-2 border-b-primary-500 focus:border-b-secondary-500 border-b-solid rounded-lg px-4 py-2 w-full">
								<option > </option>
								<option value="VEGAN">Vegan</option>
								<option value="VEGETARIAN">Vegetarian</option>
								<option value="PESCETAR">Pescetar</option>
								<option value="FLEXITAR">Flexitar</option>
								<option value="POLLOTAR">Pollotar</option>
							</select>
							</label>
							<div className="flex flex-col justify-center items-start gap-1 flex-grow">
								<h4 className="mb-0 font-medium font-body spacing tracking-wider">Select a timeperiod where the scouts can pickup</h4>
								<InputField
									className="disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white outline-none border-b-2 border-b-primary-500 focus:border-b-secondary-500 border-b-solid rounded-lg px-4 py-2 w-full"
									onChange={onChange}
									type="datetime-local"
									label="From"
									name="pickupTimeFrom"
									//hack fra nettet til at sætte tiden til nu
									min={dateTimeNow}
									required
									errorMsg={getErrorMsg("pickupTimeFrom")}
								/>
								<InputField
									className="disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white outline-none border-b-2 border-b-primary-500 focus:border-b-secondary-500 border-b-solid rounded-lg px-4 py-2 w-full"
									onChange={onChange}
									type="datetime-local"
									label="To"
									name="pickupTimeTo"
									//hack fra nettet til at sætte tiden til nu
									min={dateTimeNow}
									required
									errorMsg={getErrorMsg("pickupTimeTo")}
								/>
							</div>

							<InputField
								onChange={onChange}
								type="text"
								label="Take a picture of the food or the menu, upload them and type the web-address"
								name="pictures"
								// accept="image/*"
								// multiple
								required
								errorMsg={getErrorMsg("pictures")}
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
							<Button type="submit">Create</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateSpotMenu;
