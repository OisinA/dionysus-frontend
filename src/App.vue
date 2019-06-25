<template>
  <div class="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">

      <div class="navbar-brand">
        <h1 class="dionysus navbar-item"><a href="/" class="dionysus">dionysus</a></h1>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNavbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="mainNavbar" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
        </div>
        <div class="navbar-end">
          <router-link to="/login" class="navbar-item" href="#login">{{this.$cookies.get("token") ? 'Profile' : 'Login'}}</router-link>
        </div>
      </div>

    </nav>

    <div class="section">
      <router-view></router-view>
    </div>

    <footer class="footer has-background-white">
      <div class="content has-text-centered has-background-white">
        <p>
          powered by <a href="https://github.com/OisinA/dionysus">dionysus</a>.
        </p>
      </div>
    </footer>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
export default class App extends Vue {
    
}
</script>