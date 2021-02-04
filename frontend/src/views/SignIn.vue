<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <!-- The content half -->
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">Sign In</h3>
                <p class="text-muted mb-4">Sign in to post.</p>
                <form @submit.prevent="handleSubmit" autocomplete="off">
                  <div class="form-group mb-3">
                    <input
                      type="text"
                      v-model="user.username"
                      placeholder="Username"
                      required=""
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      type="password"
                      v-model="user.password"
                      placeholder="Password"
                      required=""
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                  >
                    Sign in
                  </button>
                  <div class="text-center d-flex justify-content-between mt-4">
                    <p>
                      <router-link to="/signup" class="font-italic text-muted"
                        >Register</router-link
                      >
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import { baseUrl } from '../constants';

export default {
  name: 'SignIn',

  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },

  methods: {
    handleSubmit() {
      axios
        .post(`${baseUrl}/signin`, {
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.user.username = '';
          this.user.email = '';
          this.user.password = '';
          this.$store.commit('setAuth', res.data);
          this.$router.push({ name: 'PostAdd' });
        })
        .catch((error) => {
          console.log(error);
          alert(`Please an error occurs. Retry`);
          this.$store.commit('logout');
        });
    },
  },
};
</script>

<style scoped>
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('https://res.cloudinary.com/mhmd/image/upload/v1555917661/art-colorful-contemporary-2047905_dxtao7.jpg');
  background-size: cover;
  background-position: center center;
}
</style>
