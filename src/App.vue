<template>
  <div id="app">
    <Title msg="Can Dogs Eat"/>


<div class="autocomplete">

  <input 
v-model="search" 
type="text"
@keyup="searchData"
>
    <ul id="example-1" v-if="search">
  <li v-for="article in articles" :key="article.id">
    {{ article.title }}
  </li>
</ul>


    <pre v-if="searchDBerror">{{searchDBerror}}</pre>

        <pre v-if="search">{{articles}}</pre>
    <pre v-if="error">{{error}}</pre>

</div>
<p>Built with VueJS, Supabase, Autocomplete, Netlify</p>

<h2>Features:</h2>
<ul>
  <li>ranked return</li>

</ul>
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

        if (input.length > 0) {
          let { data: response, error } = await supabase
            .from('articles')
            .select("*")
            .ilike('title', "%" + input + "%")
            .limit(10)

          if (error != null) {
            this.searchDBerror = 'error ' + error
          } else {
            this.searchDBerror = ""
          }
          this.articles = response

        } else {

         let { data: articles, error } = await supabase
            .from('articles')
            .select("*")
          
          this.error = error
          this.articles = articles
        }

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
  width: 100%;
}
pre {
  text-align: left;
}


input {
    border: 1px solid #eee;
    border-radius: 8px;
    width: 100%;
    padding: 12px 12px 12px 48px;
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
    line-height: 1.5;
    /* flex: 1; */
    background-color: #eee;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+");
    background-repeat: no-repeat;
    background-position: 12px;
}

input:focus, 
input[aria-expanded="true"] {
    border-color: rgba(0,0,0,.12);
    background-color: #fff;
    outline: none;
    box-shadow: 0 2px 2px rgba(0,0,0,.16);
}
</style>
