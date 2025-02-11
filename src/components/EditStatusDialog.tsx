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
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-200">Update Application Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 border-2 border-red-500">
          <div>
            <p className="text-sm font-medium mb-2 text-gray-300">Current Status:</p>
            <Select
              defaultValue={application.status}
              onValueChange={(value: Application["status"]) =>
                onUpdate(application.id, value)
              }
            >
              <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                <SelectValue />
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
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};