<script setup>
defineProps({
  title: String,
  series: Array,
  options: Object,
  icon: [Object, Function],
  color: String,
  type: String,
  height: Number,
});
</script>

<template>
  <Card class="shadow-none border bg-muted/50">
    <CardHeader class="flex items-center justify-between">
      <CardTitle class="text-base text-gray-500">{{ title }}</CardTitle>
      <component :is="icon" :class="` text-${color}-700`" />
    </CardHeader>
    <CardContent class="mt-4">
      <slot></slot>
      <VueApexCharts
        width="100%"
        :height="height || 300"
        :options="options"
        :series="series"
        :type="type || 'line'"
      />
    </CardContent>
  </Card>
</template>
