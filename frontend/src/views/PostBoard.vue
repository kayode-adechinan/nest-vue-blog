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
          <Newsletter />

          <p v-if="loading" class="text-center">Loading ....</p>

          <div v-else>
            <h4 class="text-muted mt-4">My Posts</h4>

            <!-- Responsive table -->
            <div class="table-responsive">
              <table class="table m-0">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="post of posts" :key="post.id">
                    <td>{{ post.title | capitalize }}</td>
                    <td>{{ post.body | truncateString }}</td>
                    <td>
                      <!-- Call to action buttons -->
                      <router-link
                        class="mr-3"
                        :to="{ name: 'PostEdit', params: { id: post._id } }"
                        >Edit</router-link
                      >

                      <span class="mr-3">|</span>
                      <span
                        v-on:click="remove(post._id)"
                        style="cursor: pointer"
                        >Delete</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <b-pagination
            v-model="currentPage"
            :total-rows="totalItems"
            :per-page="totalItemsPerPage"
            first-number
            @change="onPageChange"
            align="center"
          ></b-pagination>
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
import Newsletter from '@/components/Newsletter.vue';

import axios from 'axios';

import { baseUrl } from '../constants';

export default {
  name: 'PostBoard',
  components: {
    Navigation,
    PageHeader,
    Footer,
    Newsletter,
  },
  data() {
    return {
      loading: true,
      totalItemsPerPage: 3,
      currentPage: 1,
      totalItems: 1,
      posts: [],
      errors: [],
    };
  },
  // Fetches posts when the component is created.
  created() {
    this.fetchPosts();
  },

  methods: {
    fetchPosts(page = 1) {
      axios
        .get(`${baseUrl}/posts/me?page=${page}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.accessToken}`,
          },
        })
        .then((response) => {
          this.loading = false;
          // JSON responses are automatically parsed.
          this.posts = response.data.posts;
          this.totalItemsPerPage = response.data.totalItemsPerPage;
          this.currentPage = response.data.currentPage;
          this.totalItems = response.data.totalItems;
          console.log(response.data);
          page !== 1 ? window.scrollTo({ top: 0, behavior: 'smooth' }) : '';
        })
        .catch((e) => {
          this.errors.push(e);
          alert('some error occurs, please refresh the page');
        });
    },

    onPageChange(page) {
      this.fetchPosts(page);
    },

    edit() {
      alert('hoom');
    },

    remove(id) {
      if (confirm('Are you sure')) {
        axios
          .delete(`${baseUrl}/posts/${id}`, {
            headers: {
              Authorization: `Bearer ${this.$store.state.accessToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.fetchPosts();
          })
          .catch((e) => {
            this.errors.push(e);
            alert('some error occurs, please refresh the page');
          });
      }
    },
  },

  filters: {
    truncateString(str, num = 105) {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str;
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num) + '...';
    },

    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
<style lang="scss"></style>
