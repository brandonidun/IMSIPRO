<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const breadcrumbs = useBreadcrumbs();
const data = {
  user: {
    name: "Sárosi",
    email: "sarosi@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
</script>

<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2">
          <div class="flex justify-between w-full">
            <div class="flex items-center gap-2 px-4">
              <SidebarTrigger class="-ml-1" />
              <Separator
                orientation="vertical"
                class="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <template v-for="(crumb, i) in breadcrumbs" :key="i">
                    <BreadcrumbItem v-if="!crumb.isLast">
                      <template v-if="crumb.href">
                        <NuxtLink :to="crumb.href">{{ crumb.name }}</NuxtLink>
                      </template>
                      <template v-else>
                        <BreadcrumbPage>{{ crumb.name }}</BreadcrumbPage>
                      </template>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator v-if="!crumb.isLast" />
                    <BreadcrumbItem v-else>
                      <BreadcrumbPage>{{ crumb.name }}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </template>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div class="flex items-center justify-end w-3xs px-4">
              <NavUser :user="data.user" />
            </div>
          </div>
        </header>
        <div class="px-2">
          <slot></slot>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
