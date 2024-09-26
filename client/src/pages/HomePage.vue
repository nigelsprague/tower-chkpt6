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
  <div class="container-fluid p-0">
    <section class="row m-0 img-fluid splash align-items-center px-md-5"
      style="background-image: url(https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
      <div class="col-md-6 text-white text-shadow">
        <h4>Event management for people, by people</h4>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates doloremque cum sit voluptatibus, a
          voluptas ad amet animi debitis inventore ipsam eos molestias aliquid placeat? Dolores architecto eos ea sunt.
        </p>
      </div>
    </section>
    <section class="row justify-content-evenly mx-2 mx-md-5">
      <h5>How Tower works</h5>
      <div class="col-5 d-flex bg-white p-3">
        <h6>Discover</h6>
      </div>
      <div class="col-5 d-flex bg-white p-3">
        <i class="mdi mdi-plus text-success fs-2 me-2"></i>
        <div>
          <h6>Start an event</h6>
          <p>Create your own Tower event, and draw from a community of millions</p>
          <span class="text-success selectable" role="button">Create an event</span>
        </div>
      </div>
    </section>
    <section class="row mx-2 mx-md-5">
      <h5>Explore top categories</h5>
    </section>
    <section class="row mx-2 mx-md-5 g-3 mb-5">
      <h5>Upcoming Events</h5>
      <div v-for="event in towerEvents" :key="event.id" class="col-6 col-md-4">
        <EventCard :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.splash {
  width: 100vw;
  height: 90dvh;
  background-size: cover;
  background-position: center;
  filter: contrast(.75);
  padding: 0;
}

.text-shadow {
  text-shadow: 2px 2px 5px #000000;
}
</style>
