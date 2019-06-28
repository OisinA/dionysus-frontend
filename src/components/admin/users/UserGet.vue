<template>
    <div class="profile" >
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <div class="container">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><router-link to="/admin">Admin</router-link></li>
                        <li><router-link to="/admin/user/list">User List</router-link></li>
                        <li><a href="#" aria-current="page">User Info</a></li>
                    </ul>
                </nav>
            </div>
            <div class="section">
                <h1 class="title">User Profile</h1>
                <article class="message is-danger" v-if='error'> 
                    <div class="message-header">
                        <p>Warning</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        {{error}}
                    </div>
                </article>
                <p>
                    User ID: {{user_id}}
                </p>
                <p>
                    Username: {{user_data.username}}
                </p>
                <p>
                    Email: {{user_data.email}}
                </p>
                <p>
                    Role: {{roles[user_data.role]}}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Profile extends Vue {
    user_id = '';
    user_data = '';

    error = ''

    loaded = false;

    roles = {
        0: 'Normal',
        1: 'Admin',
        2: 'Owner',
    }

    data() {
        return {
            user_data: '',
            user_id: '',
            error: '',
            loaded: false,
        }
    }

    mounted() {
        this.user_id = this.$route.params.user_id;
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/user/' + this.user_id, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.user_data = response.data.content;
            this.loaded = true;
        }).catch((error) => {
            this.error = error
            this.loaded = true;
        })
    }
}
</script>
