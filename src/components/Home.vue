<template>
    <div class="home">
        <div v-if="!loaded">
            <fold color="#FD759B"></fold>
        </div>
        <div v-if="loaded" v-html="home_data">

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { Marked } from 'marked-ts';

@Component
export default class Home extends Vue {
    home_data: string = '';
    loaded: boolean = false;

    data() {
        return {
            home_data: '',
            loaded: false,
        }
    }

    mounted() {
        axios.get('http://localhost:8070/home_summary').then((response) => {
            this.home_data = Marked.parse(response.data.content)
            this.loaded = true;
        }).catch((error) => {
            this.home_data = 'Error loading home page.'
        })
    }
}
</script>
