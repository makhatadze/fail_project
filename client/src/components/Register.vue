<template>
  <div>
    <h1>Register</h1>
    <input type="text" v-model="name" name="name" placeholder="name"/>
    <br>
    <input type="email" v-model="email" name="email" placeholder="email"/>
    <br>
    <input type="password" v-model="password" name="password" placeholder="password"/>
    <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'HelloWorld',
  methods: {
    async register () {
      await AuthenticationService.register({
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
