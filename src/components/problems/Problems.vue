<template>
    <div class="problems" >
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <h1 class="title">Problems</h1>
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
                            <th>Problem Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th>{{total}}</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr v-bind:key="problem" v-for="problem in Object.keys(problems)">
                            <td><router-link :to="/problem/ + problem">{{problems[problem]}}</router-link></td>
                            <td>{{scores[problem] ? scores[problem] : 0}}</td>
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
export default class Problems extends Vue {
    problems = {};
    scores = {};
    total = 0;

    error = '';

    loaded = false;

    data() {
        return {
            problems: {},
            scores: {},
            total: 0,
            error: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/problem', {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.problems = response.data.content;
            axios.get(process.env.VUE_APP_API_ENDPOINT + '/scores', {
                headers: {
                    Token: this.$cookies.get("token"),
                }
            }).then((response) => {
                this.scores = response.data.content;
                for(let key in this.scores) {
                    this.total += this.scores[key];
                }
                this.loaded = true;
            })
        }).catch((error) => {
            this.error = error;
            this.$cookies.remove('token');
            this.$router.push('/login');
        });
    }
}
</script>
