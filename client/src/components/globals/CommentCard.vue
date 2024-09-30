<script setup>
import { Comment } from '@/models/Comment';

defineProps({
  commentProp: { type: Comment, required: true }
})


</script>


<template>
  <div class="card">
    <div class="d-flex align-items-center mb-2">
      <img class="img-fluid profile-img" :src="commentProp.creator.picture" alt="">
      <div>
        <p class="m-0 px-2">{{ commentProp.creator.name }}</p>
        <p class="m-0">{{ commentProp.body }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>