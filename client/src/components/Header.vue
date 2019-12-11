<template>
          <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>Toolbar Mobile Menu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-for="item in menu" :key="item.icon" :to="item.link" flat>{{
            item.title
          }}</v-btn>
        </v-toolbar-items>
        <v-menu class="hidden-md-and-up">
          <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
          <v-list>
            <v-list-tile v-for="item in menu" :key="item.icon">
              <v-list-tile-content>
                <v-list-tile-title>
                        <v-btn 
        flat 
        dark
        :to="{
          name: 'songs'
        }">
        Browse
      </v-btn>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
</template>
  
<script>
import Signin from '@/components/auth/Signin.vue'
export default {
  components: {Signin},
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style  scoped>
 .navbar {
   box-shadow: 1px 1px 1px #dc3545;
 }

 .navbar .nav-item {
   font-size: 1.4rem;
   padding-right: 1.4rem;
 }
</style>
