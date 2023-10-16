<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const seq = route.params?.seq ?? 0;
</script>

<template>
  <div>
    <p>pc dynamic routing page - seq : {{ seq }}</p>
  </div>
</template>
