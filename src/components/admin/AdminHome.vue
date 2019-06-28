<template>
    <div class="home">
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <div class="container">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="#" aria-current="page">Admin</a></li>
                    </ul>
                </nav>
            </div>
            <div class="section">
                <p class="title">dionysus-admin</p>
                <p class="subtitle">manage your dionysus instance</p>
                <p>
                    Registered users: {{users}}
                </p>
                <p>
                    Teams: {{teams}}
                </p>
            </div>
            <div class="section">
                <ul class="list">
                    <li class="list-item">General
                        <ul>
                            <li class="list-item">
                                <router-link to="/admin/settings">Settings</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list-item">User
                        <ul>
                            <li class="list-item">
                                <router-link to="/admin/user/add">Add User</router-link>
                            </li>
                            <li class="list-item">
                                <router-link to="/admin/user/list">User List</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list-item">Problem
                        <ul>
                            <li class="list-item">
                                <router-link to="/admin/problem/add">Add Problem</router-link>
                            </li>
                            <li class="list-item">
                                <router-link to="/admin/problem/list">Problem List</router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="list-item">Submission
                        <ul>
                            <li class="list-item">
                                <router-link to="/admin/submissions">Submission List</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Marked } from 'marked-ts';

@Component
export default class AdminHome extends Vue {
    loaded: boolean = false;

    users: string = '';
    teams: string = '';

    data() {
        return {
            users: '',
            teams: '',
            loaded: false,
        }
    }

    mounted() {
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/user', {
            headers: {
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            this.users = response.data.content.length;
        }).catch((error) => {
            this.users = error;
        });
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/team', {
            headers: {
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            this.teams = response.data.content.length;
        }).catch((error) => {
            this.teams = error;
        })
        this.loaded = true;
    }
}
</script>
