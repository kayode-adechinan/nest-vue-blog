<template>
  <div>
    <div v-if="done" class="text-center">
      <p><strong>Thanks, You've been added!</strong></p>
    </div>

    <div v-else>
      <h5 class="mb-4">Join Our Newsletter</h5>

      <form
        class="form-inline"
        @submit.prevent="handleSubmit"
        autocomplete="off"
      >
        <input type="text" placeholder="Username" v-model="user.username" />
        <input type="email" placeholder="Email" v-model="user.email" />

        <p v-if="loading">Please wait...</p>
        <button v-else type="submit">Join</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { baseUrl } from '../constants';

export default {
  name: 'Newsletter',

  data() {
    return {
      loading: false,
      done: false,
      user: {
        username: '',
        email: '',
      },
    };
  },

  methods: {
    handleSubmit() {
      // Send data to the server or update your stores and such.
      this.loading = true;
      console.log(this.user);

      axios
        .post(`${baseUrl}/subscribers`, {
          username: this.user.username,
          email: this.user.email,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.user.username = '';
          this.user.email = '';
          this.loading = false;
          this.done = true;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.done = false;
          alert('Please retry, an error occurs');
        });
    },
  },
};
</script>

<style>
.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.form-inline label {
  margin: 5px 10px 5px 0;
}

.form-inline input {
  vertical-align: middle;
  margin: 5px 10px 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
}

.form-inline button {
  padding: 10px 20px;
  background-color: black;
  border: 1px solid #ddd;
  color: white;
  width: 175px;
}

.form-inline button:hover {
  background-color: black;
}

@media (max-width: 800px) {
  .form-inline input {
    margin: 10px 0;
  }

  .form-inline {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
