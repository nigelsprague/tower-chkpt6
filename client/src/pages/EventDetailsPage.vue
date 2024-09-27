<script setup>
import { AppState } from '@/AppState';
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
  getEventById()
})

const route = useRoute()
const towerEvent = computed(() => AppState.activeEvent)
const user = computed(() => AppState.account)

const canAttend = computed(() => {
  if (AppState.activeEvent.isCanceled == true) return false
  //NOTE - if attendee.length == capacity and make it sold out
  if (AppState.identity == null) return false
  return true
})

async function getEventById() {
  try {
    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}

async function cancelEvent() {
  try {
    await eventsService.cancelEvent(route.params.eventId)
  }
  catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}
</script>


<template>
  <div class="container mt-md-3 px-0 px-md-5">
    <div v-if="towerEvent">
      <section class="row position-relative m-0 mb-3">
        <div class="rounded bg-dark-glass mx-0 p-0" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
        </div>
        <div class="row position-absolute justify-content-center m-0 p-0">
          <img class="cover-img px-md-4" :src="towerEvent.coverImg" alt="">
        </div>
      </section>

      <section class="row m-0 p-0">
        <div class="col-md-8">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <h2 class="">{{ towerEvent.name }}</h2>
              <span class="rounded-pill bg-dark-subtle text-white px-2">
                {{ towerEvent.type }}
              </span>
              <span v-if="towerEvent.isCanceled" class="bg-danger text-white px-2 rounded-pill">Cancelled</span>
            </div>
            <button class="btn text-end">
              <i class="mdi mdi-dots-horizontal fs-3 p-0"></i>
            </button>
            <div v-if="user.id == towerEvent.creatorId" class="dropdown">
              <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-dots-horizontal fs-3"></i>
              </button>
              <ul class="dropdown-menu">
                <!-- <li><button @click="editEvent()" class="dropdown-item" data-bs-toggle="modal"
              data-bs-target="#editModal" type="button">Edit event</button></li> -->
                <li><button @click="cancelEvent()" class="dropdown-item text-danger" type="button">Cancel Event</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="my-2 text-secondary">
            <p>{{ towerEvent.description }}</p>
          </div>
          <div class="my-2 text-secondary">
            <h6>Date and Time</h6>
            <p><i class="mdi mdi-calendar-clock-outline text-info me-2"></i> Starts {{ towerEvent.eventDate }}</p>
          </div>
          <div class="my-2 text-secondary">
            <h6>Location</h6>
            <p><i class="mdi mdi-map-marker text-info me-2"></i>{{ towerEvent.location }}</p>
          </div>
          <div>
            <h1>comments</h1>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            woo
          </div>
        </div>
      </section>
    </div>

    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  object-fit: cover;
  object-position: center;
}

.bg-dark-glass {
  background-size: cover;
  height: 45dvh;
  filter: blur(5px) brightness(.5);
  border: 1px solid;
}

.cover-img {
  object-fit: contain;
  height: 45dvh;
  width: max-content;
}
</style>