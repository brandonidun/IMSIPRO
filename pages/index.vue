<script setup lang="ts">
definePageMeta({
  colorMode: "dark",

  middleware() {
    return navigateTo("/auth");
  },
});
</script>
