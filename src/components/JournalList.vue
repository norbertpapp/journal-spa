<template>
  <section class="journals grid">
    <Journal 
      v-for="journal in journals" 
      :journal="journal" 
      @delete-journal="$emit('deleteJournal', journal.id)"  
      v-bind:key="journal.id" 
    />
  </section>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import Journal from './Journal.vue';
   
const props = defineProps({
  journals: {
    type: Array,
    default: undefined,
  }
});

</script>
<style lang="scss">
@media screen and (min-width: 720px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(32%, 1fr));
  }
}
@media screen and (max-width: 719px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
  }
}
</style>