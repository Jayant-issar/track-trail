import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Send } from "lucide-react";

type ColdEmail = {
  id: string;
  recipientEmail: string;
  recipientName: string;
  company: string;
  subject: string;
  emailBody: string;
  status: "sent" | "replied" | "no-response" | "meeting-scheduled";
  sentDate: string;
};

export const ColdEmailForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recipientEmail: "",
    recipientName: "",
    company: "",
    subject: "",
    emailBody: "",
  });
  const [coldEmails, setColdEmails] = useState<ColdEmail[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail: ColdEmail = {
      id: crypto.randomUUID(),
      ...formData,
      status: "sent",
      sentDate: new Date().toISOString(),
    };
    setColdEmails([newEmail, ...coldEmails]);
    toast({
      title: "Email Draft Created",
      description: "Your cold email has been saved and tracked!",
    });
    setFormData({
      recipientEmail: "",
      recipientName: "",
      company: "",
      subject: "",
      emailBody: "",
    });
  };

  const updateEmailStatus = (id: string, newStatus: ColdEmail["status"]) => {
    setColdEmails(
      coldEmails.map((email) =>
        email.id === id ? { ...email, status: newStatus } : email
      )
    );
    toast({
      title: "Status Updated",
      description: "Cold email status has been updated successfully!",
    });
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-xl">
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            New Cold Email
          </h2>
          
          <div className="space-y-2">
            <Label htmlFor="recipientName" className="text-gray-200">Recipient Name</Label>
            <Input
              id="recipientName"
              className="bg-gray-800/50 border-gray-700 text-gray-200"
              required
              value={formData.recipientName}
              onChange={(e) =>
                setFormData({ ...formData, recipientName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-200">Company</Label>
            <Input
              id="company"
              className="bg-gray-800/50 border-gray-700 text-gray-200"
              required
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientEmail" className="text-gray-200">Recipient Email</Label>
            <Input
              id="recipientEmail"
              type="email"
              className="bg-gray-800/50 border-gray-700 text-gray-200"
              required
              value={formData.recipientEmail}
              onChange={(e) =>
                setFormData({ ...formData, recipientEmail: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-gray-200">Subject</Label>
            <Input
              id="subject"
              className="bg-gray-800/50 border-gray-700 text-gray-200"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailBody" className="text-gray-200">Email Body</Label>
            <Textarea
              id="emailBody"
              required
              className="min-h-[200px] bg-gray-800/50 border-gray-700 text-gray-200"
              value={formData.emailBody}
              onChange={(e) =>
                setFormData({ ...formData, emailBody: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Mail className="mr-2" /> Save & Track Email
          </Button>
        </form>

        <div className="space-y-4 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cold Email Tracker
          </h2>
          
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-200">Recipient</TableHead>
                  <TableHead className="text-gray-200">Company</TableHead>
                  <TableHead className="text-gray-200">Status</TableHead>
                  <TableHead className="text-gray-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coldEmails.map((email) => (
                  <TableRow key={email.id} className="border-gray-700">
                    <TableCell className="text-gray-300">
                      {email.recipientName}
                    </TableCell>
                    <TableCell className="text-gray-300">{email.company}</TableCell>
                    <TableCell>
                      <Select
                        value={email.status}
                        onValueChange={(value: ColdEmail["status"]) =>
                          updateEmailStatus(email.id, value)
                        }
                      >
                        <SelectTrigger className="w-[140px] bg-gray-800/50 border-gray-700 text-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="sent" className="text-gray-200">Sent</SelectItem>
                          <SelectItem value="replied" className="text-gray-200">Replied</SelectItem>
                          <SelectItem value="no-response" className="text-gray-200">No Response</SelectItem>
                          <SelectItem value="meeting-scheduled" className="text-gray-200">Meeting Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-200"
                        onClick={() => {
                          navigator.clipboard.writeText(email.emailBody);
                          toast({
                            title: "Copied to clipboard",
                            description: "Email content has been copied!",
                          });
                        }}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {coldEmails.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-gray-400"
                    >
                      No cold emails tracked yet. Start by creating one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};