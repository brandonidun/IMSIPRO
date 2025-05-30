<template>
  <div class="flex justify-between items-center py-2 text-sm">
    <div>Showing {{ rows.length }} of {{ total }} results</div>
    <div class="flex gap-4 items-center">
      <button
        @click="prev"
        :disabled="page === 1"
        class="px-2 py-1 border rounded disabled:opacity-50"
      >
        ‹
      </button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button
        @click="next"
        :disabled="page === totalPages"
        class="px-2 py-1 border rounded disabled:opacity-50"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  total: number;
  totalPages: number;
  rows: any[];
}>();

const emit = defineEmits(["next", "prev"]);

const next = () => emit("next");
const prev = () => emit("prev");
</script>
