import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from './ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen
      className="flex justify-center items-center h-screen bg-gray-100"
    >
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  )
}
