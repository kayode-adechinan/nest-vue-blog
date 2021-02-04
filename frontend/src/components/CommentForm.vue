<template>
  <div>
    <form @submit.prevent="handleSubmit" autocomplete="off">
      <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <label>Comment !</label>
          <textarea
            rows="5"
            class="form-control"
            placeholder="Your thought"
            v-model="comment.body"
          ></textarea>
          <p class="help-block text-danger"></p>
        </div>
      </div>
      <br />
      <p v-if="loading">Loading ...</p>
      <button
        v-else
        type="submit"
        class="btn btn-primary"
        id="sendMessageButton"
      >
        Comment
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { baseUrl } from '../constants';

export default {
  name: 'CommentForm',
  props: ['postId'],

  data() {
    return {
      loading: false,
      comment: {
        body: '',
      },
    };
  },

  methods: {
    handleSubmit() {
      this.loading = true;
      // Send data to the server or update your stores and such.
      axios
        .post(`${baseUrl}/comments/`, {
          body: this.comment.body,
          post: this.postId,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.$emit('add:comment', res.data);
          this.comment.body = '';
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
