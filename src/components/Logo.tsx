import { Link } from "react-router-dom";

function Logo() {
	return (
		<div className="flex justify-center items-center px-4">
			<Link to={"/"}>
				<h1 className="font-bold text-white bg-green-500 px-2 py-1 rounded-br-xl rounded-tl-xl text-lg">
					Paperrolle
				</h1>
			</Link>
		</div>
	);
}

export default Logo;
