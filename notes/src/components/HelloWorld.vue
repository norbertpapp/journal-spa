// filepath: /home/user/work/notes/src/components/HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<style scoped>
.hello {
  text-align: center;
}
</style>