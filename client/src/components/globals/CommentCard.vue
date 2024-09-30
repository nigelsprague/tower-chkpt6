<script setup>
import { AppState } from '@/AppState';
import { Comment } from '@/models/Comment';
import { commentsService } from '@/services/CommentsService';
import Pop from '@/utils/Pop';
import { computed } from 'vue';

defineProps({ commentProp: { type: Comment, required: true } })

const account = computed(() => AppState.account)

async function deleteComment(commentId) {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete your comment?')
    if (!confirmed) return
    await commentsService.deleteComment(commentId)
    Pop.success('Comment deleted')
  }
  catch (error) {
    Pop.meow(error);
  }
}
</script>


<template>
  <div class="card p-1 mb2">
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <img class="img-fluid profile-img mx-2" :src="commentProp.creator.picture" alt="">
        <div>
          <h6 class="m-0">{{ commentProp.creator.name }}</h6>
          <p class="m-0">{{ commentProp.body }}</p>
        </div>
      </div>
      <button v-if="commentProp.creatorId == account.id" @click="deleteComment(commentProp.id)" class="btn selectable">
        <i class="mdi mdi-delete text-danger"></i>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile-img {
  height: 30px;
  object-fit: cover;
  object-position: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}
</style>