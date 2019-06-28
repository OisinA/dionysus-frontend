<template>
    <div class="submissions" >
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <h1 class="title">Submissions</h1>
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
                            <th>Submission</th>
                            <th>Problem</th>
                            <th>Submission Status</th>
                            <th>Score</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key="submission" v-for="submission in Object.keys(submissions)">
                            <td>{{submissions[submission].id}}</td>
                            <td><router-link :to="/problem/ + submissions[submission].problem">{{problems[submissions[submission].problem]}}</router-link></td>
                            <td>{{statuses[submissions[submission].status]}}</td>
                            <td>{{submissions[submission].score == 0 ? "-" : submissions[submission].score}}</td>
                            <td>{{submissions[submission].updated}}</td>
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
export default class Submissions extends Vue {
    submissions = {};
    error = '';
    loaded = false;

    data() {
        return {
            submissions: {},
            error: '',
            loaded: false,
        }
    }

    statuses = {
        0: 'Submitted',
        1: 'Scoring',
        2: 'Scored',
    }

    problems = {

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
        });
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/submission', {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            for(let id in response.data.content) {
                let submission = response.data.content[id]
                if(this.submissions[submission.id]) {
                    if(this.submissions[submission.id].status < submission.status) {
                        this.submissions[submission.id] = submission;
                    } else {
                        continue;
                    }
                } else {
                    this.submissions[submission.id] = submission;
                }
            }
            this.loaded = true;
        }).catch((error) => {
            this.error = error;
            this.loaded = true;
        });
    }
}
</script>
