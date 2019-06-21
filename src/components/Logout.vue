<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Logout extends Vue {
    mounted() {
        this.$cookies.remove('token');
        this.$router.push('/login');
    }
}
</script>
