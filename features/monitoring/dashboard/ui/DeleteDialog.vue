<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <strong>{{ user?.name }}</strong
          >? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="mt-6 flex justify-end gap-2">
        <DialogClose as-child>
          <Button variant="ghost" @click="emitDialog('update:open', false)"
            >Cancel</Button
          >
        </DialogClose>
        <Button variant="destructive" @click="confirmDelete">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean; user: any }>();
const emitDialog = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "confirm", user: any): void;
}>();

function confirmDelete() {
  emitDialog("confirm", props.user);
  emitDialog("update:open", false);
}
</script>
