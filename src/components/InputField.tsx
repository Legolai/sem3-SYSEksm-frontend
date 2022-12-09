import { forwardRef, InputHTMLAttributes, useState } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	errorMsg?: string;
	infoMsg?: string;
	autoComplete?: string;
}

const InputField = forwardRef(
	(
		{
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
		}: InputFieldProps,
		ref
	) => {
		return (
			<div className={"flex flex-col justify-center items-start gap-1 flex-grow"}>
				{label && (
					<label
						className={"font-medium font-body spacing tracking-wider"}
						htmlFor={name}
					>
						{label}
					</label>
				)}
				<input
					className={
					type != "file"
						? "disabled:border-b-primary-100 transition-all duration-300 ease-in-out bg-off-white outline-none border-b-2 border-b-primary-500 focus:border-b-secondary-500 border-b-solid rounded-lg px-4 py-2 w-full"
						: "disabled:border-b-primary-100 text-slate-500 rounded-lg file:transition-all file:duration-300 file:ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-secondary-500 file:cursor-pointer"
					}
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
	}
);

export default InputField;
