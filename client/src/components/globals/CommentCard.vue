<script setup>
import { Comment } from '@/models/Comment';

defineProps({ commentProp: { type: Comment, required: true } })
</script>


<template>
  <div class="card p-1 mb2">
    <div class="d-flex align-items-center">
      <img class="img-fluid profile-img mx-2" :src="commentProp.creator.picture" alt="">
      <div>
        <h6 class="m-0">{{ commentProp.creator.name }}</h6>
        <p class="m-0">{{ commentProp.body }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  height: 30px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1 / 1;
}
</style>