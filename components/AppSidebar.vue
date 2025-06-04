<script setup lang="ts">
import {
  ChartNetwork,
  Award,
  SatelliteDish,
  TriangleAlert,
  BadgeCent,
  ShieldEllipsis,
  GlobeLock,
  Map,
  LogOut,
  FileChartPie,
} from "lucide-vue-next";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { type SidebarProps } from "@/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "inset",
});

const data = {
  user: {
    name: "Admin",
    email: "admin@mail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/monitoring/dashboard",
      icon: ShieldEllipsis,
      isActive: true,
    },
    {
      title: "Spectrum Analyzer",
      url: "/monitoring/spectrum-analyzer",
      icon: ChartNetwork,
    },
    {
      title: "Analytics",
      url: "/monitoring/analytics",
      icon: FileChartPie,
    },
    {
      title: "Device Map",
      url: "/monitoring/device-map",
      icon: Map,
    },
  ],
  projects: [
    {
      name: "Device Configuration",
      url: "/management/device-configuration",
      icon: SatelliteDish,
    },
    {
      name: "Security Policies",
      url: "/management/security-policies",
      icon: TriangleAlert,
    },
  ],
  analytics: [
    {
      title: "Billing",
      url: "",
      icon: BadgeCent,
      isActive: true,
    },
    {
      title: "Subscription",
      url: "",
      icon: Award,
      isActive: true,
    },
  ],
};
function handleLogout() {
  localStorage.removeItem("loginTime");
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <img
        src="/assets/images/logo2.png"
        class="px-2"
        style="filter: invert(1)"
        alt="Sárosi"
      />
      <SidebarMenu>
        <SidebarMenuItem class="py-2">
          <SidebarMenuButton size="lg" class="bg-muted/90" as-child>
            <a href="#">
              <div>
                <GlobeLock class="size-8 stroke-blue-800" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-xl text-primary font-semibold"
                  >SÁROSI</span
                >
                <span class="truncate text-xs text-muted-foreground">
                  Surveillance Management</span
                >
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
      <NavAnalytics :analytics="data.analytics" />
    </SidebarContent>
    <SidebarFooter>
      <!-- <NavUser :user="data.user" /> -->
      <NuxtLink to="/auth" class="flex items-center gap-2">
        <SidebarMenuButton @click="handleLogout">
          <LogOut />
          Log out
        </SidebarMenuButton>
      </NuxtLink>
    </SidebarFooter>
  </Sidebar>
</template>
