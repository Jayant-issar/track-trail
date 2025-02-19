import { StatsCard } from "@/components/StatsCard";
import { Mail, MessageSquare, Send, UserCheck } from "lucide-react";

interface ApplicationStatsProps {
  stats: {
    total: number;
    interviewing: number;
    accepted: number;
    response_rate: number;
  };
}

export const ApplicationStats = ({ stats }: ApplicationStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatsCard
        title="Total Applications"
        value={stats.total}
        icon={<Send className="h-4 w-4 text-purple-400" />}
      />
      <StatsCard
        title="Currently Interviewing"
        value={stats.interviewing}
        icon={<MessageSquare className="h-4 w-4 text-blue-400" />}
      />
      <StatsCard
        title="Offers Received"
        value={stats.accepted}
        icon={<UserCheck className="h-4 w-4 text-green-400" />}
      />
      <StatsCard
        title="Response Rate"
        value={`${stats.response_rate}%`}
        icon={<Mail className="h-4 w-4 text-pink-400" />}
      />
    </div>
  );
};