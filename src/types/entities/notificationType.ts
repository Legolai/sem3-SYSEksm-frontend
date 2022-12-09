interface NotificationType {
  id: number;
  message: string;
  instructions: string;
  status: "SEEN" | "NEW";
}

export default NotificationType;