import { Map } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import {useEffect, useState} from "react";

interface CustomMapProps {
	children?: JSX.Element[] | JSX.Element;
	newStartCenter?: [number, number];
	newStartCenterX?: number;
	newStartCenterY?: number;
	newStartZoom?: number;
}

function CustomMap({ children, newStartCenter, newStartZoom }: CustomMapProps) {
	const [center, setCenter] = useState<[number, number]>([55.6698434, 12.5628476]);
	const [zoom, setZoom] = useState(11);
	// const maptilerProvider = maptiler("Your_api_key", "streets");

	useEffect(() => {
		return () => {
			if (newStartCenter != undefined) {
				setCenter(newStartCenter);
			}
			if (newStartZoom != undefined) {
				setZoom(newStartZoom);
			}
		};
	}, []);


	return (
		<Map
			// provider={maptilerProvider}
			center={center}
			zoom={zoom}
			minZoom={4}
			dprs={[1, 2]}
			onBoundsChanged={({ center, zoom }) => {
				setCenter(center);
				setZoom(zoom);
			}}
		>
			{children}
		</Map>
	);
}

export default CustomMap;
