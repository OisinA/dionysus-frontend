<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form class="form">
        <div v-if="error_message" class="field">
            <article class="message is-danger"> 
                <div class="message-header">
                    <p>Warning</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    {{error_message}}
                </div>
            </article>
        </div>
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
                <button class="button pinkButton" v-on:click="login()">Login</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Login extends Vue {
    username = '';
    password = '';
    error_message = '';

    data() {
        return {
            username: '',
            password: '',
            error_message: '',
        }
    }

    mounted() {
        if(this.$cookies.get("token")) {
            this.$router.push('/profile')
        }
    }

    login() {
        axios.post('http://localhost:8070/login', {
            Username: this.username,
            Password: this.password,
        }).then((response) => {
            this.$cookies.set("token", response.data.content.token);
            this.$router.push('/profile');
        }).catch((error) => {
            console.log(error);
            if(error.response.data.status_code == 403) {
                this.error_message = "Login details incorrect.";
                return;
            } else {
                this.error_message = "Error contacting API. Try again later."
                return;
            }
            this.error_message = error.response;
        });
    }
}
</script>
