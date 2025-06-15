<template>
  <button class="journal__create" @click="toggleModal">&plus; Create new</button>
  <dialog :open="showModal">
    <article>
      <header>
        <button aria-label="Close" rel="prev" @click="toggleModal"></button>
        <h3>Create new journal</h3>
      </header>
      <form 
        @submit.prevent="$emit('createNewJournal', {
          id: journalId,
          date: new Date(journalDate),
          content: journalContent,
        })"
      >
        <label for="date">Date</label>
        <input v-model="journalDate" type="date" name="date" id="date" required />
        <label for="content">Journal content (markdown) <span @click="useTemplate">[Use template]</span></label>
        <section class="grid">
          <textarea v-model="journalContent" name="content" id="content" cols="30" rows="10" required></textarea>
          <VueMarkdown class="preview" :source="journalContent" />
        </section>
        <button type="submit" @click="toggleModal" :disabled="isContentEmpty">Save</button>
      </form>
    </article>
  </dialog>
</template>
<script lang="ts" setup>
import { uuidv4 } from '@/utils';
import { computed, ref } from 'vue';
import VueMarkdown from 'vue-markdown-render';

const props = defineProps<{
  date?: Date,
  content?: string,
  isOpen?: boolean,
}>();

const journalId = ref(uuidv4());
const journalDate = ref(props.date || new Date().toLocaleDateString('en-CA'));
const journalContent = ref(props.content || '');
const showModal = ref(props.isOpen);
const isContentEmpty = computed(() => journalContent.value.length === 0);

defineEmits(['createNewJournal']);

const resetJournalData = ():void => {
  journalId.value = uuidv4();
  journalDate.value = new Date().toLocaleDateString('en-CA');
  journalContent.value = '';
};

const toggleModal = () => {
  showModal.value = !showModal.value;
  if (showModal.value) {
    resetJournalData()
  };
};

const useTemplate = () => {
  const template = 
`Yesterday:
- Item
- Item

Today:
- Item
- Item`;

  journalContent.value = journalContent.value + template;
}

</script>
<style lang="scss">
label {
  margin-right: 1rem;
}
textarea {
  margin-bottom: unset;
}
.preview {
  --pico-border-color: var(--pico-form-element-border-color);
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
}
.journal__create {
  margin-bottom: 1rem;
  margin-right: 1rem;
}
</style>