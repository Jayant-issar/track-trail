import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColdApproach, ColdApproachType } from "@/types/coldApproach";
import { Mail, MessageSquare, Linkedin } from "lucide-react";

interface Props {
  onSubmit: (approach: Omit<ColdApproach, "id" | "status" | "sentDate">) => void;
  onCancel: () => void;
}

export const ColdApproachForm = ({ onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    type: "email" as ColdApproachType,
    recipientName: "",
    company: "",
    content: "",
    subject: "",
    recipientEmail: "",
    linkedinProfile: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: formData.type,
      recipientName: formData.recipientName,
      company: formData.company,
      content: formData.content,
      subject: formData.type === "email" ? formData.subject : undefined,
      recipientEmail: formData.type === "email" ? formData.recipientEmail : undefined,
      linkedinProfile: formData.type === "linkedin_dm" ? formData.linkedinProfile : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black/20 p-6 rounded-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        New Cold Approach
      </h2>

      <div className="space-y-2">
        <Label htmlFor="type" className="text-gray-200">Approach Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: ColdApproachType) =>
            setFormData({ ...formData, type: value })
          }
        >
          <SelectTrigger className="bg-gray-800/50 border-gray-700 text-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="email" className="text-gray-200">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
            </SelectItem>
            <SelectItem value="message" className="text-gray-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </div>
            </SelectItem>
            <SelectItem value="linkedin_dm" className="text-gray-200">
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn DM</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

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

      {formData.type === "email" && (
        <>
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
        </>
      )}

      {formData.type === "linkedin_dm" && (
        <div className="space-y-2">
          <Label htmlFor="linkedinProfile" className="text-gray-200">LinkedIn Profile URL</Label>
          <Input
            id="linkedinProfile"
            className="bg-gray-800/50 border-gray-700 text-gray-200"
            required
            value={formData.linkedinProfile}
            onChange={(e) =>
              setFormData({ ...formData, linkedinProfile: e.target.value })
            }
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="content" className="text-gray-200">Content</Label>
        <Textarea
          id="content"
          required
          className="min-h-[200px] bg-gray-800/50 border-gray-700 text-gray-200"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          Save Approach
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="border-gray-700 text-gray-200 hover:bg-gray-700">
          Cancel
        </Button>
      </div>
    </form>
  );
};