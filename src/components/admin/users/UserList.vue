<template>
    <div class="list_users">
        <div class="container">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/admin">Admin</router-link></li>
                    <li><a href="#" aria-current="page">User List</a></li>
                </ul>
            </nav>
        </div>
        <div class="section">
            <p class="title">User List</p>
        </div>
        <div class="section">
            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key="user.user_id" v-for="user in users">
                        <td><router-link :to="url + user.user_id">{{user.user_id}}</router-link></td>
                        <td>{{user.username}}</td>
                        <td>{{user.email}}</td>
                        <td>{{roles[user.role]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AdminAppUserList extends Vue {
    users = '';
    loaded: boolean = false;

    roles = {
        0: 'Normal',
        1: 'Admin',
        2: 'Owner',
    }

    url = '/admin/user/';

    data() {
        return {
            users: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/user', {
            headers: {
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            this.users = response.data.content;
            this.loaded = true;
        }).catch((error) => {
            this.users = error;
        });
    }
}
</script>
