<template>
    <div class="admin">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AdminApp extends Vue {
    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/token_to_id', {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            let user_id = response.data.content.user_id;
            axios.get(process.env.VUE_APP_API_ENDPOINT + '/user/' + user_id, {
                headers: {
                    'Token': this.$cookies.get("token"),
                }
            }).then((response) => {
                if(response.data.content.role <= 0) {
                    this.$router.push('/');
                }
            }).catch((error) => {
                console.log(error);
                this.$router.push('/');
            });
        }).catch((error) => {
            console.log(error);
            this.$router.push('/');
        });
    }
}
</script>
