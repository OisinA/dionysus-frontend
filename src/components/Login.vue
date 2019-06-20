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
                <button class="button pinkButton" v-on:click="login()">Login</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'
import * as bcrypt from 'bcrypt-pbkdf'

export async function hash_password(password: string) {
    new Promise<string>((resolve, reject) => {
        let hashed: string;
        bcrypt.hash(password, 4, (err, hash) => {
            if(err) {
                reject(err);
            }
            resolve(hash);
        });
    })
}

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

    async login() {
        var hashed = await hash_password(this.password);
        console.log(this.username, this.password, hashed);
        axios.post('http://localhost:8070/login', {
            Username: this.username,
            Password: hashed,
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
    }
}
</script>
