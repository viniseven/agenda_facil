import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const groupMenu = [
  {
    title: "Dashboard",
    url: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    url: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: Users,
  },
];

const groupOthers = [
  {
    title: "Planos",
    url: "/plans",
    icon: Wallet,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border border-gray-100 px-4 py-6 font-semibold text-gray-500">
      <SidebarHeader className="flex items-center border-b border-gray-100 pb-6">
        <Image src="/logo.svg" alt="Agenda fácil" width={138} height={27} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-blue-50 hover:text-blue-500"
                  >
                    <Link href={item.url} className="py-5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">
            Outros
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupOthers.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-blue-50 hover:text-blue-500"
                  >
                    <Link href={item.url} className="py-5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span>Clínica Teste</span>
      </SidebarFooter>
    </Sidebar>
  );
}
