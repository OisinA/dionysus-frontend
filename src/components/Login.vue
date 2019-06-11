<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form class="form">
        <div class="field">
            <div class="control">
                <input class="input" v-model="username" type="text" placeholder="Username">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input" v-model="password" type="password" placeholder="Password">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-success" v-on:click="login()">Login</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
    username = '';
    password = '';

    data() {
        return {
            username: '',
            password: ''
        }
    }

    login() {
        console.log(this.username + " " + this.password)
    }
}
</script>
