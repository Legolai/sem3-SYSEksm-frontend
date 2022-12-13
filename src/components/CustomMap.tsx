import { Map } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import {useEffect, useState} from "react";

interface CustomMapProps {
	children?: JSX.Element[] | JSX.Element;
	newStartCenter?: [number, number];
	newStartZoom?: number;
}

function CustomMap({ children, newStartCenter, newStartZoom }: CustomMapProps) {
	const [currentCenter, setCurrentCenter] = useState<[number, number]>(newStartCenter??[0, 0]);
	const [zoom, setZoom] = useState(11);
	// const maptilerProvider = maptiler("Your_api_key", "streets");

	return (
		<Map
			// provider={maptilerProvider}
			center={currentCenter}
			zoom={zoom}
			minZoom={4}
			dprs={[1, 2]}
			onBoundsChanged={({ center, zoom }) => {
				setCurrentCenter(center);
				setZoom(zoom);
			}}
		>
			{children}
		</Map>
	);
}

export default CustomMap;
