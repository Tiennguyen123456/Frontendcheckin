import toast from "react-hot-toast";
export const toastError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    style: { maxWidth: "500px" },
    duration: 3000,
  });
};
export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    style: { maxWidth: "500px" },
    duration: 3000,
  });
};
