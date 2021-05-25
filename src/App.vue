<template>
  <div id="app">
    <Title msg="Can Dogs Eat"/>
   {{articles}}
    <autocomplete 
     :search="search"
    placeholder="Search Wikipedia"
    aria-label="Search Wikipedia"
    :get-result-value="getResultValue"
    @submit="onSubmit"
    ></autocomplete>

<p>Built with VueJS, Supabase, Autocomplete, Netlify</p>
  </div>
</template>

<script>
import Title from './components/Title.vue'


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nowthiamztetfpbgucjm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTg3OTEwNCwiZXhwIjoxOTM3NDU1MTA0fQ.s6B6FjNYkO-OXBARp-RL3uxMvWQVwuAYeYeHzduxboY";

const supabase = createClient(supabaseUrl, supabaseKey)

const wikiUrl = 'https://en.wikipedia.org'
const params = 'action=query&list=search&format=json&origin=*'

export default {
  name: 'App',
  components: {
    Title
  },
    data() {
    return {
      articles: [],
    }
  },
  async created() {

         let { data: articles, error } = await supabase
            .from('articles')
            .select("*")
          
          console.log('error ' + error)
          this.articles = articles
      
    },
  methods: {
    search(input) {
      const url = `${wikiUrl}/w/api.php?${params}&srsearch=${encodeURI(input)}`
 
      return new Promise((resolve) => {
        if (input.length < 3) {
          return resolve([])
        }
 
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            resolve(data.query.search)
          })
      })
    },
    getResultValue(result) {
      return result.title
    },
    onSubmit(result) {
      window.open(`${wikiUrl}/wiki/${encodeURI(result.title)}`)
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
</style>
