<template>
  <div>
    <h1>U MADE IT {{ loggedinUser }}!</h1>
    <br/>
    <br/>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Cookies from 'js-cookie';
import { COOKIE } from '../utils/cookie';

@Component
export default class ProtectedPage extends Vue {

  loggedinUser = "";

  beforeMount(){
    const receivedUsername = Cookies.get(COOKIE.USER);
    if (receivedUsername !== null) {
      this.loggedinUser = receivedUsername;
    } else {
      this.loggedinUser = "loginStore not working";
    };
  };

  async logout() { 
    Cookies.remove(COOKIE.TOKEN);
    Cookies.remove(COOKIE.USER);
    this.$router.push({ name: 'Login' });
  };
}
</script>