<script setup lang="ts">
defineProps<{
  columns: { key: string; label: string; sortable?: boolean }[];
  rows: any[];
  // paginatedRows: any[];
  sortKey: string | null;
  sortOrder: "asc" | "desc";
  toggleSort: (key: string) => void;
}>();
import { ArrowUpDown, MoveUp, MoveDown } from "lucide-vue-next";
</script>
<template>
  <div class="rounded-xl border border-gray-200 overflow-hidden">
    <slot name="header" />

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              @click="col.sortable ? toggleSort(col.key) : null"
              class="px-6 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap cursor-pointer"
              :class="{ 'hover:bg-gray-100': col.sortable }"
            >
              <div class="flex items-center gap-1">
                {{ col.label }}
                <span v-if="col.sortable && sortKey === col.key">
                  <MoveUp v-if="sortOrder === 'asc'" class="w-4 h-4" />
                  <MoveDown v-else-if="sortOrder === 'desc'" class="w-4 h-4" />
                </span>
                <span v-else-if="col.sortable" class="text-gray-800">
                  <ArrowUpDown class="w-4 h-4" />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-if="rows.length === 0" class="text-center">
            <td
              :colspan="columns.length"
              class="px-6 py-4 text-gray-400 text-sm"
            >
              No data available.
            </td>
          </tr>

          <tr
            v-for="(row, i) in rows"
            :key="i"
            @click="$emit('row-click', row)"
            class="cursor-pointer hover:bg-gray-100"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-6 py-4 text-sm text-gray-900"
            >
              <slot :name="`cell-${col.key}`" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="p-4">
      <slot name="footer" />
    </div>
  </div>
</template>
