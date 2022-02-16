<template>
<!-- TODO 1: Create modularization of components (if needed) -->
<!-- TODO 2: Set Buefy (b-field, b-input), SASS for FE Beautification -->
  <div>
    <h1>LOGIN</h1>
    <br/>
    <br/>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username"/>
      <p>User is: {{ username }}</p>
      <br />
      <br />
      <input v-model="password" type="password" placeholder="Password" />
      <p>Password is: {{ password }}</p>
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import LoginStore from "../store/login.store";
import { LoginParams } from '../../models/login.interface'

@Component
export default class Login extends Vue {
  
  username = "";
  password = "";
  loginStore = LoginStore;
  areInvalidParams = null;

  async login() {

    const params:LoginParams = {username: this.username, password: this.password};
    await this.loginStore.loginUser(params);

  };

  @Watch('loginStore.isLoginInvalid')
  setErrorStatus() {
    if (this.loginStore.isLoginInvalid) {
      this.areInvalidParams = true;
    } else {
      this.areInvalidParams = false;
    };
  }

}
</script>
