<script setup lang="ts">
import { Filter, Download } from "lucide-vue-next";

const props = defineProps<{
  title: string;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue", "filter", "export"]);

function updateSearch(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="px-6 py-4 border-b">
    <div class="mb-2 flex justify-between items-center lg:mb-0">
      <h2 class="text-lg font-semibold text-primary">{{ title }}</h2>
      <div class="flex flex-row gap-2">
        <div class="hidden md:flex flex-wrap max-w-sm items-center">
          <Input
            id="search"
            type="text"
            :model-value="modelValue"
            @input="updateSearch"
            class="shadow-none"
            placeholder="Search..."
          />
        </div>
        <Button
          @click="$emit('filter')"
          class="flex items-center gap-1 px-3 py-2 bg-gray-100 shadow-none rounded-md text-sm text-primary hover:bg-gray-300"
        >
          <Filter class="w-4 h-4 text-gray-700" />
          <span class="text-gray-700 hidden md:block">Filter</span>
        </Button>

        <Button
          @click="$emit('export')"
          class="flex items-center gap-1 px-3 py-2 bg-gray-100 shadow-none rounded-md text-sm text-primary hover:bg-gray-300"
        >
          <Download class="w-4 h-4 text-gray-700" />
          <span class="text-gray-700 hidden md:block">Export</span>
        </Button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 items-center md:hidden">
      <Input
        id="search"
        type="text"
        :model-value="modelValue"
        @input="updateSearch"
        class="shadow-none"
        placeholder="Search..."
      />
    </div>
  </div>
</template>
