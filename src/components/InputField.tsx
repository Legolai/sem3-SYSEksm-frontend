import { InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMsg?: string;
}

const InputField = ({
	label,
	name,
	errorMsg,
	type,
	required,
	value,
	onChange,
	placeholder,
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
				className="bg-off-white outline-none border-b-2 border-b-primary-500 border-b-solid rounded-lg px-4 py-2 w-full"
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				required={required}
				{...props}
			/>
			{errorMsg && errorMsg.length != 0 && (
				<p className="font-body text-danger">{errorMsg}</p>
			)}
		</div>
	);
};

export default InputField;
