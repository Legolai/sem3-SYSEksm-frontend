import { Map } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import { useEffect, useState } from "react";

interface CustomMapProps {
	children?: JSX.Element[];
}

function CustomMap({ children }: CustomMapProps) {
	const [center, setCenter] = useState<[number, number]>([0, 0]);
	const [zoom, setZoom] = useState(11);
	// const maptilerProvider = maptiler("Your_api_key", "streets");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			p => setCenter([p.coords.latitude, p.coords.longitude]),
			e => {}
		);
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
