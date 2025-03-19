import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { ChatRoomList } from "@/components/layout/sidebar/models";
import { SidebarActionButton } from "@/components/common";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarActionButton />
      </SidebarHeader>
      <SidebarContent>
        <ChatRoomList />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
