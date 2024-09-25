<script setup>
import { AppState } from '@/AppState';
import { eventsService } from '@/services/EventsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const towerEvents = computed(() => AppState.towerEvents)

onMounted(() => {
  getAllEvents()
})

async function getAllEvents() {
  try {
    await eventsService.getAllEvents()
  }
  catch (error) {
    Pop.meow(error);
  }
}
</script>

<template>
  <div class="container-fluid">
    <section class="row">splash</section>
    <section class="row mx-5">
      <h5>
        How Tower works
      </h5>
    </section>
    <section class="row mx-5">
      <h5>
        Explore top categories
      </h5>
    </section>
    <section class="row mx-5 g-3 mb-5">
      <h5>
        Upcoming Events
      </h5>
      <div v-for="event in towerEvents" :key="event.id" class="col-6 col-md-4">
        <EventCard :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
