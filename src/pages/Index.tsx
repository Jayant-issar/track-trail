import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplicationStatusBadge } from "@/components/ApplicationStatusBadge";
import { Application } from "@/types/application";
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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Index = () => {
  const [applications, setApplications] = useState<Application[]>([]);
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
        <NavigationMenu className="max-w-full w-full justify-between bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <NavigationMenuList>
            <NavigationMenuItem>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Application Tracker
              </span>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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