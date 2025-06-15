<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue';
import { checkLocalStorage, initFromLocalStorage, setLocalStorage } from './utils';
import CreateJournal from './components/CreateJournal.vue';
import JournalList from './components/JournalList.vue';

interface Journal {
  id: string;
  date: Date;
  content: string;
}

const journals: Ref<Journal[]> = ref([]);
const darkThemeEnabled: Ref<boolean> = ref(false);
const themeIcon = computed(() => darkThemeEnabled.value ? '🌝' : '🌞')

/* eslint-disable  @typescript-eslint/no-explicit-any */
const saveJournal = (item: any) => {
  const currentJournals: Journal[] = [...journals.value];
  currentJournals.unshift(item);
  journals.value = [...currentJournals];
  setLocalStorage(journals.value as any[]);
};

const deleteJournal = (id: string) => {
  console.log(id);
  const currentJournals: any[] = [...journals.value];
  journals.value = currentJournals.filter(item => item.id !== id);
  setLocalStorage(journals.value as any[]);
}

const toggleTheme = () => {
  darkThemeEnabled.value = !darkThemeEnabled.value;
  document.documentElement.setAttribute('data-theme', darkThemeEnabled.value ? 'dark' : 'light');
}

onMounted(() => {
  checkLocalStorage() ? journals.value = initFromLocalStorage() : setLocalStorage([]);
})

</script>

<template>
  <header>
    <div class="wrapper">
    </div>
  </header>

  <main class="container">
    <CreateJournal 
      @create-new-journal="saveJournal"
    />
    <span class="theme-switcher" @click="toggleTheme" v-html="themeIcon"></span>
    <JournalList 
      :journals="journals"
      @delete-journal="deleteJournal" 
    />
  </main>
</template>

<style lang="scss" scoped>
main {
  margin-top: 2rem;
}

.theme-switcher {
  display: inline-block;
  font-size: 150%;
  cursor: pointer;
}
</style>
