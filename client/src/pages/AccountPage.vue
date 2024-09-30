<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketsService } from '@/services/TicketsService.js';
import EventCard from '@/components/globals/EventCard.vue';

// defineProps({
//   ticketEvent: {
//     type: Event, required: true
//   }
// })

const account = computed(() => AppState.account)
const accountTickets = computed(() => AppState.accountHeldTickets)

// TODO get all of your tickets, reference art terminal 

onMounted(() => {
  getAccountTickets()
})

async function getAccountTickets() {
  try {
    await ticketsService.getAccountTickets()
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}

async function deleteTicket(ticketId) {
  try {
    const confirmed = await Pop.confirm("Are you sure you want to give up your ticket?")
    if (!confirmed) return
    await ticketsService.deleteTicket(ticketId)
    Pop.success('Ticket deleted')
  }
  catch (error) {
    Pop.meow(error);
    logger.logger()
  }
}
</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <section class="row g-3">
        <div v-for="ticket in accountTickets" :key="ticket.id" class="col-md-4 position-relative">
          <!-- <EventCard :ticketEvent="ticket.eventId" /> -->
          {{ ticket.towerEvent }}
          {{ ticket.id }}
          <button @click="deleteTicket(ticket.id)" class="btn btn-danger position-absolute top-0 right-0 ">Delete
            Ticket</button>
        </div>
      </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
