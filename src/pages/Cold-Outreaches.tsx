import { useState } from "react";
import { Application } from "@/types/application";
import { ColdEmailForm } from "@/components/coldapproach/ColdEmailForm";
import { EditStatusDialog } from "@/components/EditStatusDialog";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { useColdOutreachStore } from '@/stores/coldOutreachStore';

const ColdOutReach = () => {
  const { coldOutreaches, setColdOutreaches } = useColdOutreachStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto py-8 space-y-8">
        <NavigationMenu className="max-w-full w-full justify-between bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <NavigationMenuList>
            <NavigationMenuItem>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cold Outreaches
              </span>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div defaultValue="applications" className="w-full">
          
            <ColdEmailForm />
        </div>

        
      </div>
    </div>
  );
};

export default ColdOutReach;
