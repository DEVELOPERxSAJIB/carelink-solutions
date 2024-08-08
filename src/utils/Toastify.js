import { toast } from "react-toastify";
export function showToast(type, message) {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
}
