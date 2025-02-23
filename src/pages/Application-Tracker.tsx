import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { ApplicationForm } from "@/components/application/ApplicationForm";
import { Application } from "@/types/application";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationStats } from "@/components/application/ApplicationStats";
import { ApplicationTable } from "@/components/application/ApplicationTable";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { createApplication, getApplications } from "@/actions/applicationTracker";
import { toast } from "@/hooks/use-toast";
import { EditStatusDialog } from "@/components/EditStatusDialog";
import { useApplicationStore } from "@/stores/applicationStore";
import { useApplicationsQuery } from "@/queries/applicationQueries";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {}

const ApplicationTracker = (props: Props) => {
  const { getToken } = useAuth(); // Move useAuth hook inside the component
  // const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const {applications, setApplications} = useApplicationStore();
  //load existing applications on component mount
  
  const {data:allApplicationResponse,isLoading} = useApplicationsQuery();
  
  useEffect(()=>{
    if(!applications){
      if(allApplicationResponse){
        console.log("the data is ",allApplicationResponse.data);
        
        setApplications(allApplicationResponse.data);
      }
    }
    
  },[allApplicationResponse])
  const handleAddApplication = async (
    newApp: Omit<Application, "id" | "lastUpdated">
  ) => {
    try {
      const token = await getToken();
      const {data, error} = await createApplication(newApp, token);
      
      if(error){
        toast({
          title: "Error",
          description: "Failed to add application",
        });
        return;
      }
      
      if(data){
        toast({
          title: "Application Added",
          description: "Your application has been successfully tracked!",
        });
        
        const application: Application = {
          ...newApp,
          id: crypto.randomUUID(),
          lastUpdated: new Date().toISOString(),
        };
        
        setApplications([application, ...applications]);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add application",
      });
    }
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
    interviewing: applications.filter((app) => app.status === "interviewing").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    response_rate: applications.length > 0
      ? Math.round(
          ((applications.filter(
            (app) => app.status !== "ghosting" && app.status !== "waiting"
          ).length / applications.length) * 100)
        )
      : 0,
  };

  if(isLoading){
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto py-8 space-y-8">
          <div className="max-w-full w-full justify-between bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <Skeleton className="h-8 w-[200px] bg-gray-700" />
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 bg-gray-800 rounded-lg" />
              ))}
            </div>
            
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-12 bg-gray-800 w-full" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 bg-gray-800 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="w-full">
          <div className="space-y-8">
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
          </div>
        </div>

        <EditStatusDialog
          isOpen={!!selectedApp}
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onUpdate={handleUpdateStatus}
        />
      </div>
    </div>
  );
}

export default ApplicationTracker;