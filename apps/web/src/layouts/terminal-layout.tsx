import {
    Sidebar,
    SidebarContent,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
    SidebarRail,
} from "@repo/ui"
import { ShellioSidebarHeader } from "@/components/navigation/sidebar-header"
import { ConversationList } from "@/components/navigation/conversation-list"
import { UserProfile } from "@/components/navigation/user-profile"
import { ThemeProvider } from "@/components/theme-provider"

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider>
                <div className="flex min-h-svh w-full bg-background">
                    <Sidebar collapsible="icon">
                        <ShellioSidebarHeader />
                        <SidebarContent>
                            <ConversationList />
                        </SidebarContent>
                        <UserProfile />
                        <SidebarRail />
                    </Sidebar>
                    <SidebarInset>
                        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
                            <SidebarTrigger className="-ml-1" />
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </ThemeProvider>
    )
}