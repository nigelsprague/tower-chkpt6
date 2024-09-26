<script setup>
import { eventsService } from '@/services/EventsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const filters = ['concert', 'convention', 'sport', 'digital']
const eventData = ref({
  name: '',
  location: '',
  type: '',
  startDate: null,
  capacity: 0,
  coverImg: '',
  description: ''
})

async function createEvent() {
  try {
    const createdEvent = await eventsService.createEvent(eventData.value)
    resetForm()
    Pop.toast(`${createdEvent.name} Created!`, 'success', 'top')
    Modal.getOrCreateInstance('#event-form').hide()
    router.push({ name: 'Event Details', params: { eventId: createdEvent.id } })
  }
  catch (error) {
    Pop.meow(error);
    logger.error(error)
  }
}

function resetForm() {
  eventData.value = {
    name: '',
    location: '',
    type: '',
    startDate: null,
    capacity: 0,
    coverImg: '',
    description: ''
  }
}
</script>


<template>
  <form @submit.prevent="createEvent()" class="row m-0 p-4">
    <div class="col-12 mb-4 p-0">
      <h2>Create New Event</h2>
    </div>
    <div class="col-md-6 p-0 pe-2">
      <label class="" for="">Image Preview</label>
      <div class="d-flex justify-content-center align-items-center alice img-preview">
        <i class="mdi mdi-image fs-1"></i>
      </div>
    </div>
    <div class="col-md-6 align-self-end">
      <div class="my-2 mt-md-0 row">
        <label class="" for="eventName">Event Name</label>
        <input v-model="eventData.name" required class="form-control" type="text" minlength="3" maxlength="50"
          name="eventName" id="eventName" placeholder="Name...">
      </div>
      <div class="mb-2 row">
        <label class="" for="eventLocation">Event Location</label>
        <input v-model="eventData.location" required class="form-control" type="text" minlength="1" maxlength="500"
          name="eventLocation" id="eventLocation" placeholder="Location...">
      </div>
      <div class="mb-2 row">
        <label class="" for="eventType">Event Type</label>
        <select v-model="eventData.type" required class="form-control text-center" name="eventType" id="eventType">
          <option disabled selected value="">-- Please select an event type --</option>
          <option v-for="filter in filters" :key="filter" :value="filter">{{ filter }}</option>
        </select>
      </div>
      <div class="mb-2 row">
        <div class="col-8 mb-2 mb-md-0 ps-0">
          <label for="eventDate">Start Date</label>
          <input v-model="eventData.startDate" required class="form-control" type="date" id="eventDate"
            name="eventDate">
        </div>
        <div class="col-4 p-0">
          <label for="eventCapacity">Capacity</label>
          <input v-model="eventData.capacity" required class="form-control" type="number" min="3" max="5000"
            name="eventCapacity" id="eventCapacity" placeholder="0">
        </div>
      </div>
      <div class="mb-2 mb-md-0 row">
        <label class="" for="eventImg">Image Url</label>
        <input v-model="eventData.coverImg" required class="form-control" type="url" minlength="3" maxlength="500"
          name="eventImg" id="eventImg" placeholder="URL...">
      </div>
    </div>
    <div class="mt-md-4 mb-3 p-0">
      <label class="" for="eventDesc">Event Description</label>
      <textarea v-model="eventData.description" required class="form-control" name="eventDesc" id="eventDesc"
        minlength="15" maxlength="1000" rows="5" placeholder="Tell us more about your event..."></textarea>
    </div>

    <div class="d-flex p-0 justify-content-end">
      <button class="btn alice p-2 selectable" type="submit">Create Event</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
label {
  padding-left: .75em;
}

.alice {
  border: 2px solid rgb(146, 204, 255);
}

.alice,
.form-control {
  background-color: aliceblue;
}

.img-preview {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: grey dashed;
}
</style>