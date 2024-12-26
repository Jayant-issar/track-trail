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
import { ApplicationStats } from "@/components/ApplicationStats";
import { ApplicationTable } from "@/components/ApplicationTable";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Application Tracker
          </h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setTheme("dark")}
              className="w-[100px] bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50"
            >
              Dark Mode
            </Button>
            <Button
              variant="outline"
              onClick={() => setTheme("light")}
              className="w-[100px] bg-gray-800/50 border-gray-700 text-gray-200 hover:bg-gray-700/50"
            >
              Light Mode
            </Button>
          </div>
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-gray-700/50"
            >
              Applications
            </TabsTrigger>
            <TabsTrigger
              value="cold-emails"
              className="data-[state=active]:bg-gray-700/50"
            >
              Cold Emails
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-8">
            <ApplicationStats stats={stats} />
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Add Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-gray-200">
                      Track New Application
                    </DialogTitle>
                  </DialogHeader>
                  <ApplicationForm onSubmit={handleAddApplication} />
                </DialogContent>
              </Dialog>
            </div>

            <ApplicationTable
              applications={applications}
              onStatusEdit={setSelectedApp}
            />
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
    </div>
  );
};

export default Index;