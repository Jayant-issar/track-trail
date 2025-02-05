import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ColdApproach } from "@/types/coldApproach";
import { ColdApproachForm } from "./ColdApproachForm";
import { ColdApproachList } from "./ColdApproachList";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const ColdEmailForm = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [approaches, setApproaches] = useState<ColdApproach[]>([]);

  const handleSubmit = (formData: Omit<ColdApproach, "id" | "status" | "sentDate">) => {
    const newApproach: ColdApproach = {
      id: crypto.randomUUID(),
      ...formData,
      status: "unseen",
      sentDate: new Date().toISOString(),
    };
    setApproaches([newApproach, ...approaches]);
    setShowForm(false);
    toast({
      title: "Approach Created",
      description: "Your cold approach has been saved and tracked!",
    });
  };

  const updateApproachStatus = (id: string, newStatus: ColdApproach["status"]) => {
    setApproaches(
      approaches.map((approach) =>
        approach.id === id ? { ...approach, status: newStatus } : approach
      )
    );
    toast({
      title: "Status Updated",
      description: "Cold approach status has been updated successfully!",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Cold Approach
        </Button>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-200">New Cold Approach</DialogTitle>
          </DialogHeader>
          <ColdApproachForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      <ColdApproachList
        approaches={approaches}
        onStatusUpdate={updateApproachStatus}
      />
    </div>
  );
};