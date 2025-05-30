<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  Folder,
  Forward,
  type LucideIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-vue-next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

defineProps<{
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}>();

const { isMobile } = useSidebar();
const route = useRoute();
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>MANAGEMENT</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in projects" :key="item.name">
        <SidebarMenuButton
          :to="item.url"
          :class="
            cn(
              '[&>svg]:size-[18px] nav-link',
              route.path === item.url && 'router-link-exact-active'
            )
          "
          @click="navigateTo(item.url)"
          :tooltip="item.name"
        >
          <component :is="item.icon" />
          <span>{{ item.name }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
