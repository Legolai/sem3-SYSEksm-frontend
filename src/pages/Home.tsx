import { Button } from "@/components";
import heroImage from "../assets/images/hero.jpg";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<div className="bg-white h-full flex flex-col">
				<div className="py-20 flex justify-center items-center gap-10 md:gap-32">
					<div className="flex flex-col gap-10 md:w-64">
						<div className="flex flex-col gap-4">
							<h1 className="font-header font-bold text-4xl">
								Help save the world by being a part of{" "}
								<span className="text-primary-500">Foocle</span>
							</h1>
							<p className="font-sub-header">
								Stop food going to waste, and help give the ones in need.
							</p>
						</div>
						<Link to={"/signup/business"}>
							<Button className="max-h-10">Get Started</Button>
						</Link>
					</div>
					<div className="max-w-md">
						<img src={heroImage} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
