<template>
  <div>
    <!-- Navigation -->
    <Navigation />

    <!-- Page Header -->
    <PageHeader />

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-preview">
            <h2 class="post-title">
              {{ post.title | capitalize }}
            </h2>
            <p class="post-subtitle">
              {{ post.body }}
            </p>
          </div>

          <hr />

          <h4 v-if="comments.length !== 0">Comments</h4>

          <h4 v-else>Feel free to comment</h4>

          <div
            v-for="comment of comments"
            :key="comment.id"
            class="alert alert-primary"
            role="alert"
          >
            {{ comment.body }}
          </div>

          <hr />

          <CommentForm :postId="post._id" @add:comment="onAddComment" />
        </div>
      </div>
    </div>

    <hr />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue';
import PageHeader from '@/components/PageHeader.vue';
import Footer from '@/components/Footer.vue';
import CommentForm from '@/components/CommentForm.vue';

import axios from 'axios';

import { baseUrl } from '../constants';

export default {
  name: 'PostDetail',
  components: {
    Navigation,
    PageHeader,
    Footer,
    CommentForm,
  },
  data() {
    return {
      post: {},
      comments: [],
      errors: [],
    };
  },
  // Fetches posts when the component is created.
  created() {
    axios
      .get(`${baseUrl}/posts/${this.$route.params.id}`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.post = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    this.fetchComments();
  },

  methods: {
    fetchComments() {
      axios
        .get(`${baseUrl}/comments/?post=${this.$route.params.id}`)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    onAddComment(comment) {
      this.comments.push(comment);
    },
  },

  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
<style lang="scss"></style>
