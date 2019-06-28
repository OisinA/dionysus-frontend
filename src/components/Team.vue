<template>
  <div class="login">
    <div v-if="!loaded">
        <fold color="#FD759B"></fold>
    </div>
    <div v-if="loaded">
        <h1 class="title">Team: {{team_name}}</h1>
        <article class="message is-danger" v-if='error'> 
            <div class="message-header">
                <p>Warning</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{error}}
            </div>
        </article>
        Members:
        <p v-bind:key="user.username" v-for="user in users">
            {{user}}
        </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Team extends Vue {
    users_ids: String[] = [];
    users: String[] = [];
    team_name: String = '';
    loaded: boolean = false;

    error = '';

    data() {
        return {
            user_ids: [],
            users: [],
            team_name: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login');
            return;
        }
        let team_id = this.$route.params.team_id;
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/team/' + team_id, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.team_name = response.data.content.team_name;
        }).catch((error) => {
            this.error = error;
        })
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/team_members?Team_ID=' + team_id, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.users_ids = (response.data.content[Object.keys(response.data.content)[0]] as unknown) as String[];
            for(let i in this.users_ids) {
                axios.get(process.env.VUE_APP_API_ENDPOINT + '/user/' + this.users_ids[i], {
                    headers: {
                        Token: this.$cookies.get("token"),
                    }
                }).then((response) => {
                    this.users.push(response.data.content.username);
                    this.loaded = true;
                }).catch((error) => {
                    this.error = error
                })
            }
        }).catch((error) => {
            this.error = error
        })
    }
}
</script>
