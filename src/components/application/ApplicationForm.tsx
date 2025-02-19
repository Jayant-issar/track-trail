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
import { Application, ApplicationMethod, ApplicationStatus } from "@/types/application";
import { useToast } from "@/hooks/use-toast";


interface Props {
  onSubmit: (application: Omit<Application, "id" | "lastUpdated">) => void;
}

export const ApplicationForm = ({ onSubmit }: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    status: "waiting" as ApplicationStatus,
    method: "website" as ApplicationMethod,
    appliedDate: new Date().toISOString().split("T")[0],
    notes: "",
    contactEmail: "",
    contactName: "",
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    
    setFormData({
      companyName: "",
      position: "",
      status: "waiting",
      method: "website",
      appliedDate: new Date().toISOString().split("T")[0],
      notes: "",
      contactEmail: "",
      contactName: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-gray-200">Company Name</Label>
          <Input
            id="companyName"
            required
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position" className="text-gray-200">Position</Label>
          <Input
            id="position"
            required
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-gray-200">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: ApplicationStatus) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="waiting" className="text-gray-200">Waiting</SelectItem>
              <SelectItem value="interviewing" className="text-gray-200">Interviewing</SelectItem>
              <SelectItem value="accepted" className="text-gray-200">Accepted</SelectItem>
              <SelectItem value="rejected" className="text-gray-200">Rejected</SelectItem>
              <SelectItem value="ghosting" className="text-gray-200">No Response</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="method" className="text-gray-200">Application Method</Label>
          <Select
            value={formData.method}
            onValueChange={(value: ApplicationMethod) =>
              setFormData({ ...formData, method: value })
            }
          >
            <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="email" className="text-gray-200">Email</SelectItem>
              <SelectItem value="website" className="text-gray-200">Company Website</SelectItem>
              <SelectItem value="linkedin" className="text-gray-200">LinkedIn</SelectItem>
              <SelectItem value="referral" className="text-gray-200">Referral</SelectItem>
              <SelectItem value="other" className="text-gray-200">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="appliedDate" className="text-gray-200">Applied Date</Label>
          <Input
            id="appliedDate"
            type="date"
            required
            value={formData.appliedDate}
            onChange={(e) =>
              setFormData({ ...formData, appliedDate: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactName" className="text-gray-200">Contact Name</Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) =>
              setFormData({ ...formData, contactName: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="text-gray-200">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) =>
              setFormData({ ...formData, contactEmail: e.target.value })
            }
            className="bg-gray-700 border-gray-600 text-gray-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-gray-200">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="bg-gray-700 border-gray-600 text-gray-200"
        />
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        Add Application
      </Button>
    </form>
  );
};