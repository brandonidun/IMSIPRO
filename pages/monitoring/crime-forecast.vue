<script setup lang="ts">
import { Siren } from "lucide-vue-next";
definePageMeta({
  breadcrumb: "Crime Forecast",
});
</script>
<template>
  <main class="flex flex-col gap-4 p-4 pt-0">
    <PageIntroduction
      title="Crime Forecast"
      description="View the Intel Stream"
      :icon="Siren"
    />
  </main>
</template>
