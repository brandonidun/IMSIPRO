<script setup lang="ts">
import { computed } from 'vue';
import { ChevronsRight } from 'lucide-vue-next';
import { PaginationLast } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import type { PaginationLastProps } from 'radix-vue';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const props = withDefaults(
  defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(),
  {
    asChild: true,
  },
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="cn('w-10 h-10 p-0', props.class)" variant="outline">
      <slot>
        <ChevronsRight class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>
