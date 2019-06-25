<template>
  <div class="login">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Team extends Vue {
    users_ids: String[] = [];
    users: String[] = [];
    team_name: String = '';

    error = '';

    data() {
        return {
            user_ids: [],
            users: [],
            team_name: '',
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login');
            return;
        }
        let team_id = this.$route.params.team_id;
        axios.get('http://localhost:8070/team/' + team_id, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.team_name = response.data.content.team_name;
        }).catch((error) => {
            this.error = error;
        })
        axios.get('http://localhost:8070/team_members?Team_ID=' + team_id, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.users_ids = (response.data.content[Object.keys(response.data.content)[0]] as unknown) as String[];
            for(let i in this.users_ids) {
                axios.get('http://localhost:8070/user/' + this.users_ids[i], {
                    headers: {
                        Token: this.$cookies.get("token"),
                    }
                }).then((response) => {
                    this.users.push(response.data.content.username);
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
