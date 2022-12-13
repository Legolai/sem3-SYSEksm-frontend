import React from "react";
import { Marker, PigeonProps, Point } from "pigeon-maps";
import resolveConfig from "tailwindcss/resolveConfig";
import FoocleSpotAvailable from "@/types/entities/foocleSpotAvailable.js";

interface MarkerProps extends PigeonProps {
	color?: string;
	payload?: any;
	width?: number;
	height?: number;
	hover?: boolean;
	foocleSpot: FoocleSpotAvailable;
	style?: React.CSSProperties;
	className?: string;
	children?: JSX.Element;
	onClick?: ({
		event,
		anchor,
		payload,
	}: {
		event: MouseEvent;
		anchor: Point;
		payload: any;
	}) => void;
	onContextMenu?: ({
		event,
		anchor,
		payload,
	}: {
		event: MouseEvent;
		anchor: Point;
		payload: any;
	}) => void;
	onMouseOver?: ({
		event,
		anchor,
		payload,
	}: {
		event: MouseEvent;
		anchor: Point;
		payload: any;
	}) => void;
	onMouseOut?: ({
		event,
		anchor,
		payload,
	}: {
		event: MouseEvent;
		anchor: Point;
		payload: any;
	}) => void;
}

function CustomMarker({ anchor, foocleSpot, ...props }: MarkerProps) {
	return <Marker payload={foocleSpot} width={50} anchor={anchor} color={"#00b295"} {...props} />;
}

export default CustomMarker;
