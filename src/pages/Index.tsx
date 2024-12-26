import { useState } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplicationStatusBadge } from "@/components/ApplicationStatusBadge";
import { StatsCard } from "@/components/StatsCard";
import { Application } from "@/types/application";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Mail,
  MessageSquare,
  Send,
  UserCheck,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColdEmailForm } from "@/components/ColdEmailForm";
import { EditStatusDialog } from "@/components/EditStatusDialog";
import { useTheme } from "next-themes";

const Index = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const { setTheme } = useTheme();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleAddApplication = (
    newApp: Omit<Application, "id" | "lastUpdated">
  ) => {
    const application: Application = {
      ...newApp,
      id: crypto.randomUUID(),
      lastUpdated: new Date().toISOString(),
    };
    setApplications([application, ...applications]);
  };

  const handleUpdateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, status: newStatus, lastUpdated: new Date().toISOString() }
          : app
      )
    );
    setSelectedApp(null);
  };

  const stats = {
    total: applications.length,
    interviewing: applications.filter((app) => app.status === "interviewing")
      .length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    response_rate:
      applications.length > 0
        ? Math.round(
            ((applications.filter(
              (app) => app.status !== "ghosting" && app.status !== "waiting"
            ).length /
              applications.length) *
              100)
          )
        : 0,
  };

  return (
    <div className="container mx-auto py-8 space-y-8 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Application Tracker</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setTheme("dark")}
            className="w-[100px]"
          >
            Dark Mode
          </Button>
          <Button
            variant="outline"
            onClick={() => setTheme("light")}
            className="w-[100px]"
          >
            Light Mode
          </Button>
        </div>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="cold-emails">Cold Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-4">
            <StatsCard
              title="Total Applications"
              value={stats.total}
              icon={<Send className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Currently Interviewing"
              value={stats.interviewing}
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Offers Received"
              value={stats.accepted}
              icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Response Rate"
              value={`${stats.response_rate}%`}
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Application</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Track New Application</DialogTitle>
                </DialogHeader>
                <ApplicationForm onSubmit={handleAddApplication} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied Via</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Building2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">
                        No applications yet. Start tracking your job search!
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {app.companyName}
                      </TableCell>
                      <TableCell>{app.position}</TableCell>
                      <TableCell>
                        <ApplicationStatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="capitalize">{app.method}</TableCell>
                      <TableCell>
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedApp(app)}
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
        </TabsContent>

        <TabsContent value="cold-emails" className="space-y-4">
          <ColdEmailForm />
        </TabsContent>
      </Tabs>

      <EditStatusDialog
        isOpen={!!selectedApp}
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onUpdate={handleUpdateStatus}
      />
    </div>
  );
};

export default Index;