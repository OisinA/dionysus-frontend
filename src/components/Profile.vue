<template>
    <div class="profile" >
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <h1 class="title">Profile</h1>
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
                Username: {{user_data.username}}
            </p>
            <p>
                Email: {{user_data.email}}
            </p>
            <p v-if="team_data._id">
                Team: <router-link :to="/team/ + team_data._id">{{team_data.team_name}}</router-link>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Profile extends Vue {
    user_id = '';
    user_data = ''
    team_data = ''
    team_button = ''

    error = ''

    loaded = false;

    data() {
        return {
            user_data: '',
            team_data: '',
            user_id: '',
            error: '',
            team_button: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        let u = '';
        axios.get('http://localhost:8070/token_to_id', {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.user_id = response.data.content.user_id;
        }).then((response) => {
            axios.get('http://localhost:8070/user/' + this.user_id, {
                headers: {
                    Token: this.$cookies.get("token"),
                }
            }).then((response) => {
                this.user_data = response.data.content;
            }).catch((error) => {
                this.error = error
            })
            axios.get('http://localhost:8070/team_members', {
                headers: {
                    Token: this.$cookies.get("token"),
                },
                params: {
                    User_ID: this.user_id,
                },
            }).then((response) => {
                if(Object.keys(response.data.content).length == 0){
                    return;
                }
                axios.get('http://localhost:8070/team/' + Object.keys(response.data.content)[0], {
                    headers: {
                        Token: this.$cookies.get("token"),
                    }
                }).then((response) => {
                    this.team_data = response.data.content;
                    console.log(this.team_data)
                    //this.team_button = `
                    //Team: <router-link :to="{ path: 'team', params: {team_id: team_data._id} }">` + this.team_data.team_name + `</router-link>
                    //`;
                    this.team_button = '{ path: "team", params: {team_id: ' + this.team_data._id + '} }'
                    this.loaded = true;
                }).catch((error) => {
                    this.error = error;
                })
            }).catch((error) => {
                this.error = error;
            })
        }).catch((error) => {
            this.error = error;
        });
    }
}
</script>
