<script setup>
import { Event } from '@/models/Event';

defineProps({
  eventProp: {
    type: Event, required: true
  }
})
</script>


<template>
  <RouterLink :to="{ name: 'Event Details', params: { eventId: eventProp.id } }">
    <div class="card selectable">
      <img class="card-img-top cover-img" :src="eventProp.coverImg" :alt="eventProp.name">
      <div class="card-body px-4">
        <span class="fw-bold row">{{ eventProp.name }}</span>
        <span class="text-success row">Hosted by {{ eventProp.creator.name }}</span>
        <span class="text-tertiary row my-1">{{ eventProp.eventDate + ' - ' + eventProp.location }}</span>
        <span class="text-secondary row">{{ eventProp.ticketCount }} attending</span>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.cover-img {
  height: 25dvh;
  object-fit: cover;
  object-position: center;
}
</style>