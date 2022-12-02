import { InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMsg?: string;
	infoMsg?:string;
	autoComplete?:string;
}

const InputField = ({
	label,
	name,
	errorMsg,
	infoMsg,
	type,
	required,
	value,
	onChange,
	placeholder,
	autoComplete,
	min,
	max,
	...props
}: InputFieldProps) => {
	return (
		<div className={"flex flex-col justify-center items-start gap-1 flex-grow"}>
			{label && (
				<label className={"font-medium font-body spacing tracking-wider"} htmlFor={name}>
					{label}
				</label>
			)}
			<input
				className="disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white outline-none border-b-2 border-b-primary-500 focus:border-b-secondary-500 border-b-solid rounded-lg px-4 py-2 w-full"
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				required={required}
				min={min}
				max={max}
				autoComplete={autoComplete}
				{...props}
			/>
			{errorMsg && errorMsg.length != 0 && (
				<p className="font-body text-danger">{errorMsg}</p>
			)}
			{infoMsg && infoMsg.length != 0 && (
				<p className="font-body text-sm text-gray-500 antialiased">{infoMsg}</p>
			)}
		</div>
	);
};

export default InputField;
