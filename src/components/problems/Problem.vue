<template>
    <div class="problem" >
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded">
            <article class="message is-danger" v-if='error'> 
                <div class="message-header">
                    <p>Warning</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    {{error}}
                </div>
            </article>
            <article class="message is-success" v-if='success'> 
                <div class="message-header">
                    <p>Success</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    <fold color="#FD759B"></fold>
                </div>
            </article>
            <div class="section">
                <p class="title">{{problem_name}}</p>
                <p v-html="problem_content"></p>
            </div>
            <div class="section">
                <p class="title">Submission</p>
                <form action="">
                    <div class="field">
                        <div class="file">
                            <label class="file-label">
                                <input class="file-input" ref="answer" type="file" name="answer" />
                                <span class="file-cta">
                                    <span class="file-label">
                                        Upload your answer...
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="file">
                            <label class="file-label">
                                <input class="file-input" ref="source" type="file" name="source" />
                                <span class="file-cta">
                                    <span class="file-label">
                                        Upload your source...
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <input type="submit" v-on:click.prevent="send_answer()" class="button">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Marked } from 'marked-ts';

@Component
export default class Problem extends Vue {
    problem_name = '';
    problem_content = '';

    error = '';
    success = '';

    loaded = false;

    data() {
        return {
            problem_name: '',
            problem_content: '',
            error: '',
            success: '',
            loaded: false,
        }
    }

    send_answer() {
        let form_data = new FormData()
        let ref: HTMLInputElement = this.$refs.answer as HTMLInputElement;
        if(!ref){
            return;
        }
        let file = ref!.files![0]
        form_data.append('answer', file)
        let ref1: HTMLInputElement = this.$refs.source as HTMLInputElement;
        if(!ref1){
            return;
        }
        let file1 = ref1!.files![0]
        form_data.append('source', file1)
        axios.post('http://localhost:8070/submission/' + this.$route.params.problem_id, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Token': this.$cookies.get("token"),
            }
        }).then((response) => {
            if(response.data.content == "success") {
                this.success = "Submission sent. Check problems page for your score.";
            }
        }).catch((error) => {
            this.error = error;
        })
    }

    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
        let u = '';
        axios.get('http://localhost:8070/problem/' + this.$route.params.problem_id, {
            headers: {
                Token: this.$cookies.get("token"),
            }
        }).then((response) => {
            this.problem_name = response.data.content.name;
            this.problem_content = Marked.parse(response.data.content.content);
            this.loaded = true;
        }).catch((error) => {
            this.error = error;
            this.$cookies.remove('token');
            this.$router.push('/login');
        });
    }
}
</script>
