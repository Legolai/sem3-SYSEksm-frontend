import { useNotification } from "@/hooks/NotificationContext";
import NotificationType from "@/types/entities/notificationType";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface NotificationItemProps {
	notification: NotificationType;
}

function NotificationItem({ notification }: NotificationItemProps) {
	const { dismissNotification } = useNotification();
	return (
		<div className="bg-white flex gap-2 items-center text-sm p-2 rounded-md">
			{notification.status == "NEW" && (
				<p className="font-semibold text-sm text-primary-500 font-header">
					{notification.status}
				</p>
			)}
			{notification.message}

			<FontAwesomeIcon
				onClick={() => dismissNotification(notification.id)}
				className="transition-all text-gray-600 hover:text-gray-400"
				icon={faClose}
			/>
		</div>
	);
}

export default NotificationItem;
