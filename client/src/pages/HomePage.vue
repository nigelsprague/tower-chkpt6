<script setup>
import { AppState } from '@/AppState';
import EventCard from '@/components/globals/EventCard.vue';
import EventForm from '@/components/globals/EventForm.vue';
import ModalWrapper from '@/components/globals/ModalWrapper.vue';
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const filterBy = ref('all')
const towerEvents = computed(() => {
  if (filterBy.value == 'all') {
    return AppState.towerEvents
  }
  return AppState.towerEvents.filter(filter => filter.type == filterBy.value)
})

const filterTypes = [
  { text: 'all', icon: 'mdi mdi-all-inclusive text-success fs-2' },
  { text: 'concert', icon: 'mdi mdi-guitar-electric text-danger fs-2' },
  { text: 'convention', icon: 'mdi mdi-account-group text-primary fs-2' },
  { text: 'sport', icon: 'mdi mdi-soccer text-warning-emphasis fs-2' },
  { text: 'digital', icon: 'mdi mdi-desktop-classic text-info fs-2' }
]

onMounted(() => {
  getAllEvents()
})

async function getAllEvents() {
  try {
    await eventsService.getAllEvents()
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}
</script>

<template>
  <div class="container-fluid p-0">
    <ModalWrapper id="event-form">
      <EventForm />
    </ModalWrapper>
    <section class="row m-0 img-fluid splash align-items-center px-md-5"
      style="background-image: url(https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
      <div class="col-md-6 text-white text-shadow">
        <h4>Event management for people, by people</h4>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates doloremque cum sit voluptatibus, a
          voluptas ad amet animi debitis inventore ipsam eos molestias aliquid placeat? Dolores architecto eos ea sunt.
        </p>
      </div>
    </section>
    <section class="row justify-content-evenly mx-2 mx-md-5 g-3">
      <h5>How Tower works</h5>
      <div class="col-md-5 d-flex bg-white p-3">
        <h6>Discover</h6>
      </div>
      <div class="col-md-5 d-flex bg-white p-3">
        <i class="mdi mdi-plus text-success fs-2 me-1"></i>
        <div>
          <h6>Start an event</h6>
          <p>Create your own Tower event, and draw from a community of millions</p>
          <span class="text-success selectable" role="button" data-bs-toggle="modal" data-bs-target="#event-form">Create
            an event</span>
        </div>
      </div>
    </section>
    <section class="row mx-2 mx-md-5 justify-content-between">
      <h5>Explore top categories</h5>
      <div v-for="filter in filterTypes" :key="filter.text" class="col-6 col-lg-2 my-3">
        <button @click="filterBy = filter.text" type="button" class="filter w-100 selectable">
          <div class="p-3">
            <i :class="filter.icon"></i>
            <br>
            <span class="text-center">{{ filter.text }}</span>
          </div>
        </button>
      </div>
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
  height: 94dvh;
  background-size: cover;
  background-position: center;
  filter: contrast(.75);
  padding: 0;
}

.text-shadow {
  text-shadow: 2px 2px 5px #000000;
}

.filter {
  font-weight: 500;
}
</style>
