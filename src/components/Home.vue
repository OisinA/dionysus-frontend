<template>
  <div class="home">
    <h1 class="title">Please <router-link to="/login">login</router-link> to continue.</h1>
    <h1 class="subtitle">thanks <3</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Home extends Vue {

}
</script>
