import * as React from "react"
import { Search, MoreHorizontal, Edit, Trash2, MessageSquare } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuAction,
    SidebarInput,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@repo/ui"

const MOCK_CONVERSATIONS = [
    { id: "1", title: "Setup React Project", date: "2 mins ago" },
    { id: "2", title: "Deploy to Vercel", date: "1 hour ago" },
    { id: "3", title: "Refactor API logic", date: "Yesterday" },
    { id: "4", title: "Database migration", date: "2 days ago" },
    { id: "5", title: "Zsh configuration", date: "3 days ago" },
]

export function ConversationList() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [conversations, setConversations] = React.useState(MOCK_CONVERSATIONS)

    const filteredConversations = conversations.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDelete = (id: string) => {
        setConversations((prev) => prev.filter((c) => c.id !== id))
    }

    const handleEdit = (id: string) => {
        // In a real app, this would open a rename dialog
        const newTitle = prompt("Enter new title:")
        if (newTitle) {
            setConversations((prev) =>
                prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
            )
        }
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
            <div className="px-2 py-2">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <SidebarInput
                        placeholder="Search history..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <SidebarGroupContent>
                <SidebarMenu>
                    {filteredConversations.map((conv) => (
                        <SidebarMenuItem key={conv.id}>
                            <SidebarMenuButton asChild>
                                <a href={`#${conv.id}`} className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="truncate">{conv.title}</span>
                                        <span className="text-[10px] text-muted-foreground">{conv.date}</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start" className="w-48">
                                    <DropdownMenuItem onClick={() => handleEdit(conv.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        <span>Rename</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleDelete(conv.id)}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))}
                    {filteredConversations.length === 0 && (
                        <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                            No conversations found.
                        </div>
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
