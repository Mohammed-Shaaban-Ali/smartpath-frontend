import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  status: "active" | "inactive" | "no-data";
  title?: string;
  onclick?: () => void;
  disabled?: boolean;
  className?: string;
};

function StatusCell({ status, onclick, disabled, className, title }: Props) {
  const checkStatus = status.toLowerCase() as keyof typeof statusStyles;

  const statusStyles = {
    active: "bg-green-50 hover:bg-green-100 text-green-600 border-green-300",
    inactive: "bg-red-50 hover:bg-red-100 text-red-600 border-red-300",
    "no-data":
      "bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border-yellow-300",
  };

  const dotStyles = {
    active: "bg-green-600",
    inactive: "bg-red-600",
    "no-data": "bg-yellow-600",
  };

  const handleClick = () => {
    if (!disabled && onclick) {
      onclick();
    }
  };

  return (
    <Badge
      onClick={handleClick}
      aria-disabled={disabled}
      variant="outline"
      className={cn(
        "transition-all duration-300 flex w-fit rounded-full items-center gap-1.5 px-2.5 py-1 capitalize",
        onclick && !disabled && "cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        statusStyles[checkStatus],
        className
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", dotStyles[checkStatus])} />
      {title ? title : status}
    </Badge>
  );
}

export default StatusCell;
