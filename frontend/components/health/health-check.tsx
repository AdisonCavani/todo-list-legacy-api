import type { HealthStatus } from "@lib/health";
import { cn } from "@lib/utils";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";

export type HealthCheck = {
  title: string;
  description: string;
  status: HealthStatus;
  message: string;
};

interface Props extends HealthCheck {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
}

function HealthCheck({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  title,
  description,
  status,
  message,
}: Props) {
  return (
    <div
      className={cn(
        "flex bg-neutral-800 p-5",
        topLeft && "rounded-tl",
        topRight && "rounded-tr",
        bottomLeft && "rounded-bl",
        bottomRight && "rounded-br"
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-x-2">
          <h4 className="font-medium">{title}</h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex h-[18px] w-[18px] cursor-default items-center justify-center rounded-full border text-sm">
                  ?
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-neutral-400">{getSummary(status)}</p>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{getIcon(status)}</TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function getSummary(status: HealthStatus) {
  switch (status) {
    case "healthy":
      return "Normal";
    case "degraded":
      return "Degraded";
    default:
      return "Unhealthy";
  }
}

function getIcon(status: HealthStatus) {
  switch (status) {
    case "healthy":
      return (
        <IconCircleCheckFilled size={24} className="ml-auto text-green-600" />
      );
    case "degraded":
      return (
        <IconAlertCircleFilled size={24} className="ml-auto text-yellow-600" />
      );
    default:
      return (
        <IconAlertCircleFilled size={24} className="ml-auto text-red-600 " />
      );
  }
}

export default HealthCheck;
