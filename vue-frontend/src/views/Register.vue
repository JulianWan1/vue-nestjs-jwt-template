<template>
  <div>
    <h1>REGISTER</h1>
    <br/>
    <br/>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="New Username" />
      <p>User is: {{ username }}</p>
      <br />
      <br />
      <input v-model="password" type="password" placeholder="Password" />
      <p>Password is: {{ password }}</p>
      <br />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { ToastProgrammatic } from 'buefy';
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Register extends Vue {
  
  username = ""
  password = ""

  async register() {
    try {

// TODO: Backend may need to implement a way to check duplicate usernames
      const registeredUser = 
        await axios.post(
          "http://localhost:3000/user/register", 
          {username:this.username, password:this.password}
        );

      if (registeredUser.status === 201 && registeredUser.data._id) {

          this.$router.push({ name: 'Login' });
          
          ToastProgrammatic.open({
          message: 'Registration Successful!',
          type: 'is-success',
          duration: 3000,
        });
      }
    
    } catch(error) {
      console.log(error);

      ToastProgrammatic.open({
          message: 'Registration Failed, Please Try Again Later',
          type: 'is-danger',
          duration: 3000,
        });
    };
   
  };

}
</script>