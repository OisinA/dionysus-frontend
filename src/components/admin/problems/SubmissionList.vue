<template>
    <div class="list_problems">
        <div class="section">
            <p class="title">Submissions</p>
            <p class="subtitle"><router-link to='/admin'>Back</router-link></p>
        </div>
        <div class="section">
            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Submission</th>
                        <th>Problem ID</th>
                        <th>User ID</th>
                        <th>Submission Status</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key="submission.updated" v-for="submission in submissions">
                        <td>{{submission.id}}</td>
                        <td>{{submission.problem}}</td>
                        <td>{{submission.user}}</td>
                        <td>{{statuses[submission.status]}}</td>
                        <td>{{submission.updated}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AdminAppSubmissionList extends Vue {
    submissions = '';
    loaded: boolean = false;

    statuses = {
        0: 'Submitted',
        1: 'Scoring',
        2: 'Scored',
    }

    data() {
        return {
            submissions: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get('http://localhost:8070/submission', {
            headers: {
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            this.submissions = response.data.content;
            console.log(this.submissions)
            this.loaded = true;
        }).catch((error) => {
            this.submissions = error;
        });
    }
}
</script>
