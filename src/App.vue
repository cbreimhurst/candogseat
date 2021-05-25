<template>
  <div id="app">
    <Title msg="Can Dogs Eat"/>
    <pre>{{articles}}</pre>
    <pre>{{error}}</pre>

<input 
v-model="search" 
type="text"
@keyup="searchData"
>
{{search}}

    <pre>{{searchDBerror}}</pre>

<p>Built with VueJS, Supabase, Autocomplete, Netlify</p>
  </div>
</template>

<script>
import Title from './components/Title.vue'


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nowthiamztetfpbgucjm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTg3OTEwNCwiZXhwIjoxOTM3NDU1MTA0fQ.s6B6FjNYkO-OXBARp-RL3uxMvWQVwuAYeYeHzduxboY";

const supabase = createClient(supabaseUrl, supabaseKey)


export default {
  name: 'App',
  components: {
    Title
  },
    data() {
    return {
      articles: [],
      error: '',
      search: '',
      searchDBerror: ''
    }
  },
  async created() {

         let { data: articles, error } = await supabase
            .from('articles')
            .select("*")
          
          this.error = error
          this.articles = articles
      
    },
  methods: {
    async searchData() {

       let input = this.search




          let { data: response, error } = await supabase
            .from('articles')
            .select("*")
            .ilike('title', "%" + input + "%")

          if (error != null) {
            this.searchDBerror = 'error ' + error
          } else {
            this.searchDBerror = ""
          }
          this.articles = response

  
 



    },

  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}
.autocomplete {
  max-width: 500px;
  margin: 2rem auto;
}
pre {
  text-align: left;
}
</style>
