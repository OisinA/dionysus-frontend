<template>
  <div class="home">
    <h1 class="title">Competition</h1>
    <p class="subtitle">Starts in 4 days</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Home extends Vue {
    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login');
        }
    }
}
</script>
