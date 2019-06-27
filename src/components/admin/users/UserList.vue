<template>
    <div class="list_users">
        <div class="section">
            <p class="title">List Users</p>
            <p class="subtitle"><router-link to='/admin'>Back</router-link></p>
        </div>
        <div class="section">
            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key="user.username" v-for="user in users">
                        <td>{{user.user_id}}</td>
                        <td>{{user.username}}</td>
                        <td>{{user.email}}</td>
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
        axios.get('http://localhost:8070/user', {
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
