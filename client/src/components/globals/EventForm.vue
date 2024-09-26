<script setup>

async function createEvent() {

}
</script>


<template>
  <form @submit.prevent="createEvent()" class="row">
    <div class="col-12">
      <h2>Create New Event</h2>
    </div>
    <div class="mb-3 col-8">
      <label for="">Image Preview</label>
    </div>
    <div class="mb-3 col-4">
      <div>
        <label for="event-name">Event Name</label>
        <input type="text">
      </div>
      <div>
        <label for="event-name">Event Location</label>
        <input type="text">
      </div>
      <div>
        <label for="event-name">Event Type</label>
        <input type="text">
      </div>
      <div>
        <label for="event-name">Start Date</label>
        <input type="text">
      </div>
      <div>
        <label for="event-name">Capacity</label>
        <input type="text">
      </div>
      <div>
        <label for="event-name">Image Url</label>
        <input type="text">
      </div>
      <div>
        <label for="event-name">Event Description</label>
        <input type="text">
      </div>
    </div>

    <div class="mb-2">
      <button class="w-100 p-5">Create Event</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>