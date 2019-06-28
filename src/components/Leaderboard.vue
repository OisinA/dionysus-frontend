<template>
    <div class="leaderboard">
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <h1 class="title">Leaderboard</h1>
            <article class="message is-danger" v-if='error'> 
                <div class="message-header">
                    <p>Warning</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    {{error}}
                </div>
            </article>
            <div class="section">
                <table class="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key="score" v-for="score in Object.keys(scores)">
                            <td>{{score}}</td>
                            <td>{{scores[score]}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>  
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component
export default class Leaderboard extends Vue {
    scores = {};

    error = '';

    loaded = false;

    data() {
        return {
            scores: {},
            error: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/leaderboard', {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.scores = response.data.content;
            this.loaded = true;
        }).catch((error) => {
            this.error = error;
        });
    }
}
</script>
