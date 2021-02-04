<template>
  <div class="detail-comment-info">
    <div class="meun">
      <span>用户评论</span>
      <span>更多</span>
    </div>
    <div v-for="comment in comments" :key="comment.rateId" class="comment">
      <div class="user">
        <div class="avatar">
          <img :src="comment.user.avatar" />
        </div>
        <span class="username">
          {{ comment.user.uname }}
        </span>
      </div>
      <p class="comment-content">
        {{ comment.content }}
      </p>
      <div class="style">
        <span>{{ createdTime(comment) }}</span>
        <span>{{ comment.style }}</span>
      </div>
      <div class="comment-images">
        <div v-for="image in comment.images" :key="image" class="comment-image">
          <img :src="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimeByTimestamps } from "@/common/utils.js";
export default {
  name: "DetailCommentInfo",
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    createdTime() {
      return function (comment) {
        return formatTimeByTimestamps(comment.created, false);
      };
    },
  },
};
</script>

<style scoped>
.detail-comment-info {
  padding: 5px 10px 5px;
}
.meun {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  padding-bottom: 5px;
}
.comment {
  margin-top: 10px;
}
.user {
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.avatar {
  margin-left: 5px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.username {
  margin-left: 10px;
  font-size: 16px;
  color: #000;
}
.comment-content {
  font-size: 14px;
  color: #bbb;
  line-height: 20px;
  text-indent: 1em;
  margin-bottom: 5px;
}
.style {
  color: #aaa;
  font-size: 12px;
  margin-bottom: 5px;
}
.comment-images {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.comment-image {
  width: 100px;
  height: 100px;
  padding: 3px;
}
.comment-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>