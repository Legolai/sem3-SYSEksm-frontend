import React from "react";
import WeatherNCat from "../types/entities/weatherNCat";

interface WeatherInfoBoxProps {
	weather: WeatherNCat["weather"];
}

function WeatherInfoBox({ weather }: WeatherInfoBoxProps) {
	return (
		<div className="bg-white p-5 rounded-lg">
			<h2 className="text-2xl mb-4 font-extrabold">
				Current weather in {weather.LocationName}
			</h2>
			<div>
				<p className="flex items-center gap-1">
					<i className="fa fa-tint"></i>
					Humidity: {weather.CurrentData?.humidity}
				</p>
				<p className="flex items-center gap-1">
					<i className="fa fa-cloud" aria-hidden="true"></i>
					Sky: {weather.CurrentData?.skyText}
				</p>
				<p className="flex items-center gap-1">
					<i
						className={`fa fa-thermometer-${
							weather.CurrentData?.temperature > 30
								? "4"
								: weather.CurrentData?.temperature > 20
								? "3"
								: weather.CurrentData?.temperature > 10
								? "2"
								: weather.CurrentData?.temperature > 0
								? "1"
								: "0"
						}`}
					></i>
					Temperature: {weather.CurrentData?.temperature}
				</p>
				<p className="flex items-center gap-1">
					<i className="fa fa-leaf" aria-hidden="true"></i>
					Wind: {weather.CurrentData?.windText}
				</p>
			</div>
		</div>
	);
}

export default WeatherInfoBox;
