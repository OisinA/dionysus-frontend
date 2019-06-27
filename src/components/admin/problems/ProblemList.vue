<template>
    <div class="list_problems">
        <div class="section">
            <p class="title">List Problems</p>
            <p class="subtitle"><router-link to='/admin'>Back</router-link></p>
        </div>
        <div class="section">
            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Problem ID</th>
                        <th>Problem Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-bind:key="problem" v-for="problem in Object.keys(problems)">
                        <td>{{problem}}</td>
                        <td>{{problems[problem]}}</td>
                        <td><router-link to="">Edit</router-link></td>
                        <td><router-link to="">Delete</router-link></td>
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
export default class AdminAppProblemList extends Vue {
    problems = '';
    loaded: boolean = false;

    data() {
        return {
            problems: '',
            loaded: false,
        }
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get('http://localhost:8070/problem', {
            headers: {
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            this.problems = response.data.content;
            this.loaded = true;
        }).catch((error) => {
            this.problems = error;
        });
    }
}
</script>
