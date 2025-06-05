<script setup lang="ts">
import { ref } from "vue";
import {
  Pencil,
  Trash,
  Eye,
  MoreVertical,
  MapPin,
  BarChart3,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const props = defineProps<{
  actions: Array<"edit" | "delete" | "view" | "locate" | "analytics">;
}>();

const emit = defineEmits<{
  (e: "edit" | "delete" | "view" | "locate" | "analytics"): void;
}>();

const iconMap = {
  edit: { icon: Pencil, label: "Edit" },
  delete: { icon: Trash, label: "Delete" },
  view: { icon: Eye, label: "View" },
  locate: { icon: MapPin, label: "Locate" },
  analytics: { icon: BarChart3, label: "Analytics" },
};

const handleClick = (
  action: "edit" | "delete" | "view" | "locate" | "analytics"
) => {
  emit(action);
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <template v-if="actions.length <= 2">
      <template v-for="action in actions" :key="action">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-muted-foreground hover:text-primary"
          @click="handleClick(action)"
        >
          <component :is="iconMap[action].icon" class="w-4 h-4" />
        </Button>
      </template>
    </template>

    <template v-else>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8 text-muted-foreground hover:text-primary"
          >
            <MoreVertical class="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            v-for="action in actions"
            :key="action"
            class="text-gray-700 hover:bg-gray-100"
            @click="handleClick(action)"
          >
            <component :is="iconMap[action].icon" class="w-4 h-4 mr-2" />
            {{ iconMap[action].label }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
  </div>
</template>
