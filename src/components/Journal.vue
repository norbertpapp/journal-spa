<template>
  <article class="journal">
    <time :datetime="formatDate(journal.date)">{{ formatDate(journal.date) }}</time>
    <VueMarkdown :source="journal.content" />
    <small><code>{{ journal.id }}</code></small>
    <span class="journal__delete" @click="$emit('deleteJournal', journal.id)">&#215;</span>
  </article>
</template>
<script lang="ts" setup>
import VueMarkdown from 'vue-markdown-render';

interface Journal {
  id: string;
  date: Date;
  content: string;
}

/* eslint-disable  @typescript-eslint/no-unused-vars */
const props = defineProps<{
  journal: Journal;
}>();

defineEmits(['deleteJournal']);

const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-UK');
</script>
<style lang="scss" scoped>
time {
  display: inline-block;
  margin-bottom: 1rem;
}
article {
  margin-bottom: unset;
}
.journal__delete {
  display: inline-block;
  line-height: 1;
  vertical-align: baseline;
  border: 1px solid;
  padding: 0.2rem 0.3rem;
  cursor: pointer;
}
</style>