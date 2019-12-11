<template>
  <div id="app">
    <el-container>
      <el-aside width="230px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          @open="true"
          @click="true"
          active-text-color="#ffd04b">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="7" v-if="!$store.state.isUserLoggedIn">
            <router-link
              class="home"
              tag="span"
              :to="{
                name: '/'
              }">
              <i class="el-icon-setting"></i>
              General
            </router-link>
          </el-menu-item>
          <el-menu-item index="3" v-if="!$store.state.isUserLoggedIn">
            <i class="el-icon-document" ></i>
            <router-link
              class="home"
              tag="span"
              :to="{
                name: 'login'
              }">
              Sign in
            </router-link>
          </el-menu-item>
          <el-menu-item index="4" v-if="!$store.state.isUserLoggedIn">
            <router-link
              class="home"
              tag="span"
              :to="{
                name: 'register'
              }">
              <i class="el-icon-setting"></i>
              Sign up
            </router-link>
          </el-menu-item>
          <el-menu-item index="5" v-if="$store.state.isUserLoggedIn">
            <i class="el-icon-switch-button"></i>
            <router-link
              class="home"
              @click.native="logout"
              tag="span" to="">
              Log out
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu class="el-menu-demo" mode="horizontal"
          >
<!--            <el-menu-item index="1" route="{name: register }">Processing Center</el-menu-item>-->
<!--            <el-menu-item index="2" v-if="$store.state.isUserLoggedIn">-->
<!--              <template slot="title">-->
<!--                <a v-on:click="logout"><i class="el-icon-switch-button"></i>Log out</a>-->
<!--              </template>-->
<!--            </el-menu-item>-->
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    methods: {
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'index'
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: Helvetica, Arial, sans-serif;
  }
  .container {
    max-width: 1200px;
  }
  .el-aside {
    background: #545c64;
    color: white;
    min-height: 100vh;
  }
  .el-menu {
    border-right: 0 !important;
  }
  .el-main {
    background: #EEF1F4;
  }


</style>


