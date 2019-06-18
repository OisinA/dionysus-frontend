<template>
  <div class="login">
    <h1 class="title">Welcome {{username}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Profile extends Vue {
    user_id = '';
    username = ''

    data() {
        return {
            username: '',
            user_id: '',
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        var u = '';
        axios.get(process.env.VUE_APP_API_URL + '/token_to_id', {
                headers: {
                    Token: this.$cookies.get("token"),
                }
            }).then((response) => {
            this.user_id = response.data.content.user_id;
        }).then((response) => {
            console.log("yes2");
            axios.get('/api/user/' + this.user_id, {
                headers: {
                    Token: this.$cookies.get("token"),
                }
            }).then((response) => {
                this.username = response.data.content.username;
            }).catch((error) => {
                this.$router.push('/login');
            })
        }).catch((error) => {
            this.$router.push('/login');
        });
    }
}
</script>
