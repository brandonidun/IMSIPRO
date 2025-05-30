<template>
  <Dialog v-model:open="internalOpen">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription> Update the user details below. </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="submit">
        <div class="space-y-4">
          <Input v-model="form.name" placeholder="Full Name" label="Name" />
          <Input v-model="form.email" placeholder="Email" label="Email" />
          <Select v-model="form.role">
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="administrator">Administrator</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
              <SelectItem value="operator">Operator</SelectItem>
            </SelectContent>
          </Select>
          <Select v-model="form.status">
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter class="mt-6">
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
const props = defineProps<{ open: boolean; user: any }>();
const emitDialog = defineEmits({
  "update:open": (value: boolean) => true,
  save: (user: any) => true,
});

const form = ref({ ...props.user });

const internalOpen = ref(props.open);

watch(
  () => props.open,
  (val) => {
    internalOpen.value = val;
  }
);

watch(internalOpen, (val) => {
  emitDialog("update:open", val);
});

function submit() {
  emitDialog("save", form.value);
  internalOpen.value = false;
}
</script>
