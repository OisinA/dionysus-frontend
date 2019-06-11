<template>
  <div class="home">
    <h1 class="title">Users</h1>
    <div v-for="project in projects" v-bind:key="project.id">
      <p class="title">{{project.username}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Home extends Vue {
  @Prop() projects!: string[];

  mounted() {
    axios.get('http://localhost:8070/user').then((response) => {
      this.projects = response.data.content;
    });
  }
}
</script>
