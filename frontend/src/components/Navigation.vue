<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
    <div class="container">
      <router-link class="navbar-brand" to="/">Pages</router-link>

      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="!$store.state.accessToken" class="nav-item">
            <router-link to="/signin">Login</router-link>
          </li>
          <li v-else class="nav-item">
            <a>Howdy {{ $store.state.user.username }} ?</a>
          </li>
          <li v-if="$store.state.accessToken" class="nav-item">
            <a href="#" v-on:click.stop.prevent="logout">Logout</a>
          </li>
          <li class="nav-item" v-if="$store.state.accessToken">
            <router-link to="/posts/add">Post</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',

  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style></style>
