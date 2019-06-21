<template>
  <div class="login">
    <h1 class="title">Profile</h1>
    <p>
        Username: {{user_data.username}}
    </p>
    <p>
        Email: {{user_data.email}} {{team_data}}
    </p>
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

    data() {
        return {
            user_data: '',
            team_data: '',
            user_id: '',
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        var u = '';
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
                this.$router.push('/logout');
            })
            axios.get('http://localhost:8070/team', {
                headers: {
                    Token: this.$cookies.get("token"),
                }
            }).then((response) => {
                this.team_data = response.data.content;
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            this.$router.push('/logout');
        });
    }
}
</script>
