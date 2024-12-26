import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const ColdEmailForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    recipientEmail: "",
    subject: "",
    emailBody: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email
    toast({
      title: "Email Draft Created",
      description: "Your cold email draft has been saved!",
    });
    setFormData({
      recipientEmail: "",
      subject: "",
      emailBody: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="recipientEmail">Recipient Email</Label>
        <Input
          id="recipientEmail"
          type="email"
          required
          value={formData.recipientEmail}
          onChange={(e) =>
            setFormData({ ...formData, recipientEmail: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="emailBody">Email Body</Label>
        <Textarea
          id="emailBody"
          required
          className="min-h-[200px]"
          value={formData.emailBody}
          onChange={(e) =>
            setFormData({ ...formData, emailBody: e.target.value })
          }
        />
      </div>

      <Button type="submit" className="w-full">
        Save Draft
      </Button>
    </form>
  );
};