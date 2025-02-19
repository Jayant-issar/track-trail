import { ColdApproach } from "@/types/coldApproach";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  approaches: ColdApproach[];
  onStatusUpdate: (id: string, status: ColdApproach["status"]) => void;
}

export const ColdApproachList = ({ approaches, onStatusUpdate }: Props) => {
  const { toast } = useToast();

  const getApproachIcon = (type: ColdApproach["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "linkedin_dm":
        return <Linkedin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Cold Approach Tracker
      </h2>
      
      <div className="rounded-md border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-200">Type</TableHead>
              <TableHead className="text-gray-200">Recipient</TableHead>
              <TableHead className="text-gray-200">Company</TableHead>
              <TableHead className="text-gray-200">Status</TableHead>
              <TableHead className="text-gray-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {approaches.map((approach) => (
              <TableRow key={approach.id} className="border-gray-700">
                <TableCell className="text-gray-300">
                  <div className="flex items-center gap-2">
                    {getApproachIcon(approach.type)}
                    <span>{approach.type === "linkedin_dm" ? "LinkedIn" : approach.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  {approach.recipientName}
                </TableCell>
                <TableCell className="text-gray-300">{approach.company}</TableCell>
                <TableCell>
                  <Select
                    value={approach.status}
                    onValueChange={(value: ColdApproach["status"]) =>
                      onStatusUpdate(approach.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px] bg-gray-800/50 border-gray-700 text-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="unseen" className="text-gray-200">Unseen</SelectItem>
                      <SelectItem value="replied" className="text-gray-200">Replied</SelectItem>
                      <SelectItem value="ghosted" className="text-gray-200">Ghosted</SelectItem>
                      <SelectItem value="rejected" className="text-gray-200">Rejected</SelectItem>
                      <SelectItem value="waiting" className="text-gray-200">Waiting</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => {
                      navigator.clipboard.writeText(approach.content);
                      toast({
                        title: "Copied to clipboard",
                        description: "Content has been copied!",
                      });
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {approaches.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-400"
                >
                  No cold approaches tracked yet. Start by creating one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};