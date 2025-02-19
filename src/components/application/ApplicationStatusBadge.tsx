import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/types/application";

interface Props {
  status: ApplicationStatus;
}

const statusConfig = {
  accepted: { color: "bg-status-accepted", text: "Accepted" },
  waiting: { color: "bg-status-waiting", text: "Waiting" },
  ghosting: { color: "bg-status-ghosting", text: "No Response" },
  rejected: { color: "bg-status-rejected", text: "Rejected" },
  interviewing: { color: "bg-status-interviewing", text: "Interviewing" },
};

export const ApplicationStatusBadge = ({ status }: Props) => {
  const config = statusConfig[status];
  
  return (
    <Badge className={`${config.color} text-white`}>
      {config.text}
    </Badge>
  );
};