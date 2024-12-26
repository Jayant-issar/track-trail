import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface Props {
  isOpen: boolean;
  application: Application | null;
  onClose: () => void;
  onUpdate: (id: string, status: Application["status"]) => void;
}

export const EditStatusDialog = ({
  isOpen,
  application,
  onClose,
  onUpdate,
}: Props) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Current Status:</p>
            <Select
              defaultValue={application.status}
              onValueChange={(value: Application["status"]) =>
                onUpdate(application.id, value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="ghosting">No Response</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};