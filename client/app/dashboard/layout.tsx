// import Appbar from "@/components/Appbar"
import Appbar from "@/components/Appbar"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Appbar/>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
