import { Button } from "@/components";
import Lottie from "lottie-react";
import animation from "../assets/location.json";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero.jpg";

function Home() {
	return (
		<>
			<div className="bg-white h-full flex flex-col">
				<div className="flex flex-col-reverse md:flex-row flex-[0.9] justify-center items-center gap-10 md:gap-32">
					<div className="flex flex-col gap-10 w-1/2 md:w-64">
						<div className="flex flex-col gap-4">
							<h1 className="font-header font-bold text-4xl animated fadeInLeft">
								Help save the world by being a part of{" "}
								<span className="text-primary-500">Foocle</span>
							</h1>
							<p className="font-sub-header animated fadeInLeft delay-1s">
								Stop food going to waste, and help give the ones in need.
							</p>
						</div>
						<Link to={"/signup/business"}>
							<Button className="max-h-10 animated fadeInLeft delay-2s">Get Started</Button>
						</Link>
					</div>
					<div className="max-w-xs md:max-w-md: animated fadeIn">
						<img src={heroImage} />
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center flex-col gap-10 bg-off-white h-full relative">
				<h1 className="w-fit m-5 mt-28 text-6xl antialiased font-bold animated fadeInDown ">
					Why?
				</h1>
				<div className="text-center flex gap-6 m-6 animated delay-2s fadeIn">
					<p className="flex justify-center items-center bg-white max-w-[20rem] p-6 antialiased font-bold rounded-lg text-2xl animated delay-2s fadeInUp">
						Save the Food, prolong the Cycle of life - join Foocle
					</p>
					<p className="flex justify-center items-center bg-white max-w-[20rem] p-6 antialiased font-bold rounded-lg text-2xl animated delay-3s fadeInUp">
						At Foocle we aim to reduce food wasted by offering exquisite food
					</p>
					<p className="flex justify-center items-center bg-white max-w-[20rem] p-6 antialiased font-bold rounded-lg text-2xl animated delay-4s fadeInUp">
						Get free food - Save $$ on your bills - help saving the planet{" "}
					</p>
				</div>
				<Lottie
					className="absolute top-1/2 w-full h-full animated delay-2s zoomOutUp"
					animationData={animation}
					loop={true}
				/>
			</div>
		</>
	);
}

export default Home;
