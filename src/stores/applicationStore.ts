import {create} from "zustand";
import { Application } from "@/types/application";


interface ApplicationState {
    applications: Application[];
    setApplications: (applications: Application[]) => void;
    addApplication: (application:Application) => void;
    updateApplication: (id: string, application: Partial<Application>) => void;
    deleteApplication: (id: string) => void;
}

export const useApplicationStore = create<ApplicationState>((set)=>({
    applications: [],
    setApplications: (applications) => set({applications}),
    addApplication: (application) =>set((state)=>({applications: [application, ...state.applications]})),
    updateApplication: (id, update) => set((state)=> ({
        applications:state.applications.map(app=>app.id === id ? {...app, ...update} : app)
    })),
    deleteApplication: (id) => set((state)=>({
        applications: state.applications.filter(app=>app.id !== id)
    })) 
}))