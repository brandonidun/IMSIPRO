<script setup lang="ts">
type Props = {
  description: string;
  title?: string;
  icon?: Component;
};
type Slots = {
  default?: () => any;
};

defineProps<Props>();
const slots = defineSlots<Slots>();

const route = useRoute();

const headingId = computed(() =>
  route.path.replace(/^\//, "").replaceAll("/", "-")
);
</script>

<template>
  <section
    role="doc-introduction"
    :aria-labelledby="headingId"
    class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 p-5"
  >
    <div class="flex flex-col md:flex-row gap-5 w-full md:w-auto">
      <div
        class="size-[4rem] grow bg-gray-100 flex items-center justify-center"
        style="border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%"
      >
        <Component :is="icon" class="text-gray-500 size-15 text-center" />
      </div>
      <div class="w-[calc(100%-4rem)]">
        <h1 :id="headingId" class="text-3xl font-bold">
          {{ title }}
        </h1>
        <p class="text-gray-500">
          {{ description }}
        </p>
      </div>
    </div>
    <div v-if="slots.default" class="w-full md:w-auto mt-4 md:mt-0">
      <slot />
    </div>
  </section>
</template>

<style scoped></style>
