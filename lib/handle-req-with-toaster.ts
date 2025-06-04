import { toast } from "sonner";

export const handleReqWithToaster = async (
  toastTitle: string,
  fn: () => Promise<void>
) => {
  const tID = toast.loading(toastTitle, {
    description: "Please wait...",
  });
  try {
    await fn();
    toast.dismiss(tID);
  } catch (error) {}
  toast.dismiss(tID);
};
