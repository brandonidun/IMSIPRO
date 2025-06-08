<script setup lang="ts">
defineProps<{
  title: string;
  value: number | string;
  icon?: any;
  color?: string;
}>();
</script>

<template>
  <Card class="shadow-none border-1 bg-muted/50">
    <CardHeader>
      <div class="flex items-center justify-between">
        <div class="flex flex-col items-start">
          <CardTitle class="text-sm text-gray-500">{{ title }}</CardTitle>
          <CardDescription
            class="text-2xl font-bold mt-2 text-primary whitespace-nowrap"
          >
            <span>{{ value }}</span>
          </CardDescription>
        </div>
        <div
          v-if="icon"
          :class="`p-3 rounded-full flex justify-center items-center border-2 bg-black-100 border-${color}-200`"
        >
          <component :is="icon" :class="`text-${color}-800`" />
        </div>
      </div>
    </CardHeader>
  </Card>
</template>
