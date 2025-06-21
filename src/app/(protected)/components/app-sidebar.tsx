"use client";

import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  Wallet,
  LogOutIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";

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

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };

  return (
    <Sidebar className="border-sidebar-border bg-sidebar border px-4 py-6 font-semibold text-gray-500">
      <SidebarHeader className="flex items-center border-b pb-6">
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
                    className="hover:text-primary focus:bg-blue-600"
                    isActive={pathname === item.url}
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
          <SidebarGroupLabel className="text-muted-foreground">
            Outros
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupOthers.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:text-primary"
                    isActive={pathname == item.url}
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
      <SidebarFooter className="list-none">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="hover:bg-background cursor-pointer"
            >
              <SidebarMenuButton>
                <Avatar>
                  <AvatarFallback className="rounded-lg p-2">CV</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground">
                    {session.data?.user?.clinic.name}
                  </p>
                  <p className="text-xs">{session.data?.user.email}</p>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <LogOutIcon onClick={handleSignOut} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
