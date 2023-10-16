<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps({
  error: {
    type: Object,
  },
});

const router = useRouter();
</script>

<template>
  <div>{{ error!.statusCode }} error!</div>
</template>
