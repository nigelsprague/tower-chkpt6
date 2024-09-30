<script setup>
import { AppState } from '@/AppState';
import CommentCard from '@/components/globals/CommentCard.vue';
import { commentsService } from '@/services/CommentsService';
import { eventsService } from '@/services/EventsService';
import { ticketsService } from '@/services/TicketsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
  getEventById()
  getCommentsByEvent()
  getTicketHolders()
})

const route = useRoute()
const towerEvent = computed(() => AppState.activeEvent)
const user = computed(() => AppState.account)
const comments = computed(() => AppState.comments)
const ticketHolder = computed(() => AppState.attendingProfiles)

const spotsLeft = computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount)

const holdingTicket = computed(() => {
  if (AppState.identity == null) return false
  const youInTicketHolders = AppState.attendingProfiles.find(ticket => ticket.accountId == AppState.account?.id)
  if (!youInTicketHolders) return false
  return true
})

const soldOut = computed(() => towerEvent.value.ticketCount == towerEvent.value.capacity)

const canAttend = computed(() => {
  if (AppState.activeEvent?.isCanceled == true) return false
  if (soldOut.value) return false
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

async function getTicketHolders() {
  try {
    await ticketsService.getTicketHolders(route.params.eventId)
  }
  catch (error) {
    Pop.meow(error);
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

async function createTicket() {
  try {
    const ticketData = { eventId: route.params.eventId }
    await ticketsService.createTicket(ticketData)
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

const editablecommentData = ref({
  body: '',
  eventId: route.params.eventId
})

async function createComment() {
  try {
    const commentData = editablecommentData.value
    await commentsService.createComment(commentData)
    editablecommentData.value = {
      body: '',
      eventId: route.params.eventId
    }
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

async function getCommentsByEvent() {
  try {
    const eventId = route.params.eventId
    await commentsService.getCommentsByEvent(eventId)
  }
  catch (error) {
    Pop.meow(error);
  }
}
</script>


<template>
  <div class="container mt-md-3 px-0 px-md-5 mb-4">
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
              <span v-if="soldOut" class="bg-danger text-white px-2 rounded-pill">Sold Out</span>
            </div>
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
          <h4>See what folks are saying...</h4>
          <form @submit.prevent="createComment()" class="mb-2">
            <label class="form-label" for="comment">Share your thoughts</label>
            <div class="d-flex justify-content-between">
              <input v-model="editablecommentData" class="form-control" type="text" name="comment" id="comment"
                maxlength="500">
              <button class="btn bg-success text-light" type="submit">Post</button>
            </div>
          </form>
          <div v-for="comment in comments" :key="comment.id">
            <div class="card p-1 mb2">
              <div class="d-flex align-items-center">
                <img class="img-fluid profile-img mx-2" :src="comment.creator.picture" alt="">
                <div>
                  <h6 class="m-0">{{ comment.creator.name }}</h6>
                  <p class="m-0">{{ comment.body }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card text-center p-3 mb-1">
            <div v-if="!holdingTicket">
              <h5>Interested in going?</h5>
              <h6 class="text-secondary">Grab a ticket!</h6>
              <button v-if="!holdingTicket" @click="createTicket()" :disabled="!canAttend"
                class="btn bg-primary text-white selectable">
                <span>Attend</span>
              </button>
            </div>
            <div v-else>
              <h5>You have a ticket for this event!</h5>
              <i class="mdi mdi-ticket fs-1 text-success"></i>
            </div>
          </div>
          <h6 class="text-end">
            <span v-if="(spotsLeft >= 10)" class="text-success">{{ spotsLeft }}</span>
            <span v-else class="text-danger">{{ spotsLeft }}</span>
            spots left!
          </h6>
          <h5>Attendees</h5>
          <div class="card">
            <div class="row m-0 mt-2 p-2">
              <div v-for="attendee in ticketHolder" :key="attendee.profile.id"
                class="d-flex ticket-holder align-items-center mb-2">
                <img class="img-fluid profile-img" :src="attendee.profile.picture" alt="">
                <p class="m-0 px-2">{{ attendee.profile.name }}</p>
              </div>
            </div>
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

.ticket-holder {
  border-left: 3px solid slateblue;
}

.profile-img {
  height: 23px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>