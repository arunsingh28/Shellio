import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@repo/ui"
import logo from "@/assets/shellio-logo.png"

export function ShellioSidebarHeader() {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <img src={logo} alt="Shellio Logo" className="size-6 object-contain" />
                        </div>
                        <div className="grid flex-1 text-left text-sm适应 leading-tight">
                            <span className="truncate font-semibold">Shellio</span>
                            <span className="truncate text-xs text-muted-foreground font-mono">v1.0.0-beta</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}
