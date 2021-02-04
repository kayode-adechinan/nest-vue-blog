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
                <h3 class="display-4">Sign Up</h3>
                <p class="text-muted mb-4">Create account to start posting.</p>
                <form @submit.prevent="handleSubmit" autocomplete="off">
                  <div class="form-group mb-3">
                    <input
                      type="text"
                      placeholder="Username"
                      required=""
                      v-model="user.username"
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      type="email"
                      placeholder="Email address"
                      required=""
                      v-model="user.email"
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      required=""
                      v-model="user.password"
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                  >
                    Sign Up
                  </button>
                  <div class="text-center d-flex justify-content-between mt-4">
                    <p>
                      <router-link to="/signin" class="font-italic text-muted"
                        >Or Sign In</router-link
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
  name: 'SignUp',

  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    handleSubmit() {
      // Send data to the server or update your stores and such.
      axios
        .post(`${baseUrl}/signup`, {
          username: this.user.username,
          email: this.user.email,
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

          // this.autoLogin();
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
