<template>
  <div>
    <!-- Navigation -->
    <Navigation/>

    <!-- Page Header -->
    <PageHeader />

  <!-- Main Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">


        <Newsletter />

        <h4 class="text-muted mt-4">Latest Posts</h4>

        <div v-for="post of posts" :key="post.id" >

          <div class="post-preview" >
          <router-link  :to="{ name: 'PostDetail', params: { id: post._id }}">
            <h6 class="post-title">
              {{post.title  | capitalize}}
            </h6>
            <p class="post-subtitle">
              {{post.body | truncateString }}
            </p>
          </router-link>
          <p class="post-meta">
              <router-link :to="{ name: 'PostDetail', params: { id: post._id }}">Read More</router-link>  
          </p>

        </div>
        <hr>

        </div>

         <b-pagination
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="totalItemsPerPage"
        first-number
        @change="onPageChange"	
        align="center"
        ></b-pagination>
        
       
        <!-- Pager -->
        <!-- <div class="clearfix">
          <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
        </div> -->
      </div>
    </div>
  </div>

  <hr>

    <!-- Footer -->
    <Footer />
  
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import Newsletter from '@/components/Newsletter.vue'

import axios from 'axios';

import {baseUrl} from '../constants';



export default {
  name: 'Home',
  components: {
   Navigation,
   PageHeader,
   Footer,
   Newsletter
  },
  data() {
    return {
      totalItemsPerPage: 3,
      currentPage: 1,
      totalItems:1,
      posts: [],
      errors: []
    }
  },
  // Fetches posts when the component is created.
  created() {

    this.fetchPosts()
   
  },


  methods:{


    fetchPosts(page=1){

      axios.get(`${baseUrl}/posts?page=${page}`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts =response.data.posts
          this.totalItemsPerPage = response.data.totalItemsPerPage
          this.currentPage =response.data.currentPage
          this.totalItems = response.data.totalItems
          console.log(response.data)
          page !== 1 ? window.scrollTo({ top: 0, behavior: 'smooth' }):''
        })
      .catch(e => {
        this.errors.push(e)
      })

    },

    onPageChange(page){
      this.fetchPosts(page)
    }

  },


  filters: {
  truncateString(str, num=105) {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num) + '...'
},


capitalize (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

}
}
</script>
<style lang="scss">


</style>
