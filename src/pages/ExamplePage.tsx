import React, { useEffect, useMemo, useState } from "react";
import facade from "../api/apiFacade";
import LoadingSpinner from "../components/LoadingSpinner";
import WeatherInfoBox from "../components/WeatherInfoBox";
import WeatherNCat from "../types/entities/weatherNCat";

function ExamplePage() {
	const [data, setData] = useState<WeatherNCat>();

	useEffect(() => {
		const getData = async () => {
			const newData = await facade.fetchWeatherNCat();
			if (newData) setData(newData);
		};
		getData();
		const interval = setInterval(getData, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-row-reverse justify-center items-start gap-3 mt-5">
			<div className="bg-white flex flex-col justify-center items-center p-5 rounded-lg gap-4">
				{!data ? (
					<LoadingSpinner />
				) : (
					<>
						<h2 className="text-2xl font-extrabold">The 5 Secondes Cat</h2>
						<img
							className="rounded-lg"
							height={"100px"}
							width={"200px"}
							src={data?.cat.url}
						/>
					</>
				)}
			</div>
			{data?.weather ? <WeatherInfoBox weather={data.weather} /> : <></>}
		</div>
	);
}

export default ExamplePage;
