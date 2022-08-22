<template>
  <WujieVue
    width="100%"
    height="100%"
    name="match"
    :url="actionUrl"
    :sync="true"
    :alive="true"
    :props="{ jump }"
  >
  </WujieVue>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const actionUrl = ref('/#/child');

const jump = (name: string) => {
  router.push({ name });
};
</script>

<style scoped></style>
