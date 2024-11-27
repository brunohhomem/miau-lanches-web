import { AppSidebar } from './app-sidebar'
import { SidebarProvider } from './ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <main>{children}</main>
    </SidebarProvider>
  )
}
