<script setup lang="ts">
import { ChevronRight, type LucideIcon } from "lucide-vue-next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const route = useRoute();

defineProps<{
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>MONITORING</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
      >
        <SidebarMenuItem>
          <SidebarMenuButton
            :to="item.url"
            :class="
              cn(
                '[&>svg]:size-[18px] nav-link',
                route.path === item.url && 'router-link-exact-active'
              )
            "
            @click="navigateTo(item.url)"
            :tooltip="item.title"
          >
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </SidebarMenuButton>
          <template v-if="item.items?.length">
            <CollapsibleTrigger as-child>
              <SidebarMenuAction class="data-[state=open]:rotate-90">
                <ChevronRight />
                <span class="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem
                  v-for="subItem in item.items"
                  :key="subItem.title"
                >
                  <SidebarMenuSubButton
                    :to="subItem.url"
                    :class="
                      cn(
                        '[&>svg]:size-[18px] nav-link',
                        route.path === subItem.url && 'router-link-exact-active'
                      )
                    "
                    @click="navigateTo(subItem.url)"
                    :tooltip="item.title"
                  >
                    <span>{{ subItem.title }}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>

<style>
.nav-link:hover,
.router-link-exact-active {
  /* Add your styles here */
  /* border: 1px solid #17a34a29; */
  background-color: #ffffff;
  color: #0b2166;

  svg {
    color: #0b2166;
  }
}
</style>
