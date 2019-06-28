<template>
    <div class="add_user">
        <div class="container">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/admin">Admin</router-link></li>
                    <li><a href="#" aria-current="page">Add User</a></li>
                </ul>
            </nav>
        </div>
        <div class="section">
            <p class="title">Add User</p>
            <form class="form">
                <div v-if="error_message" class="field">
                    <article class="message is-danger"> 
                        <div class="message-header">
                            <p>Warning</p>
                        </div>
                        <div class="message-body">
                            {{error_message}}
                        </div>
                    </article>
                </div>
                <div v-if="success_message" class="field">
                    <article class="message is-success"> 
                        <div class="message-header">
                            <p>Success</p>
                        </div>
                        <div class="message-body">
                            {{success_message}}
                        </div>
                    </article>
                </div>
                <div class="field">
                    <div class="control">
                        <input class="input" v-model="email" type="text" placeholder="Email">
                    </div>
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
                        <input class="input" v-model="confirm_password" type="password" placeholder="Confirm Password">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <div v-bind:key="role1" v-for="role1 in Object.keys(roles)">
                            <label class="radio">
                                <input v-model="role" type="radio" name="role" :value="role1">
                                {{roles[role1]}}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button pinkButton" v-on:click.prevent="add_user()">Add User</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AddUser extends Vue {

    email: string = '';
    username: string = '';
    password: string = '';
    confirm_password: string = '';
    role: number = -1;

    error_message: string = '';
    success_message: string = '';

    roles = {
        0: 'Normal',
        1: 'Admin',
    }

    data() {
        return {
            email: '',
            username: '',
            password: '',
            confirm_password: '',
            role: -1,
            error_message: '',
            success_message: '',
        }
    }

    add_user() {
        if(!(this.email && this.username && this.password && this.confirm_password && this.role != -1)) {
            this.error_message = "Fields are required."
            return;
        }
        if(this.password != this.confirm_password) {
            this.error_message = 'Passwords do not match.';
            return;
        }
        axios.post(process.env.VUE_APP_API_ENDPOINT + '/user', {
            "Email": this.email,
            "Username": this.username,
            "Password": this.password,
            "Role": +this.role,
        }, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            if(response.data.content == "success") {
                this.success_message = "Success";
            }
        }).catch((error) => {
            this.error_message = error;
        })
    }

}
</script>
