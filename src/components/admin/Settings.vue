<template>
    <div class="settings">
        <div class="container">
            <p class="title">Settings</p>
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
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" v-model="name" type="text" placeholder="Name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Homepage</label>
                    <div class="control">
                        <textarea class="textarea" v-model="homepage" placeholder="Homepage"></textarea>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button pinkButton" v-on:click.prevent="update_settings()">Update Settings</button>
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
export default class Settings extends Vue {

    name: string = '';
    homepage: string = '';

    error_message: string = '';
    success_message: string = '';
    loaded: boolean = false;

    data() {
        return {
            name: '',
            homepage: '',
            error_message: '',
            success_message: '',
            loaded: false,
        }
    }

    update_settings() {
        axios.post("http://localhost:8070/settings", {
            name: this.name,
            homepage: this.homepage,
        }, {
            headers: {
                "Token": this.$cookies.get("token"),
            },
        }).then((response) => {
            if(response.data.content == "success") {
                this.success_message = "Successfully updated settings.";
            }
        }).catch((error) => {
            this.error_message = error;
        });
    }

    mounted() {
        axios.get('http://localhost:8070/settings').then((response) => {
            this.name = response.data.content.name;
            this.homepage = response.data.content.homepage;
            this.loaded = true;
        }).catch((error) => {
            this.error_message = 'Error loading home page.'
        })
    }

}
</script>
