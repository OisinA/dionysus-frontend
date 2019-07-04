<template>
    <div class="list_problems">
        <div class="container">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><router-link to="/admin">Admin</router-link></li>
                    <li><a href="#" aria-current="page">List Problems</a></li>
                </ul>
            </nav>
        </div>
        <div class="section">
            <p class="title">List Problems</p>
        </div>
        <div v-if="error_message" class="field">
            <article class="message is-danger"> 
                <div class="message-header">
                    <p>Warning</p>
                </div>
                <div class="message-body">
                    {{error_message}}
                </div>
            </article>
        </div>
        <div v-if="success_message" class="field">
            <article class="message is-success"> 
                <div class="message-header">
                    <p>Success</p>
                </div>
                <div class="message-body">
                    {{success_message}}
                </div>
            </article>
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
                        <td><a v-on:click.prevent="delete_problem(problem)">Delete</a></td>
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

    success_message = '';
    error_message = '';

    data() {
        return {
            problems: '',
            loaded: false,
            success_message: '',
            error_message: '',
        }
    }

    delete_problem(problem) {
        axios.delete(process.env.VUE_APP_API_ENDPOINT + '/problem/' + problem, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            if(response.data.content == "success") {
                this.success_message = "Problem deleted!";
            }
        }).catch((error) => {
            this.error_message = error;
        })
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        axios.get(process.env.VUE_APP_API_ENDPOINT + '/problem', {
            headers: {
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            this.problems = response.data.content;
            console.log(this.problems);
            this.loaded = true;
        }).catch((error) => {
            this.problems = error;
        });
    }
}
</script>
