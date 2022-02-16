import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators"
import store from "./store";
import axios from "axios";
import Cookies, { COOKIE } from '../utils/cookie';
import { ToastProgrammatic } from "buefy";
import { LoginParams } from '../../models/login.interface'
import router from '@/router'

@Module({
  namespaced: true,
  dynamic: true,
  name:'login.store.ts',
  store
})

export class LoginStore extends VuexModule{

  isLoading = false;
  error: any | null = null;
  isLoginInvalid: boolean|null = null;

  @Mutation
  updateLoadingStatus(payload: boolean) {
    this.isLoading = payload;
  };

  @Mutation
  setError(payload: any){
    this.error = payload;
  };

  @Mutation
  setIsLoginInvalid(payload: boolean | null) {
    this.isLoginInvalid = payload;
  };

  @Action({ rawError: true })
  async loginUser(params:LoginParams) {

    this.context.commit('updateLoadingStatus', true);
    this.context.commit('setError', null);
    this.context.commit('setIsLoginInvalid', null);
    Cookies.remove(COOKIE.TOKEN);
    Cookies.remove(COOKIE.USER);

    // Calls the login API and if verified, create cookie to store user JWT, and route to protected page
    try {
      const loginResponse = await axios.post(
        "http://localhost:3000/auth/login", 
        {username:params.username, password:params.password}
      );
      
      if (loginResponse.status === 201 && loginResponse.data && loginResponse.data.access_token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${loginResponse.data.access_token}`;
        const { access_token } = loginResponse.data;
        const minute = new Date(new Date().getTime() + 0.5 * 60 * 1000); // half a minute
        
        //TODO 1: Set security options in Cookies.set (Based on Brian's advice)
        // - httponly --> HTTP
        // - secure --> HTTPS
        // - same-site: strict

        //TODO 2: Set up method to keep user data persistance rather than using another cookie for username
        // This is where the user table from the main database comes in (for whatever app using this login module)
        Cookies.set(COOKIE.TOKEN, access_token, { expires: minute });
        Cookies.set(COOKIE.USER, params.username, { expires: minute });

        router.push({ name: 'ProtectedPage' });

        ToastProgrammatic.open({
          message: 'Login Successful!',
          type: 'is-success',
          duration: 3000,
        });
      };
      this.context.commit('setIsLoginInvalid', false);

    } catch (error) { 
        this.context.commit('setIsLoginInvalid', true);
        this.context.commit('setError', error);
        console.log(error);
        Cookies.remove(COOKIE.TOKEN);
        ToastProgrammatic.open({
          message: 'Login Failed',
          type: 'is-danger',
          duration: 3000,
        });
    };
    this.context.commit('updateLoadingStatus', false);
  };
  
}

export default getModule(LoginStore);