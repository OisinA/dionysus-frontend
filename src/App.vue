<template>
  <div class="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">

      <div class="navbar-brand">
        <p class="dionysus navbar-item"><a href="/" class="dionysus">{{name ? name : "dionysus"}}</a></p>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainNavbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="mainNavbar" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link v-if="this.$cookies.get('token')" to="/problem" class="navbar-item">Problems</router-link>
          <router-link v-if="this.$cookies.get('token')" to="/submission" class="navbar-item">Submissions</router-link>
          <router-link v-if="this.$cookies.get('token')" to="/leaderboard" class="navbar-item">Leaderboard</router-link>
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
import axios from 'axios';
export default class App extends Vue {
    name: string = '';

    data() {
        return {
            name: '',
        }
    }

    mounted() {
        axios.get('http://localhost:8070/settings').then((response) => {
            this.name = response.data.content.name;
        }).catch((error) => {
        })
    }
}
</script>