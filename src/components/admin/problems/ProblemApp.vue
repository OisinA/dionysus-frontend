<template>
    <div class="admin_problem">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class AdminAppProblem extends Vue {
    mounted() {
        if(!this.$cookies.get("token")) {
            this.$router.push('/login')
        }
    }
}
</script>
