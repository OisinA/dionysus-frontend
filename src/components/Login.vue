<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form class="form">
        <div v-if="error_message" v-html="error_message" class="field"></div>
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
import axios from 'axios'
import * as bcrypt from 'bcrypt-pbkdf'

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

    login() {
        var hash_password;
        bcrypt.hash(this.password, 4, function(err, hash) {
            hash_password = hash;
        })
        console.log(process.env)
        axios.post(process.env.VUE_APP_API_URL + '/login', {
            Username: this.username,
            Password: hash_password,
        }).then((response) => {
            if(response.data.status_code != 200) {
                this.error_message = `
                <article class="message is-danger"> 
                    <div class="message-header">
                        <p>Warning</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        ` + response.data + `
                    </div>
                </article>
                `;
            } else {
                this.$cookies.set("token", response.data.content.token);
                this.error_message = `
                <article class="message is-success"> 
                    <div class="message-header">
                        <p>Success</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        Successfully logged in! Redirecting...
                    </div>
                </article>
                `;
                this.$router.push('/profile')
            }
        }).catch((error) => {
            console.log(error);
            this.error_message = `
                <article class="message is-danger"> 
                    <div class="message-header">
                        <p>Warning</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        Incorrect login details.
                    </div>
                </article>
                `;
        });
        console.log(this.username + " " + this.password)
    }
}
</script>
