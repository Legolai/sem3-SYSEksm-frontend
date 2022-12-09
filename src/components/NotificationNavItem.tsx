import { useNotification } from "@/hooks/NotificationContext";
import useOutsideTrigger from "@/hooks/useOutsideTrigger";
import useToggle from "@/hooks/useToggle";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import NotificationItem from "./NotificationItem";

function NotificationNavItem() {
	const { state: notifyState } = useNotification();
	const [show, toggle, close] = useToggle({});
	const notificationComRef = useRef<HTMLDivElement>(null);
	useOutsideTrigger(notificationComRef, close);
	return (
		<div
			ref={notificationComRef}
			className="relative flex flex-col justify-center items-center"
		>
			<div
				onClick={toggle}
				className="p-2 hover:shadow-lg transition-shadow rounded-md active:scale-95"
			>
				<div className="relative">
					<FontAwesomeIcon icon={show ? faEnvelopeOpen : faEnvelope} size="xl" />
					{notifyState.notifications.length > 0 && (
						<div className="absolute -top-1 -right-2">
							<span className="flex h-4 w-4">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
								<span className="relative inline-flex text-[0.625rem] rounded-full h-4 w-4 bg-danger justify-center items-end text-white">
									{notifyState.notifications.length}
								</span>
							</span>
						</div>
					)}
				</div>
			</div>
			<div
				className={`max-h-24 z-20 w-max absolute ease-in-out translate-y-full duration-300 p-1 overflow-y-scroll flex flex-col gap-1 -bottom-4 rounded-md bg-gray-300 shadow-lg ${
					show ? "visible opacity-100" : "opacity-0 invisible"
				}`}
			>
				{notifyState.notifications.length > 0 ? (
					notifyState.notifications.map(n => (
						<NotificationItem key={n.id} notification={n} />
					))
				) : (
					<div className="p-2 font-semibold">You have no new notifications</div>
				)}
			</div>
		</div>
	);
}

export default NotificationNavItem;
