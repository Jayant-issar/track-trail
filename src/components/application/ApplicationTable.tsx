import { Application } from "@/types/application";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplicationTableProps {
  applications: Application[];
  onStatusEdit: (application: Application) => void;
}

export const ApplicationTable = ({
  applications,
  onStatusEdit,
}: ApplicationTableProps) => {
  return (
    <div className="rounded-md border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-gray-300">Company</TableHead>
            <TableHead className="text-gray-300">Position</TableHead>
            <TableHead className="text-gray-300">Status</TableHead>
            <TableHead className="text-gray-300">Applied Via</TableHead>
            <TableHead className="text-gray-300">Applied Date</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <Building2 className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-400">
                  No applications yet. Start tracking your job search!
                </p>
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id} className="border-gray-700">
                <TableCell className="font-medium text-gray-200">
                  {app.companyName}
                </TableCell>
                <TableCell className="text-gray-200">{app.position}</TableCell>
                <TableCell>
                  <ApplicationStatusBadge status={app.status} />
                </TableCell>
                <TableCell className="capitalize text-gray-200">
                  {app.method}
                </TableCell>
                <TableCell className="text-gray-200">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onStatusEdit(app)}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};