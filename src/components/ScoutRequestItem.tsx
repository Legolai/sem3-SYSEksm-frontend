import MadeScoutRequest from "@/types/entities/madeScoutRequest";
import React from "react";

interface ScoutRequestItemProps {
	scoutRequest: MadeScoutRequest;
}

function ScoutRequestItem({ scoutRequest }: ScoutRequestItemProps) {
	return (
		<div
			className={`${
				scoutRequest.status == "PENDING"
					? "border-l-info"
					: scoutRequest.status == "DENIED"
					? "border-l-danger"
					: scoutRequest.status == "ACCEPTED"
					? "border-l-accept"
					: "border-l-warning"
			} p-2 border-l-4 rounded-md shadow-md`}
		>
			<p>
				Nr. {scoutRequest.id}, Place: {scoutRequest.BusinessName}
			</p>
			<details>
				<summary>More</summary>
				<p>Menu description: {scoutRequest.spotmenuDescription}</p>
				<p>Message: {scoutRequest.message}</p>
			</details>
		</div>
	);
}

export default ScoutRequestItem;
