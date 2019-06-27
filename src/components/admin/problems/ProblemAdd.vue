<template>
    <div class="add_problem">
        <div class="container">
            <p class="title">Add Problem</p>
            <p class="subtitle"><router-link to='/admin'>Back</router-link></p>
            <form class="form">
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
                <div class="field">
                    <div class="control">
                        <input class="input" v-model="name" type="text" placeholder="Problem Name">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <textarea class="textarea" v-model="content" placeholder="Problem Description" rows="20"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <textarea class="textarea" v-model="answer" placeholder="Problem Answer" rows="2"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button pinkButton" v-on:click="add_problem()">Add Problem</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class ProblemAdd extends Vue {

    name: string = '';
    content: string = '';
    answer: string = '';

    error_message: string = '';
    success_message: string = '';

    data() {
        return {
            name: '',
            content: '',
            answer: '',
            error_message: '',
            success_message: '',
        }
    }

    add_problem() {
        
    }

}
</script>
