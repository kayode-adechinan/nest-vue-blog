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
          <form @submit.prevent="handleSubmit" autocomplete="off">
            <div class="control-group">
              <div class="form-group floating-label-form-group controls">
                <label>Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model="post.title"
                />
              </div>
            </div>

            <div class="control-group">
              <div class="form-group floating-label-form-group controls">
                <label>Comment !</label>
                <textarea
                  rows="5"
                  class="form-control"
                  placeholder="Body"
                  v-model="post.body"
                ></textarea>
              </div>
            </div>
            <br />
            <p v-if="loading">Your post is being posted, please wait...</p>
            <button
              v-else
              type="submit"
              class="btn btn-primary"
              id="sendMessageButton"
            >
              Post
            </button>
          </form>
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

import axios from 'axios';

import { baseUrl } from '../constants';

export default {
  name: 'PostDetail',
  components: {
    Navigation,
    PageHeader,
    Footer,
  },
  data() {
    return {
      loading: false,
      post: {
        title: '',
        body: '',
      },
    };
  },
  // Fetches posts when the component is created.
  created() {},

  methods: {
    handleSubmit() {
      // Send data to the server or update your stores and such.
      this.loading = true;
      axios
        .post(
          `${baseUrl}/posts`,
          {
            title: this.post.title,
            body: this.post.body,
            user: this.$store.state.user.userId,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.accessToken}`,
            },
          },
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.post.title = '';
          this.post.body = '';

          this.$router.push({ name: 'Home' });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          alert(`Please some error occurs; Retry or LogIn again`);
          this.loading = false;
          this.$store.commit('logout');
          this.$router.push({ name: 'Signin' });
        });
    },
  },
};
</script>
<style lang="scss"></style>
