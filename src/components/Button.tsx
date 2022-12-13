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
			className={`${className} transition-all flex-grow m-0 w-full px-5 py-2 rounded-lg disabled:opacity-75 enabled:active:scale-95 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-400 ${
				outline
					? "	enabled:hover:bg-primary-500 hover:text-white border-2 border-primary-500 text-primary-500"
					: "bg-primary-500 text-white"
			}`}
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
