import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	outline?: boolean;
}

const Button = ({
	type,
	onClick,
	children,
	className,
	outline,
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			className={`${className} flex-grow m-0 w-full px-5 py-2 rounded-lg ${
				outline
					? "border-2 border-primary-500 text-primary-500"
					: "bg-primary-500 text-white"
			} active:scale-95 hover:scale-105 transition-all ${disabled ? "bg-gray-400" : ""}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
