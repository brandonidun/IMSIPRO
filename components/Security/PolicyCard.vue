<script setup>
defineProps({
  policy: Object,
});
defineEmits(["update"]);

import { Pencil } from "lucide-vue-next";
</script>

<template>
  <div class="border p-4 rounded-xl shadow-sm bg-white space-y-2">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-lg">{{ policy.name }}</h3>
      <Button
        variant="ghost"
        size="icon"
        @click="
          $emit(
            'update',
            policy.key,
            policy.type === 'boolean' ? !policy.value : policy.value
          )
        "
      >
        <Pencil class="w-4 h-4" />
      </Button>
    </div>
    <p class="text-sm text-gray-500">{{ policy.description }}</p>
    <div class="text-sm">
      <span class="font-medium">Current:</span>
      <span v-if="policy.type === 'boolean'">
        <span
          :class="policy.value ? 'text-green-600' : 'text-red-500'"
          class="ml-2 font-bold"
        >
          {{ policy.value ? "Enabled" : "Disabled" }}
        </span>
      </span>
      <span v-else class="ml-2">{{ policy.value }}</span>
    </div>
  </div>
</template>
