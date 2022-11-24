import { Link } from "react-router-dom";

function Logo() {
	return (
		<div className="flex justify-center items-center px-4">
			<Link to={"/"}>
				<h1 className="font-bold font-header text-white bg-primary-500 px-3 py-1 rounded-br-xl rounded-tl-xl text-lg">
					Foocle
				</h1>
			</Link>
		</div>
	);
}

export default Logo;
